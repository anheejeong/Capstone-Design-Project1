from flask import Blueprint

bp = Blueprint('main', __name__, url_prefix='/')


@bp.route('/hello')
def hello_webr():
    return 'Hello, Webr!'


@bp.route('/')
def index():
    return 'Webr index'
