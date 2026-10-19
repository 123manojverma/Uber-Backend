import { haversineDistance } from "../utils/distance.js";
import * as bookingRepository from "../repositories/bookingRepository.js";
import locationService from "./locationService.js";

const BASIC_FARE=50;
const RATE_PER_KM=12;

export const createBooking=async({passengerId,source,destination})=>{
    const distance=haversineDistance(source.latitude,source.longitude,destination.latitude,destination.longitude);
    const fare=BASIC_FARE*(distance*RATE_PER_KM);

    const bookingData={
        passenger:passengerId,
        source,
        destination,
        fare,
        status:'pending',
        distance
    }

    const booking=bookingRepository.createBooking(bookingData);
    return booking;
}

export const findNearByDrivers=async(location,radius=5)=>{
    const longitude=parseFloat(location.longitude);
    const latitude=parseFloat(location.latitude);

    const radiusKm=parseFloat(radius);

    if (isNaN(longitude) || isNaN(latitude) || isNaN(radiusKm)) {
      throw new Error('Invalid coordinates or radius');
    }

    const nearbyDrivers=await locationService.findNearByDrivers(longitude,latitude,radiusKm);

    return nearbyDrivers;
}

export const assignDriver = async (bookingId, driverId) => {
    console.log(bookingId)
    const booking = await bookingRepository.updateBookingStatus(bookingId, driverId, 'confirmed');
    if (!booking) throw new Error('Booking already confirmed or does not exist');
    return booking;
  };