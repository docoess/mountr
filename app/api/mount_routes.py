from flask_login import login_required, current_user
from flask import Blueprint, request
from app.models import db, Post, User, Comment, Mount

mount_routes = Blueprint('mount', __name__)

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
