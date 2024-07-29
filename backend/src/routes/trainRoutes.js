const express = require("express");
const router = express.Router();
const trainController = require("../controllers/trainController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/availability", trainController.getAvailability);
router.post("/create", trainController.createTrain);
router.post("/:train_id/book", authMiddleware, trainController.bookSeat);

module.exports = router;
