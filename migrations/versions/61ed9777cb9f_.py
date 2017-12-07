"""empty message

Revision ID: 61ed9777cb9f
Revises: 
Create Date: 2017-12-06 11:24:04.849483

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '61ed9777cb9f'
down_revision = None
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
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.Unicode(length=255), nullable=True),
    sa.Column('phoneNumber', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('visit')
    op.drop_table('guestbook')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('guestbook',
    sa.Column('guestname', sa.VARCHAR(length=255), autoincrement=False, nullable=True),
    sa.Column('content', sa.VARCHAR(length=255), autoincrement=False, nullable=True),
    sa.Column('entryid', sa.INTEGER(), nullable=False),
    sa.PrimaryKeyConstraint('entryid', name=u'guestbook_pkey')
    )
    op.create_table('visit',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('timestamp', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.Column('user_ip', sa.VARCHAR(length=46), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name=u'visit_pkey')
    )
    op.drop_table('users')
    op.drop_table('requests')
    op.drop_table('drivers')
    # ### end Alembic commands ###