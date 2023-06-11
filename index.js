const express = require("express");
const { connection } = require("./Config/db");
require("dotenv").config();
const cors = require("cors");
const rowRoute = require("./Routes/rowRoute");
const { seatRouter } = require("./Routes/newCoahRoute");

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: "*",
	})
);

app.get("/", (req, res) => {
	res.send("Homepage");
});

app.use("/rows", rowRoute);

app.use("/coach", seatRouter);

app.listen(process.env.PORT, async () => {
	try {
		await connection;
		console.log("Connected to DB");
	} catch (error) {
		console.log(error);
	}
	console.log(`Server is running at port ${process.env.PORT}`);
});

