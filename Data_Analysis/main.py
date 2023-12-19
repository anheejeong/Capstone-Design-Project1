import re
import string
from eunjeon import Mecab

mecab = Mecab(dicpath="/opt/homebrew/lib/mecab/dic/mecab-ko-dic") #형태소 분석기 경로
#불용어 리스트
with open('/Users/chepi/Desktop/web_r/Capstone-Design-Project1/Data_Analysis/stopwords.txt', 'r') as f:#불용어 텍스트 경로
    list_file = f.readlines()
    stopwords = []
    for i in list_file:
        stopwords = list_file[0].split('-')

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
        return final(preprocess(text))
    #-------------------------------------------
    
text = input()
p = mecab.pos(text)
print(p)