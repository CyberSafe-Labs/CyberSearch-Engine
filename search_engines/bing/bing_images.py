# This code is from the Searx project except for the formatting functions at the bottom (https://github.com/searx/searx)

from lxml import html
from urllib.parse import urlencode
import requests
from urllib.parse import urlparse

xpath_cache = dict()
lang_to_lc_cache = dict()

from json import loads

categories = ['images']
paging = True
safesearch = True
time_range_support = True
language_support = True
supported_languages_url = 'https://www.bing.com/account/general'
number_of_results = 28

# search-url
base_url = 'https://www.bing.com/'
search_string = 'images/search'\
    '?{query}'\
    '&count={count}'\
    '&first={first}'\
    '&FORM=IBASEP'
time_range_string = '&qft=+filterui:age-lt{interval}'
time_range_dict = {'day': '1440',
                   'week': '10080',
                   'month': '43200',
                   'year': '525600'}

# safesearch definitions
safesearch_types = {2: 'STRICT',
                    1: 'DEMOTE',
                    0: 'OFF'}


# do search-request
def request(query, params):
    offset = ((params['pageno'] - 1) * number_of_results) + 1

    search_path = search_string.format(
        query=urlencode({'q': query}),
        count=number_of_results,
        first=offset)

    params['url'] = base_url + search_path
    return params


# get response from search-request
def response(resp):
    results = []

    dom = html.fromstring(resp.text)

    # parse results
    for result in dom.xpath('//div[@class="imgpt"]'):

        img_format = result.xpath('./div[contains(@class, "img_info")]/span/text()')[0]
        source = result.xpath('./div[contains(@class, "img_info")]//a/text()')[0]

        try:
            m = loads(result.xpath('./a/@m')[0])
            title = m.get('t', '').replace(u'\ue000', '').replace(u'\ue001', '')
            results.append({'template': 'images.html',
                            'url': m['purl'],
                            'thumbnail_src': m['turl'],
                            'img_src': m['murl'],
                            'content': '',
                            'title': title,
                            'source': source,
                            'img_format': img_format})
        except:
            continue

    return results


desktop_agents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:67.0) Gecko/20100101 Firefox/67.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Safari/605.1.15",
    "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:67.0) Gecko/20100101 Firefox/67.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:67.0) Gecko/20100101 Firefox/67.0",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:67.0) Gecko/20100101 Firefox/67.0"
]

from random import choice

def random_headers():
    return {'User-Agent': choice(desktop_agents),'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'}


def get_results(query, pageno=1):
    page = request(bytes(query, 'utf-8'), {'language': 'EN', 'pageno': int(pageno), 'safesearch': True})
    results = response(requests.get(page['url'], headers=random_headers()))
    formatted_results = []
    for result in results:
        try:
            result['source'] = urlparse(result['url'])[1]
        except Exception: # This should rarely happen
            result['source'] = result['url']

        if result['url'].startswith('http'):
            formatted_results.append(result)

    return formatted_results

from func_timeout import func_timeout, FunctionTimedOut


def get_results_with_timeout(query, pageno=1, timeout_time=5):
    formatted_results = []
    try:
        results = func_timeout(timeout_time, get_results, args=(query, pageno))
        for result in results:
            if result['url'].startswith('http') is True:
                formatted_results.append(result)

    except FunctionTimedOut:
        pass
    except Exception as e:
        pass

    return formatted_results

