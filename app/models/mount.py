from .db import db
import os

environment = os.getenv('FLASK_ENV')
SCHEMA = os.environ.get('SCHEMA')

class Mount(db.Model):
  __tablename__ = "mounts"

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  blizzId = db.Column(db.Integer, nullable=False)
  name = db.Column(db.String(100), nullable=False)

  def to_dict(self, printer=False):
      return_dict = {
          "id": self.id,
          "blizzId": self.blizzId,
          "name": self.name
      }

      if printer:
          print(return_dict)

      return return_dict
