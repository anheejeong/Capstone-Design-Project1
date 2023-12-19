import pymysql_function as pf
import pandas as pd
import datetime as dt
from dateutil.relativedelta import relativedelta

class Member:
    def __init__(self):
        #당일 일자
        #self.present_date = dt.datetime.now()
        self.present_date = dt.datetime(year=2023,month=7,day=20,hour=0,minute=0,second=0)
        
        #접속 관련
        self.counter_log = pf.sql_dataframe('xedb', 'xe_counter_log', [
            'site_srl','ipaddress', 'regdate','user_agent'
        ])
        datetime_list = []
        for i in self.counter_log['regdate']:
            datetime = dt.datetime(year=int(i[0:4]), month=int(i[4:6]), day=int(i[6:8]), hour=int(i[8:10]), minute=int(i[10:12]), second=int(i[12:14]))
            datetime_list.append(datetime)
        self.counter_log['n_regdate'] = pd.DataFrame({'n_regdate':datetime_list}, index=self.counter_log.index)
        
        #결제 기록
        self.log_df = pf.sql_dataframe('payments','log',[
            'uuid', 'status', 'product_id', 'product_name', 'amount',
            'order_id', 'method', 'mld', 'created_at', 'updated_at', 'member_srl' 
        ])
        #정회원 결제 기록
        self.product_df = pf.sql_dataframe('payments', 'product', [
            'uuid', 'product_id', 'created_at', 'updated_at', 'expired_at', 'member_srl'
        ])
        #회원 정보
        self.member_df = pf.sql_dataframe('knu', 'knu_member', [
            'member_srl', 'regdate', 'last_login', 'birthday'
        ])
    
    #유료/비유료회원 비율
    def return_paid_member(self):
        total = len(self.member_df)
        regular_df = self.product_df[self.product_df['expired_at'] >= self.present_date]
        member_paid = len(regular_df)
        member_non_paid = total-member_paid
        output_dic = {
            'regular_rate': [float(member_paid/total)*100], 'non_regular_rate': [float(member_non_paid/total)*100], 
            'regular': [member_paid], 'non_regular': [member_non_paid]
        }
        output = pd.DataFrame(output_dic)
        pf.move_to_mysql(output, 'user_percentage')
    
    #접속 일자/시간대 -> !일자 문제로 다시 변경
    def return_connection_date(self):
        end_period = self.present_date + relativedelta(days=1)
        start_period = end_period - relativedelta(years=1, months=-1)
        connection_time = pd.DataFrame(
            data= [[0]*24]*7,
            index=['0', '1', '2', '3', '4', '5', '6'],
            columns=['0','1','2','3','4','5','6','7','8','9','10','11','12',
                    '13','14','15','16','17','18','19','20','21','22','23'])
        connection_date = self.counter_log[self.counter_log['n_regdate'].between(str(start_period), str(end_period))]['n_regdate']
        for i in connection_date:
            connection_time.iloc[i.weekday(), i.hour] += 1
             
        for index in range(0, 7):
            for column in range(0, 24):
                if connection_time.iloc[index, column] < 600:
                    connection_time.iloc[index, column] = 0
                elif connection_time.iloc[index, column] >= 600 and connection_time.iloc[index, column] < 1900:
                    connection_time.iloc[index, column] = int(connection_time.iloc[index, column]/100) - 5
                else:
                    connection_time.iloc[index, column] = 14
            
        pf.move_to_mysql(connection_time, 'connection_date')
    
    #접속 수단
    def return_connection_method(self):
        method_df = self.counter_log['user_agent']
        form_type = {
            'Windows':'Web', 'MacOS':'Web', 'Linux':'Web', 'iOS':'Mobile', 'etc':'Various'
        }
        method_count = {
            'Windows':0, 'MacOS':0, 'Linux':0, 'iOS':0,'etc':0
        }
        total = len(method_df)
        for i in method_df:
            if 'Windows NT' in str(i):
                method_count['Windows'] += 1
            elif 'Macintosh' in str(i):
                method_count['MacOS'] += 1
            elif 'Linux' in str(i):
                method_count['Linux'] += 1
            elif 'iPhone' in str(i) or 'iPad' in str(i):
                method_count['iOS'] += 1
            else:
                method_count['etc'] += 1
        
        sorted_method_count = sorted(method_count.items(), key = lambda item: item[1], reverse = True)
        method_count_df = pd.DataFrame({
            'name1': [sorted_method_count[0][0]], 'count1': [round(float(sorted_method_count[0][1]/total)*100,5)], 'form1': [form_type[sorted_method_count[0][0]]],
            'name2': [sorted_method_count[1][0]], 'count2': [round(float(sorted_method_count[1][1]/total)*100,5)], 'form2': [form_type[sorted_method_count[1][0]]],
            'name3': [sorted_method_count[2][0]], 'count3': [round(float(sorted_method_count[2][1]/total)*100,5)], 'form3': [form_type[sorted_method_count[2][0]]],
            'name4': [sorted_method_count[3][0]], 'count4': [round(float(sorted_method_count[3][1]/total)*100,5)], 'form4': [form_type[sorted_method_count[3][0]]],
            'name5': [sorted_method_count[4][0]], 'count5': [round(float(sorted_method_count[4][1]/total)*100,5)], 'form5': [form_type[sorted_method_count[4][0]]],
        })
        pf.move_to_mysql(method_count_df, 'user_os')
    
    def return_new_user(self):
        this_end_period = self.present_date + relativedelta(days=1)
        this_start_period = dt.datetime(year=self.present_date.year, month=1, day=1, hour=0, minute=0, second=0)
        last_end_period = dt.datetime(year=self.present_date.year-1, month=12, day=31, hour=23, minute=59, second=59)
        last_start_period = dt.datetime(year=self.present_date.year-1, month=1, day=1, hour=1, minute=1, second=1)
        new_this_year = self.product_df[self.product_df['created_at'].between(str(this_start_period), str(this_end_period))]
        new_last_year = self.product_df[self.product_df['created_at'].between(str(last_start_period), str(last_end_period))]
        output_dic = {
            'new_this_year':[len(new_this_year)], 'rate':[str(round(float((len(new_this_year)-len(new_last_year))/len(new_last_year))*100, 3))],
            'total':[len(new_this_year)*10]
        }
        output = pd.DataFrame(output_dic)
        pf.move_to_mysql(output, 'new_user')