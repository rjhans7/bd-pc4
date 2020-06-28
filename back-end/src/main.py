
from routes.routes import Routes
from routes.config import Config
from database.database import create_db
from flask import Flask

"""
Flask server creation and initialization using the config functions
"""
app = Flask(__name__)
Config(app)         # Config
Routes(app)         # APIS
create_db(app)      # DB

app.debug=True
app.run(port=8080, threaded=True, host=('0.0.0.0'))