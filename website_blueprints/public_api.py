from flask import Blueprint, render_template

public_api = Blueprint('public_api', __name__)


@public_api.route('/about')
def render_about():
    return render_template('pages/about.html')


@public_api.route('/lite')
def render_home_lite():
    return render_template('pages/home_lite.html')


@public_api.route('/contact')
def render_contact():
    return render_template('pages/contact.html')


@public_api.route('/privacy')
def render_privacy():
    return render_template('pages/privacy.html')


@public_api.route('/default')
def render_make_us_your_default():
    return render_template('pages/make_us_your_default.html')


@public_api.route('/home_content')
def render_home():
    return render_template('pages/home_content.html')


@public_api.route('/advanced_settings')
def render_advanced_settings():
    return render_template('pages/advanced_settings.html')
