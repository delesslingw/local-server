const spanishRouter = require("./spanishRouter");
const express = require("express");

const router = express.Router();

router.use("/spanish", spanishRouter);

module.exports = router;
