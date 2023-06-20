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

3. Install packages

```
$ pip install --upgrade pip
$ pip install -r app/requirements.txt
```

4. Ensure that the `model_backend` in `gbmodel/__init__` is set to `sqlite3`
5. Activate virtual environment and run app

```
$ ./env/Scripts/activate
$ python app/app.py
```
