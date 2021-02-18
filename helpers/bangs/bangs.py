
def get_bang_redirect(query):
    if query.startswith('!') is False:
        return ''

    words = query.split()

    if len(words) < 1:
        return ''

    if len(words) == 1:
        bang = words[0]
        real_query = ''
    else:
        bang = words[0]
        real_query = ' '.join(words[1:])

    from helpers.bangs.formatted_bangs import bangs

    if bang in bangs:
        return bangs[bang].replace('{{{s}}}', real_query)

    return ''

