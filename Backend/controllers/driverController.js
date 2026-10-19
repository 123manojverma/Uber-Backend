import * as driverService from "../services/driverService.js"

export const updateLocation=async(req,res)=>{
    try{
        const {latitude,longitude}=req.body;

        if(typeof latitude!='number' || typeof longitude!='number'){
            throw new Error('Latitude and longitude must be numbers');
        }
        driverService.updateLocation(req.user._id,{latitude,longitude});
        res.status(200).json({
            success:true,
            error:null,
            message:"Location updated for driver"
        })
    }catch(error){
        res.status(400).json({
            error:error.message
        })
    }
}