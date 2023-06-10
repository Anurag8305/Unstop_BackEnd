const mongoose = require("mongoose");
require("dotenv").config();

const coachSchema = mongoose.Schema({
  coach: Object,
});

const coachModel = mongoose.model("coach", coachSchema);
module.exports = {
  coachModel,
};