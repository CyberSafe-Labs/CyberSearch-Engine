
function initializeFontSizeCookie() {
    var fontCookie = Cookies.get("infinity_font_size");
    if (fontCookie === undefined) {
        Cookies.set("infinity_font_size", "5", {sameSite: 'strict', expires: 180});
        fontCookie = Cookies.get("infinity_font_size");
    }
    return fontCookie;
}

$("#font-minus").click(function () {
    findNextSize(false);
});

$("#font-plus").click(function () {
    findNextSize(true);
});

function findNextSize(direction) {
    var size = Number(initializeFontSizeCookie());

    if (direction && size < 9) {
        setFontSize(size + 1);
    } else if (!direction && size > 1) {
        setFontSize(size - 1);
    }
}

// Set the font size and set a cookie
function setFontSize(size) {
    // set all elements here
    if (size === 1) {
        $(".tabs").css("font-size", ".72rem");
        $(".toplink").css("font-size", ".75rem");
        $(".desc").css("font-size", ".70rem");
        $(".bottom-url").css("font-size", ".70rem");
        $(".external-text").css("font-size", ".75rem");
        $("body").css("font-size", ".75rem");
    } else if (size === 2) {
        $(".tabs").css("font-size", ".77rem");
        $(".toplink").css("font-size", ".80rem");
        $(".desc").css("font-size", ".75rem");
        $(".bottom-url").css("font-size", ".75rem");
        $(".external-text").css("font-size", ".80rem");
        $("body").css("font-size", ".80rem");
    } else if (size === 3) {
        $(".tabs").css("font-size", ".82rem");
        $(".toplink").css("font-size", ".85rem");
        $(".desc").css("font-size", ".80rem");
        $(".bottom-url").css("font-size", ".80rem");
        $(".external-text").css("font-size", ".85rem");
        $("body").css("font-size", ".85rem");
    } else if (size === 4) {
        $(".tabs").css("font-size", ".87rem");
        $(".toplink").css("font-size", ".90rem");
        $(".desc").css("font-size", ".85rem");
        $(".bottom-url").css("font-size", ".85rem");
        $(".external-text").css("font-size", ".90rem");
        $("body").css("font-size", ".90rem");
    } else if (size === 5) {
        $(".tabs").css("font-size", ".92rem");
        $(".toplink").css("font-size", ".95rem");
        $(".desc").css("font-size", ".90rem");
        $(".bottom-url").css("font-size", ".90rem");
        $(".external-text").css("font-size", ".95rem");
        $("body").css("font-size", ".95rem");
    } else if (size === 6) {
        $(".tabs").css("font-size", ".97rem");
        $(".toplink").css("font-size", "1.0rem");
        $(".desc").css("font-size", ".95rem");
        $(".bottom-url").css("font-size", ".95rem");
        $(".external-text").css("font-size", "1.0rem");
        $("body").css("font-size", "1.0rem");
    } else if (size === 7) {
        $(".tabs").css("font-size", "1.02rem");
        $(".toplink").css("font-size", "1.05rem");
        $(".desc").css("font-size", "1.00rem");
        $(".bottom-url").css("font-size", "1.0rem");
        $(".external-text").css("font-size", "1.05rem");
        $("body").css("font-size", "1.05rem");
    } else if (size === 8) {
        $(".tabs").css("font-size", "1.07rem");
        $(".toplink").css("font-size", "1.10rem");
        $(".desc").css("font-size", "1.05rem");
        $(".bottom-url").css("font-size", "1.05rem");
        $(".external-text").css("font-size", "1.10rem");
        $("body").css("font-size", "1.10rem");
    } else if (size === 9) {
        $(".tabs").css("font-size", "1.12rem");
        $(".toplink").css("font-size", "1.15rem");
        $(".desc").css("font-size", "1.10rem");
        $(".bottom-url").css("font-size", "1.10rem");
        $(".external-text").css("font-size", "1.15rem");
        $("body").css("font-size", "1.15rem");
    }
    Cookies.set("infinity_font_size", size, {sameSite: 'strict', expires: 180});
    $("#font-size").html(size);
}

