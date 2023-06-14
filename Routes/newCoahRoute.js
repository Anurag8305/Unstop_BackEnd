const express = require("express");
const { coachModel } = require("../Model/newCoachModel");

require("dotenv").config();

const seatRouter = express.Router();

//get all ticket for displaying
seatRouter.get("/ticket", async (req, res) => {
	const bookingDetails = await coachModel.find();
	res.send(bookingDetails[0].coach);
});

//after getting userinput this route initiates the book ticket process
seatRouter.post("/ticket", async (req, res) => {
	let requestedBooking = req.body.number_of_seats;
	let seatStructure = await coachModel.find();
	const emptySeats = await coachModel.findOne({ "coach.status": true });
	console.log("emptySeats", emptySeats);
	let id = seatStructure[0]._id;
	seatStructure = seatStructure[0].coach;
	const seatsInRow = 7;
	const lastRowSeats = 3;
	const totalRows = 12;
	const seatLayout = seatStructure;

	// function to check available seats
	function seatsAvailableInRow(row, numOfSeats) {
		for (let i = 0; i <= seatsInRow - numOfSeats; i++) {
			let available = true;
			for (let j = i; j < i + numOfSeats; j++) {
				if (seatLayout[row][j]) {
					available = false;
					break;
				}
			}
			if (available) {
				return i;
			}
		}
		return -1;
	}

	// Function to book the seats
	async function reserveSeats(numOfSeats) {
		const coach = await coachModel.findOne({ "coach.status": false });

		if (+numOfSeats > seatsInRow) {
			res.send({ seat: "Cannot reserve more than 7 seats at a time." });
			return;
		}
		let row = -1;
		let seatIndex = -1;

		//  Checking seat in existing row
		for (let i = 0; i < 12; i++) {
			const availableSeatIndex = seatsAvailableInRow(i, +numOfSeats);
			if (availableSeatIndex !== -1) {
				row = i;
				seatIndex = availableSeatIndex;
				break;
			}
		}

		// //  Checking seat in existing row else finding it in the nearby adjacent ones
		// if (row === -1) {
		// 	for (let i = 0; i < 12; i++) {
		// 		const availableSeatIndex = seatsAvailableInRow(i, numOfSeats);
		// 		if (availableSeatIndex !== -1) {
		// 			row = i;
		// 			seatIndex = availableSeatIndex;
		// 			break;
		// 		}
		// 	}
		// }

		// booking the seats
		// ? self making to book seats in adjacent rows. commented line 64-74
		if (row == -1) {
			let nearArr = [];
			let count = numOfSeats;
			let khaliseats = 0;
			console.log("count", count);
			console.log("numOfseats", numOfSeats);
			for (let i = 0; i < seatLayout.length; i++) {
				let flag = true;
				for (let j = 0; j < seatLayout[i].length; j++) {
					if (count == 0) {
						flag = false;
						break;
					}
					if (seatLayout[i][j] == false) {
						nearArr.push({ row: i, seat: j });
						khaliseats++;
						count--;
					}
				}
				if (flag == false) break;
			}
			console.log("neaarArr", nearArr);
			console.log("seatLayout", seatLayout);
			if (khaliseats == numOfSeats) {
				const reservedSeats = [];
				const reservedSeatsNum = [];
				for (let i = 0; i < nearArr.length; i++) {
					let obj = nearArr[i];
					//
					seatLayout[+obj.row][+obj.seat] = true;
					console.log(seatLayout[+obj.row + 1][+obj.seat + 1]);
					reservedSeats.push(`Row ${obj.row + 1}, Seat ${obj.seat + 1}`);
					reservedSeatsNum.push(obj.row * 7 + obj.seat + 1);
				}
				console.log(seatLayout);
				await coachModel.findByIdAndUpdate({ _id: id }, { coach: seatLayout });
				res.send({
					seat: `Successfully reserved ${numOfSeats} seat, seats Number: ${reservedSeats.join(
						", "
					)}`,
				});
			} else {
				res.send("Cant be booked. Not enough seats");
			}
			// console.log("booking hoga ab nearest wale me");
			// console.log("nearArr",nearArr);
			// 	res.send(seatLayout);
		} else if (row !== -1 && seatIndex !== -1) {
			const reservedSeats = [];
			const reservedSeatsNum = [];
			for (let i = seatIndex; i < seatIndex + numOfSeats; i++) {
				seatLayout[row][i] = true;
				reservedSeats.push(`Row ${row + 1}, Seat ${i + 1}`);
				reservedSeatsNum.push(row * 7 + i + 1);
			}
			console.log(
				`Successfully reserved ${numOfSeats} seats: ${reservedSeats.join(", ")}`
			);
			//updating seat status of those which are booked
			await coachModel.findByIdAndUpdate({ _id: id }, { coach: seatLayout });
			res.send({
				seat: `Successfully reserved ${numOfSeats} seat, seats Number: ${reservedSeats.join(
					", "
				)}`,
			});
		} else {
			res.send("No seats available.");
		}
	}
	reserveSeats(+requestedBooking);
});

// updating all the booked seats and creating newly unbooked seats for using again
seatRouter.get("/delete", async (req, res) => {
	const updatedData = [
		new Array(7).fill(false),
		new Array(7).fill(false),
		new Array(7).fill(false),
		new Array(7).fill(false),
		new Array(7).fill(false),
		new Array(7).fill(false),
		new Array(7).fill(false),
		new Array(7).fill(false),
		new Array(7).fill(false),
		new Array(7).fill(false),
		new Array(7).fill(false),
		new Array(3).fill(false),
	];
	let seatStructure = await coachModel.find();
	let id = seatStructure[0]._id;
	const updateData = async (id, updatedData) => {
		await coachModel.findByIdAndUpdate({ _id: id }, { coach: updatedData });
		res.send("Successfully Updated");
	};
	updateData(id, updatedData);
});

//creating  new seats for the forst time to set MOngoDb collection
seatRouter.get("/coach", async (req, res) => {
	const coach = new coachModel({
		coach: [
			new Array(7).fill(false),
			new Array(7).fill(false),
			new Array(7).fill(false),
			new Array(7).fill(false),
			new Array(7).fill(false),
			new Array(7).fill(false),
			new Array(7).fill(false),
			new Array(7).fill(false),
			new Array(7).fill(false),
			new Array(7).fill(false),
			new Array(7).fill(false),
			new Array(3).fill(false),
		],
	});

	await coach.save();
	res.send("new Coach added");
});
module.exports = { seatRouter };
