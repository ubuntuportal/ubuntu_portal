from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product, Category
from django.db.models import Q
from .serializers import ProductSerializer, CategorySerializer, SubCategorySerializer
from rest_framework import filters
from rest_framework.response import Response
from .mixins import AdvanceFilteringMixins, PaginationMixins, IsSeller
from rest_framework.decorators import action



class ProductViewSet(viewsets.ModelViewSet, 
                     AdvanceFilteringMixins,
                     PaginationMixins):

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PaginationMixins
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['category', 'price']
    ordering_fields = ['price', 'created_at']

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Set default ordering
        queryset = queryset.order_by('created_at')

        # General filtering applied to all requests
        price_min = self.request.query_params.get('price_min')
        price_max = self.request.query_params.get('price_max')
        category = self.request.query_params.get('category')

        if price_min:
            queryset = queryset.filter(price__gte=price_min)

        if price_max:
            queryset = queryset.filter(price__lte=price_max)

        if category:
            queryset = queryset.filter(category__name__icontains=category)

        return queryset

    @action(detail=False, methods=['get'], url_path='search')
    def search(self, request):
        queryset = self.get_queryset()
        search_query = request.query_params.get('q')
        if search_query:
            queryset = queryset.filter(
                Q(title__icontains=search_query) |
                Q(description__icontains=search_query) |
                Q(seller__email__icontains=search_query)
            )

        # apply pagination
        paginator = PaginationMixins()
        paginated_queryset = paginator.paginated_queryset(queryset, request)
        serializer = self.get_serializer(paginated_queryset, many=True)
        return Response(serializer.data)


    @action(detail=False, methods=['get'], url_path='filter')
    def filter(self, request):
        queryset = self.get_queryset()
        filtering = AdvanceFilteringMixins()
        queryset = filtering.apply_advance_filtering(queryset, request)

        # Apply pagination
        paginator = PaginationMixins()
        paginated_queryset = paginator.paginated_queryset(queryset, request)
        serializer = self.get_serializer(paginated_queryset, many=True)

        return Response(serializer.data)

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [IsAuthenticatedOrReadOnly()]
        elif self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsSeller()]
        return super().get_permissions()

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)



class CategoryViewSet(viewsets.ModelViewSet):
    """
    A viewset for handling CRUD operations on the Category model.
    """
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        # Return only top-level categories (categories without a parent)
        return Category.objects.filter(parent__isnull=True)

    def perform_create(self, serializer):
        # Optionally, you can add additional logic here
        serializer.save()

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def add_subcategory(self, request, pk=None):
        """
        Endpoint to add a subcatergory to a category
        """
        parent_category = self.get_object()
        subcategory_data = request.data
        
        subcategory_serializer = SubCategorySerializer(data=subcategory_data)
        
        if subcategory_serializer.is_valid():
            subcategory_serializer.save(parent=parent_category)  # Ensure 'parent' field is set correctly
            return Response(subcategory_serializer.data, status=201)
        return Response(subcategory_serializer.errors, status=400)

class ManageProductsViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return self.queryset.none()  # Return an empty queryset for schema generation
    
        # For real requests, check if the user is authenticated
        if not self.request.user.is_authenticated:
            raise PermissionDenied("You must be logged in to view this data.")
        return self.queryset.filter(seller=self.request.user)

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)