import mongoose from "mongoose";

/**
 * Represents a user's knowledge of a single word entry.
 */
const KnownEntrySchema = new mongoose.Schema({
    /** Reference to the Entry this KnownEntry is tracking */
    entry: { type: mongoose.Schema.Types.ObjectId, ref: "Entry", required: true },
    /** Confidence score between 0 and 1 */
    confidence: { type: Number, min: 0, max: 1, default: 0.3 },
    /** Date when the entry was last reviewed */
    lastReviewed: { type: Date, default: Date.now },
    /** Date when the entry was last decayed */
    lastDecayed: { type: Date, default: Date.now },
    /** Number of total review attempts */
    reviewCount: { type: Number, default: 0 },
    /** Number of correct responses */
    successCount: { type: Number, default: 0 },
    /** Number of incorrect responses */
    failureCount: { type: Number, default: 0 },
    /** Interval in days until the next review */
    interval: { type: Number, default: 1 },
    /** Ease factor for spaced repetition */
    easeFactor: { type: Number, default: 2.5 },
    /** Date when the entry is due for review again */
    nextDue: { type: Date, default: () => new Date(Date.now() + 86400000) },
});

/**
 * Records the result of a review session.
 * @param {boolean} isCorrect Whether the user got it correct
 */
KnownEntrySchema.methods.recordReview = function (isCorrect) {
    this.reviewCount++;
    this.lastReviewed = new Date();

    if (isCorrect) {
        this.successCount++;
        this.interval = Math.round(this.interval * this.easeFactor);
        this.easeFactor = Math.min(this.easeFactor + 0.1, 2.5);
        this.confidence = Math.min(1, this.confidence + 0.1);
    } else {
        this.failureCount++;
        this.interval = 1;
        this.easeFactor = Math.max(1.3, this.easeFactor - 0.2);
        this.confidence = Math.max(0, this.confidence - 0.2);
    }

    this.nextDue = new Date(Date.now() + this.interval * 86400000);
};

/**
 * Applies decay to confidence score if overdue.
 */
KnownEntrySchema.methods.applyDecay = function () {
    const now = Date.now();
    if (this.nextDue && now > this.nextDue.getTime()) {
        const daysLate = (now - this.nextDue.getTime()) / 86400000;
        const decayFactor = Math.exp(-0.1 * daysLate);
        this.confidence = Math.max(0, this.confidence * decayFactor);
        this.lastDecayed = new Date();
    }
};

/**
 * Determines if the entry is due for review.
 * @returns {boolean}
 */
KnownEntrySchema.methods.isDue = function () {
    return this.nextDue.getTime() <= Date.now();
};

/**
 * Schema for a user tracking known entries.
 */
const UserSchema = new mongoose.Schema({
    /** The user's name */
    name: { type: String, required: true },
    /** Array of known vocabulary entries with learning stats */
    knownEntries: { type: [KnownEntrySchema], default: [] },
});

/**
 * Applies decay logic to all due entries.
 */
UserSchema.methods.applyDecay = function () {
    this.knownEntries.forEach((entry) => {
        if (typeof entry.applyDecay === "function") {
            entry.applyDecay();
        }
    });
};

/**
 * Returns the next set of entries due for review or low-confidence, sorted by lowest confidence.
 * @param {number} [limit=10]
 * @returns {Array} Array of KnownEntry documents
 */
UserSchema.methods.getNextReviewBatch = function (limit = 10) {
    const now = Date.now();

    return this.knownEntries
        .filter((entry) => entry.nextDue.getTime() <= now || entry.confidence < 0.6)
        .sort((a, b) => a.confidence - b.confidence)
        .slice(0, limit);
};

/**
 * Gets the user's KnownEntry for a given Entry ID.
 * @param {mongoose.Types.ObjectId|string} entryId
 * @returns {object|null}
 */
UserSchema.methods.getKnownEntry = function (entryId) {
    return this.knownEntries.find((e) => e.entry.toString() === entryId.toString()) || null;
};

/**
 * Adds a new KnownEntry to the user if it doesn't exist.
 * @param {mongoose.Types.ObjectId|string} entryId
 */
UserSchema.methods.addKnownEntry = function (entryId) {
    if (!this.getKnownEntry(entryId)) {
        this.knownEntries.push({ entry: entryId });
    }
};

const User = mongoose.model("User", UserSchema);

export default User;
