from rest_framework.filters import BaseFilterBackend


class DateRangeFilter(BaseFilterBackend):
    """
    Filter that filters created date range
    """
    def filter_queryset(self, request, queryset, view):
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        if start_date and end_date:
            queryset = queryset.filter(created__range=[start_date, end_date])
        elif start_date and not end_date:
            queryset = queryset.filter(created__gt=start_date)
        elif end_date and not start_date:
            queryset = queryset.filter(created__lte=end_date)

        return queryset
