import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export async function authMiddleware(req,res,next) {
    const token = req.cookies.token?.split(" ")[1];
    if(!token){
        return res.status(401).json({
            message:"Access Denied"
        })
    }
    try{
        const verified=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await User.findById(verified.id);
        if (!req.user) {
            return res.status(401).json({
                message:"Invalid Token"
            })
        }
        next();
    }catch(err){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
}