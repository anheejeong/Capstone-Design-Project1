from flask import Blueprint

bp = Blueprint('main', __name__, url_prefix='/')


@bp.route('/hello')
def hello_webr():
    return 'Hello, Webr!'


@bp.route('/')
def index():
    return 'Webr index'


@bp.route('/app/main/dashboard')
def dashboard():
    return {"members": [{ "id" : 1, "name" : "yerin" },
    					{ "id" : 2, "name" : "dalkong" }]}