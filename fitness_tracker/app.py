from flask import Flask, render_template, redirect, url_for, request, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from forms import RegistrationForm, LoginForm, ProgressForm  # Ensure forms.py has these classes
from datetime import datetime
from models import db, User, Workout, Biometrics

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///fitness.db'
db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    form = RegistrationForm()
    if form.validate_on_submit():
        new_user = User(username=form.username.data, password=form.password.data)
        db.session.add(new_user)
        db.session.commit()
        flash('Account created successfully!', 'success')
        return redirect(url_for('login'))
    return render_template('signup.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and user.password == form.password.data:
            login_user(user)
            return redirect(url_for('track'))
        else:
            flash('Login Unsuccessful. Check username and password', 'danger')
    return render_template('login.html', form=form)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))

@app.route('/track', methods=['GET', 'POST'])
@login_required
def track():
    form = ProgressForm()
    if form.validate_on_submit():
        new_workout = Workout(
            user_id=current_user.id,
            exercise=form.exercise.data,
            weight=form.weight.data,
            reps=form.reps.data
        )
        db.session.add(new_workout)
        db.session.commit()
        flash('Workout logged successfully!', 'success')
        return redirect(url_for('track'))
    
    # Retrieve all workouts for the current user
    workouts = Workout.query.filter_by(user_id=current_user.id).all()
    return render_template('track.html', form=form, workouts=workouts)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
