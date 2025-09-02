# Documentation for Extension
This extension provides customers an option to add or remove product from wishlist inside store product page.
It fetches all the saved wishlisted products from our backend and allows the customer to quickly add delete or navigate product from the full page. 

It uses two extensions
__customer account ui__ - for interacting with metafield
__theme extension__ - to provide option in store for adding and removing wishlist

# Features
Fetches all the wishlisted products from backend API and displays via full page extension.
Provides __Add to Wishlist__ and __In Wishlist__ buttons on product pages.
Allows customers to add, delete, or navigate to products from their wishlist.
Seamlessly syncs wishlist data with customer accounts using metafields.

# Frontend Hooks
__useApi__ 
    1. Provides extension metadata which is used to find the origin of the backend.
    2. To navigate to the product page and to show the toast on ui.

# Backend apis

__getProducts__ - Returns the details of products for the given products id for current customer metafield.
__listProducts__ - Returns the list of saved product id for the current customer.
__addProducts__ - Add the products to the customer wishlist metafield of the current customer.
__removeProducts__ - Remove the products from the customer wishlist metafield of the current customer.
__removeAllProducts__ - Returns all proudcts from the customer wishlist metafield of the current customer.

# Test Cases

__Get Customer Wishlist__
__Scenerio__                              __Expected Behaviour__

1. Customer with saved wishlist       Return the list of products and should render on frontend.
2. Customer with empty wishlist       Return the empty list and should show **No wishlist items yet**.
3. Missing Customer ID in headers     Return the message **Please enter Customer id**
4. Customer not found in backend      Returns **Customer Not found**.
5. Some products deleted in Shopify   Return the products that are availaible does not return deleted


__Update Customer Wishlist__
__Scenerio__                                          __Expected Behaviour__
 
6. Add product with valid Customer and Product ID     Returns **Wishlist updated successfully**
7. Add product with already added Product ID          Returns **Wishlist updated successfully**
8. Missing Customer or Product ID                     Returns **Enter Customer and Product id**  
9. Invalid Product ID                                 Returns **User errors** 


__Delete Customer Wishlist__

10. Valid Customer ID + Product ID                    deletes product from wishlist.
11. Product ID already has GID format                 should still succeed.
12. Invalid ID formats                                Return error with status 500


__Delete All Customer Wishlist__
13. Valid Customer ID with multiple products          deletes all wishlist items.
14. Valid Customer ID with empty wishlist             should still return **All Wishlists Deleted successfully**
 