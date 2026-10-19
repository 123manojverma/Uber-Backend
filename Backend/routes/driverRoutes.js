import { Router } from "express";
import { updateLocation, confirmBooking } from "../controllers/driverController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const driverRouter = Router();

driverRouter.post('/location', authMiddleware, updateLocation)
driverRouter.post('/confirm', authMiddleware, confirmBooking);

export default driverRouter;