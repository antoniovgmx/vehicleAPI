const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const bodyParser = require('body-parser');
const vc = require('../controllers/vehicle');
const router = express.Router();
const jsonParser = bodyParser.json();

// GET /
router.get('/:vin?', (req,res)=>{
	let result = vc.getVehicle(req.params.vin);
	return res.json(result);
});

// POST 
router.post('/create/', jsonParser, (req,res)=>{

	let result = vc.createVehicle(req.body);
	return res.json(result);


});

// PUT
router.put('/:vin', jsonParser, (req,res)=>{

	let result = vc.updateVehicle(req.params.vin, req.body);
	return res.json(result);

	// let make = req.body.make;
	// let model = req.body.model;
	// let year = req.body.year;
	// let color = req.body.color;
	// let vin = req.body.vin;

	// if(make == undefined || make == '' || make == null){
	// 	undefinedValues.push('make');
	// }
	// if(model == undefined || model == '' || model == null){
	// 	undefinedValues.push('model');	
	// }
	// if(year == undefined || year == '' || year == null){
	// 	undefinedValues.push('year');
	// }
	// if(color == undefined || color == '' || color == null){
	// 	undefinedValues.push('color');
	// }
	// if(vin == undefined || vin == '' || vin == null){
	// 	undefinedValues.push('vin');
	// }

	// if(undefinedValues.length != 0){
	// 	return res.json({
	// 		'status' : 400,
	// 		'msg' : `Missing the following values for vehicle updating: ${undefinedValues}`
	// 	});
	// }
});

// DELETE
router.delete('/:vin', (req,res)=>{

	let result = vc.deleteVehicle(req.params.vin);
	return res.json(result);
	
});

module.exports = router;