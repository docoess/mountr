from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():
  post_1 = Post(
    authorId=2,
    post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed1.jpg',
    caption='First!',
    featured_mount='Ashes of Al\'ar'
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
      featured_mount='Otterworldly Ottuk Carrier'
  )

  post_5 = Post(
      authorId=2,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed5.jpg',
      caption='Randomly got this in in WoD, no idea it was rare.',
      featured_mount='Voidtalon of the Dark Star'
  )

  post_6 = Post(
      authorId=3,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed6.jpg',
      caption='Crab!',
      featured_mount='Snapback Scuttler'
  )

  post_7 = Post(
      authorId=2,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed7.jpg',
      caption='Oooo, foxxy mounty',
      featured_mount='Llothien Prowler'
  )

  post_8 = Post(
      authorId=8,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed8.jpg',
      caption='Old school orc mount',
      featured_mount='Swift Timber Wolf'
  )

  post_9 = Post(
      authorId=2,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed9.jpg',
      caption='VOLTRON is Go!',
      featured_mount='Jeweled Onyx Panther'
  )

  post_10 = Post(
      authorId=3,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed10.jpg',
      caption='The ORIGINAL vendor mount!',
      featured_mount='Traveler\'s Tundra Mammoth'
  )

  post_11 = Post(
      authorId=2,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed11.jpg',
      caption='OG Mount Collector Reward',
      featured_mount='Albino Drake'
  )

  post_12 = Post(
      authorId=2,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed12.jpg',
      caption='A decent RaF mount',
      featured_mount='Cindermane Charger'
  )

  post_13 = Post(
      authorId=2,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed13.jpg',
      caption='Love his dancing animation',
      featured_mount='Darkmoon Dancing Bear'
  )

  post_14 = Post(
      authorId=3,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed14.jpg',
      caption='Big boi',
      featured_mount='Goldplate Bufonid'
  )

  post_15 = Post(
      authorId=8,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed15.jpg',
      caption='Creepy hand thing? Sure.',
      featured_mount='Hand of Nilganihmaht'
  )

  post_16 = Post(
      authorId=2,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed16.jpg',
      caption='This was a paaaaain to get, but worth it!',
      featured_mount='Lucid Nightmare'
  )

  post_17 = Post(
      authorId=2,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed17.jpg',
      caption='Took way too many runs to get...',
      featured_mount='Mimiron\'s Head'
  )

  post_18 = Post(
      authorId=3,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed18.jpg',
      caption='Love the rogue class mounts!',
      featured_mount='Shadowblade\'s Murderous Omen'
  )

  post_19 = Post(
      authorId=8,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed19.jpg',
      caption='RIP Archaeology',
      featured_mount='Spirit of Eche\'ro'
  )

  post_20 = Post(
      authorId=2,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed20.jpg',
      caption='Voidtalon\'s green brother.',
      featured_mount='Frenzied Feltalon'
  )

  post_21 = Post(
      authorId=4,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed21.jpg',
      caption='I paid how much for this?!',
      featured_mount='Mighty Caravan Brutosaur'
  )

  post_22 = Post(
      authorId=5,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed22.jpg',
      caption='Such neck!',
      featured_mount='Mighty Caravan Brutosaur'
  )

  post_23 = Post(
      authorId=6,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed23.jpg',
      caption='Longboi parade!',
      featured_mount='Mighty Caravan Brutosaur'
  )

  post_24 = Post(
      authorId=7,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed24.jpg',
      caption='Longbois Rep!',
      featured_mount='Mighty Caravan Brutosaur'
  )

  post_25 = Post(
      authorId=1,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed25.jpg',
      caption='Richboi!',
      featured_mount='Mighty Caravan Brutosaur'
  )

  post_26 = Post(
      authorId=1,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed26.jpg',
      caption='I love gooooold!',
      featured_mount='Astral Emperor\'s Serpent'
  )

  post_27 = Post(
      authorId=1,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed27.jpg',
      caption='A real beast.',
      featured_mount='Fel Iron Juggernaut'
  )

  post_28 = Post(
      authorId=1,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed28.jpg',
      caption='So regal!',
      featured_mount='August Phoenix'
  )

  post_29 = Post(
      authorId=1,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed29.jpg',
      caption='Nice backdrop on this one!',
      featured_mount='Bloody Skyscreamer'
  )

  post_30 = Post(
      authorId=1,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed30.jpg',
      caption='KFP!',
      featured_mount='Ashes of Al\'ar'
  )

  post_31 = Post(
      authorId=1,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed31.jpg',
      caption='The goodest greenboi',
      featured_mount='Delugen'
  )

  post_32 = Post(
      authorId=1,
      post_image='https://mountr-image-bucket.s3.us-west-2.amazonaws.com/seed32.jpg',
      caption='Skelington Raptor!',
      featured_mount='Fossilized Raptor'
  )

  posts = [post_1, post_2, post_3, post_4, post_5, post_6, post_7, post_8, post_9, post_10,
           post_11, post_12, post_13, post_14, post_15, post_16, post_17, post_18, post_19, post_20,
           post_21, post_22, post_23, post_24, post_25, post_26, post_27, post_28, post_29, post_30,
           post_31, post_32]
  [db.session.add(post) for post in posts]
  db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
