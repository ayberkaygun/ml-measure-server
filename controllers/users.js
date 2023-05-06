const bodyParser = require("body-parser");
const client = require("../db/connection.js");
const { ObjectId } = require("mongodb");

const database = client.db("users_db");
const usersCollection = database.collection("users_collection");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = diabetesCollection.find();
    console.log(allUsers);
  } catch (err) {
    res.status(404).json({ success: false });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await usersCollection.insertOne(req.body);
    res.status(200).json({ succes: true, user: user });
  } catch (err) {
    res.status(404).json({ success: false });
  }
};

const deleteUser = async (req, res) => {
  try {
    const filter = { _id: new ObjectId(req.body.objectId) };
    await usersCollection.deleteOne(filter);

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(404).json({ success: false });
  }
};

const editUser = async (req, res) => {
  try {
    const filter = { _id: new ObjectId(req.body.objectId) };
    const updatedUser = await usersCollection.updateOne(filter);

    res.status(200).json({ succes: true, user: updatedUser });
  } catch (err) {
    res.status(404).json({ success: false });
  }
};

const inviteUser = async (req, res) => {};

const inviteUser2 = async (req, res) => {
  try {
    //get user id
    const filter = { _id: new ObjectId(req.body.objectId) };
    //get user
    const user = await usersCollection.findOne(filter);
    //send mail to the users mail address
  } catch (err) {
    res.status(404).json({ success: false });
  }
};

module.exports = {
  createUser,
  deleteUser,
  editUser,
  inviteUser,
  getAllUsers,
};
