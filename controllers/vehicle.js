const csv = require('csv-parser');
const fs = require('fs');
const csvConverter = require('json-2-csv')
const carData = [];

loadData();

function getVehicle(vin){
	if(!vin){
		return ({
			'status' : 200,
			'msg' : 'List of vehicles',
			'data' : carData
		});
	} else {
		let vehicle = findVehicle(vin);
		if(vehicle){
			return ({
				'status' : 200,
				'msg' : 'Vehicle found',
				'data' : vehicle
			});
		} else {
			return ({
				'status' : 404,
				'msg' : `Vin number ${vin} not found`,
				'data' : {}
			});
		}
	}
}

function createVehicle(requestData){
	
	let undefinedValues = [];
	let make = requestData.make;
	let model = requestData.model;
	let year = requestData.year;
	let color = requestData.color;
	let vin = requestData.vin;

	if(make == undefined || make == '' || make == null){
		undefinedValues.push('make');
	}
	if(model == undefined || model == '' || model == null){
		undefinedValues.push('model');	
	}
	if(year == undefined || year == '' || year == null){
		undefinedValues.push('year');
	}
	if(color == undefined || color == '' || color == null){
		undefinedValues.push('color');
	}
	if(vin == undefined || vin == '' || vin == null){
		undefinedValues.push('vin');
	}

	if(undefinedValues.length != 0){
		return ({
			'status' : 400,
			'msg' : `Missing the following values for vehicle creation: ${undefinedValues}`
		});
	}

	if(findVehicle(vin)){
		return ({
			'status' : 409,
			'msg' : `Vin number ${vin} is registered to another car`,
			'data' : {}
		});
	}
	let newCar = {
		'make' : make,
		'model' : model,
		'year' : year,
		'color' : color,
		'vin' : vin
	}

	carData.push(newCar);
	jsonToCSV(carData).then((csv)=>{ saveData(csv) });

	return ({
		'status' : 201,
		'msg' : `Car ${vin} registered correctly`,
		'data' : newCar
	});

}

function updateVehicle(vin, requestData){
	let index = findVehicleIndex(vin);
	if(index){
		let updatedCar = carData[index];
		let make = requestData.make;
		let model = requestData.model;
		let year = requestData.year;
		let color = requestData.color;

		if(make && make != ""){
			updatedCar.make = make;
		}
		if(model && model != ""){
			updatedCar.model = model;	
		}
		if(year && year != ""){
			updatedCar.year = year;	
		}
		if(color && color != ""){
			updatedCar.color = color;	
		}

		carData[index] = updatedCar;
		jsonToCSV(carData).then((csv)=>{ saveData(csv) });

		return ({
			'status' : 201,
			'msg' : `Car ${vin} updated correctly`,
			'data' : updatedCar
		});

	} else {
		return ({
			'status' : 404,
			'msg' : `Vin number ${vin} not found`,
			'data' : {}
		});
	}
}

function deleteVehicle(vin){
	let index = findVehicleIndex(vin);
	if(index){
		carData.splice(index, 1);
		jsonToCSV(carData).then((csv)=>{ saveData(csv) });
		return ({
			'status' : 200,
			'msg' : `Removed ${vin} from registry`,
			'data' : {}
		});
	} else {
		return ({
			'status' : 404,
			'msg' : `Vin number ${vin} not found`,
			'data' : {}
		});
	}
}

function findVehicle(vin){
	for (var i = carData.length - 1; i >= 0; i--) {
		if(carData[i].vin == vin){
			return carData[i];
		}
	}
	return null;
}

function findVehicleIndex(vin){
	for (var i = carData.length - 1; i >= 0; i--) {
		if(carData[i].vin == vin){
			return i;
		}
	}
	return null;
}

function jsonToCSV(data){
	return new Promise((resolve, reject)=>{
		csvConverter.json2csv(data, (err, csv) => {
	  		if (err) {
	  			console.log(err);
	    		reject(err);
	  		}
			resolve(csv);
		})
	});
}

function saveData(CSVData){
	if(CSVData){
		fs.writeFile('vehicle_data.csv', CSVData, 'utf8', (err)=>{
			if (err) {
				console.log(err);
				return false;
			}
		});	
	} else {
		return false;
	}
}

function loadData(){
	fs.createReadStream('vehicle_data.csv')
		.pipe(csv())
		.on('data', (data) => carData.push(data))
		.on('end', () => {
		// console.log(carData);
	});
}

module.exports = {
	getVehicle,
	createVehicle,
	updateVehicle,
	deleteVehicle
}