import pickle

"""
Utility functions to manipulate data on disk 
"""

def read(filename):
    ifile = open(filename, 'rb')
    model = pickle.load(ifile)
    ifile.close()
    return model

def write(filename, model):
    ofile = open(filename, 'wb')
    pickle.dump(model, ofile)
    ofile.close()