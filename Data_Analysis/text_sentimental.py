import pandas as pd
import numpy as np
import pymysql_function as pf
from bs4 import BeautifulSoup #텍스트 전처리 -> html 태그
import re #텍스트 전처리
import string #문자열 함수
from eunjeon import Mecab #형태소 분석
from sklearn.linear_model import LogisticRegression

#목적 : 모든 회원이 작성한 게시글을 바탕으로 긍정/부정적인 반응을 파악하여 이를 유료/비유료 회원이라는 기준점을 통해 분석

class sentiment_analysis:
    def __init__(self):
        #형태소 분석기
        mecab = Mecab(dicpath="/opt/homebrew/lib/mecab/dic/mecab-ko-dic")
        #댓글 관련 데이터 프레임
        # comments_df = pf.sql_dataframe('xedb', 'xe_comments', [
        #     'comment_srl', 'module_srl', 'document_srl', 'parent_srl', 'is_secret', 
        #     'content', 'voted_count', 'blamed_count', 'notify_message', 'member_srl',
        #     'uploaded_count', 'regdate', 'last_update', 'ipadress', 'list_order', 'status' 
        # ])
        #게시글 관련 데이터 프레임
        documents_df = pf.sql_dataframe('xedb', 'xe_documents', [
            'document_srl', 'module_srl', 'category_srl', 'lang_code', 'is_notice',
            'title', 'title_bold', 'title_color', 'content', 'readed_count',
            'voted_count', 'blamed_count', 'comment_cound', 'trackback_cound','uploaded_count',
            'member_srl', 'regdate', 'last_update', 'ipaddress', 'list_order', 
            'update_order', 'allow_trackback', 'notify_message', 'status', 'comment_status'
        ])
        #유료 회원 정보
        log_df = pf.sql_dataframe('payments','log',[
            'uuid', 'status', 'product_id', 'product_name', 'amount',
            'order_id', 'method', 'mld', 'created_at', 'updated_at', 'member_srl' 
        ])
        
        #문서 관련 정보
        self.text_df = pd.DataFrame(columns=[
            'content', 'payment','sentiment'
            #content : 텍스트 내용, payment : 1/0(유료회원/비유료회원), sentiment : 1/0(긍정/부정)
        ])
        #유료 회원 시리얼 넘버
        member_srl_log = list(log_df['member_srl'])
        
        #불용어 리스트
        with open('/Users/chepi/Desktop/Codes/Python/project01/stopwords.txt', 'r') as f:
            list_file = f.readlines()
        stopwords = []
        for i in list_file:
            stopwords = list_file[0].split('-')
            
        #텍스트 전처리 함수
        def preprocess(text):
            text=text.strip()  
            text=re.compile('<.*?>').sub('', text) 
            text = re.compile('[%s]' % re.escape(string.punctuation)).sub(' ', text)  
            text = re.sub('\s+', ' ', text)  
            text = re.sub(r'\[[0-9]*\]',' ',text) 
            text=re.sub(r'[^\w\s]', ' ', str(text).strip())
            text = re.sub(r'\d',' ',text) 
            text = re.sub(r'\s+',' ',text) 
            return text

        def final(text):
            n = []
            word = mecab.nouns(text) #명사 추출
            p = mecab.pos(text)
            for pos in p:
                if pos[1] in ['SL']:
                    word.append(pos[0])
            for i in word:
                w = i
                if len(w)>1 and (w not in stopwords):
                    if (w[0] >= 'A' and w[0] <= 'Z') or (w[0] >= 'a' and w[0] <= 'z'):
                        w = w.upper()
                    n.append(w)
            return " ".join(n)

        def finalpreprocess(text):
            t = BeautifulSoup(text, "lxml").text
            return final(preprocess(t))
        #-------------------------------------------
        
        #데이터 삽입
        for i in range(len(documents_df)):
            if documents_df.iloc[i,15] in member_srl_log:
                row = {'content':[finalpreprocess(documents_df.iloc[i, 8])], 'payment':[1], 'sentiment':['NaN']}
                row_df = pd.DataFrame(row)
                self.text_df = pd.concat([self.text_df, row_df])
            else:
                row = {'content':[finalpreprocess(documents_df.iloc[i, 8])], 'payment':[0], 'sentiment':['NaN']}
                row_df = pd.DataFrame(row)
                self.text_df = pd.concat([self.text_df, row_df])
                
    def print_df(self):
        return self.text_df
    
sa = sentiment_analysis()
df = sa.print_df()
for i in range(len(df)):
    print(df.iloc[i,:])
        
        
        
        
        
        