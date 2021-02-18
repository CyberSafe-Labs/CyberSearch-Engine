from flask import request


# Advanced Search
def build_advanced_search_query_from_post_request(flask_request):
    bing_advanced_query_string = ''
    form_data = dict(flask_request.form)
    if 'all_these_words' in form_data and form_data['all_these_words'] != '':
        all_these_words = form_data['all_these_words']
        all_these_words = all_these_words.split()
        for word in all_these_words:
            bing_advanced_query_string += word + ' '

    if 'this_exact_phrase' in form_data and form_data['this_exact_phrase'] != '':
        this_exact_phrase = form_data['this_exact_phrase']
        bing_advanced_query_string += '"' + this_exact_phrase + '" '

    if 'any_of_these_words' in form_data and form_data['any_of_these_words'] != '':
        any_of_these_words = form_data['any_of_these_words']
        any_of_these_words = any_of_these_words.split()

        index = 0
        words_length = len(any_of_these_words)
        bing_advanced_query_string += '( '
        for word in any_of_these_words:

            if index < words_length - 1:
                bing_advanced_query_string += word + ' OR '
            else:
                bing_advanced_query_string += word + ' '

            index += 1
        bing_advanced_query_string += ') '

    if 'none_of_these_words' in form_data and form_data['none_of_these_words'] != '':
        none_of_these_words = form_data['none_of_these_words']
        none_of_these_words = none_of_these_words.split()
        for word in none_of_these_words:
            bing_advanced_query_string += '-' + word + ' '

    if 'domain' in form_data and form_data['domain'] != '':
        domain = form_data['domain']
        bing_advanced_query_string += 'site:' + domain + ' '

    if 'filetype' in form_data and form_data['filetype'] != '':
        filetype = form_data['filetype']
        bing_advanced_query_string += 'filetype:' + filetype + ' '

    return bing_advanced_query_string


def get_query_data(flask_request):
    query = ''
    page_number = 1
    query_requests = {}
    advanced_params = {}
    try:
        if flask_request.method == 'POST':
            query_requests = dict(flask_request.form)
            if 'advanced' not in query_requests:  # For normal searches
                query = query_requests['Search']
            elif 'advanced' in query_requests:
                advanced_params = query_requests
                query = build_advanced_search_query_from_post_request(flask_request)

        elif request.method == 'GET':
            query_requests = dict(flask_request.args)
            query = flask_request.args.get('q')

        if 'page_number' in query_requests and query_requests['page_number'] != '':
            page_number = int(query_requests['page_number'])

    except Exception as e:
        pass

    if query is None:
        query = ''
    if page_number is None:
        page_number = 1

    return {'query': query, 'page_number': page_number, 'advanced_params': advanced_params}
