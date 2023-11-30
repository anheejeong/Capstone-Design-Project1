import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.cluster import DBSCAN
from pyclustering.cluster import kmedoids
import pymysql_function as pf #MySQL 데이터베이스 호출
from eunjeon import Mecab #형태소 분석
from bs4 import BeautifulSoup #텍스트 전처리 -> html 태그
import re #텍스트 전처리
import string #문자열 함수
from sklearn.preprocessing import MinMaxScaler
import datetime as dt
import matplotlib.pyplot as plt
from scipy.cluster.hierarchy import linkage, dendrogram
from itertools import islice

class Text:
    def __init__(self):
        #self.present_date = dt.datetime.now()
        self.present_date = dt.datetime(year=2023,month=7,day=20,hour=0,minute=0,second=0)
        
        self.mecab = Mecab(dicpath="/opt/homebrew/lib/mecab/dic/mecab-ko-dic")
        
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
        self.log_df = pf.sql_dataframe('payments','log',[
            'uuid', 'status', 'product_id', 'product_name', 'amount',
            'order_id', 'method', 'mld', 'created_at', 'updated_at', 'member_srl' 
        ])
        #전체 문장 전처리
        self.text_df = pd.DataFrame(columns=[
            'content', 'text'
        ])
        
        #불용어 리스트
        with open('/Users/chepi/Desktop/Codes/Python/project01/stopwords.txt', 'r') as f:
            list_file = f.readlines()
        self.stopwords = []
        for i in list_file:
            self.stopwords = list_file[0].split('-')
        
        self.vocabulary_df = []
            
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
            
    def most_read(self):
        start = str(self.present_date.year)+'0101000000'
        present = str(self.present_date.year)+str(self.present_date.month)+str(self.present_date.day)+'000000'
        documents_this_year_df = self.documents_df[self.documents_df['regdate'].between(start,present)]
        
        sorted_documents_df = documents_this_year_df.sort_values(by="readed_count", ascending=False).head(5)
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
        needed_documents_df['readed_count'] = documents_this_year_df['readed_count']
        
        pf.move_to_mysql(needed_documents_df, 'hot_post')
         # index = needed_documents_df.index
        # output1 = needed_documents_df.loc[[index[0]]]
        # output2 = needed_documents_df.loc[[index[0]]]
        # output3 = needed_documents_df.loc[[index[0]]]
        # output4 = needed_documents_df.loc[[index[0]]]
        # output5 = needed_documents_df.loc[[index[0]]]
        # pf.move_to_mysql(output1, 'hot_post_1')
        # pf.move_to_mysql(output2, 'hot_post_2')
        # pf.move_to_mysql(output3, 'hot_post_3')
        # pf.move_to_mysql(output4, 'hot_post_4')
        # pf.move_to_mysql(output5, 'hot_post_5')
        
    def clustering(self): #Test : 1년간 게시글/댓글을 통한 클러스터링
            clustering_df = pd.DataFrame(columns=[
                'content', 'words', 'group'
            ], index=self.documents_df.index)
            
            today = str(self.present_date.year)+str(self.present_date.month)+
            a_year_ago = today - relativedelta(years=1, months=-1)
            start_period = dt.datetime(year=a_year_ago.year, month=a_year_ago.month, day=1, hour=0,minute=0,second=0)
            
            clustering_df['content'] = self.documents_df['content']
            words_list = []
            for i in clustering_df['content']:
                text = self.finalpreprocess(i)
                words_list.append(text)
                
            clustering_df['words'] = pd.DataFrame(words_list, columns=['words'], index=clustering_df.index)
            
            tfidfv = TfidfVectorizer()
            
            
        
t = Text()
t.clustering()


# class Text:
#     def __init__(self):
#         self.mecab = Mecab(dicpath="/opt/homebrew/lib/mecab/dic/mecab-ko-dic")

#         #댓글 관련 데이터 프레임
#         self.comments_df = pf.sql_dataframe('xedb', 'xe_comments', [
#             'comment_srl', 'module_srl', 'document_srl', 'parent_srl', 'is_secret', 
#             'content', 'voted_count', 'blamed_count', 'notify_message', 'member_srl',
#             'uploaded_count', 'regdate', 'last_update', 'ipadress', 'list_order', 'status' 
#         ])
#         #게시글 관련 데이터 프레임
#         self.documents_df = pf.sql_dataframe('xedb', 'xe_documents', [
#             'document_srl', 'module_srl', 'category_srl', 'lang_code', 'is_notice',
#             'title', 'title_bold', 'title_color', 'content', 'readed_count',
#             'voted_count', 'blamed_count', 'comment_cound', 'trackback_cound','uploaded_count',
#             'member_srl', 'regdate', 'last_update', 'ipaddress', 'list_order', 
#             'update_order', 'allow_trackback', 'notify_message', 'status', 'comment_status'
#         ])
#         #유료 회원 정보
#         log_df = pf.sql_dataframe('payments','log',[
#             'uuid', 'status', 'product_id', 'product_name', 'amount',
#             'order_id', 'method', 'mld', 'created_at', 'updated_at', 'member_srl' 
#         ])

