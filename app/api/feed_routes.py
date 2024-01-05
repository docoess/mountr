from flask_login import login_required, current_user
from .aws_helpers import get_unique_filename, remove_file_from_s3, upload_file_to_s3
from flask import Blueprint, request
from ..forms import PostForm, UpdatePostForm
from app.models import db, Post

feed_routes = Blueprint('feed', __name__)

@feed_routes.route('/')
def get_feed():
  """
  Returns a list of all posts in the feed
  """

  posts = [post.to_dict() for post in Post.query.all()]
  return posts

@feed_routes.route('/new', methods=['POST'])
@login_required
def create_post():
  """
  Creates a new post
  """
  form = PostForm()

  form["csrf_token"].data = request.cookies["csrf_token"]

  if form.validate_on_submit():
    post_image = form.data['post_image']
    post_image.filename = get_unique_filename(post_image.filename)
    upload = upload_file_to_s3(post_image)

    if "url" not in upload:
      return upload

    new_post = Post(
      post_image = upload['url'],
      caption = form.data['caption'],
      featured_mount = form.data['featured_mount'],
      authorId = current_user.id
    )

    db.session.add(new_post)
    db.session.commit()
    return new_post.to_dict()
  else:
    print(form.errors)
    return form.errors

@feed_routes.route('/<int:id>/update', methods=['PUT'])
@login_required
def update_post(id):
  """
  Updates a post
  """
  form = UpdatePostForm()

  form["csrf_token"].data = request.cookies["csrf_token"]

  if form.validate_on_submit():
    post = Post.query.get(id)
    old_url = post.post_image
    post_image = form.data['post_image']
    if not isinstance(post_image, str):
      post_image.filename = get_unique_filename(post_image.filename)
      upload = upload_file_to_s3(post_image)

      if "url" not in upload:
        return upload

      remove_file_from_s3(old_url)
      post.post_image = upload['url']

    post.caption = form.data['caption']
    post.featured_mount = form.data['featured_mount']

    db.session.commit()

    return post.to_dict()
  else:
    print(form.errors)
    return form.errors
