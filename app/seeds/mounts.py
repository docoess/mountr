from app.models import db, Mount, environment, SCHEMA, User
from sqlalchemy.sql import text

def seed_mounts():
  users = User.query.all()

  mount_1 = Mount(
    name='Ashes of Alar',
    mount_owner=[users[1]]
  )

  mount_2 = Mount(
    name='Mighty Caravan Brutosaur',
    mount_owner=[users[1]]
  )

  mount_3 = Mount(
    name='Elusive Emerald Hawkstrider',
    mount_owner=[users[0], users[2]]
  )

  mount_4 = Mount(
    name='Otherworldly Ottuk Carrier',
    mount_owner=[users[0], users[1], users[2]]
  )

  mount_5 = Mount(
    name='Voidtalon of the Dark Star',
    mount_owner=[users[2]]
  )

  mount_6 = Mount(
    name='Snapback Scuttler',
    mount_owner=[users[1], users[2]]
  )

  db.session.add(mount_1)
  db.session.add(mount_2)
  db.session.add(mount_3)
  db.session.add(mount_4)
  db.session.add(mount_5)
  db.session.add(mount_6)
  db.session.commit()

def undo_mounts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.mounts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM mounts"))

    db.session.commit()
