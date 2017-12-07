# project/test_basic.py
import unittest
import tempfile
import sys
import app
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
from models import db
from app import getNearestDriver
import testing.postgresql
from sqlalchemy import create_engine
import psycopg2

# Mock database
# Lanuch new PostgreSQL server
with testing.postgresql.Postgresql() as postgresql:
    engine = create_engine(postgresql.url())


def handler(postgresql):
    conn = psycopg2.connect(**postgresql.dsn())
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE wemoveUser(id int,  name varchar(255), location varchar(255))")

    # cursor.execute("CREATE TABLE user(id int, name varchar(255), location varchar(255))")
    cursor.execute("INSERT INTO wemoveUser values(1, 'Luke','60654'), (2, 'Marco','10044'),(3, 'Emily','10432')")
    cursor.execute("SELECT * FROM wemoveUser;")
    for user in cursor:
        print (user)
    cursor.close()
    conn.commit()
    conn.close()

# Use `handler()` on initialize database
Postgresql = testing.postgresql.PostgresqlFactory(cache_initialized_db=True,
                                                      on_initialized=handler)

class TestMethods(unittest.TestCase):

    def setUp(self):
        self.db_fd, app.app.config['DATABASE'] = tempfile.mkstemp()
        self.postgresql = testing.postgresql.Postgresql()
        app.app.testing = True
        self.app = app.app.test_client()

    
    def test_upper(self):
        self.assertEqual('foo'.upper(), 'FOO')

    def test_isupper(self):
        self.assertTrue('FOO'.isupper())
        self.assertFalse('Foo'.isupper())

    def test_split(self):
        s = 'hello world'
        self.assertEqual(s.split(), ['hello', 'world'])
        with self.assertRaises(TypeError):
            s.split(2)

    def test_ping_success(self):
        resp = self.app.get('/ping')
        self.assertEqual(resp.status_code, 200)

    def test_ping_success2(self):
        resp = self.app.get('/')
        self.assertEqual(resp.status_code, 200)

    def test_ping_failure(self):
        resp = self.app.get('/doesNotExist')
        self.assertEqual(resp.status_code, 404)

    def test_ping_failure2(self):
        resp = self.app.get('/drivers/api/12/NY')
        self.assertEqual(resp.status_code, 404)

    def tearDown(self):
        self.postgresql.stop()
        
    # def test_get(self):
    #     resp = self.app.get('/api/drivers')
    #     assert b"name" in resp.data
    #     assert b"location" in resp.data
    #     assert b"price_base" in resp.data
    #     assert b"price_per_mile" in resp.data
    #     assert b"rating" in resp.data
    #     assert b"tier" in resp.data

    # def test_make_request(self):
    #     resp = self.app.get('/api/drivers/1')
    #     assert b"time" in resp.data
    #     assert b"driver" in resp.data

    # def test_post(self):
    #    #req = dict(current=dict(latitude=40.755111, longitude=-73.955452), destination='Brooklyn')
    #    req = {
    #        "current": {
    #            "latitude": 40.755111,
    #            "longitude": -73.955452
    #        },
    #        "destination": "Brooklyn"
    #    }
    #    resp = self.app.post('/api/drivers', data=json.dumps(req), follow_redirects=True)
    #    print(resp)

if __name__ == '__main__':
    unittest.main()