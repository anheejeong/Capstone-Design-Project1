import pymysql

# 데이터베이스 연결
conn = pymysql.connect(host="180.66.240.165",
                           user="root", password="U6ycE],+", db="xedb", charset="utf8")
#

curs = conn.cursor()

# 연결된 데이터베이스에서 쿼리 실행하기
curs.execute(query)

#실행된 쿼리 결과값을 가져오기
rows = curs.fetchall()

# 반복문으로 한줄씩 읽기
for row in rows:
    print(row)

# 데이터베이스 연결 종료
conn.close()