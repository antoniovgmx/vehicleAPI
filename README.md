# Vehicle API
Code challenge vehicle API (KSquare Group)

## Use

The Vehicle API uses a csv file included in the repository named vehicle_data.csv that gets updated as operations are performed through the API, supported opperations are as follows:
- Get all vehicles
- Get a specific vehicle by vin
- Add vehicle
- Edit vehicle
- Delete vehicle

## Get All Vehicles

Method: GET  
Resource: /api/  
Params: No URI or Body Params

## Get Vehicle By VIN

Method: GET  
Resource: /api/{VIN}  
Params:  
- VIN(URI, mandatory): Vehicle Identification Number

## Add vehicle to registry

Method: POST  
Resource: /api/create/  
Params:  
- VIN (body, mandatory): Vehicle Identification Number
- Make (body, mandatory): Make of the vehicle
- Model (body, mandatory): Model of the vehicle
- Year (body, mandatory): Manufacturing year of the vehicle
- Color (body, mandatory): Color of the vehicle

## Update a vehicle in the registry

Method: PUT  
Resource: /api/{VIN}  
Params:
- VIN (URI, mandatory): Vehicle Identification Number for the vehicle to be updated
- Make (body, optional): Make of the vehicle
- Model (body, optional): Model of the vehicle
- Year (body, optional): Manufacturing year of the vehicle
- Color (body, optional): Color of the vehicle

## Delete a vehicle from the registry

Method: DELETE  
Resource: /api/{VIN}  
Params:
- VIN (URI, mandatory): Vehicle Identification Number for the vehicle to be deleted
