"""empty message

Revision ID: 3d79e3a36172
Revises: 53bc1f8292fc
Create Date: 2017-11-14 02:40:01.256977

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3d79e3a36172'
down_revision = '53bc1f8292fc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('drivers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.Unicode(length=255), nullable=True),
    sa.Column('phoneNumber', sa.Integer(), nullable=True),
    sa.Column('locationLat', sa.Float(), nullable=True),
    sa.Column('locationLng', sa.Float(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('requests',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Unicode(length=255), nullable=True),
    sa.Column('driverId', sa.Unicode(length=255), nullable=True),
    sa.Column('price', sa.Integer(), nullable=True),
    sa.Column('sourceLat', sa.Float(), nullable=True),
    sa.Column('sourceLng', sa.Float(), nullable=True),
    sa.Column('destinationLat', sa.Float(), nullable=True),
    sa.Column('destinationLng', sa.Float(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('requests')
    op.drop_table('drivers')
    # ### end Alembic commands ###