#         #회원별 데이터프레임
#         self.text_df = pd.DataFrame(columns=[
#             'content', 'clustered_text', 'group', 'text_category', 'member_category'
#         ])

#         #유료 회원 시리얼 넘버
#         self.member_srl_log = list(log_df['member_srl'])

#         #불용어 리스트
#         with open('/Users/chepi/Desktop/Codes/Python/project01/stopwords.txt', 'r') as f:
#             list_file = f.readlines()
#         self.stopwords = []
#         for i in list_file:
#             self.stopwords = list_file[0].split('-')

#     #텍스트 전처리 함수
#     def preprocess(self,text):
#         text=text.strip()  
#         text=re.compile('<.*?>').sub('', text) 
#         text = re.compile('[%s]' % re.escape(string.punctuation)).sub(' ', text)  
#         text = re.sub('\s+', ' ', text)  
#         text = re.sub(r'\[[0-9]*\]',' ',text) 
#         text=re.sub(r'[^\w\s]', ' ', str(text).strip())
#         text = re.sub(r'\d',' ',text) 
#         text = re.sub(r'\s+',' ',text) 
#         return text

#     def final(self,text):
#         n = []
#         word = self.mecab.nouns(text) #명사 추출
#         p = self.mecab.pos(text)
#         for pos in p:
#             if pos[1] in ['SL']:
#                 word.append(pos[0])
#         for i in word:
#             w = i
#             if len(w)>1 and (w not in self.stopwords):
#                 if (w[0] >= 'A' and w[0] <= 'Z') or (w[0] >= 'a' and w[0] <= 'z'):
#                     w = w.upper()
#                 n.append(w)
#         return " ".join(n)
    
#     def finalpreprocess(self,text):
#         return self.final(self.preprocess(text))
#     #-------------------------------------------
    
#     #문서 전처리 및 분류
#     def text_frame(self):
#         for i in range(0, len(self.documents_df)):
#             text = self.documents_df.iloc[i,8].replace('\n', '')
#             text = BeautifulSoup(text, "lxml").text
#             tf = pd.DataFrame({'content':[text],
#                                'clustered_text':[self.finalpreprocess(text)],
#                                 'group':[0],
#                                 'text_category':'document'})
#             if self.documents_df.iloc[i,15] in self.member_srl_log:
#                 tf['member_category'] = 'regular'
#                 self.text_df = pd.concat([self.text_df, tf])
#             else:
#                 tf['member_category'] = 'non_regular'
#                 self.text_df = pd.concat([self.text_df, tf])
#         for i in range(0, len(self.comments_df)):
#             text = BeautifulSoup(self.comments_df.iloc[i,5], "lxml").text
#             tf = pd.DataFrame({'content':[text],
#                                 'clustered_text':[self.finalpreprocess(text)],
#                                 'group':[0],
#                                 'text_category':'comment'})
#             if self.comments_df.iloc[i,9] in self.member_srl_log:
#                 tf['member_category'] = 'regular'
#                 self.text_df = pd.concat([self.text_df, tf])
#             else:
#                 tf['member_category'] = 'non_regular'
#                 self.text_df = pd.concat([self.text_df, tf])
#         return self.text_df
        
#     def text_clustering(self):
#         self.text_frame()
#         #벡터화
#         tfidfv = TfidfVectorizer()
#         tfidf = tfidfv.fit_transform(self.text_df['clustered_text'])
#         tfidf_matrix = pd.DataFrame(np.array(tfidf.todense()), columns=tfidfv.get_feature_names_out(), index=self.text_df['clustered_text'])
#         import matplotlib.pyplot as plt
#         from scipy.cluster.hierarchy import dendrogram, linkage
#         method = 'ward'
#         z = linkage(tfidf_matrix, method)
#         plt.rcParams['font.family'] = 'AppleGothic'
#         fig, ax = plt.subplots(figsize=(20,20))
#         dendrogram(z, ax=ax, labels=tfidf_matrix.index, orientation='right')
#         plt.show()
                
#     #일주일, 시간대별 게시글 및 댓글 작성량
#     def write_per_week(self): #0-14 range
#         week_time = pd.DataFrame(
#             data= [[0]*24]*7,
#             index=['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
#             columns=['0','1','2','3','4','5','6','7','8','9','10','11','12',
#                     '13','14','15','16','17','18','19','20','21','22','23'])
#         documents_date = self.documents_df['regdate']
#         comments_date = self.comments_df['regdate']
#         for i in documents_date:
#             datetime = dt.datetime(year=int(i[0:4]), month=int(i[4:6]), day=int(i[6:8]), hour=int(i[8:10]), minute=int(i[10:12]), second=int(i[12:14]))
#             week_time.iloc[datetime.weekday(), datetime.hour] += 1
#         for i in comments_date:
#             datetime = dt.datetime(year=int(i[0:4]), month=int(i[4:6]), day=int(i[6:8]), hour=int(i[8:10]), minute=int(i[10:12]), second=int(i[12:14]))
#             week_time.iloc[datetime.weekday(), datetime.hour] += 1
        
