import { Router } from "express";
import { updateLocation } from "../controllers/driverController.js";

const driverRouter=Router();

driverRouter.post('/location',updateLocation)

export default driverRouter;