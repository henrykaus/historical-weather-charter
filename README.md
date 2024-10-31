# Historical Weather Charter

## About

A historical weather charter web app that displays ~20 years of highs and mins on a per month scale for any input location.

## Instructions to Run Locally:

1. Install Python 3.11.x
2. Create virtual environment

```
$ cd historical-weather-app
$ python -m venv env
```

3. Activate virtual environment and install packages

```
$ ./env/Scripts/activate
$ pip install --upgrade pip
$ pip install -r app/requirements.txt
```

4. Ensure that the `model_backend` in `gbmodel/__init__` is set to `sqlite3`
5. Run app

```
$ python app/app.py
```

## Instructions to Deploy on Cloud Run:

1. Clone repo in Cloud Shell
2. Ensure that the `model_backend` in `gbmodel/__init__` is set to `datastore`
3. Ensure that the `CLIENT` in `gbmodel/model_datastore.py` is set to the project name (same as `${GOOGLE_CLOUD_PROJECT}`)
4. Create docker container from `historical-weather-charter/`
5. Deploy to Cloud Run

```
$ git clone https://github.com/henrykaus/historical-weather-charter
$ // Make changes for steps 2 and 3
$ gcloud builds submit --timeout=900 --tag gcr.io/${GOOGLE_CLOUD_PROJECT}/gcp-weather
$ gcloud run deploy gcp-weather --image gcr.io/${GOOGLE_CLOUD_PROJECT}/gcp-weather --service-account [IAM ACCOUNT NAME]@${GOOGLE_CLOUD_PROJECT}.iam.gserviceaccount.com
```
