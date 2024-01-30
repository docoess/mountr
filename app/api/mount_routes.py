from flask_login import login_required, current_user
from flask import Blueprint, request
from app.models import db, Post, User, Comment, Mount

mount_routes = Blueprint('mount', __name__)

@mount_routes.route('/<int:postId>')
def get_wanted_mount(postId):
  """
  Gets the wanted status on the mount featured in the specified post
  """

  post = Post.query.get(postId)
  mount_name = post.featured_mount
  user = User.query.get(current_user.id)
  mount = Mount.query.filter(Mount.name == mount_name).one()

  if mount in user.want_list:
    return mount.to_dict()
  else:
    return {}



@mount_routes.route('/<string:mountName>/want')
@login_required
def add_mount_to_wanted(mountName):
  """
  Adds the specified mount to the user's wanted list
  """

  mount = Mount.query.filter(Mount.name == mountName).one()
  user = User.query.get(current_user.id)

  if mount not in user.want_list:
    user.want_list.append(mount)

    db.session.commit()

  return mount.to_dict()

@mount_routes.route('/<string:mountName>/unwant')
@login_required
def remove_mount_from_wanted(mountName):
  """
  Removes the specified mount from the user's wanted list
  """

  mount = Mount.query.filter(Mount.name == mountName).one()
  user = User.query.get(current_user.id)

  if mount in user.want_list:
    user.want_list.remove(mount)

    db.session.commit()

  return mount.to_dict()