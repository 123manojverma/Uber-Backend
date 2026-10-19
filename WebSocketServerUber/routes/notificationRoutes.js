import { Router } from "express";
import { notifyDrivers, removeRideNotification } from "../controllers/NotificationController.js";

const notificationrouter=Router();

notificationrouter.post('/notify-drivers',notifyDrivers);
notificationrouter.post('/remove-ride-notification',removeRideNotification)

export default notificationrouter;