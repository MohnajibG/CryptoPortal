import express from "express";
import { cryptoSummary } from "../controllers/cryptoController.js";

const router = express.Router();

router.get("/crypto-summary", cryptoSummary);

export default router;
