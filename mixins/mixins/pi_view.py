from typing import Iterable

from django.core.exceptions import ValidationError
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response


class PiView(GenericAPIView):
    """
    View for pi-chart

    Usage:
    Define fields in `pi_fields` as
        pi_fields = ('field1','field2','field3')

    or override get_fields()

    Then define method `get_field_pi(queryset)` that returns
        {
            'legend': ['name1', 'name2',...],
            'pi':[{'name': 'name1', 'value':value1}, {'name':'name2', 'value': value2}, ...]
        }
    """
    queryset = None
    serializer_class = None
    pi_fields = None

    def get_fields(self):
        assert self.pi_fields is not None, (
                "'%s' should either include a `pi_fields` attribute, "
                "or override the `get_fields()` method."
                % self.__class__.__name__
        )

        fields = self.pi_fields
        assert isinstance(fields, Iterable), (
            "`pi_fields` should be Iterable"
        )
        assert not isinstance(fields, str), (
            "`pi_fields` should be iterable but not a string."
        )

        return fields

    def get_queryset(self):
        queryset = super().get_queryset()
        return self.filter_queryset(queryset)

    def get_pi(self, queryset, fields):
        """
        loads pi data from get_field_pi method

        :param queryset: queryset to filter from
        :type queryset: Queryset
        :param fields: fields to load pi
        :return:
            {
                'field':{
                    'legend':[],
                    'pi':[
                        {
                            'name': ,
                            'value': ,
                        }...
                    ]...
            }
        """
        result = {
        }

        for field in fields:
                result.update({field: getattr(self, 'get_' + field + '_pi')(queryset)})
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

            return Response(self.get_pi(queryset, fields=fields), status=status.HTTP_200_OK)

        except ValidationError as e:
            return Response({'detail': e.message}, status=status.HTTP_400_BAD_REQUEST)
        except ZeroDivisionError:
            return Response({'message': 'No records for given options'}, status=status.HTTP_400_BAD_REQUEST)
