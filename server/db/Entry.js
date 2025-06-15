import mongoose from "mongoose";

const GlossSchema = new mongoose.Schema(
    {
        text: { type: String, required: true },
    },
    { _id: false }
);

const MetaSchema = new mongoose.Schema(
    {
        template: { type: String },
        language: { type: String },
        pos: { type: String },
        gender: { type: String, enum: ["masculine", "feminine", null], default: null },
        number: { type: String, default: null },
        head: { type: String, default: null },
        categories: { type: [String], default: [] },
        rawAttributes: { type: [String], default: [] },
        extras: { type: mongoose.Schema.Types.Mixed, default: {} },
    },
    { _id: false }
);

const EnglishSchema = new mongoose.Schema(
    {
        word: { type: String, required: true },
        pos: { type: String, required: true },
        meta: { type: MetaSchema, default: null },
        etymology: { type: String, required: true },
        glosses: { type: [GlossSchema], required: true },
    },
    { _id: false }
);

const EntrySchema = new mongoose.Schema({
    spanish: { type: String, required: true },
    english: { type: EnglishSchema, required: true },
    frequency: { type: Number, required: true, index: true },
});

EntrySchema.index({frequency: -1})

const Entry = mongoose.model("Entry", EntrySchema);

export default Entry;