#         #pf.move_to_mysql(week_time, 'write_per_week')
#         return week_time
#     def 
        
# t = Text()
# df = t.text_frame()
# for i in range(0, len(df)):
#     print(df.iloc[i,:])



#댓글 내 html 태그 제거 및 어휘 추출
# regular = [] #유료회원
# non_regular = [] #비유료회원
# for i in range(0, len(comments_df)):
#     text = BeautifulSoup(comments_df.iloc[i,5], "lxml").text
#     if comments_df.iloc[i,9] in member_srl_log:
#         regular.append(text)
#         texts_regular.append(finalpreprocess(text))
#     else:
#         non_regular.append(text)
#         texts_non_regular.append(finalpreprocess(text))
# for i in range(0, len(documents_df)):
#     text = BeautifulSoup(documents_df.iloc[i,8], "lxml").text
#     if documents_df.iloc[i,15] in member_srl_log:
#         regular.append(text)
#         texts_regular.append(finalpreprocess(text))
#     else:
#         non_regular.append(text)
#         texts_non_regular.append(finalpreprocess(text))

# 유료회원 벡터화
# vectorizer = TfidfVectorizer(min_df=5, ngram_range=(1,3))
# vector = vectorizer.fit_transform(texts_regular).toarray()
# vector = np.array(vector)

#DBSCAN
# model = DBSCAN(eps=0.3, min_samples=6, metric='cosine')
# result = model.fit_predict(vector)

# regular_df['content'] = pd.DataFrame(regular)
# regular_df['text'] = pd.DataFrame(texts_regular)
# regular_df['cluster'] = pd.DataFrame(result)

#KMeans test
# k = 50
# km = KMeans(n_clusters=k)
# idx = km.fit_predict(vector)
# for i in idx:
#     print(i, end=' ')

#KMeans
# kmeans = KMeans(n_clusters=3)
# predict = kmeans.fit_predict(regular_df['text'])
# regular_df['predict'] = predict
# print(regular_df)

#clustering with graphs
# import matplotlib.pyplot as plt

# plt.figure(figsize = (8, 8))

# for i in range(k):
#     plt.scatter(regular_df.loc[regular_df['cluster'] == i, 'Annual Income (k$)'], df.loc[df['cluster'] == i, 'Spending Score (1-100)'], 
#                 label = 'cluster ' + str(i))

# plt.legend()
# plt.title('K = %d results'%k , size = 15)
# plt.xlabel('Annual Income', size = 12)
# plt.ylabel('Spending Score', size = 12)
# plt.show()

# for cluster_num in set(result):
#     if(cluster_num == -1 or cluster_num == 0): #noise 판별 or 클러스터링 처리 X의 경우
#         continue
#     else:
#         print("cluster num : {}".format(cluster_num))
#         temp_df = df[df['result'] == cluster_num] # cluster num 별로 조회
#         for title in temp_df['title']:
#             print(title) # 제목으로 살펴보자
#         print()

# km = KMeans(n_clusters=5, init='k-means++', max_iter=500, random_state=0)


# 텍스트 벡터화/무료회원:1544

# model = DBSCAN(eps=0.1,min_samples=1, metric = "cosine") 
# #     거리 계산 식으로는 Cosine distance를 이용
# #     eps이 낮을수록, min_samples 값이 높을수록 군집으로 판단하는 기준이 까다로움.
# result = model.fit_predict(vector)
# train_extract['cluster1st'] = result

# print('군집개수 :', result.max())
# train_extract

# def print_cluster_result(train):
#     clusters = []
#     counts = []
#     top_title = []
#     top_noun = []
#     for cluster_num in set(result):
#         # -1,0은 노이즈 판별이 났거나 클러스터링이 안된 경우
#         # if(cluster_num == -1 or cluster_num == 0): 
#         #     continue
#         # else:
#             print("cluster num : {}".format(cluster_num))
#             temp_df = train[train['cluster1st'] == cluster_num] # cluster num 별로 조회
#             clusters.append(cluster_num)
#             counts.append(len(temp_df))
#             top_title.append(temp_df.reset_index()['Title'][0])
#             top_noun.append(temp_df.reset_index()['noun'][0]) # 군집별 첫번째 기사를 대표기사로 ; tfidf방식
#             for title in temp_df['Title']:
#                 print(title)
#             print()

#     cluster_result = pd.DataFrame({'cluster_num':clusters, 'count':counts, 'top_title':top_title, 'top_noun':top_noun})
#     return cluster_result