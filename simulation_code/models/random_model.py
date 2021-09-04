from math import sin, cos, pi
import random

class RandomModel():
    def move(self, state):
        return (2 * random.random() - 1) * (pi)

