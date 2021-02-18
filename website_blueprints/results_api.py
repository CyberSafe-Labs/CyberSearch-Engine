from flask import Blueprint, render_template, redirect, send_file
import requests
import io
from func_timeout import func_timeout, FunctionTimedOut
from website_blueprints.query_decorator import *
import helpers.query_analyzer as QueryAnalyzer
import search_engines.wikimedia.instant_extracts as InstantExtracts
import search_engines.bing.bing_images as BingImages
import search_engines.bing.bing_web as BingWeb

results_api = Blueprint('results_api', __name__)


def remove_duplicates_from_list(results):
    clean_results = []
    for result in results:
        passed = True
        for clean_result in clean_results:
            if result['url'] == clean_result['url']:
                passed = False
                break
            if result['url'][:-1] == clean_result['url'] or result['url'] == clean_result['url'][:-1]:
                passed = False
                break
            if result['url'].startswith('www.') is True and clean_result['url'].startswith('www.') is False:
                if result['url'][4:] == clean_result['url'] or result['url'] == clean_result['url']:
                    passed = False
                    break
            if result['url'].startswith('www.') is False and clean_result['url'].startswith('www.') is True:
                if result['url'] == clean_result['url'] or result['url'] == clean_result['url'][4:]:
                    passed = False
                    break

        if passed is True:
            clean_results.append(result)

    return clean_results


def display_homepage():
    return render_template('pages/home.html')


@results_api.route('/', methods=['GET', 'POST'])
def render_static():
    if request.method == 'POST':
        return render_results()
    else:
        try:
            if request.args.get('q') is not None:
                query = request.args.get('q')
                return redirect('/results?q=' + query)

        except Exception:
            return display_homepage()

        return display_homepage()


def remove_blacklisted_urls_from_list(results, blacklist):
    new_results = []
    removed_links = 0
    for result in results:
        passed = True
        for blacklisted_url in blacklist:
            if blacklisted_url == '' or blacklisted_url is None:
                continue
            if result['url'].find(blacklisted_url) >= 0:
                passed = False
                removed_links += 1
                break

        if passed is False:
            continue
        new_results.append(result)

    return new_results, removed_links


def get_results(query, page_number=1):
    limit_results = True

    if len(query) == 0:
        return render_template('results/fetch.html', query=query,
                               instant_extracts=[], bing_results=[], definition=[],
                               current='web',
                               calculator=[], page_number=page_number,
                               limit_results=limit_results, infinity_info_results=[],
                               html_editor=[], base_converter=[], unit_converter=[], removed_links=0)

    advanced_search_query = False
    import html

    query = html.unescape(query)
    if 'advanced_search_query' in dict(request.form):
        advanced_search_query = True

    instant_extracts = []
    if page_number == 1:
        instant_extracts = InstantExtracts.get_answers(query)

    results = BingWeb.get_results_with_timeout(query, page_number, 10)

    if len(instant_extracts) > 0:
        for link in results:
            try:
                if link['url'] == instant_extracts[0]['page_url']:
                    results.remove(link)
            except Exception:
                continue

    calculation = []
    html_editor = []
    definition = []
    base_converter = []
    unit_converter = []
    color_picker = []
    rand_num_generator = []
    stopwatch_timer = []

    try:
        integrations = QueryAnalyzer.analyze_query_v2(query)
    except Exception:
        integrations = '', ''

    if integrations[0] == 'calculator':
        calculation = [[]]
    elif integrations[0] == 'html_editor':
        html_editor = [[]]
    elif integrations[0] == 'base_converter':
        base_converter = [[]]
    elif integrations[0] == 'unit_converter':
        unit_converter = [[]]
    elif integrations[0] == 'color_picker':
        color_picker = [[]]
    elif integrations[0] == 'rand_num_generator':
        rand_num_generator = [[]]
    elif integrations[0] == 'stopwatch_timer':
        stopwatch_timer = [[]]

    removed_links = 0
    if 'blacklist' in request.cookies and request.cookies.get('blacklist') != '':
        blacklist = request.cookies.get('blacklist').replace('%20', '')
        blacklist = blacklist.split('%0A')
        results = remove_blacklisted_urls_from_list(results, blacklist)
        removed_links += results[1]
        results = results[0]

    return render_template('results/fetch.html', query=query,
                           instant_extracts=instant_extracts, bing_results=results, definition=definition,
                           current='web', removed_links=removed_links,
                           calculator=calculation, page_number=page_number, color_picker=color_picker,
                           limit_results=limit_results, html_editor=html_editor,
                           base_converter=base_converter, unit_converter=unit_converter,
                           rand_num_generator=rand_num_generator, stopwatch_timer=stopwatch_timer,
                           advanced_search_query=advanced_search_query)


