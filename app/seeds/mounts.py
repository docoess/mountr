from app.models import db, Mount, environment, SCHEMA
from sqlalchemy.sql import text
import os
import requests

def get_mounts():

  BLIZZ_CLIENT_ID = os.environ.get('BLIZZ_CLIENT_ID')
  BLIZZ_SECRET =  os.environ.get('BLIZZ_SECRET')

  data = {
      'client_id': BLIZZ_CLIENT_ID,
      'client_secret': BLIZZ_SECRET,
      'grant_type': 'client_credentials',
  }

  token_response = requests.post('https://oauth.battle.net/token', data=data)
  tok_res = token_response.json()
  auth_string = tok_res["access_token"]
  oauth_headers = {
      'Authorization': f'Bearer {auth_string}',
      'Battlenet-Namespace': 'static-us'
  }

  auth_response = requests.get('https://us.api.blizzard.com/data/wow/mount/index', headers=oauth_headers)
  auth_res = auth_response.json()

  mounts = auth_res["mounts"]
  mount_list = [{"name": mount["name"]["en_US"], "id": mount["id"]} for mount in mounts]

  return mount_list



def seed_mounts():
  mounts = get_mounts()

  [db.session.add(Mount(name=mount["name"], blizzId=mount["id"])) for mount in mounts]

  db.session.commit()

def undo_mounts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.mounts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM mounts"))

    db.session.commit()
