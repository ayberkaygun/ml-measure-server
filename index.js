const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config({ path: "./.env" });
const diabetesRoute = require("./routes/diabetes.js");
const usersRoute = require("./routes/users.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.send("is working fine");
});

app.use("/diabetes", diabetesRoute);
app.use("/users", usersRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
