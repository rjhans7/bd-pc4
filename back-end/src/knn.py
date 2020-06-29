import os
import math
import face_recognition

from disk import read

def euclidian_distance(x_1, x_2):
    result = 0
    for i in range(len(x_1)):
        dx = x_1[i] - x_2[i]
        result += pow(dx, 2)    
    return math.sqrt(result)


def manhattan_distance(x_1, x_2):
    result = 0
    for i in range(len(x_1)):
        dx = abs(x_1[i] - x_2[i])
        result += dx
    return result


def KNN_Sequential(image_path, k, distance_function):
    binaries = os.listdir('binaries')
    
    unknown_image = face_recognition.load_image_file(image_path[1:])
    try:
        features = face_recognition.face_encodings(unknown_image)[0]
    except IndexError:
        print('No faces in image')
        return

    neighbors = []

    for binary in binaries:
        image = read('binaries/' + binary)
        d = distance_function(image.features, features)
        neighbors.append((d, image.path, image.name))
    
    neighbors.sort(key = lambda x: x[0])
    
    return neighbors[:k]

    

