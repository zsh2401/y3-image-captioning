from translate.AuthV3Util import addAuthParams
import requests

import json
APP_KEY ="04dd5b085af8f931"
APP_SECRET = "rd993fDE3bdRbCTdhtBumQPTlcHyBeTf"
def translate2chn(english_sentence):
    '''
    note: 将下列变量替换为需要请求的参数
    '''
    q = english_sentence
    lang_from = 'auto'
    lang_to = 'zh-CHS'

    data = {'q': q, 'from': lang_from, 'to': lang_to}

    addAuthParams(APP_KEY, APP_SECRET, data)

    header = {'Content-Type': 'application/x-www-form-urlencoded'}
    res = requests.post('https://openapi.youdao.com/api', data,header)
    # print( res.content)
    obj = json.loads(res.content)
    print(obj)
    return obj["translation"][0]
    
if __name__ ==  "__main__":
    translate2chn("What the fuck?")