from flask import Blueprint, jsonify # flask - Blueprint를 통해 라우팅 함수 관리, jsonify를 통해 반환값을 json형식으로 변환
import pymysql  # mysql 쿼리문을 python에서 사용할 수 있는 모듈..
import json # json 데이터 타입

# mysql db 연결
db = pymysql.connect(host='180.66.240.165', port=53306, user='root', password='U6ycE],+', db='xedb', charset='utf8')

# Blueprint - 라우팅 함수 관리
bp = Blueprint('main', __name__, url_prefix='/')


# home 화면
@bp.route('/home') # home 화면 - 방문자 수, 최근 결제 금액, 정회원/비회원 비율, 인기 검색어, 연간 월 별 조회수, 월 별 조회수 높은 게시글
def index():
    cursor = db.cursor()  # db 데이터 가르킬 객체 생성
    sql1 = "SELECT * FROM result_datas.visitor_date;"  # 1. 방문자 수 - 오늘, 어제, 이번 달 방문자 수, 어제 대비 오늘 방문자 수 증감률
    sql2 = "SELECT * FROM result_datas.payments_3months;"  # 2. 최근 3개월 결제 금액 (원)
    sql2_1 = "SELECT * FROM result_datas.payments_3months_percent;"  # 2_1 최근 3개월 결제 금액 (%)
    sql3 = "SELECT * FROM result_datas.user_percentage"  # 3. 정회원/비회원 비율
    sql4 = "SELECT * FROM result_datas.keyword_rank"  # 4. 인기 검색어
    sql5 = "SELECT * FROM result_datas.visitor_for_year;"  # 5. 금년도 월 별 조회수
    sql6 = "SELECT * FROM result_datas.hot_post"  # 6. 인기 게시글

    # 1. visitor_date
    cursor.execute(sql1)
    data = cursor.fetchone()
    today_visitor = json.dumps(data[0])
    yesterday_visitor = json.dumps(data[1])
    today_yesterday_visitor_rate = json.dumps(data[2])
    month_visitor = json.dumps(data[3])
    visitor = [today_visitor, yesterday_visitor, today_yesterday_visitor_rate, month_visitor]

    # 2. payments_3months
    cursor.execute(sql2)
    data = cursor.fetchone()
    this_month_payment = json.dumps(data[0])
    last_month_payment = json.dumps(data[1])
    last_last_month_payment = json.dumps(data[2])
    total_payment = json.dumps(data[3])
    payment = [this_month_payment, last_month_payment, last_last_month_payment, total_payment]

    # 2_1. payments_3months_percent
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

    cursor.close()
    return jsonify(result)


