# from rest_framework.permissions import BasePermission
# from rest_framework.exceptions import ValidationError
# from rest_framework.pagination import PageNumberPagination
# 
# 
# # Custom permission class to check if user is seller
# class IsSeller(BasePermission):
#     def has_permission(self, request, view):
#         if view.action in ['list', 'retrieve']:
#             return True
#         return request.user.is_authenticated and request.user.role == 'seller'
# 
#     def has_object_permission(self, request, view, obj):
#         if view.action in ['update', 'partial_update', 'destroy']:
#             return obj.seller == request.user
#         return True
# 
# 
# # Helper class to apply advance filtering on queryset
# class ApplyAdvanceFiltering:
#     def get_queryset(self, queryset, request):
#         categories = request.query_params.get('categories')
#         price_range = request.query_params.get('price_range')
#         created_at_range = request.query_params.get('created_at_range')
#         rating_min = request.query_params.get('rating_min')
# 
#         if categories:
#             categories = categories.split(',')
#             queryset = queryset.filter(category__name__in=categories)
# 
#         if price_range:
#             try:
#                 # Convert map to list
#                 price_range = list(map(float, price_range.split('-')))
#                 queryset = queryset.filter(price__gte=price_range[0], price__lte=price_range[1])
#             except ValueError:
#                 raise ValidationError('Invalid price range format. Use price_range=100-500.')
# 
#         if created_at_range:
#             try:
#                 created_at_start, created_at_end = created_at_range.split('-')
#                 queryset = queryset.filter(created_at__date__gte=created_at_start, created_at__date__lte=created_at_end)
#             except ValueError:
#                 raise ValidationError('Invalid date range format. Use created_at_range=YYYY-MM-DD,YYYY-MM-DD.')
# 
#         if rating_min:
#             try:
#                 rating_min = float(rating_min)
#                 queryset = queryset.filter(rating__gte=rating_min)
#             except ValueError:
#                 raise ValidationError('Invalid rating format. Use rating_min=4.5')
# 
#         return queryset
# 
# 
# # Helper function to get paginated queryset
# def get_paginated_queryset(queryset, request):
#     paginator = PageNumberPagination()
#     return paginator.paginate_queryset(queryset, request)
