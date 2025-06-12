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
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Entry.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).send({
                status: "error",
                message: `No entry found with id ${id}`,
            });
        }

        res.send({
            status: "success",
            message: `Successfully deleted entry with id ${id}`,
        });
    } catch (e) {
        console.error("❌ Failed to save entry:", e);
        res.status(500).send({
            status: "error",
            message: "Failed to delete entry",
            error: e.message || e.toString(),
        });
    }
});
router.put("/", (req, res) => {
    res.send("PUT /api/spanish");
});

export default router;
