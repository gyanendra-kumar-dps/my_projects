from flask import request,Flask,jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
#user=admin123456 password=123456admin
app=Flask(__name__)
CORS(app,origins=["http://localhost:5173"])
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///admissions.db'
db=SQLAlchemy(app)
bcrypt=Bcrypt(app)
# class User(db.Model):
#     id=db.Column(db.Integer,primary_key=True,autoincrement=True)
#     user=db.Column(db.String(64),nullable=False)
#     password=db.Column(db.String(256),nullable=False)
# class Enrollment(db.Model):
#     id=db.Column(db.Integer,primary_key=True,autoincrement=True)
#     user=db.Column(db.String(64),nullable=False)
#     course=db.Column(db.String(32),nullable=False)
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user = db.Column(db.String(64), nullable=False, unique=True)
    password = db.Column(db.String(256), nullable=False)
    enrollments = db.relationship("Enrollment", backref="user_ref", lazy=True)
class Enrollment(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    course = db.Column(db.String(32), nullable=False)
with app.app_context():
    db.create_all()
@app.route("/signup",methods=['POST'])
def signup():
    data=request.get_json()
    username=data.get('username')
    password=data.get('password')
    if(User.query.filter_by(user=username).first()):
        return (jsonify({"success":False,"message":"User already exists"}),200)
    hashed_password=bcrypt.generate_password_hash(password).decode()
    new_user=User(user=username,password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return (jsonify({"success":False,"message":"User created succesfully","payload":username}),200)
@app.route("/login",methods=['POST'])
def login():
    data=request.get_json()
    username=data.get('username')
    password=data.get('password')
    cur_user=User.query.filter_by(user=username).first()
    if(cur_user and bcrypt.check_password_hash(cur_user.password,password)):
        return (jsonify({"success":True,"message":"Logined succesfully","user":username}),200)
    else:
        return (jsonify({"success":False,"message":"Wrong credentials"}),200)
@app.route("/enroll",methods=['POST'])
def enroll():
    data=request.get_json()
    username=data.get('username')
    course=data.get('course')
    if not User.query.filter_by(user=username).first():
        return jsonify({"success":False,"message":"User does not exist"}),200
    if Enrollment.query.filter_by(user=username,course=course).first():
        return jsonify({"success":False,"message":"User has already enrolled"}),200
    new_enroll=Enrollment(user=username, course=course)
    print(new_enroll,Enrollment.query.all())
    db.session.add(new_enroll)
    db.session.commit()
    return jsonify({"success":True,"message":"User enrolled successfully"}),200
@app.route("/enrollments/<username>",methods=['GET'])
def get_enrollments(username):
    if not User.query.filter_by(user=username).first():
        return jsonify({"success":False,"message":"User does not exist"}),200
    enrollments=Enrollment.query.filter_by(user=username).all()
    courses=[enroll.course for enroll in enrollments]
    print(courses)
    return jsonify({"success":True,"enrollments":courses}),200
@app.route("/allenrollments",methods=['GET'])
def all_enrollments():
    enrollments=Enrollment.query.all()
    courses=[{"user":enroll.user,"course":enroll.course} for enroll in enrollments]
    print(courses)
    return jsonify({"success":True,"enrollments":courses}),200
app.run(port=6767)