import express from "express";
import cors from "cors";
import cryptoRoutes from "./routes/cryptoRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", cryptoRoutes);

export default app;
