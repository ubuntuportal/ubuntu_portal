from django.contrib import admin
from .models import CustomUser, Company, UserProfile

class CustomUserAdmin(admin.ModelAdmin):
    # Specify the fields to display in the list view
    list_display = ('id', 'first_name', 'last_name', 'email','country','phone_number', 'role', 'profile', 'company', 'is_staff', 'is_active')

    # Optional: Add search fields to allow searching in the admin interface
    search_fields = ('first_name', 'last_name', 'email')

    # Optional: Add filter options in the admin interface
    list_filter = ('role', 'is_staff', 'is_active')

# Register the CustomUser model with the custom admin configuration
admin.site.register(CustomUser, CustomUserAdmin)


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'contact_person', 'contact_email', 'contact_phone')
    search_fields = ('company_name', 'contact_person', 'contact_email')



@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'bio', 'country', 'address', 'city', 'postal_code')
    search_fields = ('user__username', 'bio', 'address', 'city', 'state', 'postal_code')
    list_filter = ('user', 'city')
    ordering = ('user',)
    readonly_fields = ('user',)  # Make the user field read-only to prevent changes
