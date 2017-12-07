# project/test_basic.py
 
 
import os
import unittest
import tempfile
import json
import sys
sys.path.insert(0, '/home/la393/weMove')
sys.path.append('../app')

class TestStringMethods(unittest.TestCase):

    def setUp(self):
        self.db_fd, app.app.config['DATABASE'] = tempfile.mkstemp()
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
        # check that s.split fails when the separator is not a string
        with self.assertRaises(TypeError):
            s.split(2)
     
    def test_get(self):
        resp = self.app.get('/api/drivers')
        assert b"name" in resp.data
        assert b"location" in resp.data
        assert b"price_base" in resp.data
        assert b"price_per_mile" in resp.data
        assert b"rating" in resp.data
        assert b"tier" in resp.data

    def test_make_request(self):
        resp = self.app.get('/api/drivers/1')
        assert b"time" in resp.data
        assert b"driver" in resp.data

#    def test_post(self):
#        #req = dict(current=dict(latitude=40.755111, longitude=-73.955452), destination='Brooklyn')
#        req = {
#            "current": {
#                "latitude": 40.755111,
#                "longitude": -73.955452
#            },
#            "destination": "Brooklyn"
#        }
#        resp = self.app.post('/api/drivers', data=json.dumps(req), follow_redirects=True)
#        print(resp)

if __name__ == '__main__':
    unittest.main()