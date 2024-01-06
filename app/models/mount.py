from .db import db, user_mounts
import os

environment = os.getenv('FLASK_ENV')
SCHEMA = os.environ.get('SCHEMA')

class Mount(db.Model):
  __tablename__ = 'mounts'

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)

  post_featured = db.relationship("Post", back_populates="mount_id")
  mount_owner = db.relationship("User", secondary=user_mounts, back_populates="owned_mounts")

  def to_dict(self, printer=False):
      return_dict = {
          "id": self.id,
          "name": self.name
      }

      if printer:
          print(return_dict)

      return return_dict
