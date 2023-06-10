const mongoose = require("mongoose");
const seatModel = require("./seat.Model");

const rowSchema = new mongoose.Schema({
	seats: [
		[
			{
				status: { type: Boolean, default: false },
				seatNo: { type: String, required: true },
			},
		],
	],
	rowNo: String,
});

const rowModel = mongoose.model("row", rowSchema);
module.exports = rowModel;
