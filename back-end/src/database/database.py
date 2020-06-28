import os
from flask_sqlalchemy import SQLAlchemy

"""
Creation of the SQLAlchemy database
"""
db = SQLAlchemy()

def create_db(app):
    # Get the current path
    project_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Create and init the database in the current path
    database_file = "sqlite:///{}".format(os.path.join(project_dir,"data.db"))
    app.config["SQLALCHEMY_DATABASE_URI"] = database_file
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)
    with app.app_context():
        db.create_all()
