import express from "express";
import Entry from "../../db/Entry.js";
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const entries = await Entry.find();
        res.send(entries);
    } catch (e) {
        console.error("❌ Failed to save entry:", e);
        res.status(500).send({
            status: "error",
            message: "Failed to GET entries",
            error: e.message || e.toString(),
        });
    }
});
router.post("/", async (req, res) => {
    const params = req.body;

    try {
        const newEntry = new Entry(params);
        await newEntry.save();
        console.log("New entry saved");
        res.status(201).send({
            status: "success",
            message: "New entry saved",
            entry: newEntry,
        });
    } catch (e) {
        console.error("❌ Failed to save entry:", e);
        res.status(500).send({
            status: "error",
            message: "Failed to save entry",
            error: e.message || e.toString(),
        });
    }
});
router.delete("/", (req, res) => {
    res.send("DELETE /api/spanish");
});
router.put("/", (req, res) => {
    res.send("PUT /api/spanish");
});

export default router;
