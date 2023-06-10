const express = require("express");
const rowModel = require("../Model/row.Model");
const rowRoute = express.Router();

//get all the seats in the train
rowRoute.get("/", async (req, res) => {
	try {
		const rows = await rowModel.find();
		res.status(200).send(rows);
	} catch (error) {
		res.status(500).send({ success: false, message: "Something Went Wrong" });
	}
});

//create new row
rowRoute.post("/addrow", async (req, res) => {
	try {
		const row = await rowModel.create(req.body);
		res
			.status(200)
			.send({ success: true, message: "Seat Added Successfully", row });
	} catch (error) {
		res.status(500).send({ success: false, message: "Something Went Wrong" });
	}
});
module.exports = rowRoute;
