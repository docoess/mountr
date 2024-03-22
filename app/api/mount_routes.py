from flask_login import login_required, current_user
from flask import Blueprint, request, redirect
from app.models import db, Post, User, Comment, Mount
import os
import requests

mount_routes = Blueprint('mount', __name__)

@mount_routes.route('/<int:postId>')
def get_wanted_mount(postId):
  """
  Gets the wanted status on the mount featured in the specified post
  """

  post = Post.query.get(postId)
  mount_name = post.featured_mount
  user = User.query.get(current_user.id)
  mount = Mount.query.filter(Mount.name == mount_name).one_or_none()

  if mount in user.want_list:
    return mount.to_dict()
  else:
    return {}



@mount_routes.route('/<string:mountName>/want', methods=['POST'])
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

@mount_routes.route('/<string:mountName>/unwant', methods=['PATCH'])
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

@mount_routes.route('/wanted')
@login_required
def get_all_wanted_mounts():
  """
  Returns a list of all mounts wanted by the current user
  """

  user = User.query.get(current_user.id)
  mounts = user.want_list
  parsed_mounts = [mount.to_dict() for mount in mounts]

  return parsed_mounts

@mount_routes.route('/all_owned')
@login_required
def get_all_owned_mounts():
  """
  Retrieves a list of the users owned mounts
  """

  user = User.query.get(current_user.id)
  mounts = user.owned_list
  parsed_mounts = [mount.to_dict() for mount in mounts]

  return parsed_mounts

@mount_routes.route('/owned')
@login_required
def get_owned_mounts():
  """
  Retrieves a list of the users owned mounts from battle.net
  """

  # Pull in the .env entries for a bnet dev account
  BLIZZ_CLIENT_ID = os.environ.get('BLIZZ_CLIENT_ID')
  BLIZZ_STATE = os.environ.get('BLIZZ_STATE')

  # Init an object/dict to easily keep track of variables inserted into the following redirect fstring
  data = {
    'region': 'us',
    'client_id': BLIZZ_CLIENT_ID,
    'scope': 'wow.profile',
    'state': BLIZZ_STATE,
    'redirect_uri': 'https://mountr.onrender.com/api/mounts/oauth',
    'response_type': 'code'
  }

  # Send the initial request to the bnet oauth uri
  return redirect(f"https://oauth.battle.net/authorize?client_id={data['client_id']}&scope={data['scope']}&state={data['state']}&redirect_uri={data['redirect_uri']}&response_type={data['response_type']}", code=302)


@mount_routes.route('/oauth')
@login_required
def pull_from_oauth():
  """
  Verifies the oauth request and imports mounts
  """

  # Pull in the .env entries for a bnet dev account
  BLIZZ_CLIENT_ID = os.environ.get('BLIZZ_CLIENT_ID')
  BLIZZ_SECRET =  os.environ.get('BLIZZ_SECRET')

  state = request.args.get('state')
  code = request.args.get('code')

  data = {
    'client_id': BLIZZ_CLIENT_ID,
    'client_secret': BLIZZ_SECRET,
    'scope': 'wow.profile',
    'state': state,
    'grant_type': 'authorization_code',
    'redirect_uri': 'https://mountr.onrender.com/my-profile',
    'code': code
  }

  token_response = requests.post(f"https://oauth.battle.net/token?client_id={data['client_id']}&client_secret={data['client_secret']}&grant_type={data['grant_type']}&code={data['code']}&scope={data['scope']}&redirect_uri={data['redirect_uri']}")
  tok_res = token_response.json()
  auth_string = tok_res["access_token"]
  oauth_headers = {
      'Authorization': f'Bearer {auth_string}',
      'Battlenet-Namespace': 'static-us'
  }

  auth_response = requests.get(f"https://us.api.blizzard.com/profile/user/wow/collections/mounts?namespace=profile-us&locale=en_US&access_token={auth_string}", headers=oauth_headers)
  auth_res = auth_response.json()

  mounts = auth_res['mounts']

  mount_list = [{"name": mount["mount"]["name"], "id": mount["mount"]["id"]} for mount in mounts]

  user = User.query.get(current_user.id)

  for mount in mount_list:
    mnt = Mount.query.filter(Mount.name == mount['name']).one()

    if mnt not in user.owned_list:
      user.owned_list.append(mnt)

    db.session.commit()

  return redirect('https://mountr.onrender.com/my-profile', code=302)
