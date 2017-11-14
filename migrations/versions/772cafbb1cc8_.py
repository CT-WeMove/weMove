"""empty message

Revision ID: 772cafbb1cc8
Revises: 
Create Date: 2017-11-14 01:53:03.219503

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '772cafbb1cc8'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    # ### end Alembic commands ###
