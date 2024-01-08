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

  comment_3 = Comment(
      authorId=3,
      postId=2,
      content='Woah, moneybags much?!'
  )

  comment_4 = Comment(
      authorId=1,
      postId=2,
      content='I know, right? Save some for the rest of us!'
  )

  db.session.add(comment_1)
  db.session.add(comment_2)
  db.session.add(comment_3)
  db.session.add(comment_4)
  db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
