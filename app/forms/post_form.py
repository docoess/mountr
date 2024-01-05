from flask_wtf.file import FileRequired, FileAllowed
from wtforms.validators import DataRequired
from wtforms import StringField, FileField
from flask_wtf import FlaskForm

IMG_ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

class PostForm(FlaskForm):
  post_image = FileField('Post Image', validators=[FileRequired(), FileAllowed(list(IMG_ALLOWED_EXTENSIONS))])
  caption = StringField('Caption', validators=[DataRequired()])
  featured_mount = StringField('Featured Mount', validators=[DataRequired()])

class UpdatePostForm(FlaskForm):
  post_image = FileField('Post Image', validators=[FileAllowed(list(IMG_ALLOWED_EXTENSIONS))])
  caption = StringField('Caption', validators=[DataRequired()])
  featured_mount = StringField('Featured Mount', validators=[DataRequired()])
