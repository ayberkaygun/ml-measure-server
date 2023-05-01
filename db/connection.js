const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = client;
