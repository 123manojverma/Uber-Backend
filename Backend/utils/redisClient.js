import { createClient } from "redis";

export const redisClient=createClient({
    url: process.env.REDIS_URI
});

redisClient.on('connect',()=>{
    console.log("Connected to Redis");
})

redisClient.on('error',(err)=>{
    console.log("Redis connection error: ",err);
})

export async function initRedis() {
  try{
    if(!redisClient.isOpen){
      await redisClient.connect();
    }
  }catch(err){
    console.log("Redis connection error",err);
    throw err;
  }
}