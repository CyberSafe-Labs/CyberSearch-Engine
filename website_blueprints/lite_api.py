from flask import Blueprint, render_template
from website_blueprints.query_decorator import *
import search_engines.wikimedia.instant_extracts as InstantExtracts
import search_engines.bing.bing_web as BingWeb

lite_api = Blueprint('lite_api', __name__)

# Results that do not use any JS
@lite_api.route('/lite/results', methods=['GET', 'POST'])
def render_lite_results():
    try:
        query_data = get_query_data(request)
        query = query_data['query']
        page_number = query_data['page_number']

        instant_extracts = []
        if page_number == 1:
            instant_extracts = InstantExtracts.get_answers(query)

        main_results = BingWeb.get_results_with_timeout(query, page_number, 10)
        return render_template('results/lite/results.html', query=query, infinity_main_results=main_results,
                               page_number=page_number, current='infinity', instant_extracts=instant_extracts)
    except Exception:
        return render_template('results/lite/results.html', query='', infinity_main_results=[],
                               page_number=1, current='infinity', instant_extracts=[])

