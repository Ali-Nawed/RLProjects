from flask import Flask
import os
import json

app = Flask(__name__, template_folder="dist", static_folder="dist", static_url_path="")


@app.route("/")
def home():
    return app.send_static_file('index.html')

@app.route("/getsimulations")
def getSimulationsMetadata():
    simulations_list = os.listdir('./simulations')

    response = {
        'total_results': len(simulations_list),
        'results' : simulations_list
    }

    return json.dumps(response)

@app.route("/simulation/<simulation_name>")
def getSimulation(simulation_name):
    with open(f'./simulations/{simulation_name}', 'r') as sim_file:
        data = sim_file.read()
        return json.dumps(data)