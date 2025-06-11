const api = require("./api");
const express = require("express");
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
