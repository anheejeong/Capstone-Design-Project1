from flask import Blueprint, render_template
import pymysql # mysql 모듈

# mysql db 연결
db = pymysql.connect(host='180.66.240.165', port=53306, user='root', password='U6ycE],+', db='xedb', charset='utf8')

bp = Blueprint('main', __name__, url_prefix='/')


@bp.route('/')
def index():
    cursor = db.cursor()  # db 데이터 가르킬 객체 생성
    sql = "SELECT * from knu.knu_counter_status"
    cursor.execute(sql)
    data_list = cursor.fetchall()
    return render_template('home.html', data_list=data_list)