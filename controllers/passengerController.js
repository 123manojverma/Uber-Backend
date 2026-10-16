import * as bookingService from "../services/bookingService.js";

export const createBooking=async(req,res)=>{
    try{
        const {source,destination}=req.body;
        // create a booking -> persist object in mongo db
        const booking=await bookingService.createBooking({passengerId:req.user._id,source,destination})
        // find nearby drivers -> using redis DB
        res.status(200).json({
            data:booking,
            success:true,
            error:null,
            message:"Successfully created the booking",
        })
        // notify the nearby drivers

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}