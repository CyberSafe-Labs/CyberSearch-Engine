function toggle_element(element_id, icon_id) {
    if ($('#' + element_id).is(':hidden')) {
        $('#' + element_id).show();
        $('#' + element_id).show();
        $('#' + icon_id).removeClass('fa-angle-down').addClass('fas fa-angle-up')
    } else {
        $('#' + element_id).hide();
        $('#' + icon_id).removeClass('fa-angle-up').addClass('fas fa-angle-down')
    }
}

function detect_browser() {
    // Get the user-agent string
    let userAgentString = navigator.userAgent;

    // Detect Internet Explorer
    let IExplorerAgent = userAgentString.indexOf("MSIE") > -1 || userAgentString.indexOf("rv:") > -1;

    // Detect Chrome
    let chromeAgent = userAgentString.indexOf("Chrome") > -1;

    // Detect Firefox
    let firefoxAgent = userAgentString.indexOf("Firefox") > -1;

    // Detect Safari
    let safariAgent = userAgentString.indexOf("Safari") > -1;

    // Discard Safari since it also matches Chrome
    if ((chromeAgent) && (safariAgent)) safariAgent = false;

    // Detect Opera
    let operaAgent = userAgentString.indexOf("OP") > -1;

    // Discard Chrome since it also matches Opera
    if ((chromeAgent) && (operaAgent))
        chromeAgent = false;


    if (firefoxAgent === true) {
        return 'firefox';
    }
    if (chromeAgent === true) {
        return 'chrome';
    }
    if (safariAgent === true) {
        return 'safari';
    }
    if (operaAgent === true) {
        return 'opera';
    }
    if (IExplorerAgent === true) {
        return 'ie';
    }

}

function change_instructions(browser) {
    var ids = ['firefox', 'chrome', 'vivaldi', 'ie', 'opera', 'other', 'all'];

    var i;
    for (i = 0; i < ids.length; i++) {
        if (ids[i] === browser) {
            $('#' + ids[i]).show();
        } else {
            $('#' + ids[i]).hide();
        }
    }
}

function initial_setup() {
    var detected_browser = detect_browser();

    change_instructions(detected_browser);

    $('#detected_browser_notification').show();
    document.getElementById('detected_browser_text').innerHTML = "We've detected that you're using <b>" + detected_browser + "</b>. If this is incorrect or you would like to view instructions for a different browser, please choose one of the other options below."
}

initial_setup();
