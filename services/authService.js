import jwt from "jsonwebtoken";
import { create, findByEmail } from "../repositories/userRepository.js";

function signToken(userId){
    return jwt.sign(
        {id:userId},
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_EXPIRES_IN || '1h',
            issuer: process.env.JWT_ISSUER || 'uber-backend',
            audience: process.env.JWT_AUDIENCE || 'uber-clients'
        }
    )
}

export async function register(userData) {
    const user=await create(userData);
    const token=signToken(user._id);
    return {user,token}; 
}

export async function login({email,password}){
    const user=await findByEmail(email);
    const ok=user && (await user.comparePassword(password));
    if(!ok){
        throw new Error('Invalid email or password');
    }
    const token=signToken(user._id);
    return {user,token};
}