FROM python:3.9-slim

# Maintainer
LABEL org.opencontainers.image.authors="Henry Kaus https://github.com/henrykaus"

# Copy and set directory
COPY app /app
WORKDIR /app

# Get Python Pip to install requirements
RUN pip install -r requirements.txt

# Set the parameters to the program
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 app:app
