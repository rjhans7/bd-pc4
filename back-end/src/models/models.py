from database.database import db

"""
Database: Imagen Model
"""
class Imagen(db.Model):
    # Atributes
    id = db.Column(db.Integer, primary_key = True)
    path = db.Column(db.String(200), unique = True, nullable = False)
    filename = db.Column(db.String(120), unique = True, nullable = False)

    def __repr__(self):
        return '<Imagen %r' % self.path
    
    # Constructor
    def serialize(self):
        return {"id": self.id, "path": self.path, "filename": self.filename}