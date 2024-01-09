from flask_login import login_required, current_user
from .aws_helpers import get_unique_filename, remove_file_from_s3, upload_file_to_s3
from flask import Blueprint, request
from ..forms import PostForm, UpdatePostForm, CommentForm, UpdateCommentForm
from app.models import db, Post, User, Comment

feed_routes = Blueprint('feed', __name__)

@feed_routes.route('/')
def get_feed():
  """
  Returns a list of all posts in the feed
  """

  posts = [post.to_dict() for post in Post.query.all()]
  return posts

@feed_routes.route('/<int:id>')
def get_single_post(id):
  """
  Returns a single post by id
  """

  post = Post.query.get(id)

  comments = [comment.to_dict() for comment in post.post_comments]
  for c in comments:
    user = User.query.get(c["authorId"])
    c["author_name"] = user.username

  comments = {comment['id']: comment for comment in comments}

  author = post.author
  author_dict = author.to_dict()

  return_dict = post.to_dict()
  return_dict['author'] = author_dict
  return_dict['comments'] = comments

  return return_dict

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

@feed_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_post(id):
  """
  Deletes a post by id
  """

  target_post = Post.query.get(id)

  old_url = target_post.post_image
  db.session.delete(target_post)
  db.session.commit()

  remove_file_from_s3(old_url)
  return {"message": "Successfully Deleted"}

@feed_routes.route('/<int:id>/comment/new', methods=['POST'])
@login_required
def create_comment_on_post(id):
  """
  Adds a comment to the post of specified id
  """

  form = CommentForm()

  form["csrf_token"].data = request.cookies["csrf_token"]

  if form.validate_on_submit():

    new_comment = Comment(
      content = form.data['content'],
      authorId = current_user.id,
      postId = id
    )

    db.session.add(new_comment)
    db.session.commit()
    return new_comment.to_dict()
  else:
    print(form.errors)
    return form.errors

@feed_routes.route('/<int:postId>/comment/<int:commentId>/delete', methods=['DELETE'])
@login_required
def delete_comment(postId, commentId):
  """
  Deletes a comment based on id on a specfic post
  """

  target_comment = Comment.query.get(commentId)

  db.session.delete(target_comment)
  db.session.commit()
  return {"message": "Successfully Deleted"}

@feed_routes.route('/<int:postId>/comment/<int:commentId>/update', methods=['PUT'])
@login_required
def update_comment(postId, commentId):
  """
  Updates a comment on a specific post by specified comment id
  """

  form = UpdateCommentForm()

  form["csrf_token"].data = request.cookies["csrf_token"]

  if form.validate_on_submit():
    comment = Comment.query.get(commentId)
    comment.content = form.data['content']

    db.session.commit()

    return comment.to_dict()
  else:
    print(form.errors)
    return form.errors
