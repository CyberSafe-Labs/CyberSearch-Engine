function imgError(image) {
    image.onerror = "";
    image.src = "/static/images/misc/image_error_64.png";
    return true;
}

function prepare_input(input) {
    input = input.replace('x', '*');
    input = input.replace('X', '*');
    input = input.replace('^', '**');
    return input;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function calculate() {
    var sol = $("#solution");
    try {
        var value = $("#calc").val();
        var x = numberWithCommas(eval(prepare_input(value)));
        // sol.css("font-size", "xx-large");
        sol.html(x);
    } catch (err) {
        // sol.css("font-size", "x-large");
        sol.html("");
    }
}

function run_web_editor() {
    $('#eval_results').html('<style>' + $('#css_code').val() + '</style>' + $('#html_code').val() + '<script>' +
        $('#js_code').val() + '<' + '/script>');
}

function baseConverter(input) {
    var leftBaseInput = $("#left-base-input");
    var rightBaseInput = $("#right-base-input");
    var leftBaseSelect = parseInt($("#left-base-select").val());
    var rightBaseSelect = parseInt($("#right-base-select").val());

    // TODO: when parseInt() encounters a character not in the given regex it ignores that character and the rest of
    //  the string. This leads to a perceived bug where a typo later in the input does not result in an error/blank
    //  result. There is currently no error handling for this in js so a custom solution is necessary.
    if (input) {
        rightBaseInput.val(parseInt(leftBaseInput.val(), leftBaseSelect).toString(rightBaseSelect));
        if (leftBaseInput.val() === "" || rightBaseInput.val() === "NaN") {
            rightBaseInput.val("");
        }
    } else {
        leftBaseInput.val(parseInt(rightBaseInput.val(), rightBaseSelect).toString(leftBaseSelect));
        if (rightBaseInput.val() === "" || leftBaseInput.val() === "NaN") {
            leftBaseInput.val("");
        }
    }
}


var advancedSearchPanel = $("#advanced_search_panel");
$("#advanced_search_button").click(function () {
    if (advancedSearchPanel.is(":hidden")) {
        advancedSearchPanel.slideDown();
    } else {
        advancedSearchPanel.slideUp();
    }
});

var advancedSearchWordsTab = $("#advanced_search_words_tab");
var advancedSearchWordsParameters = $("#advanced_search_parameters_tab");
var groupWords = $("#group-words");
var groupDomains = $("#group-domains");
var groupParameters = $("#group-parameters");

advancedSearchWordsTab.click(function () {
    advancedSearchWordsTab.addClass("is-active");
    advancedSearchWordsParameters.removeClass("is-active");

    groupWords.css("display", "block");
    groupParameters.css("display", "none");

});

advancedSearchWordsParameters.click(function () {
    advancedSearchWordsTab.removeClass("is-active");
    advancedSearchWordsParameters.addClass("is-active");

    groupWords.css("display", "none");
    groupParameters.css("display", "block");
});
