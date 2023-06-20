model_backend = 'sqlite3'

if model_backend == 'datastore':
    from .model_datastore import Model
elif model_backend == 'sqlite3':
    from .model_sqlite3 import Model
else:
    raise ValueError("No appropriate databackend configured.")

appmodel = Model()

def get_model():
    return appmodel
