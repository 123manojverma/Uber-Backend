import axios from "axios";
import * as driverService from "../services/driverService.js";
import locationService from "../services/locationService.js";
import * as bookingService from "../services/bookingService.js";

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

export const confirmBooking = async(req, res) => {
    const { bookingId } = req.body;

    const booking = await bookingService.assignDriver(bookingId, req.user._id);
    try {
        const notifiedDriverIds = await locationService.getNotifiedDrivers(bookingId);
        await axios.post('http://localhost:3001/api/remove-ride-notification', {
            rideId: bookingId,
            driverIds: notifiedDriverIds
        });
    } catch (notificationError) {
        console.error('Failed to notify drivers:', notificationError.message);
    }
    res.status(201).send({
        data: booking,
        success: true,
        error: null,
        message: "successfully confirmed booking"
    });
}