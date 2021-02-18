# This code is from the Searx project except for the formatting functions at the bottom (https://github.com/searx/searx)

import re
from lxml import html
from urllib.parse import urlencode
from lxml.etree import XPath
from lxml.etree import _ElementStringResult, _ElementUnicodeResult
import requests
from urllib.parse import urlparse
from random import choice


xpath_cache = dict()
lang_to_lc_cache = dict()

# search-url
base_url = 'https://www.bing.com/'
search_string = 'search?{query}&first={offset}'


def extract_text(xpath_results):
    if type(xpath_results) == list:
        # it's list of result : concat everything using recursive call
        result = ''
        for e in xpath_results:
            result = result + extract_text(e)
        return result.strip()
    elif type(xpath_results) in [_ElementStringResult, _ElementUnicodeResult]:
        # it's a string
        return ''.join(xpath_results)
    else:
        # it's a element
        text = html.tostring(
            xpath_results, encoding='unicode', method='text', with_tail=False
        )
        text = text.strip().replace('\n', ' ')
        return ' '.join(text.split())


def get_xpath(xpath_str):
    result = xpath_cache.get(xpath_str, None)
    if result is None:
        result = XPath(xpath_str)
        xpath_cache[xpath_str] = result
    return result


def eval_xpath(element, xpath_str):
    xpath = get_xpath(xpath_str)
    return xpath(element)


def _get_offset_from_pageno(pageno):
    return (pageno - 1) * 10 + 1


# do search-request
def request(query, params):
    offset = _get_offset_from_pageno(params.get('pageno', 0))

    lang = 'EN'
    query = u'language:{} {}'.format(lang.split('-')[0].upper(), query.decode('utf-8')).encode('utf-8')

    search_path = search_string.format(
        query=urlencode({'q': query}),
        offset=offset)

    params['url'] = base_url + search_path

    return params


# get response from search-request
def response(resp):
    results = []
    result_len = 0

    dom = html.fromstring(resp.text)
    # parse results
    for result in eval_xpath(dom, '//div[@class="sa_cc"]'):
        link = eval_xpath(result, './/h3/a')[0]
        url = link.attrib.get('href')
        title = extract_text(link)
        content = extract_text(eval_xpath(result, './/p'))

        # append result
        results.append({'url': url,
                        'title': title,
                        'content': content})

    # parse results again if nothing is found yet
    for result in eval_xpath(dom, '//li[@class="b_algo"]'):
        link = eval_xpath(result, './/h2/a')[0]
        url = link.attrib.get('href')
        title = extract_text(link)
        content = extract_text(eval_xpath(result, './/p'))

        # append result
        results.append({'url': url,
                        'title': title,
                        'content': content})

    try:
        result_len_container = "".join(eval_xpath(dom, '//span[@class="sb_count"]//text()'))
        if "-" in result_len_container:
            # Remove the part "from-to" for paginated request ...
            result_len_container = result_len_container[result_len_container.find("-") * 2 + 2:]

        result_len_container = re.sub('[^0-9]', '', result_len_container)
        if len(result_len_container) > 0:
            result_len = int(result_len_container)
    except Exception as e:
        pass

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


def random_headers():
    return {'User-Agent': choice(desktop_agents),'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'}


def get_results(query, pageno=1):
    page = request(bytes(query, 'utf-8'), {'language': 'EN', 'pageno': pageno})
    results = response(requests.get(page['url'], headers=random_headers()))
    return results

from func_timeout import func_timeout, FunctionTimedOut

def get_results_with_timeout(query, pageno, timeout_time):
    formatted_results = []
    try:
        results = func_timeout(timeout_time, get_results, args=(query, pageno))
        for result in results:
            if len(result['content']) > 200:
                result['content'] = result['content'][0:200]
                word_array = result['content'].split()
                if len(word_array) > 2:
                    word_array = word_array[0: len(word_array) - 2]
                result['content'] = ' '.join(word_array) + ' ...'


            if result['url'].startswith('http') is True:
                parsed = urlparse(result['url'])
                favicon_url = '/proxy/image?url=https://' + parsed[1] + '/favicon.ico'
                result['favicon'] = favicon_url
                formatted_results.append(result)

    except FunctionTimedOut:
        pass
    except Exception as e:
        pass

    return formatted_results

