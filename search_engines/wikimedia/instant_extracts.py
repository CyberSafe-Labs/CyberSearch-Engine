import requests
import re


def cleanhtml(raw_html):
  cleanr = re.compile('<.*?>')
  cleantext = re.sub(cleanr, '', raw_html)
  return cleantext


def get_answers(query):
    try:
        results = requests.get('https://en.wikipedia.org/api/rest_v1/page/summary/' + query, timeout=3).json()

        information = {}
        information['description'] = cleanhtml(results['description'])
        information['title'] = cleanhtml(results['displaytitle'])
        information['extract'] = cleanhtml(results['extract'])
        information['thumbnail_url'] = cleanhtml(results['thumbnail']['source'])
        information['page_url'] = cleanhtml(results['content_urls']['desktop']['page'])

        return [information]
    except Exception:
        return []
