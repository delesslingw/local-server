import mongoose from "mongoose";
import spanishRouter from "./spanishRouter/index.js";
import userRouter from "./userRouter/index.js";
import express from "express";
import quizRouter from "./quizRouter.js";
const router = express.Router();

router.use("/spanish", spanishRouter);
router.use("/users", userRouter);
router.use("/quiz", quizRouter);
router.get("/status", (req, res) => {
    res.send(
        "DB STATUS: " + ["Disconnected", "Connected", "Connecting", "Disconnecting"][mongoose.connection.readyState]
    );
});
export default router;
