const express = require("express");
const seatModel = require("../Model/seat.Model");
const rowModel = require("../Model/row.Model");

const seatRoute = express.Router();

//get all the seats of a row
seatRoute.get("/:id", async (req, res) => {
	const rowID = req.params.id;
	try {
		const row = await rowModel.findById(rowID);
		if (!row) {
			res.send("Row Not Found");
			console.log("Coach not found");
			return;
		} else {
			res.send(row.seats);
		}
	} catch (err) {
		res.send(err);
	}
});

//create new seat in a row
seatRoute.post("/addseat/:id", async (req, res) => {
	const rowID = req.params.id;
	const newSeat = req.body;
	try {
		const row = await rowModel.findById(rowID);
		if (!row) {
			res.send("Row Not Found");
			return;
		}
		row.seats.push(newSeat);
		await row.save();
		res.send("New seat added successfully");
	} catch (error) {
		console.error(error);
	}
});

//booking seats
seatRoute.post("/bookings", async (req, res) => {
	const { seats } = req.body;
	const emptySeats = await rowModel.find();
	console.log(emptySeats, seats);
	seatFiner(emptySeats.seats)
});


const seatFiner=(emptySeats,reqSeats)=>{
	console.log(emptySeats.seats)
}
module.exports = seatRoute;
