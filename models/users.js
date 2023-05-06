const userType = {
  title: "user",
  required: [
    "name",
    "surname",
    "proficiency",
    "hospitalType",
    "yearOfExpertise",
  ],
  properties: {
    name: { bsonType: "string" },
    surname: { bsonType: "string" },
    proficiency: { bsonType: "string" },
    hospitalType: { bsonType: "number" }, //University, State, Private
    yearOfExpertise: { bsonType: "number" },
  },
};

module.exports = userType;
