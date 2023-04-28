from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Cart)
admin.site.register(Product)
admin.site.register(ProductImage)
admin.site.register(Collection)
admin.site.register(CollectionImage)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Address)
admin.site.register(Customer)
admin.site.register(Wishlist)
admin.site.register(WishlistItem)