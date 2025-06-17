import express from "express";
import User from "../db/User.js";
import Entry from "../db/Entry.js";
import mongoose from "mongoose";
const router = express.Router();

router.get("/words", async (req, res) => {
    try {
        const user = await User.findOne({}).populate("knownEntries.entry");
        if (!user) return res.status(404).json({ error: "No user found" });
        user.applyDecay();
        const reviewBatch = user.getNextReviewBatch(10);
        const knownIds = reviewBatch.map((e) => e.entry._id.toString());
        const unknownNeeded = 10 - reviewBatch.length;
        let unknownEntries = [];
        if (unknownNeeded > 0) {
            const knownAll = user.knownEntries.map((e) => {
                return new mongoose.Types.ObjectId(e.entry._id);
            });
            unknownEntries = await Entry.find({ _id: { $nin: knownAll } })
                .sort({ frequency: -1 })
                .limit(unknownNeeded);
        }
        await user.save();

        const quizWords = [...reviewBatch.map((e) => e.entry), ...unknownEntries];
        res.json(quizWords);
    } catch (err) {
        console.error("Error fetching quiz words", err);
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/answer", async (req, res) => {
    const { entryId, isCorrect } = req.body;
    try {
        const user = await User.findOne({});
        if (!user) return res.status(404).json({ error: "No user found" });
        let known = user.getKnownEntry(entryId);
        if (!known) {
            user.addKnownEntry(entryId);
            known = user.getKnownEntry(entryId);
        }
        known.recordReview(isCorrect);
        await user.save();
        res.json({ success: true, updated: known });
    } catch (err) {
        console.error("Error recording review:", err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
