from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response



class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


"""
Create Product Listing (Seller Only)
Endpoint: POST /api/products/
Purpose: Allows a seller to create a new product listing.
Authorization: Requires a valid JWT token. Only accessible by users with the seller role.

View All Products (Open to All)
Endpoint: GET /api/products/
Purpose: Allows any user (buyer or seller) to view the list of products.
Authorization: No JWT required, but optional if you want to provide personalized 
experiences (e.g., showing buyer-specific discounts).


Update Product Listing (Seller Only)
Endpoint: PUT /api/products/<id>/
Purpose: Allows a seller to update their product listing.
Authorization: Requires a valid JWT token and the seller role. The seller should be the owner of the product listing.

"""

class RoleBaseedAccessView(viewsets.ViewSet):
    
    # get all products (Open to All)
    def get(request):
        """
        Allowing any user (buyer or seller) to view the list of products
        
        """
        
        products_list = Product.objects.all()
        product_serializer = ProductSerializer(products_list, many=True)
        return Response(product_serializer.data)
    
    # create a new product listing (Seller Only)
    def post(request):
        """
        Allowing a seller to create a new product listing
        request.data: product data to be created
        pk: product_id
        
        """
        if request.user.is_authenticated and request.user.role == 'seller':
            product_serializer = ProductSerializer(data=request.data)
            if product_serializer.is_valid():
                product_serializer.save()
                return Response(product_serializer.data)
            return Response(product_serializer.errors, status=400)
        return Response({'error': 'Unauthorized'}, status=401)
    
    # update product listing (Seller Only)
    def put(request, pk):
        """
        Allowing a seller to update their product listing
        pk: product_id
        request.data: product data to be updated
        
        """
        product = Product.objects.get(id=pk)
        if request.user.is_authenticated and request.user.role == 'seller' and product.seller == request.user:
            product_serializer = ProductSerializer(product, data=request.data)
            if product_serializer.is_valid():
                product_serializer.save()
                return Response(product_serializer.data)
            return Response(product_serializer.errors, status=400)
        return Response({'error': 'Unauthorized'}, status=401)