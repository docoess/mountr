from wtforms.validators import DataRequired
from wtforms import StringField
from flask_wtf import FlaskForm

class CommentForm(FlaskForm):
  content = StringField('Content', validators=[DataRequired()])

class UpdateCommentForm(FlaskForm):
  content = StringField('Content', validators=[DataRequired()])
