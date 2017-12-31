from collections import Iterable

from django.core.exceptions import ValidationError
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response


class StatView(GenericAPIView):
    """
    View for stats

    Usage:
    Define fields in `pi_fields` as
        pi_fields = ('field1','field2','field3')

    or override get_fields()

    Then define method `get_<field>_pi(queryset)` that returns the stat
    """

    queryset = None
    serializer_class = None
    stat_fields = None

    def get_fields(self):
        assert self.stat_fields is not None, (
                "'%s' should either include a `pi_fields` attribute, "
                "or override the `get_fields()` method."
                % self.__class__.__name__
        )

        fields = self.stat_fields
        assert isinstance(fields, Iterable), (
            "`stat_fields` should be Iterable"
        )
        assert not isinstance(fields, str), (
            "`stat_fields` should be iterable but not a string."
        )

        return fields

    def get_queryset(self):
        queryset = super().get_queryset()
        return self.filter_queryset(queryset)

    def get_stats(self, queryset, fields):
        """

        :param queryset: Queryset to generate stats from
        :type queryset: Queryset
        :param fields: Fields to generate stats of
        :type fields: list
        :return:
            {
                'item': no_of_item,
                'field':{
                            stats
                        }
            }
        """

        result = {
            'item': queryset.count()
        }

        for field in fields:
            result.update({field: getattr(self, 'get_' + field + '_stats')(queryset)})

        return result

    def get(self, request):
        try:
            queryset = self.get_queryset()
            fields = self.get_fields()

            if request.query_params.get('field'):
                if request.query_params.get('field') in fields:
                    fields = [request.query_params.get('field')]
                else:
                    return Response({'field': ['This field is not valid. Valid field is one of ' + fields.__str__()]},
                                    status=status.HTTP_400_BAD_REQUEST)

            return Response(self.get_stats(queryset, fields=fields), status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({'detail': e.message}, status=status.HTTP_400_BAD_REQUEST)

