import express from "express";
import chatRoutes from "./routers/chat.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "http://26.84.8.98:5173"],
//   }),
// );
app.use(cors());

app.use("/api/chat", chatRoutes);

export default app;
