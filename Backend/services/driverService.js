import locationService from "./locationService.js";
import * as userRepository from "../repositories/userRepository.js" 
export const updateLocation=async(driverId,{latitude,longitude})=>{
    const lat=parseFloat(latitude);
    const lon=parseFloat(longitude);

    try{
        // update the driver location to redis
        const res=await locationService.addDriverLocation(driverId,lat,lon);
        await userRepository.updateLocation(driverId,{
            type:'Point',
            coordinates:[lon,lat]
        })
    }catch(err){
        console.log(err);
    }
}