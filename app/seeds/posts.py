from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():
  post_1 = Post(
    authorId=2,
    post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed1.jpg',
    caption='First!',
    featured_mount='Ashes of Alar'
  )

  post_2 = Post(
    authorId=2,
    post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed2.jpg',
    caption='Aaaand Second!',
    featured_mount='Mighty Caravan Brutosaur'
  )

  post_3 = Post(
      authorId=3,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed3.jpg',
      caption='BElf heritage mount? Yes please!',
      featured_mount='Elusive Emerald Hawkstrider'
  )

  post_4 = Post(
      authorId=3,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed4.jpg',
      caption='500 mounts lets goooooo',
      featured_mount='Otherworldly Ottuk Carrier'
  )

  post_5 = Post(
      authorId=3,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed5.jpg',
      caption='Randomly got this back in the day, had no idea it was uncommon then.',
      featured_mount='Voidtalon of the Dark Star'
  )

  post_6 = Post(
      authorId=3,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed6.jpg',
      caption='Crab!',
      featured_mount='Snapback Scuttler'
  )

  post_7 = Post(
      authorId=1,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed4.jpg',
      caption='Woooo',
      featured_mount='Otherworldly Ottuk Carrier'
  )

  post_8 = Post(
      authorId=2,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed4.jpg',
      caption='Lorem Ipsum!',
      featured_mount='Otherworldly Ottuk Carrier'
  )

  post_9 = Post(
      authorId=2,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed6.jpg',
      caption='More captions!',
      featured_mount='Snapback Scuttler'
  )

  post_10 = Post(
      authorId=3,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed3.jpg',
      caption='Green bird!',
      featured_mount='Elusive Emerald Hawkstrider'
  )

  db.session.add(post_1)
  db.session.add(post_2)
  db.session.add(post_3)
  db.session.add(post_4)
  db.session.add(post_5)
  db.session.add(post_6)
  db.session.add(post_7)
  db.session.add(post_8)
  db.session.add(post_9)
  db.session.add(post_10)
  db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
