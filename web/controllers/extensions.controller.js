import { checkoutService } from "../services/extensions.service"
export const checkoutController = async(req,res)=>{
    try {
        const {id} = req.headers
        const result =await checkoutService(id);
        return res.json({
            success:true,
            data:result?.data?.customer?.addresses,
            message:"Addresses fetched succesfully"
        })
    } catch (error) {
        console.error(error?.message)
        return res.json({
        success:false,
        data:error.message,
        message:"Error in fetching data"
    
        })
    }
}