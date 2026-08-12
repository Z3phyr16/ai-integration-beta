import express from "express";
import chatRoutes from "./routers/chat.routes.js";

const app = express();

app.use(express.json());

app.use("/api/chat", chatRoutes);

export default app;
