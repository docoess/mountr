from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
import os



def undo_owned_mounts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.owned_mounts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM owned_mounts"))

    db.session.commit()
