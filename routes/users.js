const express = require("express");
const {
  createUser,
  deleteUser,
  editUser,
  inviteUser,
  getAllUsers,
} = require("../controllers/users.js");

const router = express.Router();

router.post("/create", createUser);
router.delete("/", deleteUser);
router.patch("/", editUser);
router.get("/invite", inviteUser);
router.get("/getUsers", getAllUsers);

module.exports = router;
