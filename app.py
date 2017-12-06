import logging
import os
from flask import Flask, request
from flask_restful import reqparse, abort, Api, Resource
from models import db, Driver, User, Request
import secrets
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = secrets.get_database_uri()
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

api = Api(app)

gmaps = secrets.get_gmaps();

db.init_app(app)

Drivers = {
    '1': {'name': 'emily', 'location':'9911 Oak Street, New York, NY', 'price_base': '10', 'price_per_mile': '5', 'tier': 'pickup', 'rating': '5'},
    '2': {'name': 'marco', 'location':'8756 Trout Road, New York, NY', 'price_base': '10', 'price_per_mile': '10', 'tier': 'cargo', 'rating': '4'},
    '3': {'name': 'luke', 'location': '8198 Canal Ave, New York, NY', 'price_base': '10', 'price_per_mile': '15', 'tier':'box', 'rating': '4'},
    '4': {'name': 'david', 'location':'232 Princess Drive, New York, NY', 'price_base': '10', 'price_per_mile': '25', 'tier':'moving', 'rating': '3'},
    '5': {'name': 'steve', 'location':'43 Meadowbrook Ave, New York, NY', 'price_base': '10', 'price_per_mile': '20', 'tier': 'moving', 'rating': '5'},
    '6': {'name': 'bob', 'location': '8 Jones Ave, New York, NY', 'price_base': '10', 'price_per_mile': '5', 'tier': 'pickup', 'rating': '5'},
    '7': {'name': 'doug', 'location':'659 North Glenlake Ave, New York, NY', 'price_base': '10', 'price_per_mile': '5', 'tier': 'pickup', 'rating': '4'},
    '8': {'name': 'mary', 'location':'7010 Canal Drive, New York, NY', 'price_base': '10', 'price_per_mile': '10', 'tier': 'cargo', 'rating': '5'},
    '9': {'name': 'jane', 'location': '91 Hilltop Ave, New York, NY', 'price_base': '10', 'price_per_mile': '12', 'tier':'box', 'rating': '3'},
}

Users = {
    '1': {'name': 'tom', 'location':'11 East Loop Road, New York, NY'},
    '2': {'name': 'nicole', 'location':'14 W. Clinton Street, New York, NY'},
}

LOGGED_IN_USER = '1';

@app.route('/')
def hello():
	return 'WeMove Backend API!'


# Todo
# shows a single todo item and lets you delete a todo item
class DriverInfo(Resource):
    def get(self, driverId):
        dist = gmaps.distance_matrix(Users[LOGGED_IN_USER]['location'], Drivers[driverId]['location'], mode='driving')

        resp = {
            'time' : dist['rows'][0]['elements'][0]['duration']['text'],
            'driver' : {
                'name' : Drivers[driverId]['name'],
                'rating' : Drivers[driverId]['rating']
            }
        }

        return resp


# DriverList
# shows a list of all Drivers, and lets you POST to add new tasks
class DriverList (Resource):
    def get(self):
        return Drivers

    def post(self):
        data = request.get_json()
        currentLoc = gmaps.reverse_geocode(data['current'])

        #Users[LOGGED_IN_USER]['location'] = currentLoc[0]['formatted_address']
        loggedInUser = User.query.filter_by(id=LOGGED_IN_USER).update(dict(location=currentLoc[0]['formatted_address']))
        db.session.commit()

        dist = gmaps.distance_matrix(currentLoc[0]['formatted_address'], data['destination'], mode='driving')
        dist_in_miles = dist['rows'][0]['elements'][0]['distance']['value'] * 0.000621371

        pickupId = getNearestDriver(currentLoc, Driver.query.filter_by(tier='pickup').all())
        cargoId = getNearestDriver(currentLoc, Driver.query.filter_by(tier='cargo').all())
        boxId = getNearestDriver(currentLoc, Driver.query.filter_by(tier='box').all())
        movingId = getNearestDriver(currentLoc, Driver.query.filter_by(tier='moving').all())

        pickup = Driver.query.filter_by(id=pickupId).first()
        cargo = Driver.query.filter_by(id=cargoId).first()
        box = Driver.query.filter_by(id=boxId).first()
        moving = Driver.query.filter_by(id=movingId).first()

        resp = {
            'mileage' : format(float(dist_in_miles), '.1f'),
            'vehicles' : {
                'Pickup Truck':
                    {
                        'id': pickup.id,
                        'total': format(float(pickup.price_base)+dist_in_miles*float(pickup.price_per_mile), '.2f'),
                        'base': format(float(pickup.price_base), '.0f'),
                        'per_mile': format(float(pickup.price_per_mile), '.0f')
                    }
                ,
                'Cargo Van':
                    {
                        'id': cargo.id,
                        'total': format(float(cargo.price_base)+dist_in_miles*float(cargo.price_per_mile), '.2f'),
                        'base': format(float(cargo.price_base), '.0f'),
                        'per_mile': format(float(cargo.price_per_mile), '.0f')
                    }
                ,
                'Box Truck':
                    {
                        'id': box.id,
                        'total': format(float(box.price_base)+dist_in_miles*float(box.price_per_mile), '.2f'),
                        'base': format(float(box.price_base), '.0f'),
                        'per_mile': format(float(box.price_per_mile), '.0f')
                    }
                ,
                'Moving Truck':
                    {
                        'id': moving.id,
                        'total': format(float(moving.price_base)+dist_in_miles*float(moving.price_per_mile), '.2f'),
                        'base': format(float(moving.price_base), '.0f'),
                        'per_mile': format(float(moving.price_per_mile), '.0f')
                    }
            }
        }

        return resp
        
def getNearestDriver(loc, drivers):
    first = True
    for driver in drivers:
        if (first):
            minDist = gmaps.distance_matrix(loc[0]['formatted_address'], driver.location, mode='driving')['rows'][0]['elements'][0]['distance']['value']
            driverId = driver.id
        else:
            newDist = gmaps.distance_matrix(loc[0]['formatted_address'], driver.location, mode='driving')['rows'][0]['elements'][0]['distance']['value']
            if (newDist < minDist):
                minDist = newDist
                driverId = driver.id
    return driverId
        
api.add_resource(DriverList , '/api/drivers')
api.add_resource(DriverInfo, '/api/drivers/<driverId>')


if __name__ == '__main__':
    app.run(host='127.0.0.1',port=8080,debug=True)
    
