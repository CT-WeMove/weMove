from flask import Flask, request
from flask_restful import reqparse, abort, Api, Resource
from models import db
import googlemaps
from datetime import datetime

app = Flask(__name__)
api = Api(app)

gmaps = googlemaps.Client(key='AIzaSyB4JZwzRc8afKdBYCywiqWbGqj_CP3mntc')

POSTGRES = {
    'user': 'postgres',
    'pw': 'WeMove',
    'db': 'wemove_primary',
    'host': 'localhost',
    'port': '5432',
}

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:\
%(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES


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

def abort_if_driver_doesnt_exist(driverId):
    if driverId not in Drivers:
        abort(404, message="Driver {} doesn't exist".format(driverId))

parser = reqparse.RequestParser()
parser.add_argument('task')


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
        dist = gmaps.distance_matrix(data['current'], data['destination'], mode='driving')
        dist_in_miles = dist['rows'][0]['elements'][0]['distance']['value'] * 0.000621371

        pickupId = '1'
        cargoId = '2'
        boxId = '3'
        movingId = '4'

        pickup = Drivers[pickupId]
        cargo = Drivers[cargoId]
        box = Drivers[boxId]
        moving = Drivers[movingId]

        resp = {
            'Pickup Truck':
                {
                    'id': int(pickupId),
                    'total': str(format(float(pickup['price_base'])+dist_in_miles*float(pickup['price_per_mile']), '.2f')),
                    'base': str(format(float(pickup['price_base']), '.0f')),
                    'per_mile': str(format(float(pickup['price_per_mile']), '.0f'))
                }
            ,
            'Cargo Van':
                {
                    'id': int(cargoId),
                    'total': str(format(float(cargo['price_base'])+dist_in_miles*float(cargo['price_per_mile']), '.2f')),
                    'base': str(format(float(cargo['price_base']), '.0f')),
                    'per_mile': str(format(float(cargo['price_per_mile']), '.0f'))
                }
            ,
            'Box Truck':
                {
                    'id': int(boxId),
                    'total': str(format(float(box['price_base'])+dist_in_miles*float(box['price_per_mile']), '.2f')),
                    'base': str(format(float(box['price_base']), '.0f')),
                    'per_mile': str(format(float(box['price_per_mile']), '.0f'))
                }
            ,
            'Moving Truck':
                {
                    'id': int(movingId),
                    'total': str(format(float(moving['price_base'])+dist_in_miles*float(moving['price_per_mile']), '.2f')),
                    'base': str(format(float(moving['price_base']), '.0f')),
                    'per_mile': str(format(float(moving['price_per_mile']), '.0f'))
                }
            ,
        }

        return resp

#    def post(self):
#        args = parser.parse_args()
#        driverId = int(max(Drivers.keys()).lstrip('todo')) + 1
#        driverId = 'todo%i' % driverId
#        Drivers[driverId] = {'task': args['task']}
#        return Drivers[driverId], 201

##
## Actually setup the Api resource routing here
##
api.add_resource(DriverList , '/drivers')
api.add_resource(Driver, '/drivers/<driverId>')




if __name__ == '__main__':
    app.run(debug=True)
