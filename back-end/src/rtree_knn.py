from image import *
from disk import *
from rtree import index
from os import listdir
from os import remove
from os.path import isfile, join
import face_recognition

class KNN_RTree:
    def __init__ (self, rebuild=True):
        if rebuild:
            self.delete_index()
        self.load_index()
        if rebuild:
            self.insert_values()

    def delete_index (self):
        if isfile('kd_index.data'):
            remove('kd_index.data')
        if isfile('kd_index.index'):
            remove('kd_index.index')

    def load_index (self):
        prop = index.Property()
        prop.dimension = 128
        prop.buffering_capacity = 10
        prop.dat_extension = 'data'
        prop.idx_extension = 'index'
        self.idx = index.Index('kd_index', properties=prop)

    def insert_values (self):
        file_path = [join('binaries', pname) for pname in listdir('binaries/') if isfile(join('binaries', pname))]
        id_counter = 0
        for pname in file_path:
            model = read(pname)
            obj = dict()
            obj['path'] = model.path
            obj['name'] = model.name
            point = list(model.features)
            point.extend(model.features)
            self.idx.insert(id_counter, point, obj=obj)
            id_counter += 1

    def example (self, pname):
        model = read(pname)
        print('Example for ' + model.name)
        print(self.KNN(model.features, 2))
    
    def KNN_query (self, image_path, k):
        unknown_image = face_recognition.load_image_file(image_path[1:])
        try:
            features = face_recognition.face_encodings(unknown_image)[0]
        except IndexError:
            print('No faces in image')
            return
        return self.KNN(features, k)

    def KNN (self, point, k):
        qpoint = list(point)
        qpoint.extend(list(point))
        return [res.object for res in self.idx.nearest(coordinates=qpoint, num_results=k, objects=True)]

if __name__ == '__main__':
    # First time call
    # knn_rtree = KNN_RTree(True)
    # Next times
    knn_rtree = KNN_RTree(False)
    knn_rtree.example('binaries/Aaron_Peirsol_0003.bin')
