import { User } from "../models/user.js";

export async function create(userData) {
    const user=new User(userData);
    await user.save();
    return user;
}

export async function findByEmail(email) {
    return User.findOne({email});
}