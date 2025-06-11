import mongoose from "mongoose";
import api from "./api/index.js";
import express from "express";
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/test-db";
async function main() {
    await mongoose.connect(MONGO_URI);
    const app = express();
    app.use(express.json());
    app.use("/api", api);
    app.get("/", (req, res) => {
        res.send("Fresh, beautiful, automated HELLO WORLD");
    });

    app.listen(3000, (e) => {
        if (e) {
            console.error(e);
            return;
        }
        console.log(`Listening on port ${3000}`);
    });
}

main().catch((e) => console.error(e));
