const express = require("express");
const {
  getRandomSingleObservation,
  getConfig,
  post,
  saveSingleObservationPrediction,
} = require("../controllers/diabetes_observations.js");

const router = express.Router();

router.get("/", getRandomSingleObservation);
router.get("/config", getConfig);
router.post("/", saveSingleObservationPrediction);

module.exports = router;
