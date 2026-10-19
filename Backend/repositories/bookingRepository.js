import { Booking } from "../models/bookings.js"

export const createBooking=async(bookingData)=>{
    const booking=new Booking(bookingData);
    await booking.save();
    return booking;
}

export const updateBookingStatus = async (bookingId, driverId, status) => {
    return Booking.findOneAndUpdate(
      { _id: bookingId, status: 'pending' },
      { driver: driverId, status },
      { new: true }
    );
};