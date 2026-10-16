import { locationService } from "./locationService";

export const updateLocation=async(driverId,{latitude,longitude})=>{
    const lat=parseFloat(latitude);
    const lon=parseFloat(longitude);

    try{
        // update the driver location to redis
        const res=await locationService.addDriverLocation(driverId,lat,lon);
    }catch(err){
        console.log(err);
    }

    // update driver location in mongoDB
}