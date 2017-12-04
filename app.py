import logging
import os
from flask import Flask, request
from flask_restful import reqparse, abort, Api, Resource
#from models import db
import secrets
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['SQLALCHEMY_DATABASE_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


api = Api(app)

gmaps = secrets.get_gmaps();

Drivers = {
    '1': {'name': 'emily', 'location':'9911 Oak Street, New York, NY', 'price_base': '10', 'price_per_mile': '5', 'tier': 'pickup'},
    '2': {'name': 'marco', 'location':'8756 Trout Road, New York, NY', 'price_base': '10', 'price_per_mile': '10', 'tier': 'cargo'},
    '3': {'name': 'luke', 'location': '8198 Canal Ave, New York, NY', 'price_base': '10', 'price_per_mile': '15', 'tier':'box'},
    '4': {'name': 'david', 'location':'232 Princess Drive, New York, NY', 'price_base': '10', 'price_per_mile': '25', 'tier':'moving'},
    '5': {'name': 'steve', 'location':'43 Meadowbrook Ave, New York, NY', 'price_base': '10', 'price_per_mile': '20', 'tier': 'moving'},
    '6': {'name': 'bob', 'location': '8 Jones Ave, New York, NY', 'price_base': '10', 'price_per_mile': '5', 'tier': 'pickup'},
    '7': {'name': 'doug', 'location':'659 North Glenlake Ave, New York, NY', 'price_base': '10', 'price_per_mile': '5', 'tier': 'pickup'},
    '8': {'name': 'mary', 'location':'7010 Canal Drive, New York, NY', 'price_base': '10', 'price_per_mile': '10', 'tier': 'cargo'},
    '9': {'name': 'jane', 'location': '91 Hilltop Ave, New York, NY', 'price_base': '10', 'price_per_mile': '12', 'tier':'box'},
}

Users = {
    'user1': {'name': 'tom', 'location':'11 East Loop Road, New York, NY'},
    'user2': {'name': 'nicole', 'location':'14 W. Clinton Street, New York, NY'},
}

LOGGED_IN_USER = 'user1';

@app.route('/')
def hello():
	return 'Hello Youtube'


# Todo
# shows a single todo item and lets you delete a todo item
class Driver(Resource):
    def get(self, driverId):
        dist = gmaps.distance_matrix(Users[LOGGED_IN_USER]['location'], Drivers[driverId]['location'], mode='driving')
        return dist
#        return dist['rows'][0]['elements'][0]['duration']['text']
#    def get(self, driverId):
#        abort_if_driver_doesnt_exist(driverId)
#        return Drivers[driverId]

    def delete(self, driverId):
        abort_if_driver_doesnt_exist(driverId)
        del Drivers[driverId]
        return '', 204

    def put(self, driverId):
        args = parser.parse_args()
        task = {'task': args['task']}
        Drivers[driverId] = task
        return task, 201


# DriverList
# shows a list of all Drivers, and lets you POST to add new tasks
class DriverList (Resource):
    def get(self):
        return Drivers

    def post(self):
        data = request.get_json()
        currentLoc = gmaps.reverse_geocode(data['current'])

        # Todo: write current location to users table
        Users[LOGGED_IN_USER]['location'] = currentLoc[0]['formatted_address']

        dist = gmaps.distance_matrix(currentLoc[0]['formatted_address'], data['destination'], mode='driving')
        dist_in_miles = dist['rows'][0]['elements'][0]['distance']['value'] * 0.000621371

        # Todo: need to query drivers table and get the nearest driver based on location
        pickupId = '1'
        cargoId = '2'
        boxId = '3'
        movingId = '4'

        pickup = Drivers[pickupId]
        cargo = Drivers[cargoId]
        box = Drivers[boxId]
        moving = Drivers[movingId]

        resp = {
            'mileage' : format(float(dist_in_miles), '.1f'),
            'vehicles' : {
                'Pickup Truck':
                    {
                        'id': int(pickupId),
                        'total': format(float(pickup['price_base'])+dist_in_miles*float(pickup['price_per_mile']), '.2f'),
                        'base': format(float(pickup['price_base']), '.0f'),
                        'per_mile': format(float(pickup['price_per_mile']), '.0f')
                    }
                ,
                'Cargo Van':
                    {
                        'id': int(cargoId),
                        'total': format(float(cargo['price_base'])+dist_in_miles*float(cargo['price_per_mile']), '.2f'),
                        'base': format(float(cargo['price_base']), '.0f'),
                        'per_mile': format(float(cargo['price_per_mile']), '.0f')
                    }
                ,
                'Box Truck':
                    {
                        'id': int(boxId),
                        'total': format(float(box['price_base'])+dist_in_miles*float(box['price_per_mile']), '.2f'),
                        'base': format(float(box['price_base']), '.0f'),
                        'per_mile': format(float(box['price_per_mile']), '.0f')
                    }
                ,
                'Moving Truck':
                    {
                        'id': int(movingId),
                        'total': format(float(moving['price_base'])+dist_in_miles*float(moving['price_per_mile']), '.2f'),
                        'base': format(float(moving['price_base']), '.0f'),
                        'per_mile': format(float(moving['price_per_mile']), '.0f')
                    }
            }
        }

        return resp
        
        
api.add_resource(DriverList , '/api/drivers')
api.add_resource(Driver, '/api/drivers/<driverId>')

if __name__ == '__main__':
    app.run(host='127.0.0.1',port=8080,debug=True)