function initializeFontFamilyCookie() {
    var c = Cookies.get("infinity_font_family");
    if (c === undefined || c === "null") {
        Cookies.set("infinity_font_family", "BlinkMacSystemFont,-apple-system,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Fira Sans','Droid Sans','Helvetica Neue',Helvetica,Arial,sans-serif", {sameSite: 'strict', expires: 180});
    }
    setFontSelector();
}


function fontChange() {
    var fontFamily = $("#font-select").val();
    $(".tabs").css("font-family", fontFamily);
    $(".toplink").css("font-family", fontFamily);
    $(".desc").css("font-family", fontFamily);
    $(".bottom-url").css("font-family", fontFamily);
    $("body").css("font-family", fontFamily);
    $("button").css("font-family", fontFamily);
    $("input").css("font-family", fontFamily);
    $("select").css("font-family", fontFamily);
    $("textarea").css("font-family", fontFamily);
    Cookies.set("infinity_font_family", fontFamily, {sameSite: 'strict', expires: 180});
}

function setFontSelector() {
    $("#font-select").val(Cookies.get("infinity_font_family"));
}

function initializeFontAttr() {
    setFontSize(Number(initializeFontSizeCookie()));
    initializeFontFamilyCookie();
    fontChange();
    setFontSelector();
}

function initializeCondenseCookie() {
    var c = Cookies.get("infinity_condense_mode");
    if (c === undefined) {
        Cookies.set("infinity_condense_mode", "1", {sameSite: 'strict', expires: 180});
    }
}

function setCondenseAttr() {
    var c = Cookies.get("infinity_condense_mode");
    if (c === "0") {
        $(".card").css("margin-bottom", ".8rem");
    } else {
        Cookies.set("infinity_condense_mode", "1", {sameSite: 'strict', expires: 180});
        $(".card").css("margin-bottom", "0");
    }
}

function setCondenseSwitch() {
    var c = Cookies.get("infinity_condense_mode");
    if (c === "0") {
        $("#condense-switch").attr("checked", false);
        $("#condense").html($("#condense").html());
    } else {
        $("#condense-switch").attr("checked", true);
        $("#condense").html($("#condense").html());
    }
}

function toggleCondense() {
    var c = Cookies.get("infinity_condense_mode");
    if (c === "0") {
        Cookies.set("infinity_condense_mode", "1", {sameSite: 'strict', expires: 180});
    } else {
        Cookies.set("infinity_condense_mode", "0", {sameSite: 'strict', expires: 180});
    }
    setCondenseAttr();
}

function initializeCondenseAttr() {
    initializeCondenseCookie();
    setCondenseSwitch();
    setCondenseAttr();
}

function initializeNewTabCookie() {
    var c = Cookies.get("infinity_new_tab_mode");
    if (c === undefined) {
        Cookies.set("infinity_new_tab_mode", "0", {sameSite: 'strict', expires: 180});
    }
}

function setNewTabAttr() {
    var c = Cookies.get("infinity_new_tab_mode");

    if (c === "1") {
        $("a").attr("target", "_blank");
    } else if (c === "0") {
        $("a").attr("target", "_self");
    } else {
        Cookies.set("infinity_new_tab_mode", "0", {sameSite: 'strict', expires: 180});
        $("a").attr("target", "_self");
    }
}

function setNewTabSwitch() {
    var c = Cookies.get("infinity_new_tab_mode");
    if (c === "0" || c === undefined) {
        $("#newtab-switch").attr("checked", false);
        $("#newtab").html($("#newtab").html());
    } else if (c === "1") {
        $("#newtab-switch").attr("checked", true);
        $("#newtab").html($("#newtab").html());
    }
}

function toggleNewTab() {
    var c = Cookies.get("infinity_new_tab_mode");
    if (c === "0" || c === undefined) {
        Cookies.set("infinity_new_tab_mode", "1", {sameSite: 'strict', expires: 180});
        setNewTabAttr();
    } else if (c === "1") {
        Cookies.set("infinity_new_tab_mode", "0", {sameSite: 'strict', expires: 180});
        setNewTabAttr();
    }
}

function initializeNewTabAttr() {
    initializeNewTabCookie();
    setNewTabSwitch();
    setNewTabAttr();
}

function setSiteIconsAttr() {
    var c = Cookies.get("infinity_site_icons_mode");
    if (c === "1") {
        $(".cl-site-icons").hide();
    } else {
        $(".cl-site-icons").show();
    }
}

