from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from models import db

app = Flask(__name__)
api = Api(app)




# Drivers = {
#     'driver1': {'name': 'emily', 'distance':'10miles', 'price(permile)': '$5'},
#     'driver2': {'name': 'marco', 'distance':'7miles', 'price(permile)': '$10'},
#     'driver3': {'name': 'luke', 'distance': '5miles', 'price(permile)': '$15'},
# }

def abort_if_driver_doesnt_exist(driverId):
    if driverId not in Drivers:
        abort(404, message="Driver {} doesn't exist".format(driverId))

parser = reqparse.RequestParser()
parser.add_argument('task')


# Todo
# shows a single todo item and lets you delete a todo item
class Driver(Resource):
    def get(self, driverId):
        abort_if_driver_doesnt_exist(driverId)
        return Drivers[driverId]

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
        args = parser.parse_args()
        driverId = int(max(Drivers.keys()).lstrip('todo')) + 1
        driverId = 'todo%i' % driverId
        Drivers[driverId] = {'task': args['task']}
        return Drivers[driverId], 201

##
## Actually setup the Api resource routing here
##
api.add_resource(DriverList , '/drivers')
api.add_resource(Driver, '/drivers/<driverId>')




if __name__ == '__main__':
    app.run(debug=True)