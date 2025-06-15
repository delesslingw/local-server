import express from "express";
import Entry from "../../db/Entry.js";
import User from "../../db/User.js";
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

/**
 * Get top 10 most frequent entries not known by the user
 * @param {User} user - A User document with populated knownEntries
 * @returns {Promise<Array>} Array of Entry documents
 */
export async function getTop10UnknownEntries(user, limit = 10) {
    try {
        const knownIds = user.knownEntries.map((e) => e.entry.toString());

        const entries = await Entry.find({
            _id: { $nin: knownIds },
        })
            .sort({ frequency: -1 })
            .limit(limit);

        return entries;
    } catch (err) {
        console.error("Error fetching unknown entries:", err);
        throw err;
    }
}
// /api/user
router.get("/words", async (req, res) => {
    const users = await User.find({});
    if (users.length < 1) {
        res.send({ error: "No user!" });
    }
    const user = users[0];
    const userBatch = user.getNextReviewBatch();
    if (userBatch.length < 10) {
        const unknownEntries = await getTop10UnknownEntries(user, 10 - userBatch);
        console.log(unknownEntries);
        res.send([...userBatch, ...unknownEntries]);
    } else {
        res.send(userBatch);
    }
});
export default router;
