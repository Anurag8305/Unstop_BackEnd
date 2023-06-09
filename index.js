const express = require("express");
const { connection } = require("./Config/db");
require("dotenv").config();
const cors=require("cors");
const seatRoute = require("./Routes/seatRoute");

const app = express();
app.use(express.json());
app.use(cors({
	origin:"*"
}));

app.get("/", (req, res) => {
	res.send("Homepage");
});


app.use("/seats",seatRoute)
app.listen(process.env.PORT, async () => {
	try {
		await connection;
		console.log("Connected to DB");
	} catch (error) {
		console.log(error);
	}
	console.log(`Server is running at port ${process.env.PORT}`);
});





// const express = require('express');
// const mongoose = require('mongoose');
// const cors=require("cors");
// const app = express();
// app.use(express.json());
// app.use(cors({
// 	 	origin:"*"
// 	 }));

// // Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/train_seats_app', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(error => console.error('Failed to connect to MongoDB:', error));

// // Define the seat schema
// const seatSchema = new mongoose.Schema({
//   status: { type: Boolean, default: false },
//   seatNo: { type: String, required: true },
// });

// // Define the coach schema with the array of array of seat objects
// const coachSchema = new mongoose.Schema({
//   seats: [[seatSchema]],
// });

// // Define the Coach model
// const Coach = mongoose.model('Coach', coachSchema);

// // API endpoint to fetch all coaches and their seats
// app.get('/api/coaches', async (req, res) => {
//   try {
//     const coaches = await Coach.find();
//     res.json(coaches);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // API endpoint to reserve seats
// app.post('/api/bookings', async (req, res) => {
//   try {
//     const { numSeats } = req.body;

//     // Get the coach with available seats
//     const coach = await Coach.findOne({ 'seats.status': false });

//     if (!coach) {
//       return res.status(404).json({ message: 'No available seats' });
//     }

//     // Find the nearest available seats
//     const { rowIndex, seatIndex } = findNearestAvailableSeats(coach.seats, numSeats);

//     if (rowIndex === -1 || seatIndex === -1) {
//       return res.status(400).json({ message: 'Not enough adjacent seats available' });
//     }

//     // Book the seats
//     for (let i = 0; i < numSeats; i++) {
//       coach.seats[rowIndex][seatIndex + i].status = true;
//     }

//     await coach.save();

//     res.json({ message: 'Seats booked successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Helper function to find the nearest available seats
// const findNearestAvailableSeats = (seats, numSeats) => {
//   for (let rowIndex = 0; rowIndex < seats.length; rowIndex++) {
//     const row = seats[rowIndex];

//     for (let seatIndex = 0; seatIndex <= row.length - numSeats; seatIndex++) {
//       let isAvailable = true;

//       for (let i = 0; i < numSeats; i++) {
//         if (row[seatIndex + i].status) {
//           isAvailable = false;
//           break;
//         }
//       }

//       if (isAvailable) {
//         return { rowIndex, seatIndex };
//       }
//     }
//   }

//   return { rowIndex: -1, seatIndex: -1 };
// };

// // Start the server
// const port = 5000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
