import datetime as dt
import pymysql_function as pf
import pandas as pd
import numpy as np
from dateutil.relativedelta import relativedelta

class Visitor:
    def __init__(self):
        #현재 날짜를 데이터셋 상 가장 최근 일자로 지정
        #self.present_date = dt.datetime.now()
        self.present_date = dt.datetime(year=2023,month=7,day=20,hour=0,minute=0,second=0)
        
        #방문 정보
        self.visit_df = pf.sql_dataframe('knu', 'knu_counter_status', [
            'regdate', 'unique_visitor', 'pageview'
        ])
        
        #regdate : integer to datetime
        self.visit_df['regdate'] = self.visit_df['regdate'].astype('str')
        self.visit_df['regdate'] = pd.to_datetime(self.visit_df['regdate'])
        
        #월별 방문자
        start_of_year = str(self.present_date.year) + '-01-01'
        df = self.visit_df[self.visit_df['regdate'].between(start_of_year,str(self.present_date))]
        self.v_this_year = {
            '1':[0], '2':[0], '3':[0], '4':[0], '5':[0], '6':[0], '7':[0], '8':[0], '9':[0], '10':[0], '11':[0], '12':[0]
        }
        for i in df['regdate']:
            row = df[df['regdate'] == i]
            month = row.iloc[0,0].month
            self.v_this_year[str(month)][0] += row.iloc[0,1]
        
    #올해의 월별 방문자수
    def visitor_this_year(self):
        output = pd.DataFrame(self.v_this_year)
        pf.move_to_mysql(output, 'visitor_this_year')
    
    #일년간 월별 방문자수
    def visitor_for_a_year(self):
        today = self.present_date
        a_year_ago = today - relativedelta(years=1, months=-1)
        start_period = dt.datetime(year=a_year_ago.year, month=a_year_ago.month, day=1, hour=0,minute=0,second=0)
        visitor_df = self.visit_df[self.visit_df['regdate'].between(str(start_period), str(today))]
        output_dic = {}
        for i in range(0, len(visitor_df)):
            date = visitor_df.iloc[i,0]
            if str(date.month) in output_dic:
                output_dic[str(date.month)][0] += visitor_df.iloc[i,1]
            else:
                output_dic[str(date.month)] = [visitor_df.iloc[i,1]]
        output = pd.DataFrame(output_dic)
        pf.move_to_mysql(output, 'visitor_for_year')

    #어제 대비 오늘 방문자 비율
    def visitor_rate_date(self):
        #어제의 방문자
        yesterday_date = self.present_date - dt.timedelta(1)
        yesterday_df = self.visit_df[self.visit_df['regdate'] == yesterday_date]
        yesterday_visitor = yesterday_df.iloc[0,1]
        #오늘의 방문자
        today_visitor_df = self.visit_df[self.visit_df['regdate'] == self.present_date]
        today_visitor = today_visitor_df.iloc[0,1]
        #비율
        rate = round(((today_visitor-yesterday_visitor)/yesterday_visitor)*100,2)
        
        output_dic = {
            'today': [today_visitor], 'yesterday': [yesterday_visitor], 'rate': [rate], 
            'this_month': [(self.v_this_year[str(self.present_date.month)][0])]
        }
        output = pd.DataFrame(output_dic)
        return output

    #지난달 대비 이달 방문자 비율
    def visitor_rate_month(self):
        st_lastmonth = dt.datetime(year=self.present_date.year,month=self.present_date.month-1,day=1,hour=0,minute=0,second=0)
        st_thismonth = dt.datetime(year=self.present_date.year,month=self.present_date.month,day=1,hour=0,minute=0,second=0)
        lastmonth_df = self.visit_df[self.visit_df['regdate'].between(str(st_lastmonth),str(st_thismonth-dt.timedelta(1)))]
        thismonth_df = self.visit_df[self.visit_df['regdate'].between(str(st_thismonth),str(self.present_date))]
        visitor_lastmonth = 0
        visitor_thismonth = 0
        for i in lastmonth_df['unique_visitor']:
            visitor_lastmonth += i
        for i in thismonth_df['unique_visitor']:
            visitor_thismonth += i
        rate = round(((visitor_thismonth-visitor_lastmonth)/visitor_lastmonth)*100,2)
        output_dic = {
            'this_month': [visitor_thismonth],'last_month': [visitor_lastmonth],'rate': [rate]
        }
        output = pd.DataFrame(output_dic)
        pf.move_to_mysql(output, 'visitor_month')

v = Visitor()
v.visitor_for_a_year()