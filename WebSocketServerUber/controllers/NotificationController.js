import { io } from "../config/appConfig.js";
import { getDriverSocket } from "../services/driverService.js";

export const notifyDrivers = async (req, res) => {
    try {
        const { rideId, rideInfo, driverIds } = req.body;

        const notificationData = {
            rideId,
            rideInfo,
            timeStamp: new Date().toISOString()
        };

        const notifiedDrivers = [];
        const failedDrivers = [];

        for (const driverId of driverIds) {
            const socketId = await getDriverSocket(driverId);

            if (socketId) {
                io.to(socketId).emit('new-ride-notification', notificationData);
                notifiedDrivers.push(driverId);
            } else {
                failedDrivers.push(driverId);
            }
        }

        const result = {
            notifiedDrivers,
            failedDrivers,
            totalNotifed: notifiedDrivers.length + failedDrivers.length
        };

        res.status(200).json({
            data: { rideId, ...result },
            success: true,
            error: null,
            message: "Successfully notified drivers"
        });
    } catch (err) {
        res.status(500).json({
            data: null,
            success: false,
            error: err.message,
            message: "Failed to notify drivers"
        });
    }
};

export const removeRideNotification = async (req, res) => {
    try {
        const { rideId, driverIds } = req.body;

        for (const driverId of driverIds) {
            const socketId = await getDriverSocket(driverId);

            if (socketId) {
                io.to(socketId).emit('remove-ride-notification', { rideId });
            }
        }

        res.status(200).json({
            data: { rideId },
            success: true,
            error: null,
            message: "Successfully removed ride notification"
        });
    } catch (err) {
        res.status(500).json({
            data: null,
            success: false,
            error: err.message,
            message: "Failed to remove ride notification"
        });
    }
};