@results_api.route('/results2', methods=['GET', 'POST'])
def render_results():
    query_data = get_query_data(request)
    query = query_data['query']
    page_number = query_data['page_number']
    return get_results(query, page_number)


@results_api.route('/results', methods=['GET', 'POST'])
def render_results2():
    query_data = get_query_data(request)
    query = query_data['query']
    page_number = query_data['page_number']

    advanced_search_query = False
    if 'advanced' in query_data['advanced_params']:
        advanced_search_query = True

    return render_template('results/layout.html', query=query, url='/results2',
                           current='web', page_number=page_number, advanced_search_query=advanced_search_query,
                           advanced_params=query_data['advanced_params'])


# Images ------------------
def get_image_results(query, page_number=1):
    words = query
    words = str(words).split()
    if len(words) == 0:
        return render_template('results/fetch.html', query=query, image_results=[],
                               current='images', page_number=page_number)

    results = BingImages.get_results_with_timeout(query, page_number, 10)
    return render_template('results/fetch.html', query=query, image_results=results,
                           current='images', page_number=page_number)


@results_api.route('/results/images2', methods=['GET', 'POST'])
def render_image_results():
    query_data = get_query_data(request)
    query = query_data['query']
    page_number = query_data['page_number']
    return get_image_results(query, page_number=page_number)


@results_api.route('/results/images', methods=['GET', 'POST'])
def render_image_results2():
    query_data = get_query_data(request)
    query = query_data['query']

    advanced_search_query = False
    if 'advanced' in query_data['advanced_params']:
        advanced_search_query = True
    page_number = query_data['page_number']
    return render_template('results/layout.html', query=query, url='/results/images2', page_number=page_number,
                           current='images',
                           advanced_search_query=advanced_search_query,
                           advanced_params=query_data['advanced_params'])


@results_api.route('/results/images_short', methods=['GET', 'POST'])
def render_image_short():
    query_data = get_query_data(request)
    query = query_data['query']

    image_results_short_t = BingImages.get_results_with_timeout(query, 1, 5)

    image_results_short = []
    for entry in image_results_short_t:
        if .4 < int(entry.get("img_format").split(' ')[2]) / int(entry.get("img_format").split(' ')[0]) < 1:
            image_results_short.append(entry)
        if len(image_results_short) >= 10:
            break
    if len(image_results_short) > 10:
        image_results_short = image_results_short[0:10]
    return render_template('results/results_images_short.html', query=query, image_results_short=image_results_short)


def load_image(url):
    image = io.BytesIO(requests.get(url).content)
    return image


@results_api.route('/proxy/image')
def render_external_image():
    if request.args.get('url') is None:
        return ''
    try:
        image = None
        try:
            image = func_timeout(5, load_image, args=(request.args.get('url'),))
        except FunctionTimedOut:
            pass
        except Exception as e:
            pass

        if image is None:
            return send_file('/images/misc/image_error_64.png', attachment_filename='external_image.png',
                             mimetype='image/png')
        return send_file(image, attachment_filename='external_image.png', mimetype='image/png')
    except Exception:
        return ''


# Video Results ------------------------
@results_api.route('/results/videos_results', methods=['GET', 'POST'])
def render_videos_results():
    query_data = get_query_data(request)
    query = query_data['query']
    page_number = query_data['page_number']
    if len(query) > 0:
        videos_results = BingWeb.get_results_with_timeout(query + ' site:www.youtube.com', page_number, 10)
    else:
        videos_results = []

    return render_template('results/fetch.html', query=query, videos_results=videos_results,
                           page_number=page_number, current='videos')


@results_api.route('/results/videos', methods=['GET', 'POST'])
def render_videos_layout():
    query_data = get_query_data(request)
    query = query_data['query']
    page_number = query_data['page_number']
    return render_template('results/layout.html', query=query, url='/results/videos_results',
                           current='videos', page_number=page_number)
