import numpy as np

DEFAULT_DIM = (0.05,0.05)

class Car():
    '''
    constructor
    @param name: name of the car
    @param x: x position
    @param y: y position
    @param direction: the angle the car is facing
    @param speed: how fast is the car is going

    direction and speed were chosen instead of a velocity vector vx, vy
    is because it allows for more consistent and easy interpolation of the angle 
    '''
    def __init__(self, name, x, y, direction, speed, dim=DEFAULT_DIM):
        self.name = name
        self.x = x
        self.y = y
        self.vector = np.asarray([self.x, self.y])
        self.direction = direction
        self.speed = speed
        self.dim = dim

    def __str__(self):
        return str([self.name, self.x, self.y, self.direction, self.speed])

    def __repr__(self):
        return str(self)