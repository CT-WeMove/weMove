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
    
    def __init__(self, name=None):
        self.name = name

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.Unicode(255))
    location = db.Column(db.Unicode(255))
    width = db.Column(db.Integer)
    height = db.Column(db.Integer)
    picture = db.Column(db.Unicode(10000))


class Driver(BaseModel, db.Model):

    """Model for the driver table"""
    __tablename__ = 'drivers'

    def __init__(self, name=None, price_base=None, price_per_mile=None, tier=None):
        self.name = name
        self.price_base = price_base
        self.price_per_mile = price_per_mile
        self.tier = tier

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.Unicode(255))
    tier = db.Column(db.Unicode(255))
    location = db.Column(db.Unicode(255))
    price_base = db.Column(db.Integer)
    price_per_mile = db.Column(db.Integer)
    rating = db.Column(db.Integer)
    width = db.Column(db.Integer)
    height = db.Column(db.Integer)
    picture = db.Column(db.Unicode(10000))
    

class Request(BaseModel, db.Model):
    """Model for the requests table"""
    __tablename__ = 'requests'
    
    def __init__(self, userId=None, driverId=None, rating=None):
        self.userId = userId
        self.driverId = driverId
        self.rating = rating

    id = db.Column(db.Integer, primary_key = True)
    userId = db.Column(db.Unicode(255))
    driverId = db.Column(db.Unicode(255))
    rating = db.Column(db.Unicode(255))


