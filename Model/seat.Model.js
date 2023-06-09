const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
	seats: [
		{
			status: { type: Boolean, default: false },
			seatNo: { type: String, required: true },
		},
	],
});
const seatModel = mongoose.model("seat", seatSchema);
module.exports = seatModel;
