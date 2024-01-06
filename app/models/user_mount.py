from .db import db, add_prefix_for_prod
import os

environment = os.getenv('FLASK_ENV')
SCHEMA = os.environ.get('SCHEMA')

user_mounts = db.Table(
  "user_mounts",
  db.Model.metadata,
  db.Column("owner_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
  db.Column("mount_id", db.Integer, db.ForeignKey(add_prefix_for_prod("mounts.id")), primary_key=True),
  db.Column("wanted", db.Boolean)
)

if environment == "production":
    user_mounts.schema = SCHEMA
