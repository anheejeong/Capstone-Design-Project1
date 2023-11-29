from flask import Blueprint, jsonify, render_template
import pymysql  # mysql 모듈
import json

# mysql db 연결
db = pymysql.connect(host='180.66.240.165', port=53306, user='root', password='U6ycE],+', db='xedb', charset='utf8')

bp = Blueprint('main', __name__, url_prefix='/')


@bp.route('/home')
def index():
    cursor = db.cursor()  # db 데이터 가르킬 객체 생성
    sql1 = "SELECT * FROM result_datas.visitor_date;" # 1. 방문자 수 - 오늘, 어제, 어제 오늘 비율, 이번 달
    sql2 = "SELECT * FROM result_datas.payments_3months;" # 2. 이번 달, 저번달, 저저번달, 이번년 총결제금액
    sql2_1 = "SELECT * FROM result_datas.payments_3months_percent;" # 2_1 sql2를 %로 나타냄
    sql3 = "SELECT * FROM result_datas.user_percentage" # 3. 정회원, 비회원 비율
    sql4 = "SELECT * FROM result_datas.keyword_rank" # 4. 인기검색어 5개
    sql5 = "SELECT * FROM result_datas.visitor_for_year;" # 5. 이번 년도 월별 조회수
    sql6 = "SELECT * FROM result_datas.hot_post" # 6. 인기 게시글 5개

    # 1. visitor
    cursor.execute(sql1)
    data = cursor.fetchone()
    today_visitor = json.dumps(data[0])
    yesterday_visitor = json.dumps(data[1])
    today_yesterday_visitor_rate = json.dumps(data[2])
    month_visitor = json.dumps(data[3])
    visitor = [today_visitor, yesterday_visitor, today_yesterday_visitor_rate, month_visitor]

    # 2. payment
    cursor.execute(sql2)
    data = cursor.fetchone()
    this_month_payment = json.dumps(data[0])
    last_month_payment = json.dumps(data[1])
    last_last_month_payment = json.dumps(data[2])
    total_payment = json.dumps(data[3])
    payment = [this_month_payment, last_month_payment, last_last_month_payment, total_payment]

    # 2_1. payment_percent
    cursor.execute(sql2_1)
    payment_percent = cursor.fetchone()


    # 3. user_percentage
    cursor.execute(sql3)
    user_percentage = cursor.fetchone()

    # 4. keyword_rank
    cursor.execute(sql4)
    keyword_rank = cursor.fetchone()

    # 5. visitor_for_year
    cursor.execute(sql5)
    visitor_for_year = cursor.fetchone()

    # 6. hot_post

    cursor.execute(sql6)
    hot_post = cursor.fetchall()

    result = {
        "visitor": visitor,
        "payment": payment,
        "payment_percent": payment_percent,
        "user_percentage": user_percentage,
        "keyword_rank": keyword_rank,
        "visitor_for_year": visitor_for_year,
        "hot_post": hot_post
    }

    return render_template('user.html')


@bp.route('/user')
def user():
    cursor = db.cursor()
    sql1 = "SELECT * FROM result_datas.connection_date;"
    sql2 = "SELECT * FROM result_datas.visitor_date;"

    #1
    cursor.execute(sql1)
    traffic = [[0] * 3 for _ in range(168)]

    circle1 = cursor.fetchone()
    circle2 = cursor.fetchone()
    circle3 = cursor.fetchone()
    circle4 = cursor.fetchone()
    circle5 = cursor.fetchone()
    circle6 = cursor.fetchone()
    circle7 = cursor.fetchone()

    j = 0
    for i in range(0,24):
        traffic[i][0] = 0
        traffic[i][1] = j
        traffic[i][2] = circle1[j]
        j += 1

    j = 0
    for i in range(24, 48):
        traffic[i][2] = circle2[j]
        traffic[i][0] = 1
        traffic[i][1] = j
        j += 1

    j = 0
    for i in range(48, 72):
        traffic[i][2] = circle3[j]
        traffic[i][0] = 2
        traffic[i][1] = j
        j += 1

    j = 0
    for i in range(72, 96):
        traffic[i][2] = circle4[j]
        traffic[i][0] = 3
        traffic[i][1] = j
        j += 1

    j = 0
    for i in range(96, 120):
        traffic[i][2] = circle5[j]
        traffic[i][0] = 4
        traffic[i][1] = j
        j += 1

    j = 0
    for i in range(120, 144):
        traffic[i][2] = circle6[j]
        traffic[i][0] = 5
        traffic[i][1] = j
        j += 1

    j = 0
    for i in range(144, 168):
        traffic[i][2] = circle7[j]
        traffic[i][0] = 6
        traffic[i][1] = j
        j += 1

    result = {
        "traffic": traffic

    }

    return jsonify(result)
