const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("GET /api/spanish");
});
router.post("/", (req, res) => {
    res.send("POST /api/spanish");
});
router.delete("/", (req, res) => {
    res.send("DELETE /api/spanish");
});
router.put("/", (req, res) => {
    res.send("PUT /api/spanish");
});

module.exports = router;
