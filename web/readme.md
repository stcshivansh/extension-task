# Documentation for Extension
This extension provides customers with a custom address selector inside Shopify Checkout.
It fetches saved addresses from our backend and allows the customer to quickly select one, which updates the shipping address on checkout. It shows the addresses other than default addresses (5)

# Features
Fetches saved customer addresses from backend API.
Displays a __Select Address__ button in checkout
Opens a modal overlay listing saved addresses (beyond the first 5).
Applies the selected address directly to the checkout shipping fields.
Uses Shopify Checkout UI primitives (Modal, Button, BlockStack) for a native experience.

# Frontend Hooks
useApi - Provides extension metadata which is used to find the origin of the backend
useApplyShippingAddressChange - Used to update the checkout shipping address .

# Backend apis
getAddresses - Returns the list of saved addresses for the current customer.

# Test Cases
Breakpoint when we have more than 5 address

__Scenerio__                              __Expected Behaviour__
0 address                -        The Select Address button should not render.
5 address                -        The Select Address button should not render (since we only show addresses beyond 5).
More than 5 addresses    -        The Select Address button renders. Clicking opens a modal listing only addresses beyond 5
Selecting an address     -        The selected address updates checkout shipping fields and modal closes automatically.

# Limitations
Extension only works inside Shopify Checkout
Requires backend `/api/getAddresses` endpoint
Customers see __Select Address__ only addresses beyond the first 5