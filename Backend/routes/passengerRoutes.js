import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createBooking } from "../controllers/passengerController.js";

const passengerRouter = Router();

passengerRouter.post("/ride", authMiddleware, createBooking);

export default passengerRouter;