import googlemaps

def get_gmaps():
    return googlemaps.Client(key='AIzaSyB4JZwzRc8afKdBYCywiqWbGqj_CP3mntc')

def get_postgres():
    POSTGRES = {
        'user': 'postgres',
        'pw': 'WeMove',
        'db': 'wemove_primary',
        'host': 'localhost',
        'port': '5432',
    }
    return POSTGRES
    
