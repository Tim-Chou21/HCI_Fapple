# from asyncio.windows_events import NULL
import io
import numpy as np
import pandas as pd
import logging
import time                  
import json
from flask import Flask, request
from flask_cors import CORS
import boto3

app = Flask(__name__)
CORS(app)          
app.logger.setLevel(logging.DEBUG)

#load items.csv
items_csv_path = '/Users/Tim/Desktop/2022 Winter/ECE209AS HCI/Final_Project/LAH2NA/dataset/items.csv'
df = pd.read_csv(items_csv_path)
df = df.drop(df.columns[0], axis=1)

# aws-personalize-runtime-client
personalize_rt = boto3.client('personalize-runtime')

# target genres
target_genres = ['String', 'Hash Table', 'Dynamic Programming', 'DFS', 'Sorting', 'Tree']
    
# parse input note, and get the genres
def parse_note(note):
    global target_genres
    parsed_genres = []
    words = note.split()
    for genre in target_genres:
        if genre in words:
            parsed_genres.append(genre)

    parsed_genres_str = ''
    for genre in parsed_genres:
        parsed_genres_str += '\"' + genre + '\"' + ','
    return parsed_genres_str[:-1]

# Recommendation filter by Genre
# INCLUDE ItemID WHERE Items.GENRES IN ($genre)
@app.route("/get-sims-recommendation-by-filter", methods=['POST'])
def get_recommendation_filter_by_genre():
    data = json.loads(request.data)
    genres = parse_note(data["note"])
    difficulty = data["difficulty"]
    response = personalize_rt.get_recommendations(
            campaignArn = 'arn:aws:personalize:us-east-1:349807295075:campaign/aws-sim-items-new-campaign',
            itemId = '35',
            numResults = 5,
            filterArn = 'arn:aws:personalize:us-east-1:349807295075:filter/my-filter',
            filterValues = {
                "GENRE": genres,
                "DIFFICULTY":"\"" + difficulty + "\""
            }
            # filterValues = {
            #     "genre": "\"String\", \"Hash Table\""
            #     #  "Parameter name": "\"value1\",\"value2\",\"value3\""
            # }
    )

    print(response)
    item_id_list = []
    for item in response['itemList']:
        item_id_list.append(int(item['itemId']))
    
    filter = df["ITEM_ID"].isin(item_id_list)
    print(df[filter].to_json(orient="records"))
    return df[filter].iloc[:3].to_json(orient="records")

@app.route("/get-recommendation-by-user-id", methods=['POST'])
def get_recommendation_by_user_id():
    response = personalize_rt.get_recommendations(
        campaignArn = 'arn:aws:personalize:us-east-1:349807295075:campaign/aws-user-campaign',
        userId = '1',
        numResults = 5,
        context = {
        
        }
    )

    print("Recommended items")
    for item in response['itemList']:
        print (item['itemId'])

    return response

def run_server_api():
    app.run(host='0.0.0.0', port=8080)
  
def shutdown():
    shutdown_func = request.environ.get('werkzeug.server.shutdown')
    if shutdown_func is None:
        raise RuntimeError('Not running werkzeug')
    shutdown_func()
    return "Shutting down..."

if __name__ == "__main__":
    try:
        run_server_api()
    except KeyboardInterrupt:
        shutdown()