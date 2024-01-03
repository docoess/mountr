from flask_login import login_required, current_user
from flask import Blueprint, request
from ..forms import PostForm
from app.models import db, Post

feed_routes = Blueprint('feed', __name__)

@feed_routes.route('/')
def get_feed():
  """
  Returns a list of all posts in the feed
  """

  posts = [post.to_dict() for post in Post.query.all()]
  return posts
