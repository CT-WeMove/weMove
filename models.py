from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_utils import ChoiceType

import datetime

db = SQLAlchemy()

class BaseModel(db.Model):
    """Base data model for all objects"""
    __abstract__ = True

    def __init__(self, *args):
        super().__init__(*args)

    def __repr__(self):
        """Define a base way to print models"""
        return '%s(%s)' % (self.__class__.__name__, {
            column: value
            for column, value in self._to_dict().items()
        })

    def json(self):
        """
                Define a base way to jsonify models, dealing with datetime objects
        """
        return {
            column: value if not isinstance(value, datetime.date) else value.strftime('%Y-%m-%d')
            for column, value in self._to_dict().items()
        }


class User(BaseModel, db.Model):
    """Model for the user table"""
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.Unicode(255))
    phoneNumber = db.Column(db.Integer)


class Driver(BaseModel, db.Model):
    TYPES = [
        (u'pickupTruck', u'Pickup'),
        (u'cargoVan', u'Cargo Van'),
        (u'boxTruck', u'Box Truck'),
        (u'movingTruck', u'Moving Truck')
    ]

    """Model for the driver table"""
    __tablename__ = 'drivers'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.Unicode(255))
    phoneNumber = db.Column(db.Integer)
    # vehicleType = db.Column(ChoiceType(TYPES))
    locationLat = db.Column(db.Float)
    locationLng = db.Column(db.Float)



class Request(BaseModel, db.Model):
    """Model for the requests table"""
    __tablename__ = 'requests'

    id = db.Column(db.Integer, primary_key = True)
    userId = db.Column(db.Unicode(255))
    driverId = db.Column(db.Unicode(255))
    price = db.Column(db.Integer)
    sourceLat = db.Column(db.Float)
    sourceLng = db.Column(db.Float)    
    destinationLat = db.Column(db.Float)
    destinationLng = db.Column(db.Float)


