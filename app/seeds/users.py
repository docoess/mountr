from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(username='Demo', email='demo@aa.io', password='password')
    marnie = User(username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(username='bobbie', email='bobbie@aa.io', password='password')
    demo2 = User(username='Demo2', email='demo2@aa.io', password='password')
    demo3 = User(username='Demo3', email='demo3@aa.io', password='password')
    demo4 = User(username='Demo4', email='demo4@aa.io', password='password')
    demo5 = User(username='Demo5', email='demo5@aa.io', password='password')
    demo6 = User(username='Demo6', email='demo6@aa.io', password='password')
    demo7 = User(username='Demo7', email='demo7@aa.io', password='password')
    demo8 = User(username='Demo8', email='demo8@aa.io', password='password')

    users = [demo, marnie, bobbie, demo2, demo3, demo4, demo5, demo6, demo7, demo8]
    [db.session.add(user) for user in users]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
