import mongoose from "mongoose";
import api from "./api/index.js";
import express from "express";
import User from "./db/User.js";
import cors from "cors";
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/test-db";
async function main() {
    await mongoose.connect(MONGO_URI);
    const users = await User.find({});
    if (!users.length) {
        const usr = await User.create({
            name: "Roo",
            knownEntries: [],
        });
        console.log("Successfully created: ", usr);
    } else {
        users.forEach((usr) => console.log(usr));
    }
    // ======
    // SERVER
    // ======
    const app = express();
    app.use(cors());
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
