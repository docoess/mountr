from .db import db, add_prefix_for_prod
import os

environment = os.getenv('FLASK_ENV')
SCHEMA = os.environ.get('SCHEMA')

class Post(db.Model):
  __tablename__ = 'posts'

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  authorId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
  post_image = db.Column(db.String(255), nullable=False)
#   post_thumb = db.Column(db.String(255))
  caption = db.Column(db.String(50), nullable=False)
  featured_mount = db.Column(db.String(100), nullable=False)

  author = db.relationship("User", back_populates="posts")
  post_comments = db.relationship("Comment", back_populates="post", cascade="all, delete")

  def to_dict(self, printer=False):
      return_dict = {
          "id": self.id,
          "authorId": self.authorId,
          "post_image": self.post_image,
        #   "post_thumb": self.post_thumb,
          "caption": self.caption,
          "featured_mount": self.featured_mount,
          "author_name": self.author.username,
          "comments_num": len(self.post_comments)
      }

      if printer:
          print(return_dict)

      return return_dict
