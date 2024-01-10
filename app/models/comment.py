from .db import db, add_prefix_for_prod
import os

environment = os.getenv('FLASK_ENV')
SCHEMA = os.environ.get('SCHEMA')

class Comment(db.Model):
  __tablename__ = 'comments'

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  authorId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
  postId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")))
  content = db.Column(db.String(400), nullable=False)

  comment_author = db.relationship("User", back_populates="comments")
  post = db.relationship("Post", back_populates="post_comments")

  def to_dict(self, printer=False):
      return_dict = {
          "id": self.id,
          "authorId": self.authorId,
          "postId": self.postId,
          "content": self.content
      }

      if printer:
          print(return_dict)

      return return_dict
