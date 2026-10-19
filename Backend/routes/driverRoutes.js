import { Router } from "express";
import { updateLocation } from "../controllers/driverController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const driverRouter=Router();

driverRouter.post('/location',authMiddleware,updateLocation)

export default driverRouter;