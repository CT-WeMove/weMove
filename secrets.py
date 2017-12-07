import googlemaps

def get_gmaps():
    return googlemaps.Client(key='AIzaSyB4JZwzRc8afKdBYCywiqWbGqj_CP3mntc')

def get_database_uri():
    return 'postgresql+psycopg2://postgres:WeMove@35.185.57.159:5432/wemove_primary'