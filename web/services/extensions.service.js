import { apiConnector } from "../services/axios.js"

export const checkoutService = async(id)=>{
    try {
    const query = `
      query ShopName($id: ID!) {
        customer(id: $id) {
          addresses(first: 20) {
            address1
            address2
            city
            phone
            name
            company
            country
            firstName
            lastName
            id
            province
            zip
            countryCodeV2
          }
        }
      }
    `
    const result = await apiConnector('POST',{
      query,variables:{
        id
      }
    });
    return result;
    } catch (error) {
        throw new Error(error)
    }
}

//New task
export const getProductsService=async(ids)=>{
    try {
        const query = `
            query getProducts($ids: [ID!]!) {
                nodes(ids: $ids) {
                    ... on Product {
                    id
                    title
                    priceRangeV2 {
                        minVariantPrice {
                        amount
                        }
                    }
                    featuredMedia {
                        preview {
                        image {
                            url
                            altText
                        }
                        }
                    }
                    handle
                    }
                }
            }
        `
        const result = await apiConnector('POST',{
            query,variables:{
                ids
            }
        });
        return result;
    } catch (error) {
        throw new Error(error)
    }
}
export const getWishlistService=async(id)=>{
    try {
        const query = `
            query MyQuery($id: ID!) {
                customer(id: $id) {
                    metafield(key: "wishlists", namespace: "custom") {
                        key
                        value
                    }
                }
            }
        `
        const result = await apiConnector('POST',{
            query,variables:{
                id
            }
        });
        return result;
    } catch (error) {
        throw new Error(error)
    }
}
export const updateWishlistService = async(id,productId)=>{ 
    try {
        const queryToUpdate = `
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
        `
        //To fetch all existing ids 
        const response = await getWishlistService(id)

        //destructure only products
        const allProducts =response?.data?.customer?.metafield?.value
        let productIds = allProducts ? JSON.parse(allProducts) : []
        
        if (!productIds.includes(productId)) {
            productIds.push(productId)
        }
        
        const variables ={
            input: {
                id,
                metafields: [
                    {
                        namespace: "custom",
                        key: "wishlists",
                        type: "list.product_reference",
                        value: JSON.stringify(productIds) 
                    }
                ]
            }
        }
        const result = await apiConnector('POST',{
            query: queryToUpdate,variables
        });
        return result;
    } catch (error) {
        throw new Error(error)
    }
}
export const deleteWishlistService = async(id,productId)=>{ 
    try {
        const queryToUpdate = `
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
        `
        //To fetch all existing ids 
        const response = await getWishlistService(id)

        //destructure only products
        const allProducts =response?.data?.customer?.metafield?.value
        let productIds = allProducts ? JSON.parse(allProducts) : []
        
        productIds  =productIds.filter((id)=>id!==productId);
        console.log(productIds)
        
        const variables ={
            input: {
                id,
                metafields: [
                    {
                        namespace: "custom",
                        key: "wishlists",
                        type: "list.product_reference",
                        value: JSON.stringify(productIds) 
                    }
                ]
            }
        }
        const result = await apiConnector('POST',{
            query: queryToUpdate,variables
        });
        return result;
    } catch (error) {
        throw new Error(error)
    }
}
export const deleteAllWishlistService = async(id)=>{ 
    try {
        const queryToUpdate = `
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
        `
        const variables ={
            input: {
                id,
                metafields: [
                    {
                        namespace: "custom",
                        key: "wishlists",
                        type: "list.product_reference",
                        value: JSON.stringify([])
                    }
                ]
            }
        }
        const result = await apiConnector('POST',{
            query: queryToUpdate,variables
        });
        return result;
    } catch (error) {
        throw new Error(error)
    }
}