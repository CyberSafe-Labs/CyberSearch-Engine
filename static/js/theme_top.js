function initializeThemeCookie() {
    var c = Cookies.get("infinity_theme");
    if (c === undefined) {
        Cookies.set("infinity_theme", "0", {sameSite: 'strict', expires: 180});
    }
}

function setThemeAttr() {
    var c = Cookies.get("infinity_theme");

    if (c === "0" || c === undefined) {
        $('link[href="/static/css/bulma_light.css"]').prop('disabled', false);
        $('link[href="/static/css/bulma_dark.css"]').prop('disabled', true);
        $('link[href="/static/css/bulma_nature.css"]').prop('disabled', true);
        $('link[href="/static/css/bulma_space.css"]').prop('disabled', true);
        $('.ea-content').css('background-color', "white");
    } else if (c === "1") {
        $('link[href="/static/css/bulma_light.css"]').prop('disabled', true);
        $('link[href="/static/css/bulma_dark.css"]').prop('disabled', false);
        $('link[href="/static/css/bulma_nature.css"]').prop('disabled', true);
        $('link[href="/static/css/bulma_space.css"]').prop('disabled', true);
        $('.ea-content').css('background-color', 'black');
    } else if (c === "2") {
        $('link[href="/static/css/bulma_light.css"]').prop('disabled', true);
        $('link[href="/static/css/bulma_dark.css"]').prop('disabled', true);
        $('link[href="/static/css/bulma_nature.css"]').prop('disabled', false);
        $('link[href="/static/css/bulma_space.css"]').prop('disabled', true);
        $('.ea-content').css('background-color', "black");
    } else if (c === "3") {
        $('link[href="/static/css/bulma_light.css"]').prop('disabled', true);
        $('link[href="/static/css/bulma_dark.css"]').prop('disabled', true);
        $('link[href="/static/css/bulma_nature.css"]').prop('disabled', true);
        $('link[href="/static/css/bulma_space.css"]').prop('disabled', false);
        $('.ea-content').css('background-color', "black");
        // add other color changes here
    }
}

function setThemeElements() {
    var c = Cookies.get("infinity_theme");
    if (c === "0" || c === undefined) {
        $('#id-theme-image').attr("src", "/static/images/fa/sun.svg");
        $('#logo_img_home').attr("src", "/static/images/is/logo_text_color.png");
        $('#logo_img_result').attr("src", "/static/images/is/logo_circle_black.png");
        $('#logo_img_article').attr("src", "/static/images/is/logo_circle_black.png");
    } else if (c === "1") {
        $('#id-theme-image').attr("src", "/static/images/fa/moon.svg");
        $('#logo_img_home').attr("src", "/static/images/is/logo_text_white.png");
        $('#logo_img_result').attr("src", "/static/images/is/logo_circle_white.png");
        $('#logo_img_article').attr("src", "/static/images/is/logo_circle_white.png");
    } else if (c === "2") {
        $('#id-theme-image').attr("src", "/static/images/fa/tree.svg");
        $('#logo_img_home').attr("src", "/static/images/is/logo_text_white.png");
        $('#logo_img_result').attr("src", "/static/images/is/logo_circle_white.png");
        $('#logo_img_article').attr("src", "/static/images/is/logo_circle_white.png");
    } else if (c === "3") {
        $('#id-theme-image').attr("src", "/static/images/fa/rocket.svg");
        $('#logo_img_home').attr("src", "/static/images/is/logo_text_white.png");
        $('#logo_img_result').attr("src", "/static/images/is/logo_circle_white.png");
        $('#logo_img_article').attr("src", "/static/images/is/logo_circle_white.png");
    }
}

function toggleTheme() {
    var c = Cookies.get("infinity_theme");
    if (c === "0") {
        Cookies.set("infinity_theme", "1", {sameSite: 'strict', expires: 180});
        setThemeAttr();
        setThemeElements();
    } else if (c === "1") {
        Cookies.set("infinity_theme", "2", {sameSite: 'strict', expires: 180});
        setThemeAttr();
        setThemeElements();
    } else if (c === "2") {
        Cookies.set("infinity_theme", "3", {sameSite: 'strict', expires: 180});
        setThemeAttr();
        setThemeElements();
    } else if (c === "3") {
        Cookies.set("infinity_theme", "0", {sameSite: 'strict', expires: 180});
        setThemeAttr();
        setThemeElements();
    } else {
        Cookies.set("infinity_theme", "0", {sameSite: 'strict', expires: 180});
        setThemeAttr();
        setThemeElements();
    }
}

function initializeThemeAttr() {
    initializeThemeCookie();
    setThemeElements();
    setThemeAttr();
}


var editor;
function loadEditor() {
    if (editor === undefined) {
        editor = CodeMirror.fromTextArea(document.getElementById("custom-css-input"), {
            extraKeys: {"Ctrl-Space": "autocomplete"},
            lineNumbers: true
        });
    }
}
function loadCustomCSStoPage() {
    var css = localStorage.getItem("custom_css");
    $("#custom_css_placeholder_article").html(css);
    $("#custom_css_placeholder_results").html(css);
    $("#custom_css_placeholder_home").html(css);
}

function setCustomCSS() {
    loadEditor();
    localStorage.setItem("custom_css", editor.getValue());
    loadCustomCSStoPage();
}

function loadCustomCSStoInput() {
    var css = localStorage.getItem("custom_css");
    loadEditor();
    if (css === "" || css === undefined) {
        editor.setValue("Enter css here ...");
    } else {
        editor.setValue(css);
    }
    loadCustomCSStoPage();
}

function loadBlacklistedSites() {
    var blacklist = Cookies.get('blacklist')
    if (blacklist !== undefined) {
        document.getElementById('id-blacklist-textarea').value = blacklist;
    }
}


initializeThemeAttr();

