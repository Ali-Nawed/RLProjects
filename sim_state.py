from math import sin, cos, pi
import random
import copy

def euler_integrate(car, timestep):
    displacement = car.speed * timestep
    car.x += displacement * cos(car.direction)
    car.y += displacement * sin(car.direction)

def update_state(state, timestep, update_function=euler_integrate):
    for car in state.cars.values(): update_function(car, timestep)

class SpaceState():

    def __init__(self, cars):
        self.cars = cars

    def __str__(self):
        return str(self.cars)
    
    def save(self):
        return SpaceState(copy.deepcopy(self.cars))

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
    def __init__(self, name, x, y, direction, speed, dim=(0.05, 0.05)):
        self.name = name
        self.x = x
        self.y = y
        self.direction = direction
        self.speed = speed
        self.dim = dim

    def __str__(self):
        return str([self.name, self.x, self.y, self.direction, self.speed])

    def __repr__(self):
        return str(self)

class Simulation():

    def __init__(self, n_cars=1, timestep=0.1, iterations=1000):
        self.n_cars = n_cars
        self.timestep = timestep
        self.iterations = iterations
        self.data = []

    def simulate(self):
        cars = {i: Car(i, 0, 0, 0.5, 0.5) for i in range(self.n_cars)}
        self.setpoint= (random.random(), random.random())
        state = SpaceState(cars)
        for i in range(self.iterations):
            for car in cars.values(): self.calculate_new_orientation(car, state)
            update_state(state, self.timestep)
            self.data.append(state.save())

        self.cars = cars;

    def calculate_new_orientation(self, car, state):
        car.direction = (2 * random.random() - 1) * pi


class SimulationUiSerializer():

    def serialize(self, simulation):
        # Get car metadata used for rendering
        objects_metadata = {}
        for car in simulation.cars.values():
            objects_metadata[car.name] = {
                "dim_x": car.dim[0],
                "dim_y": car.dim[1],
                "shape": "rectangle",
            }

        # serialize the setpoint
        objects_metadata["setpoint"] = {
            "pos_x": simulation.setpoint[0],
            "pos_y": simulation.setpoint[1],
            "shape": "circle",
            "radius": 0.05,
            "motion": "fixed" # Used to indicate that this is not meant to be something redrawn
        }

        # serialize time series data
        timeseries = []
        for state in simulation.data:
            state_serialization = {}
            for car in state.cars.values():
                state_serialization[car.name] = self.serialize_car(car)
            timeseries.append(state_serialization)

        return {
            "objects": objects_metadata,
            "timeseries": timeseries
        }


    def serialize_car(self, car):
        return {
            "pos_x": car.x,
            "pos_y": car.y
        }

if __name__ == '__main__':
    simulation = Simulation(iterations=1)
    simulation.simulate()

    print(SimulationUiSerializer().serialize(simulation))

