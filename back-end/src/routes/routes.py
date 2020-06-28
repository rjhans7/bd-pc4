import os
import json
from flask import send_file, Response, flash, request, redirect, url_for, send_from_directory, jsonify
from werkzeug.utils import secure_filename
from models.models import Imagen
from database.database import db

def Routes (app):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'gif'}

    def allowed_file(filename):
        return '.' in filename and \
            filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
    
    @app.route('/', methods = ['GET'])
    def home ():
        return "Hello world!"
    
    @app.route('/upload', methods=['GET'])
    def upload_view():
        return '''
        <!doctype html>
        <title>Upload new File</title>
        <h1>Upload new File</h1>
        <form method=post enctype=multipart/form-data>
        <input type=file name=file>
        <input type=submit value=Upload>
        </form>
        '''

    @app.route('/upload', methods=['POST'])
    def to_upload():
        if 'file' not in request.files:
            flash('No file part')
        file = request.files['file']
        if file.filename == '':
            flash('No selected file')
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            path = '/uploads/' + filename
            existing_file_path = Imagen.query.filter(Imagen.path == path).first()
            if existing_file_path:
                return Response(json.dumps({'message': 'File already uploaded'}), status = 404, mimetype = 'application/json')            
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            file_path = url_for('uploaded_file', filename=filename)
            new_img = Imagen(path = file_path, filename = filename)
            db.session.add(new_img)
            db.session.commit()
            return Response(json.dumps({'path': file_path, 'filename': filename, 'id': new_img.id}), status = 200, mimetype = 'application/json')

    @app.route('/uploads/<filename>', methods = ['GET'])
    def uploaded_file(filename):
        return send_from_directory(
            app.config['UPLOAD_FOLDER'],filename)
    
    @app.route('/uploads', methods = ['GET'])
    def get_all_uploaded_files():
        return jsonify({'images': list(map(lambda img: img.serialize(), Imagen.query.all()))})
    
    
    