# user
@bp.route('/user')  # user 화면 - 월별 접속자, 정회원/비회원 비율, 접속 기기, 접속 국가
def user():
    cursor = db.cursor()
    sql1 = "SELECT * FROM result_datas.connection_date;"  # 1. 월별 접속자
    sql2 = "SELECT * FROM result_datas.user_percentage"  # 2. 정회원/비회원 비율
    sql3 = "SELECT * FROM result_datas.user_os"  # 3. 접속 기기
    #sql4 = "SELECT * FROM result_datas.user_map"  # 4. 접속 국가

    # 1. connection_date - 월별 접속자
    cursor.execute(sql1)
    # traffic = [[0] * 3 for _ in range(168)]

    circle1 = cursor.fetchone()
    circle2 = cursor.fetchone()
    circle3 = cursor.fetchone()
    circle4 = cursor.fetchone()
    circle5 = cursor.fetchone()
    circle6 = cursor.fetchone()
    circle7 = cursor.fetchone()
    day = [0] * 168
    hour = [0] * 168
    importance = [0] * 168

    # day = [0, 0, 0 .... 24개 ... 1, 1, 1, 1 .... 24개, ........... 6, 6, 6, 24개]
    # hour = [0, 1, 2, 3, 4, ... 23, 0, 1, 2, 3 ... 23]
    # importance = [7, 2, 3, 4, ... .circle1 24개 .... circle2 24개 ....]

    j = 0
    for i in range(0, 24):
        day[i] = 0
        hour[i] = j
        importance[i] = int(circle1[j])
        j += 1

    j = 0
    for i in range(24, 48):
        day[i] = 1
        hour[i] = j
        importance[i] = int(circle2[j])
        j += 1

    j = 0
    for i in range(48, 72):
        day[i] = 2
        hour[i] = j
        importance[i] = int(circle3[j])
        j += 1

    j = 0
    for i in range(72, 96):
        day[i] = 3
        hour[i] = j
        importance[i] = int(circle4[j])
        j += 1

    j = 0
    for i in range(96, 120):
        day[i] = 4
        hour[i] = j
        importance[i] = int(circle5[j])
        j += 1

    j = 0
    for i in range(120, 144):
        day[i] = 5
        hour[i] = j
        importance[i] = int(circle6[j])
        j += 1

    j = 0
    for i in range(144, 168):
        day[i] = 6
        hour[i] = j
        importance[i] = int(circle7[j])
        j += 1

    '''
    j = 0
    for i in range(0,24):
        traffic[i][0] = 0
        traffic[i][1] = j
        traffic[i][2] = int(circle1[j])
        traffic[i][2] = circle1[j]
        j += 1
    j = 0
    for i in range(24, 48):
        traffic[i][2] = int(circle2[j])
        traffic[i][2] = circle2[j]
        traffic[i][0] = 1
        traffic[i][1] = j
        j += 1

    j = 0
    for i in range(48, 72):
        traffic[i][2] = int(circle3[j])
        traffic[i][2] = circle3[j]
        traffic[i][0] = 2
        traffic[i][1] = j
        j += 1

    j = 0
    for i in range(72, 96):
        traffic[i][2] = int(circle4[j])
        traffic[i][2] = circle4[j]
        traffic[i][0] = 3
        traffic[i][1] = j
        j += 1

    j = 0
    for i in range(96, 120):
        traffic[i][2] = int(circle5[j])
        traffic[i][2] = circle5[j]
        traffic[i][0] = 4
        traffic[i][1] = j
        j += 1

    j = 0
    for i in range(120, 144):
        traffic[i][2] = int(circle6[j])
        traffic[i][2] = circle6[j]
        traffic[i][0] = 5
        traffic[i][1] = j
        j += 1

    j = 0
    for i in range(144, 168):
        traffic[i][2] = int(circle7[j])
        traffic[i][2] = circle7[j]
        traffic[i][0] = 6
        traffic[i][1] = j
        j += 1

    new_traffic = list(traffic)
    '''

    # 2. user_percentage - 정회원/비회원 비율
    cursor.execute(sql2)
    user_percentage = cursor.fetchone()

    # 3. user_os - 접속 기기
    cursor.execute(sql3)
    user_os = cursor.fetchall()

    """
    # 4. user_map - 접속 국가
    cursor.execute(sql4)
    user_map = cursor.fetchall()
    """

    result = {
        "day": day,
        "hour": hour,
        "importance": importance,
        "user_percentage": user_percentage,
        "user_os": user_os
        # "user_map": user_map
    }

    cursor.close()
    return jsonify(result)


# payment 화면 - 결제 방식, 금년/작년 구매 금액 비교, 구매 목록, 신규 유료 회원
@bp.route('/payment')
def payment():
    cursor = db.cursor()
    sql1 = "SELECT * FROM result_datas.payment_method"  # 1. 결제 방식
    sql2 = "SELECT * FROM result_datas.payment_this_year"  # 2. 올해 작년 구매 금액 비교 - 올해
    sql2_1 = "SELECT * FROM result_datas.payment_last_year"  # 2_1. 올해 작년 구매 금액 비교 - 작년
    sql3 = "SELECT * FROM result_datas.payment_list"  # 3. 구매 목록
    sql4 = "SELECT * FROM result_datas.new_user"  # 4. 신규 유료 회원


    # 1. payment_method - 결제 방식
    cursor.execute(sql1)
    data = cursor.fetchone()
    col = ['score', 'amount', 'product']
    toss_data = data[0]
    card_data = data[1]
    card = [57.1, card_data, '신용카드']
    toss = [19.6, toss_data, '토스']
    payment_method = []
    payment_method.append(col)
    payment_method.append(card)
    payment_method.append(toss)

    # 2. payment_year - 올해 작년 구매 금액 비교 - 올해
    cursor.execute(sql2)
    payment_this_year = cursor.fetchone()

    # 2_1. payment_year - 올해 작년 구매 금액 비교 - 작년
    cursor.execute(sql2_1)
    payment_last_year = cursor.fetchone()

    # 3. payment_list - 구매 목록
    cursor.execute(sql3)
    payment_list = cursor.fetchall()

    # 4. new_user - 신규 유료 회원
    cursor.execute(sql4)
    new_user = cursor.fetchall()

    result = {
        "payment_method": payment_method,
        "payment_this_year": payment_this_year,
        "payment_last_year": payment_last_year,
        "payment_list": payment_list,
        "new_user": new_user
    }

    cursor.close()
    return jsonify(result)