function setSiteIconsSwitch() {
    var c = Cookies.get("infinity_site_icons_mode");
    if (c === "1") {
        $("#id-site-icons-switch").attr("checked", false);
        $("#id-site-icons").html($("#id-site-icons").html());
    } else {
        $("#id-site-icons-switch").attr("checked", true);
        $("#id-site-icons").html($("#id-site-icons").html());
    }
}

function toggleSiteIcons() {
    var c = Cookies.get("infinity_site_icons_mode");
    if (c === "0" || c === undefined) {
        Cookies.set("infinity_site_icons_mode", "1", {sameSite: 'strict', expires: 180});
    } else if (c === "1") {
        Cookies.set("infinity_site_icons_mode", "0", {sameSite: 'strict', expires: 180});
    }
    setSiteIconsAttr();
}

function initializeSiteIconsAttr() {
    setSiteIconsSwitch();
    setSiteIconsAttr();
}


function initializeExternalsLayoutCookie() {
    var c = Cookies.get("infinity_externals_layout");
    if (c === undefined) {
        Cookies.set("infinity_externals_layout", "1", {sameSite: 'strict', expires: 180});
    }
}

function setExternalsLayoutAttr() {
    var c = Cookies.get("infinity_externals_layout");

    if (c === "0") {
        $("#externals").removeClass("external");
        $('#id-externals-layout-img').attr('src', '/static/images/fa/list.svg')
        $(".external-text").show();
    } else {
        $("#externals").addClass("external");
        $('#id-externals-layout-img').attr('src', '/static/images/fa/th.svg')
        $(".external-text").hide();
    }
}

function toggleExternalsLayout() {
    var c = Cookies.get("infinity_externals_layout");
    if (c === "0") {
        Cookies.set("infinity_externals_layout", "1", {sameSite: 'strict', expires: 180});
    } else {
        Cookies.set("infinity_externals_layout", "0", {sameSite: 'strict', expires: 180});
    }
    setExternalsLayoutAttr();
}

function initializeExternalsLayoutAttr() {
    initializeExternalsLayoutCookie();
    setExternalsLayoutAttr();
}

function set_monetization_on() {
    Cookies.set("coil_user", "1", {sameSite: 'strict', expires: 180});
}

function setBlacklistedSites() {
    var blacklistedString = document.getElementById("id-blacklist-textarea").value;
    Cookies.set("blacklist", blacklistedString, {sameSite: 'strict', expires: 180});
}

// Dropdowns
$("#dropdown-settings-button").click(function (event) {
    event.stopPropagation();
    if ($("#dropdown-settings").hasClass('is-active')) {
        $("#dropdown-settings").removeClass('is-active');
    } else {
        $("#dropdown-settings").addClass('is-active');
    }
});

$("#dropdown-settings-content").click(function (event) {
    event.stopPropagation();
});

document.addEventListener('click', function () {
    $("#dropdown-settings").removeClass('is-active');
});


initializeThemeAttr();
initializeCondenseAttr();
initializeFontAttr();
initializeNewTabAttr();
initializeSiteIconsAttr();
initializeExternalsLayoutAttr();

$("#setting-reset").click(function () {
    Cookies.set("infinity_condense_mode", "1", {sameSite: 'strict', expires: 180});
    initializeCondenseAttr();
    Cookies.set("infinity_font_family", "BlinkMacSystemFont,-apple-system,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Fira Sans','Droid Sans','Helvetica Neue',Helvetica,Arial,sans-serif", {sameSite: 'strict', expires: 180});
    Cookies.set("infinity_font_size", "5", {sameSite: 'strict', expires: 180});
    initializeFontAttr();
    Cookies.set('infinity_theme', '0', {sameSite: 'strict', expires: 180});
    setThemeAttr();
    setThemeElements();
    Cookies.set('infinity_new_tab_mode', '0', {sameSite: 'strict', expires: 180});
    initializeNewTabAttr();
    Cookies.set('infinity_site_icons_mode', '0', {sameSite: 'strict', expires: 180});
    initializeSiteIconsAttr();
    Cookies.set("infinity_externals_layout", "1", {sameSite: 'strict', expires: 180});
    initializeExternalsLayoutAttr();
});

if (document.monetization) {
    document.monetization.addEventListener('monetizationstart', set_monetization_on);
}

loadCustomCSStoPage();
