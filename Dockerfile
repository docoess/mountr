FROM python:3.9.18-alpine3.18

RUN apk add build-base

RUN apk add postgresql-dev gcc python3-dev musl-dev

ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY
ARG S3_IMG_BUCKET
ARG S3_IMG_KEY
ARG S3_IMG_SECRET
ARG BLIZZ_CLIENT_ID
ARG BLIZZ_SECRET

WORKDIR /var/www

COPY requirements.txt .

RUN pip install -r requirements.txt
RUN pip install psycopg2

COPY . .

RUN flask db upgrade
RUN flask seed mounts
RUN flask seed all
CMD gunicorn app:app
