import { redisClient } from "../uitls/redisClient.js"

export const setDriverSocket=async(driverId,socketId)=>{
    try{
        await redisClient.hSet('driverSockets',driverId,socketId);
    }catch(error){
        throw error;
    }
}

export const getDriverSocket=async(driverId)=>{
    try{
        return await redisClient.hGet('driverSockets',driverId);
    }catch(error){
        throw error;
    }
}

export const removeDriverSocket = async (driverId, socketId) => {
    const currentSocketId = await redisClient.hGet('driverSockets', driverId);

    if (currentSocketId === socketId) {
        await redisClient.hDel('driverSockets', driverId);
    }
};