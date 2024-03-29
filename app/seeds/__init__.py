from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .comments import seed_comments, undo_comments
from .wanted_mounts import undo_wanted_mounts
from .owned_mounts import undo_owned_mounts
from .mounts import seed_mounts, undo_mounts

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_wanted_mounts()
        undo_owned_mounts()
        undo_comments()
        undo_posts()
        undo_users()
    seed_users()
    seed_posts()
    seed_comments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_wanted_mounts()
    undo_owned_mounts()
    undo_comments()
    undo_posts()
    undo_users()
    # Add other undo functions here

@seed_commands.command('mounts')
def mounts():
    if environment == 'production':
        undo_mounts()
    seed_mounts()
