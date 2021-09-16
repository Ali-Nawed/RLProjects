from math import sin, cos, pi
import random
import numpy as np
import copy
import click
import json
import uuid
from simulation_code.models.random_model import RandomModel
from simulation_code.simulation_serializer import SimulationUiSerializer
from simulation_code.car import Car

DEFAULT_ITERATIONS = 1000
DEFAULT_TIMESTEP = 1/60
DEFAULT_N_CARS = 1

DEFAULT_SIMULATION_DIR = "simulations/"

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

class Simulation():

    def __init__(self, n_cars=DEFAULT_N_CARS, timestep=DEFAULT_TIMESTEP, iterations=DEFAULT_ITERATIONS, model=RandomModel()):
        self.n_cars = n_cars
        self.timestep = timestep
        self.iterations = iterations
        self.data = []
        self.model = model

    def simulate(self):
        cars = {i: Car(i, 0, 0, 0.5, 0.5) for i in range(self.n_cars)}
        self.setpoint= np.asarray([random.random(), random.random()])
        state = SpaceState(cars)
        for i in range(self.iterations):
            for car in cars.values(): self.calculate_new_orientation(car, state)
            update_state(state, self.timestep)
            self.data.append(state.save())
        self.cars = cars

    def calculate_new_orientation(self, car, state):
        car.direction = self.model.move(state)
    
    def get_state_value(self):
        return [self.get_car_distance_from_setpoint(self.cars[i]) for i in range(self.n_cars)]
    
    def get_car_distance_from_setpoint(self, car):
        return np.linalg.norm(car.vector, self.setpoint)

@click.command()
@click.option('--filename', default="", help="json file output name ie simulation.json")
@click.option('--iterations', default=DEFAULT_ITERATIONS, help="number of steps that the simulation should go through ie 10000")
def runAndSaveSimulation(filename, iterations, timestep=DEFAULT_TIMESTEP):
    simulation = Simulation(iterations=iterations, timestep=timestep)
    simulation.simulate()
    filename = DEFAULT_SIMULATION_DIR + str(uuid.uuid1()) + ".json"
    with open(filename, 'w') as outfile:
        json.dump(SimulationUiSerializer().serialize(simulation), outfile)