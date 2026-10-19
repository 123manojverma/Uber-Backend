import "dotenv/config";
import cors from "cors";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./utils/db.js";
import { initRedis } from "./utils/redisClient.js";
import cookieParser from "cookie-parser";
import passengerRoutes from "./routes/passengerRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";

const app=express();

const PORT=process.env.PORT || 3000;

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser())

app.use('/api/auth',authRoutes);
app.use('/api/passenger', passengerRoutes);
app.use('/api/driver',driverRoutes)

app.use((req,res)=>{
    res.status(404).json({
        error:'Not found'
    })
})

app.use((err,req,res,next)=>{
    console.error(err);
    const status=err.status || (err.code==='AUTH_INVALID_CREDENTIALS'?401:500);
    res.status(status).json({
        error:err.message || 'Internal Server Error'
    })
})

async function startServer() {
    await connectDB();
    await initRedis();
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

startServer().catch((error) => {
    console.error("Server startup failed:", error);
    process.exitCode = 1;
});