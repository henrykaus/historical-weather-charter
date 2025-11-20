# Historical Weather Charter

## About

A historical weather charter web app that displays ~25 years of highs and mins on a per month scale for any input location.

## Instructions to Run Locally:

1. Install Python 3.11.x
2. Create virtual environment

```bash
$ cd historical-weather-app
$ python3 -m venv env
```

3. Activate virtual environment and install packages

```bash
$ ./env/Scripts/activate  # For PowerShell
$ source env/bin/actiate  # For ZSH
$ pip install --upgrade pip
$ pip install -r app/requirements.txt
```

4. Ensure that the `model_backend` in `gbmodel/__init__` is set to `sqlite3`
5. Run app

```bash
$ python3 app/app.py
```

## Instructions to Deploy on Cloud Run:

1. Clone repo in Cloud Shell
2. Ensure that the `model_backend` in `gbmodel/__init__` is set to `datastore`
3. Ensure that the `CLIENT` in `gbmodel/model_datastore.py` is set to the project name (same as `${GOOGLE_CLOUD_PROJECT}`)
4. Create docker container from `historical-weather-charter/`
5. Create a service account called "weather" with the `Cloud Datastore User` role
6. Create Google Datastore database in "Datastore Mode" that resides in the US West1 region
7. Create a "weather" entity kind in datastore with a "\[default\]" namespace and "Numeric ID (auto-generated)" Key identifier. It should have the following properties:
   1. A "date" value
   2. A "lat_long" value
   3. A "max_temp" floating point number
   4. A "min_temp" floating point number
8. Create an index on the `lat_long` and `date` properties of the weather kind
9. Deploy to Cloud Run

```bash
$ git clone https://github.com/henrykaus/historical-weather-charter
# Make changes for steps 2 and 3
$ gcloud builds submit --timeout=900 --tag gcr.io/${GOOGLE_CLOUD_PROJECT}/gcp-weather
# Create and configure datastore db for steps 5-7
$ gcloud datastore indexes create index.yaml
$ gcloud run deploy gcp-weather --image gcr.io/${GOOGLE_CLOUD_PROJECT}/gcp-weather --service-account weather@${GOOGLE_CLOUD_PROJECT}.iam.gserviceaccount.com
```
