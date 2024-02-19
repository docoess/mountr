from .db import db, add_prefix_for_prod
import os

environment = os.getenv('FLASK_ENV')
SCHEMA = os.environ.get('SCHEMA')

owned_mounts = db.Table(
  "owned_mounts",
  db.Model.metadata,
  db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
  db.Column("mount_id", db.Integer, db.ForeignKey(add_prefix_for_prod("mounts.id")), primary_key=True),
)

if environment == "production":
    owned_mounts.schema = SCHEMA
