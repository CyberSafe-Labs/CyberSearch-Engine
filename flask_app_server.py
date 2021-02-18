from flask import Flask, render_template, request, redirect, send_from_directory
from io import BytesIO
import gzip

# Blueprints
from website_blueprints.public_api import public_api
from website_blueprints.results_api import results_api
from website_blueprints.lite_api import lite_api

app = Flask(__name__)

app.register_blueprint(public_api)
app.register_blueprint(results_api)
app.register_blueprint(lite_api)


@app.before_request
def before_request():
    form_data = (dict(request.form))

    website_redirect = ''
    if 'Search' in form_data:
        import helpers.bangs.bangs as bang_redirects
        website_redirect = bang_redirects.get_bang_redirect(form_data['Search'])

    if request.args.get('q') is not None:
        import helpers.bangs.bangs as bang_redirects
        website_redirect = bang_redirects.get_bang_redirect(request.args.get('q'))

    if website_redirect != '':
        return redirect(website_redirect)

    if request.url.startswith('http://localhost') or request.url.startswith(
            'http://127.0.0.1'):  # If it is being ran locally
        return

    # Auto redirect to https
    if request.url.startswith('http://'):
        url = request.url.replace('http://', 'https://', 1)
        code = 301
        return redirect(url, code=code)

    return


@app.after_request
def add_header(response):
    if request.url.startswith('http://localhost') or request.url.startswith(
            'http://127.0.0.1'):  # If it is being ran locally
        return response

    response.headers['Strict-Transport-Security'] = 'max-age=63072000; includeSubDomains; preload'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['Content-Security-Policy'] = "default-src https; frame-ancestors 'none'"
    response.headers['Content-Security-Policy'] = "frame-ancestors 'none'"
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Cache-Control'] = 'max-age=50000'

    accept_encoding = request.headers.get('Accept-Encoding', '')
    if response.status_code < 200 or response.status_code >= 300 or 'gzip' not in accept_encoding.lower() or 'Content-Encoding' in response.headers:
        return response

    try:
        gzip_buffer = BytesIO()
        gzip_file = gzip.GzipFile(mode='wb', fileobj=gzip_buffer)
        gzip_file.write(response.get_data())
        gzip_file.close()
        response.set_data(gzip_buffer.getvalue())
        response.headers['Content-Encoding'] = 'gzip'
        response.headers['Content-Length'] = len(response.get_data())
    except Exception:
        return response

    return response


@app.route('/robots.txt')
def render_robots():
    return send_from_directory(app.static_folder, 'robots.txt')


@app.route('/default_search.xml')
def render_default_search():
    return send_from_directory(app.static_folder, 'search.xml')


@app.route('/opensearch.xml')
def render_open_search():
    return send_from_directory(app.static_folder, 'search.xml')


@app.route('/browserconfig.xml')
def window_icon():
    return send_from_directory(app.static_folder, 'browserconfig.xml')


@app.route('/favicon.ico')
def favicon():
    import os
    return send_from_directory(os.path.join(app.root_path, 'static'), 'images/is/favicon.ico',
                               mimetype='image/vnd.microsoft.icon')


@app.errorhandler(404)
def page_not_found(error):
    return render_template('pages/404.html'), 404


@app.errorhandler(500)
def internal_error(error):
    return render_template('pages/500.html')


if __name__ == '__main__':
    app.run()
