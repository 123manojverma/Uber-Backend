import { redisClient } from "../utils/redisClient";

export class locationService{
    async addDriverLocation(driverId,latitude,longitude){
        try{
            await redisClient.sendCommand([
                'GEOADD',
                'drivers',
                latitude.toString(),
                longitude.toString(),
                driverId.toString()
            ])
        }catch(err){
            console.log("Cannot add to redis",err);
        }
    }
}