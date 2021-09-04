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
            "radius": 0.5,
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