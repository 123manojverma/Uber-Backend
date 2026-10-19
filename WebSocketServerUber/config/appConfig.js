import { createServer } from "node:http";
import cors from "cors";
import express from 'express';
import { Server } from "socket.io";

export const app = express();
export const httpServer = createServer(app);

export const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());