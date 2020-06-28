import os
import json
from flask import send_file, Response, flash, request, redirect, url_for, send_from_directory, jsonify
from werkzeug.utils import secure_filename
from models.models import Imagen
from database.database import db
from knn import *

# Allowed upload file extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'gif'}

"""
Implementation of the server apis
"""
def Routes (app):

    """
    Check if the file has an allowed file extension
    """
    def allowed_file(filename):
        return '.' in filename and \
            filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
    
    """
    Main Route
    """
    @app.route('/', methods = ['GET'])
    def home ():
        return "Hello world!"
    
    """
    API: get the upload-form to upload a file in the server side
    """
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
    """
    API: upload a file
    """
    @app.route('/upload', methods=['POST'])
    def to_upload():

        if 'file' not in request.files:
            flash('No file part')
        file = request.files['file']
        
        if file.filename == '':
            flash('No selected file')
        
        #If the file exist and has an allowed extension
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)       #Check if the file has a secure filename
            path = '/images/' + filename

            # Check if the file is already uploaded
            existing_file_path = Imagen.query.filter(Imagen.path == path).first()
            if existing_file_path:
                return Response(json.dumps({'message': 'File already uploaded'}), status = 404, mimetype = 'application/json')            

            # If not already upload, save the file in the server    
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            
            # Save the filename and path in a database
            file_path = url_for('uploaded_file', filename=filename)
            new_img = Imagen(path = file_path, filename = filename)
            db.session.add(new_img)
            db.session.commit()
            
            #Return the path and status of the uploaded file
            return Response(json.dumps({'path': file_path, 'filename': filename, 'id': new_img.id}), status = 200, mimetype = 'application/json')

    """
    API: Get a uploaded file by filename from the directory
    """
    @app.route('/uploads/<filename>', methods = ['GET'])
    def uploaded_file(filename):
        return send_from_directory(
            app.config['UPLOAD_FOLDER'],filename)

    """
    API: Get a stored file by filename from the directory
    """
    @app.route('/storage/<folder>/<filename>', methods = ['GET'])
    def stored_file(folder, filename):
        return send_from_directory(
            app.config['STORAGE_FOLDER'] + '/' + folder, filename)
    
    """
    API: Get all the uploaded files
    """
    @app.route('/uploads', methods = ['GET'])
    def get_all_uploaded_files():
        return jsonify({'images': list(map(lambda img: img.serialize(), Imagen.query.all()))})

    """
    API: KNN Secuential
    """
    @app.route('/secuential', methods=['POST'])
    def KNN_Secuential():

        if 'file' not in request.files:
            flash('No file part')
        file = request.files['file']
        
        if 'k' not in request.form.keys():
            flash('Pending arguments')
        k = int(request.form['k'])

        if 'function' not in request.form.keys():
            flash('Pending arguments')
        distance_function = int(request.form['function'])

        if file.filename == '':
            flash('No selected file')
        
        #If the file exist and has an allowed extension
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)       #Check if the file has a secure filename
            path = '/images/' + filename

            # Check if the file is already uploaded
            existing_file_path = Imagen.query.filter(Imagen.path == path).first()
            if existing_file_path:
                return Response(json.dumps({'message': 'File already uploaded'}), status = 404, mimetype = 'application/json')            

            # If not already upload, save the file in the server    
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            
            # Save the filename and path in a database
            file_path = url_for('uploaded_file', filename=filename)
            new_img = Imagen(path = file_path, filename = filename)
            db.session.add(new_img)
            db.session.commit()
            
            neighbors = []
            knn = []

            if distance_function == 'euclidian':
                knn = KNN_Secuential(path, k, euclidian_distance)
            
            if distance_function == 'manhattan':
                knn = KNN_Secuential(path, k, manhattan_distance)
            
            for d, neighbour in knn:
                neighbors.append('storage/' + neighbour)
            
            #Return the path and status of the uploaded file
            return Response(json.dumps({'path': file_path, 'filename': filename, 'id': new_img.id, 'neighbors': neighbors}), status = 200, mimetype = 'application/json')
    
    
    
