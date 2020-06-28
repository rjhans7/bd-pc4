# PC 4: Database Multimedia

## Table of Contents

- [PC 4: Database Multimedia](#pc-4-database-multimedia)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Group members](#group-members)
- [Implementation](#implementation)
  - [Backend](#backend)
    - [Characteristics Extraction](#characteristics-extraction)
    - [Indexing and Searching](#indexing-and-searching)
      - [Sequential KNN with Priority Queue (without index)](#sequential-knn-with-priority-queue-without-index)
      - [Experiment 1](#experiment-1)
      - [R-Tree Multidimensional index](#r-tree-multidimensional-index)
      - [Experiment 2](#experiment-2)
  - [Frontend](#frontend)
  - [Galery](#galery)

---

This repo is for the PC4 of Data Base II course at UTEC

The project has frontend and backend part.

In [fronted](front-end) you can find the instructions to run the frontend in its README.md

In [backend](back-end) you can find the instructions to run the backend in its README.md

The project has the following architecture:

![Architecture Diagram](PC4.png)

## Requirements

- [NodeJS](https://nodejs.org/es/)
- [Angular 9 or greater](https://angular.io/)
- [Python3](https://www.python.org/download/releases/3.0/)
- [OpenCV](https://opencv.org/)
- [dlib](https://pypi.org/project/dlib/)

## Group members

- Roosevelt Ubaldo
- Carlos Cupe
- José García

# Implementation

## Backend

### Features Extraction

First, of the 5749 classes, only 1683 were taken, which were the characters that had more than one photo.

Next, 75% of the photos per participant were separated for the analysis and the remaining 25% for the tests.

Finally, 128 features per image were extracted from the data for analysis using the face_recognition library. This information was saved together with the class to which it belongs in a binary file to reduce its size. In total 6187 images were analyzed.

It should be noted that 23 images were discarded, since the face was not detected.

### Indexing and Searching

#### Sequential KNN with Priority Queue (without index)

The **KNN Sequential** function receives the path of the image to be analyzed, the k neighbors and the distance function.

First, the features of the image to be evaluated are extracted.

After iterating over the binaries with the features of the images to calculate the distance between the two images, these values ​​are stored in a priority queue.

Lastly, the first k elements of the priority queue are returned.

#### Experiment 1

| Precision |  ED   |  MD   |
| :-------: | :---: | :---: |
|   K = 4   |       |       |
|   K = 8   |       |       |
|  K = 16   |       |       |

#### R-Tree Multidimensional index

#### Experiment 2

|  Tiempo   | KNN-RTree | KNN-Sequential |
| :-------: | :-------: | :------------: |
|  N = 100  |           |                |
|  N = 200  |           |                |
|  N = 400  |           |                |
|  N = 800  |           |                |
| N = 1600  |           |                |
| N = 3200  |           |                |
| N = 6400  |           |                |
| N = 12800 |           |                |

## Frontend



## Galery

**Home page**
![Set up](home.png)

**Search engine**
![Set up](search-eng-1.png)
![Upload an image](search-eng-2.png)
