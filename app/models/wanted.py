from .db import db, add_prefix_for_prod
import os

environment = os.getenv('FLASK_ENV')
SCHEMA = os.environ.get('SCHEMA')

wanted_mounts = db.Table(
  "wanted_mounts",
  db.Model.metadata,
  db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
  db.Column("mount_id", db.Integer, db.ForeignKey(add_prefix_for_prod("mounts.id")), primary_key=True),
)

if environment == "production":
    wanted_mounts.schema = SCHEMA
