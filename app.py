import logging
import os
from flask import Flask, request, jsonify
from flask_restful import reqparse, abort, Api, Resource
from models import db, Driver, User, Request
import secrets
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
import json

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = secrets.get_database_uri()
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
api = Api(app)

gmaps = secrets.get_gmaps()

db.init_app(app)

LOGGED_IN_USER = '1';

@app.route('/')
def hello():
	return 'WeMove Backend API!'

@app.route('/ping')
def ping():
    return jsonify({'code': 'success'})


# DriverInfo
# gets a specified driver's name, rating, and how long it will take for them to reach you
class DriverInfo(Resource):
    def get(self, driverId):
        loggedInUser = User.query.filter_by(id=LOGGED_IN_USER).first()
        driverRequest = Driver.query.filter_by(id=driverId).first()
        dist = gmaps.distance_matrix(loggedInUser.location, driverRequest.location, mode='driving')

        resp = {
            'time' : dist['rows'][0]['elements'][0]['duration']['text'],
            'driver' : {
                'name' : driverRequest.name,
                'rating' : driverRequest.rating
            }
        }

        return resp
        

# DriverList
# shows a list of all Drivers, and lets you POST to add new tasks
class DriverList (Resource):
    def get(self):
        drivers = Driver.query.all()
        loggedInUser = User.query.filter_by(id=LOGGED_IN_USER).first()
        currentLoc = gmaps.geocode(loggedInUser.location)
        
        pickupId = getNearestDriver(currentLoc, Driver.query.filter_by(tier='pickup').all())
        cargoId = getNearestDriver(currentLoc, Driver.query.filter_by(tier='cargo').all())
        boxId = getNearestDriver(currentLoc, Driver.query.filter_by(tier='box').all())
        movingId = getNearestDriver(currentLoc, Driver.query.filter_by(tier='moving').all())

        pickup = Driver.query.filter_by(id=pickupId).first()
        cargo = Driver.query.filter_by(id=cargoId).first()
        box = Driver.query.filter_by(id=boxId).first()
        moving = Driver.query.filter_by(id=movingId).first()
        
        resp = {
            str(pickupId): {
                "name": pickup.name,
                "location": pickup.location,
                "price_base": str(pickup.price_base),
                "price_per_mile": str(pickup.price_per_mile),
                "tier": pickup.tier,
                "rating": pickup.rating
            },
            str(cargoId): {
                "name": cargo.name,
                "location": cargo.location,
                "price_base": str(cargo.price_base),
                "price_per_mile": str(cargo.price_per_mile),
                "tier": cargo.tier,
                "rating": cargo.rating
            },
            str(boxId): {
                "name": box.name,
                "location": box.location,
                "price_base": str(box.price_base),
                "price_per_mile": str(box.price_per_mile),
                "tier": box.tier,
                "rating": box.rating
            },
            str(movingId): {
                "name": moving.name,
                "location": moving.location,
                "price_base": str(moving.price_base),
                "price_per_mile": str(moving.price_per_mile),
                "tier": moving.tier,
                "rating": moving.rating
            }
        }
        
        return resp

    def post(self):
        data = request.get_json()
#        print('in post')
#        if not data:
#            print('its none')
#        print(data)
#        print(data['current'])
        currentLoc = gmaps.reverse_geocode(data['current'])

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
        
# Requests
# Handles any processes related to a move request such as rating a driver
class RequestList(Resource):
    def post(self):
        data = request.get_json()
        loggedInUser = User.query.filter_by(id=LOGGED_IN_USER).first()
        req = Request('1', str(loggedInUser.id), str(data['driver']), str(data['rating']))
        db.session.add(req)
        db.session.commit()
        return
        
        
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
        first = False
    return driverId

api.add_resource(DriverList , '/api/drivers')
api.add_resource(DriverInfo, '/api/drivers/<driverId>')
api.add_resource(RequestList, '/api/requests')


if __name__ == '__main__':
    app.run(host='127.0.0.1',port=8080,debug=True)
    
