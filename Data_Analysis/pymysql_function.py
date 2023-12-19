import pymysql as pms
from sqlalchemy import create_engine
import numpy as np
import pandas as pd

def sql_dataframe(database: str, query: str, columns_list: list):
    conn = pms.connect(
        host='180.66.240.165',
        port=53306,
        user='root',
        password='U6ycE],+',
        db=database, 
        charset='utf8mb4'
    )
    try:
        with conn.cursor() as cur:
            cur.execute('select * from ' + query)
            result = pd.DataFrame(cur.fetchall(), columns=columns_list)
            cur.close()
            return result
    finally:
        conn.close()

def move_to_mysql(dataframe, table_name: str):
    host = '180.66.240.165'
    port = '53306'
    user = 'root'
    password = 'U6ycE],+'
    db = 'result_datas'
    connection_str = 'mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8'.format(user, password, host, port, db)
    engine = create_engine(connection_str, encoding='utf-8', pool_recycle=3600)
    conn = engine.connect()
    dataframe.to_sql(name=table_name, con=engine, if_exists='replace', index=False)