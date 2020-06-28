
from routes.routes import Routes
from routes.config import Config
from database.database import create_db
from flask import Flask

app = Flask(__name__)
Config(app)
Routes(app)
create_db(app)

app.debug=True
app.run(port=8080, threaded=True, host=('0.0.0.0'))