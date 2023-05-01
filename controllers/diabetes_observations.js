const bodyParser = require("body-parser");
const client = require("../db/connection.js");
const { ObjectId } = require("mongodb");

const database = client.db("diabetes_db");
const diabetesCollection = database.collection("diabetes_csv");

const setStatusForSingleObservation = async (id, status) => {
  const filter = { _id: new ObjectId(id) };

  const updateObservation = {
    $set: {
      status: status,
    },
  };

  const result = await diabetesCollection.updateOne(filter, updateObservation);
};

const getRandomSingleObservation = async (req, res) => {
  try {
    console.log("hit");

    const query = { status: undefined };
    const observation = await diabetesCollection.findOne(query);

    //set the status property of the document "active", thus the document can only be updated if its "active"
    await setStatusForSingleObservation(observation._id, "active");

    res.status(200).json(observation);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const saveSingleObservationPrediction = async (req, res) => {
  try {
    const observation = await diabetesCollection.findOne({
      _id: new ObjectId(req.body.objectId),
    });

    if (observation?.status != "active") {
      res
        .status(404)
        .json({ error: "Error! Status is not active for the observation" });
      return;
    }

    const filter = { _id: new ObjectId(req.body.objectId) };
    const updateObservation = {
      $set: {
        status: "fetched",
        prediction: req.body.prediction,
      },
    };

    await diabetesCollection.updateOne(filter, updateObservation);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(404).json({ success: false });
  }
};

const getConfig = async (req, res) => {
  const diabetesConfig = require("./diabetes_config.json");
  res.status(200).json(diabetesConfig);
};

module.exports = {
  getRandomSingleObservation,
  getConfig,
  saveSingleObservationPrediction,
};
