import { haversineDistance } from "../utils/distance.js";
import * as bookingRepository from "../repositories/bookingRepository.js";

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