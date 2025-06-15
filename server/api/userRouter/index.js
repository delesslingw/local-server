import express from "express";
import User from "../../db/User.js";
import Entry from "../../db/Entry.js";
const router = express.Router();
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
router.get("/", async (req, res) => {
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
