from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, IntegerField, SelectField
from wtforms.validators import DataRequired, Length

class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=5, max=150)])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=6)])
    submit = SubmitField('Sign Up')

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')

class ProgressForm(FlaskForm):
    exercise = SelectField('Exercise', choices=[('Bench Press', 'Bench Press'), ('Squat', 'Squat'), ('Deadlift', 'Deadlift')], validators=[DataRequired()])
    weight = IntegerField('Weight (kg)', validators=[DataRequired()])
    reps = IntegerField('Reps', validators=[DataRequired()])
    submit = SubmitField('Log Workout')
