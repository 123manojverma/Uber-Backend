import "dotenv/config";
import { app, httpServer, io } from "./config/appConfig.js";
import notificationrouter from "./routes/notificationRoutes.js";
import { removeDriverSocket, setDriverSocket } from "./services/driverService.js";
import { initRedis } from "./uitls/redisClient.js";
import express from "express";

app.use('/api', notificationrouter);
app.use(express.static('.'));

io.on('connection', (socket) => {
    console.log('New Connection: ', socket.id);

    // Handle driver login
    socket.on('driver-login', async (data) => {
        try {
            const { driverId } = data;

            await setDriverSocket(driverId, socket.id);
            socket.data.driverId = driverId;

            socket.emit('login-success', {
                message: 'Successfully connected',
                driverId
            })
        } catch (err) {
            socket.emit('error', {
                message: 'Connection Failed'
            })
        }
    })

    // Handle disconnection
    socket.on('disconnect', async () => {
        const { driverId } = socket.data;

        if (!driverId) return;

        try {
            await removeDriverSocket(driverId, socket.id);
            console.log(`Driver ${driverId} disconnected`);
        } catch (err) {
            console.error('Failed to remove driver socket:', err);
        }
    });
})

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
    console.log(`WebSocket server running on port ${PORT}`);
    initRedis()
})