from flask_cors import CORS
def Config (app):
    app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
    app.config['UPLOAD_FOLDER'] = "images"
    app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024
    cors = CORS(app, resources={r"/*": {"origins": "*"}})
