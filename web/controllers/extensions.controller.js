
import { checkoutService, updateWishlistService,deleteWishlistService,getWishlistService,deleteAllWishlistService, getProductsService } from "../services/extensions.service.js"


export const checkoutController = async(req,res)=>{
    try {
        const {id} = req.headers
        if(!id){
            return res.status(400).json({
                success:false,
                message:"Please enter Customer id"
            })
        }
        const result =await checkoutService(id);
        return res.status(200).json({
            success:true,
            data:result?.data?.customer?.addresses,
            message:"Addresses fetched succesfully"
        })
    } catch (error) {
        console.error(error?.message)
        return res.status(500).json({
            success:false,
            data:error.message,
            message:"Error in fetching data"
        })
    }
}
export const getCustomerWishlist = async(req,res)=>{
    try {
        const {id} = req.headers
        if(!id){
            return res.status(400).json({
                success:false,
                message:"Please enter Customer id"
            })
        }

        const result =await getWishlistService(id);
        if(!result?.data?.customer){
            return res.status(400).json({
                success:false,
                message:"Customer Not found"
            })   
        }
        const ids =result?.data?.customer?.metafield?.value ? JSON.parse(result?.data?.customer?.metafield?.value ):null;
        if(!ids || ids.length==0){
            return res.status(200).json({
                success:true,
                data:{
                    products:[]
                },
                message:"Wishlist fetched succesfully"
            })
        }
        const response =await getProductsService(ids);
        return res.status(200).json({
            success:true,
            data:response?.data?.nodes.map((node)=>({
                id:node?.id,
                title:node?.title,
                handle:node?.handle,
                amount:node?.priceRangeV2?.minVariantPrice?.amount,
                image:node?.featuredMedia?.preview?.image?.url||null
            })),
            message:"All Wishlists Fetched succesfully"
        })
    } catch (error) {
        console.error(error?.message)
        return res.status(500).json({
            success:false,
            data:error.message,
            message:"Error in fetching data "
        })
    }
}
export const updateCustomerWishlist = async(req,res)=>{
    try {
        const {id} = req.body
        let {productId} = req.body

        if(!id || !productId){
            return res.status(400).json({
                success:false,
                message:"Please enter Customer id and Product id"
            })
        }
        productId = productId.startsWith("gid://shopify/Product/") ? productId :"gid://shopify/Product/"+productId
        const result =await updateWishlistService(id,productId);
        if(result?.data?.customerUpdate?.userErrors?.length >0){
            return res.status(400).json({
                success:false,
                message:result?.data?.customerUpdate?.userErrors[0]?.message
            })
        }
        return res.status(200).json({
            success:true,
            message:"Wishlist updated succesfully"
        })

    } catch (error) {
        console.error(error?.message)
        return res.status(500).json({
            success:false,
            data:error.message,
            message:"Error in fetching data "
        })
    }
}
export const deleteCustomerWishlist = async(req,res)=>{
    try {
        const {id} = req.body
        let {productId} = req.body

        if(!id || !productId){
            return res.status(400).json({
                success:false,
                message:"Please enter Customer id and Product id"
            })
        }
        productId = productId.startsWith("gid://shopify/Product/") ? productId :"gid://shopify/Product/"+productId
        const result =await deleteWishlistService(id,productId);
        if(result?.data?.customerUpdate?.userErrors?.length >0){
            return res.status(400).json({
                success:false,
                message:result?.data?.customerUpdate?.userErrors[0]?.message
            })
        }
        return res.status(200).json({
            success:true,
            message:"Wishlist Deleted succesfully"
        })

    } catch (error) {
        console.error(error?.message)
        return res.status(500).json({
            success:false,
            data:error.message,
            message:"Error in fetching data "
        })
    }
}
export const deleteAllCustomerWishlist = async(req,res)=>{
    try {
        const {id} = req.body

        if(!id){
            return res.status(400).json({
                success:false,
                message:"Please enter Customer "
            })
        }
        const result =await deleteAllWishlistService(id);
        if(result?.data?.customerUpdate?.userErrors?.length >0){
            return res.status(400).json({
                success:false,
                message:result?.data?.customerUpdate?.userErrors[0]?.message
            })
        }
        return res.status(200).json({
            success:true,
            message:"All Wishlists Deleted succesfully"
        })

    } catch (error) {
        console.error(error?.message)
        return res.status(500).json({
            success:false,
            data:error.message,
            message:"Error in fetching data "
        })
    }
}
export const getProducts= async(req,res )=>{
    try {
        const {id} = req.body
        if(!id){
            return res.status(400).json({
                success:false,
                message:"Please enter Id of products "
            })
        }
        const result =await getProductsService(id);
        console.log(result)
        return res.status(200).json({
            success:true,
            data:result?.data?.nodes.map((node)=>({
                id:node?.id,
                title:node?.title,
                handle:node?.handle || null,
                amount:node?.priceRangeV2?.minVariantPrice?.amount,
                image:node?.featuredMedia?.preview?.image?.url
            })),
            message:"All Wishlists Fetched succesfully"
        })

    } catch (error) {
        console.error(error?.message)
        return res.status(500).json({
            success:false,
            data:error.message,
            message:"Error in fetching data "
        })
    }
}
