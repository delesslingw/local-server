import mongoose from "mongoose";
import spanishRouter from "./spanishRouter/index.js";
import express from "express";

const router = express.Router();

router.use("/spanish", spanishRouter);
router.get("/status", (req, res) => {
    res.send(
        "DB STATUS: " + ["Disconnected", "Connected", "Connecting", "Disconnecting"][mongoose.connection.readyState]
    );
});
export default router;
