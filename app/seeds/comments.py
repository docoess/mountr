from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
  comment_1 = Comment(
    authorId=1,
    postId=2,
    content='Jealous!'
  )

  comment_2 = Comment(
    authorId=1,
    postId=5,
    content='Still haven\'t found this one!'
  )

  db.session.add(comment_1)
  db.session.add(comment_2)
  db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
