import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
import pymysql_function as pf #MySQL 데이터베이스 호출
from eunjeon import Mecab #형태소 분석
from bs4 import BeautifulSoup #텍스트 전처리 -> html 태그
import re #텍스트 전처리
import string #문자열 함수
# from sklearn.preprocessing import MinMaxScaler
import datetime as dt
import matplotlib.pyplot as plt
from scipy.cluster.hierarchy import linkage,dendrogram
from itertools import islice
from sklearn.decomposition import PCA
import math
import random
from krwordrank.word import KRWordRank

class Text:
    def __init__(self):
        #self.present_date = dt.datetime.now()
        self.present_date = dt.datetime(year=2023,month=7,day=20,hour=0,minute=0,second=0)
        
        #형태소 분석기
        self.mecab = Mecab(dicpath="/opt/homebrew/lib/mecab/dic/mecab-ko-dic") #형태소 분석기 경로
        
        #게시글 관련 데이터 프레임
        self.documents_df = pf.sql_dataframe('plaintext', 'documents', [
            'document_srl', 'module_srl', 'category_srl', 'lang_code', 'is_notice',
            'title', 'title_bold', 'title_color', 'content', 'readed_count',
            'voted_count', 'blamed_count', 'comment_cound', 'trackback_cound','uploaded_count',
            'member_srl', 'regdate', 'last_update', 'ipaddress', 'list_order', 
            'update_order', 'allow_trackback', 'notify_message', 'status', 'comment_status'
        ])
        #댓글 관련 데이터 프레임
        self.comments_df = pf.sql_dataframe('plaintext', 'comments', [
            'comment_srl', 'module_srl', 'document_srl', 'parent_srl', 'is_secret', 
            'content', 'voted_count', 'blamed_count', 'notify_message', 'member_srl',
            'uploaded_count', 'regdate', 'last_update', 'ipadress', 'list_order', 'status' 
        ])
        #유료 회원 정보
        self.product_df = pf.sql_dataframe('payments','product',[
            'uuid', 'product_id', 'created_at', 'updated_at', 'expired_at','member_srl' 
        ])
        #전체 문장 전처리
        self.text_df = pd.DataFrame(columns=[
            'content', 'text'
        ])
        
        #불용어 리스트
        with open('/Users/chepi/Desktop/web_r/Capstone-Design-Project1/Data_Analysis/stopwords.txt', 'r') as f:#불용어 텍스트 경로
            list_file = f.readlines()
        self.stopwords = []
        for i in list_file:
            self.stopwords = list_file[0].split('-')
            
    #텍스트 전처리 함수
    def preprocess(self,text):
        text=text.strip()  
        text=re.compile('<.*?>').sub('', text) 
        text = re.compile('[%s]' % re.escape(string.punctuation)).sub(' ', text)  
        text = re.sub('\s+', ' ', text)  
        text = re.sub(r'\[[0-9]*\]',' ',text) 
        text=re.sub(r'[^\w\s]', ' ', str(text).strip())
        text = re.sub(r'\d',' ',text) 
        text = re.sub(r'\s+',' ',text) 
        return text

    def final(self,text):
        n = []
        word = self.mecab.nouns(text) #명사 추출
        p = self.mecab.pos(text)
        for pos in p:
            if pos[1] in ['SL']:
                word.append(pos[0])
        for i in word:
            w = i
            if len(w)>1 and (w not in self.stopwords):
                if (w[0] >= 'A' and w[0] <= 'Z') or (w[0] >= 'a' and w[0] <= 'z'):
                    w = w.upper()
                n.append(w)
        return " ".join(n)
    
    def finalpreprocess(self,text):
        return self.final(self.preprocess(text))
    #-------------------------------------------
    
    #게시글 전처리 및 분류
    def keyword(self):
        for i in range(0, len(self.documents_df)):
            text = self.documents_df.iloc[i,8]
            tf = pd.DataFrame({'content':[text],
                               'text':[self.finalpreprocess(text)]
                               })
            self.text_df = pd.concat([self.text_df, tf])
            
        word_df = self.text_df['text']
        word_dic = {}
        for i in word_df:
            text = i.split(' ')
            for j in text:
                if j in word_dic:
                    word_dic[j] += 1
                else:
                    word_dic[j] = 1
        word_sorted_dict = dict(sorted(word_dic.items(), key= lambda item:item[1], reverse=True))
        best5_dic = dict(islice(word_sorted_dict.items(), 5))
        best5_key_list = list(best5_dic.keys())
        best5_value_list = list(best5_dic.values())
        total = sum(best5_dic.values())
        output_dic = {
            '1st_key':[best5_key_list[0]], '1st_value':[int(float(best5_value_list[0]/total)*100)],
            '2nd_key':[best5_key_list[1]], '2nd_value':[int(float(best5_value_list[1]/total)*100)],
            '3nd_key':[best5_key_list[2]], '3nd_value':[int(float(best5_value_list[2]/total)*100)],
            '4nd_key':[best5_key_list[3]], '4nd_value':[int(float(best5_value_list[3]/total)*100)],
            '5nd_key':[best5_key_list[4]], '5nd_value':[int(float(best5_value_list[4]/total)*100)]
        }
        output = pd.DataFrame(output_dic)
        pf.move_to_mysql(output, 'keyword_rank')
           
    #조회수 가장 높은 게시글 best5 
    def most_read(self):
        start = str(self.present_date.year)+'0101000000'
        present = str(self.present_date.year)+str(self.present_date.month)+str(self.present_date.day)+'000000'
        documents_this_year_df = self.documents_df[self.documents_df['regdate'].between(start,present)]
        
        sorted_documents_df = documents_this_year_df.sort_values(by="readed_count", ascending=False).head(5)
        total_read_count = documents_this_year_df['readed_count'].sum()
        
        needed_documents_df = pd.DataFrame()
        needed_documents_df['title'] = sorted_documents_df['title']
        
        str_list = []
        for i in sorted_documents_df['content']:
            str_document = i[0:100]
            str_list.append(str_document)
        needed_documents_df['content'] = pd.DataFrame(str_list, columns=['content'], index=needed_documents_df.index)
        
        regdate_list = []
        for i in sorted_documents_df['regdate']:
            datetime = dt.datetime(year=int(i[0:4]), month=int(i[4:6]), day=int(i[6:8]), hour=int(i[8:10]), minute=int(i[10:12]), second=int(i[12:14]))
            regdate_list.append(datetime)
        needed_documents_df['regdate'] = pd.DataFrame(regdate_list, columns=['regdate'], index=needed_documents_df.index)
        
        needed_documents_df['readed_count'] = sorted_documents_df['readed_count']
        
        read_list = []
        for i in sorted_documents_df['readed_count']:
            read_list.append(float(i/total_read_count)*100)
        needed_documents_df['readed_percent'] = pd.DataFrame(read_list, columns=['readed_percent'], index=needed_documents_df.index)
        
        pf.move_to_mysql(needed_documents_df, 'hot_post')
    
    def cluster_size_set(self, df):
        symbolsize = []
        set_size, set_value = (2.6666666666666665, 7)
        for i in range(len(df)):
            symbolsize.append(float(df.iloc[i,4]/set_value)*set_size)
        
        for i in range(len(symbolsize)):
            if i < 20:
                continue
            elif i >= 20 and i < 30:
                i = i*0.8
            elif i >= 30:
                i = i*0.6
            elif i >= 50:
                i = i*0.3
        df['value'] = pd.DataFrame(data=symbolsize, index=df.index, columns=['value'])
        return df
    
    #좌표 조정02
    def range_set(self, df, k):
        pca_df = df
        limit_range = max([abs(df['x'].max()),abs(df['x'].min()),abs(df['y'].max()),abs(df['y'].min())])
        lr_c = 600/limit_range
        pca_df['x'], pca_df['y'] = (pca_df['x'].mul(lr_c), pca_df['y'].mul(lr_c))
        x_set = [x for x in range(-600, 600, 100)]
        y_set = [y for y in range(-600, 600, 100)]
        
        output_df = pd.DataFrame(columns=['x', 'y', 'word', 'category', 'value'])
        xy_list = []
        for i1 in range(k):
            cluster_df = pca_df[pca_df['category'] == i1]
            x_list = []
            y_list = []
            word_list = []
            category_list = []
            value_list = []
            for i2 in range(len(cluster_df)):
                nx, ny, distance = (0,0,1200*math.sqrt(2))
                cx, cy = (cluster_df.iloc[i2,0], cluster_df.iloc[i2,1])
                for i3 in x_set:
                    for i4 in y_set:
                        d = math.sqrt((i3-cx)**2 + (i4-cy)**2)
                        if (d <= distance):
                            for xy in xy_list:
                                if (xy[0] == i3) and (xy[1] == i4):
                                    break
                            else:
                                distance = d
                                nx, ny = (i3, i4)
                xy_list.append([nx, ny])
                x_list.append(nx)
                y_list.append(ny)
                word_list.append(cluster_df.iloc[i2, 2])
                category_list.append(i1)
                value_list.append(cluster_df.iloc[i2,4])
            for i in range(len(x_list)):
                x_list[i] = x_list[i]+random.uniform(-75, 75)
            for i in range(len(y_list)):
                y_list[i] = y_list[i]+random.uniform(-75, 75)
                
            input_dic = {
                'x':x_list,
                'y':y_list,
                'word':word_list,
                'category':category_list,
                'value':value_list
            }
            input_df = pd.DataFrame(input_dic)
            output_df = pd.concat([output_df, input_df])
            
        for i in range(len(output_df)):
            if output_df.iloc[i,3] == 2:
                output_df.iloc[i,0] -= 500
            
        return output_df

    #클러스터링
    def clustering(self):
        test_df = pd.DataFrame(columns=['content', 'word'])
        test_df['content'] = self.documents_df['content']
        word_list = []

        #텍스트 전처리
        for i in self.documents_df['content']:
            word_list.append(self.finalpreprocess(i))

        #test_df에 전처리된 어휘 column 추가
        test_df['word'] = pd.DataFrame(word_list, index=self.documents_df.index)

        ##method1 by k-means
        tfidf_vector = TfidfVectorizer(min_df=0.01, max_df=0.9)
        feature_vector = tfidf_vector.fit_transform(test_df['word'])

        #dtm 생성
        columns = []
        for k, v in sorted(tfidf_vector.vocabulary_.items(), key=lambda item:item[1]):
            columns.append(k)
        dtm_df = pd.DataFrame(feature_vector.toarray(), columns=columns)
        tdm_df = dtm_df.T

        #어휘 df 생성
        tdm_df['total'] = tdm_df.sum(axis=1)
        vocabulary_df = tdm_df[tdm_df['total'].rank(ascending=False) <= 70] #tfidf 가중치 상위 100개 단어 선정
        values = list(vocabulary_df['total'])
        vocabulary_df = vocabulary_df.drop('total', axis=1)

        #단어간 군집 경향 시각화
        # clusters = linkage(vocabulary_df, method='ward', metric='euclidean')
        # plt.figure(figsize=(20, 10))               # 이미지 크기 설정
        # dendrogram(clusters,
        #            leaf_rotation=50,               # 라벨 50% 기울이기
        #            leaf_font_size=10,              # 라벨 폰트 크기
        #            labels= vocabulary_df.index)          # 라벨에 사용할 변수
        # plt.show()
        #-> k = 4로 설정

        #k-means를 통한 군집화
        k_cluster=4
        km = KMeans(n_clusters=k_cluster, init='k-means++', max_iter=1000, random_state=0)
        predict = km.fit_predict(vocabulary_df)
        vocabulary_df['predict'] = predict
        
        #단어에 좌표 추가
        pca = PCA(n_components=2)
        vocabulary_pca = pca.fit_transform(vocabulary_df.iloc[0:,:-1])
        index_pca = [x for x in range(0,70)]
        pca_df = pd.DataFrame(data=vocabulary_pca, index=index_pca, columns=['x', 'y'])
        
        pca_df['word'] = pd.DataFrame(data=list(vocabulary_df.index), index=index_pca, columns=['word'])
        pca_df['category'] = predict
        pca_df['value'] = pd.DataFrame(data=values, index=index_pca, columns=['value'])
        output_df=self.cluster_size_set(pca_df)
        #output_df=self.range_set(pca_df, k_cluster)
        
        plt.scatter(output_df[output_df['category']==0]['x'], output_df[output_df['category']==0]['y'],s=output_df[output_df['category']==0]['value'], c='blue')
        plt.scatter(output_df[output_df['category']==1]['x'], output_df[output_df['category']==1]['y'],s=output_df[output_df['category']==1]['value'], c='red')
        plt.scatter(output_df[output_df['category']==2]['x'], output_df[output_df['category']==2]['y'],s=output_df[output_df['category']==2]['value'], c='yellow')
        plt.scatter(output_df[output_df['category']==3]['x'], output_df[output_df['category']==3]['y'],s=output_df[output_df['category']==3]['value'], c='green')
        plt.show()
        
        #pf.move_to_mysql(output_df, 'clustering01')
                    
    def func_keyword(self, df): #문서를 통한 키워드 추출
        wordrank_extract = KRWordRank(min_count=50, max_length=10, verbose=True)
        texts = list(df['text'])
        keywords, rank, graph = wordrank_extract.extract(texts, 0.85, 1000)
        output = pd.DataFrame(data=list(keywords.keys())[:50], columns=['word'])
        output['value'] = pd.DataFrame(data=list(keywords.values())[:50], columns=['value'])
        return output
        
    #정회원/비정회원 키워드 분류
    def keyword_by_member(self):
        regular_srl = list(self.product_df['member_srl'])
        regular_content = []
        regular_text = []
        non_regular_content = []
        non_regular_text = []
        
        for i in range(len(self.documents_df)):
            if self.documents_df.iloc[i,15] in regular_srl:
                regular_content.append(self.documents_df.iloc[i,8])
                regular_text.append(self.finalpreprocess(self.documents_df.iloc[i,8]))
            else:
                non_regular_content.append(self.documents_df.iloc[i,8])
                non_regular_text.append(self.finalpreprocess(self.documents_df.iloc[i,8]))
        
        regular_df = pd.DataFrame(data={
            'content' : regular_content, 'text' : regular_text
        })
        non_regular_df = pd.DataFrame(data={
            'content' : non_regular_content, 'text' : non_regular_text
        })
        
        output_regular = self.func_keyword(regular_df)
        output_non = self.func_keyword(non_regular_df)
        pf.move_to_mysql(output_regular, 'keyword_regular')
        pf.move_to_mysql(output_non, 'keyword_non_regular')
        
t = Text()
t.clustering()