import { Booking } from "../models/bookings.js"

export const createBooking=async(bookingData)=>{
    const booking=new Booking(bookingData);
    await booking.save();
    return booking;
}

