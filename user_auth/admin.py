from django.contrib import admin
from .models import CustomUser

class CustomUserAdmin(admin.ModelAdmin):
    # Specify the fields to display in the list view
    list_display = ('id', 'first_name', 'last_name', 'email', 'role', 'is_staff', 'is_active')

    # Optional: Add search fields to allow searching in the admin interface
    search_fields = ('first_name', 'last_name', 'email')

    # Optional: Add filter options in the admin interface
    list_filter = ('role', 'is_staff', 'is_active')

# Register the CustomUser model with the custom admin configuration
admin.site.register(CustomUser, CustomUserAdmin)
