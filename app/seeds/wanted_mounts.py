from app.models import db, environment, SCHEMA, wanted_mounts
from sqlalchemy.sql import text
import os



def undo_wanted_mounts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.wanted_mounts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM wanted_mounts"))

    db.session.commit()
