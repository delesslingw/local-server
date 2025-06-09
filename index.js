const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000, (e) => {
    if (e) {
        console.error(e);
        return;
    }
    console.log(`Listening on port ${3000}`);
});
