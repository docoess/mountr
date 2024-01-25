"""empty message

Revision ID: 371539f2034c
Revises: 03c63e417f7e
Create Date: 2024-01-25 09:38:50.477891

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '371539f2034c'
down_revision = '03c63e417f7e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('mounts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('blizzId', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE mounts SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('mounts')
    # ### end Alembic commands ###
