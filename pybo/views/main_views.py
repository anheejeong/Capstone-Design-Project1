<<<<<<< Updated upstream
from flask import Blueprint, jsonify # Blueprint를 통해 라우팅 함수 관리, jsonify를 통해 반환값을 json형식으로 변환
import pymysql  # mysql을 python에서 사용할 수 있도록 하는 라이브러리
=======
from flask import Blueprint, jsonify # flask - Blueprint를 통해 라우팅 함수 관리, jsonify를 통해 반환값을 json형식으로 변환
import pymysql  # mysql 쿼리문을 python에서 사용할 수 있는 모듈
>>>>>>> Stashed changes
import json # json 데이터 타입

db = pymysql.connect(host='180.66.240.165', port=53306, user='root', password='U6ycE],+', db='xedb', charset='utf8')

<<<<<<< Updated upstream
=======
# Blueprint - 라우팅 함수 관리
>>>>>>> Stashed changes
bp = Blueprint('main', __name__, url_prefix='/')


# home
@bp.route('/home') # home - 방문자 수, 최근 결제 금액, 정회원/비회원 비율, 인기 검색어, 월 별 방문자 수, 조회수 높은 게시글
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
@bp.route('/user')  # user 화면 - 월별 접속자, 정회원/비회원 비율, 접속 기기
def user():
    cursor = db.cursor()
    sql1 = "SELECT * FROM result_datas.connection_date;"  # 1. 월별 접속자
    sql2 = "SELECT * FROM result_datas.user_percentage"  # 2. 정회원/비회원 비율
    sql3 = "SELECT * FROM result_datas.user_os"  # 3. 접속 기기

    # 1. connection_date - 월별 접속자
    cursor.execute(sql1)

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

    # 2. user_percentage - 정회원/비회원 비율
    cursor.execute(sql2)
    user_percentage = cursor.fetchone()

    # 3. user_os - 접속 기기
    cursor.execute(sql3)
    user_os = cursor.fetchall()

<<<<<<< Updated upstream
=======
    """
    # 4. user_map - 접속 국가
    cursor.execute(sql4)
    user_map = cursor.fetchall()
    """

>>>>>>> Stashed changes
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


# payment - 결제 방식, 금년/작년 구매 금액 비교, 구매 목록, 신규 유료 회원
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
<<<<<<< Updated upstream
=======
        '''
>>>>>>> Stashed changes
        "new_user": new_user
    }

    cursor.close()
    return jsonify(result)


#nlp - 클러스터링, 정회원/비회원 키워드
@bp.route('/nlp')
def nlp():
    cursor = db.cursor()
<<<<<<< Updated upstream

    sql1 = "SELECT * FROM result_datas.clustering01"
    sql2 = "SELECT * FROM result_datas.keyword_regular"
    sql3 = "SELECT * FROM result_datas.keyword_non_regular"

    # 1. clustering
    cursor.execute(sql1)

    clustering_list = list()
    for i in range(0, 70):
        data = cursor.fetchone()
        new_lst = [str(i), data[2], data[4], data[0], data[1], data[4], data[3]]
        clustering_list.append(new_lst)

    # 2. word cloud
    cursor.execute(sql2)
    regular = cursor.fetchall()

    cursor.execute(sql3)
    non_regular = cursor.fetchall()

    result = {
        "clustering": clustering_list,
        "regular": regular,
        "non_regular": non_regular
    }

    cursor.close()
    return jsonify(result)
=======
    #sql1 = "SELECT * FROM result_datas."
>>>>>>> Stashed changes
