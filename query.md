query MyQuery($id: ID!) {
  customer(id: $id) {
    metafield(key: "wishlists", namespace: "custom") {
      key
      value
    }
  }
}
 mutation updateCustomerMetafields($input: CustomerInput!) {
    customerUpdate(input: $input) {
      customer {
        id
        metafield(key:"wishlists",namespace:"custom") {
          key,
          value
        }
      }
      userErrors {
        message
        field
      }
    }
  }