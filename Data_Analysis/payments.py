import numpy as np
import pandas as pd
import pymysql_function as pf
import datetime as dt
from dateutil.relativedelta import relativedelta

class Payments:
    def __init__(self):
        #당일 일자
        #self.present_date = dt.datetime.now()
        self.present_date = dt.datetime(year=2023,month=7,day=20,hour=0,minute=0,second=0)
        
        #품목 및 가격
        self.product = {'70568900-7384-11ed-a1eb-0242ac120002':150000, 'e2a47288-7384-11ed-a1eb-0242ac120002':100000} #워크숍, 정회원
        
        #결제 데이터베이스
        self.payments_df = pf.sql_dataframe('knu', 'knu_log', [
        'uuid', 'product_id', 'amount', 'method', 'member_srl', 'created_at', 'updated_at'
        ])
    
        #올해 월별 결제
        self.payments_by_month = {
            '1':[0], '2':[0], '3':[0], '4':[0], '5':[0], '6':[0], '7':[0], '8':[0], '9':[0], '10':[0], '11':[0], '12':[0]
        }
        #작년 월별 결제
        self.payments_month_last = {
            '1':[0], '2':[0], '3':[0], '4':[0], '5':[0], '6':[0], '7':[0], '8':[0], '9':[0], '10':[0], '11':[0], '12':[0]
        }
        #결제 수단
        self.payments_method = {
            'toss_payments':[0], 'cardiomoon':[0]
        }
        #
        
        total = len(self.payments_df)
        for i in range(0, len(self.payments_df)):
            #결제 금액 계산
            if self.payments_df.iloc[i, 6].year == self.present_date.year:
                self.payments_by_month[str(self.payments_df.iloc[i,6].month)][0] += self.product[self.payments_df.iloc[i,1]]
            if self.payments_df.iloc[i, 5].year == (self.present_date-relativedelta(years=1)).year:
                self.payments_month_last[str(self.payments_df.iloc[i,5].month)][0] += self.product[self.payments_df.iloc[i,1]]
            elif self.payments_df.iloc[i, 6].year == (self.present_date-relativedelta(years=1)).year:
                self.payments_month_last[str(self.payments_df.iloc[i,6].month)][0] += self.product[self.payments_df.iloc[i,1]]
            #결제 수단 계산
            if self.payments_df.iloc[i, 3] in self.payments_method:
                self.payments_method[self.payments_df.iloc[i, 3]][0] += (1/total)*100
            else:
                self.payments_method[self.payments_df.iloc[i, 3]] = [(1/total)*100]

    #올해 월별 결제현황
    def Payments_this_year(self):
        output = pd.DataFrame(self.payments_by_month)
        #pf.move_to_mysql(output, 'payments_this_year')
        return output
    def Payments_last_year(self):
        output = pd.DataFrame(self.payments_month_last)
        return output
    
    #이번달 결제
    def Payments_3months(self):
        total = 0
        for i in range(1, self.present_date.month):
            total += self.payments_by_month[str(i)][0]
        output_dic = {
            'this_month': [self.payments_by_month[str(self.present_date.month)][0]], 
            'last_month': [self.payments_by_month[str((self.present_date-relativedelta(months=1)).month)][0]], 
            'month_before_last': [self.payments_by_month[str((self.present_date-relativedelta(months=2)).month)][0]],
            'total': [total]
        }
        output = pd.DataFrame(output_dic)
        pf.move_to_mysql(output, 'payments_3months')
    
    def Payments_3months_percent(self):
        total = 0
        for i in range(1, self.present_date.month):
            total += self.payments_by_month[str(i)][0]
        output_dic = {
            'this_month': [float(self.payments_by_month[str(self.present_date.month)][0]/total)*100], 
            'last_month': [float(self.payments_by_month[str((self.present_date-relativedelta(months=1)).month)][0]/total)*100], 
            'month_before_last': [float(self.payments_by_month[str((self.present_date-relativedelta(months=2)).month)][0]/total)*100],
        }
        output = pd.DataFrame(output_dic)
        pf.move_to_mysql(output, 'payments_3months_percent')
    
    #결제 방식
    def Payments_method(self):
        output = pd.DataFrame(self.payments_method)
        #pf.move_to_mysql(output, 'payments_method')
        return output

p = Payments()
print(p.Payments_last_year())