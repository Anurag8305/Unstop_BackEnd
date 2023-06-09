const express = require("express");
const seatModel = require("../Model/seat.Model");
const seatRoute = express.Router();

//get all the seats in the train
seatRoute.get("/", async (req, res) => {
	try {
		const seats = await seatModel.find();
		res.status(200).send(seats);
	} catch (error) {
		res.status(500).send({ success: false, message: "Something Went Wrong" });
	}
});

module.exports = seatRoute;
