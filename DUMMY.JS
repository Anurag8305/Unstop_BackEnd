let seats = [
	[true, false, false, false, false, false, false],
	[false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false],
	[false, false, false],
];

// Function to check if seats are available together
const checkSeatsAvailability = (seats, numSeats) => {
	for (let i = 0; i < seats.length; i++) {
		let consecutiveSeats = 0;
		for (let j = 0; j < seats[i].length; j++) {
			if (seats[i][j] === false) {
				consecutiveSeats++;
				if (consecutiveSeats === numSeats) {
					// bookSeats(seats,i,j-numSeats+1,5)
					return [i, j - numSeats + 1];
				}
			} else {
				consecutiveSeats = 0;
			}
		}
	}
	return null;
};
// Function to book seats
const bookSeats = (seats, row, startSeatIndex, numSeats) => {
	for (let i = startSeatIndex; i < startSeatIndex + numSeats; i++) {
		seats[row][i] = true;
	}
	console.log(seats);
};

// Function to find and book available seats
const findAndBookSeats = (seats, numSeats) => {
	const availableSeats = checkSeatsAvailability(seats, numSeats);
	if (availableSeats) {
		const [row, startSeatIndex] = availableSeats;
		bookSeats(seats, row, startSeatIndex, numSeats);
		console.log(
			`Seats booked successfully from Row ${row + 1}, Seat ${
				startSeatIndex + 1
			} to Seat ${startSeatIndex + numSeats}`
		);
	} else {
		 console.log("No seats available");
	}
};
findAndBookSeats(seats, 90);
