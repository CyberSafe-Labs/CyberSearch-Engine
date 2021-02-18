$("#id-business-sales-page").hide();

function toggleSalesTab() {
    var activeTab = $("#id-pro-sales-tab");
    if (activeTab.hasClass("is-active")) {
        activeTab.removeClass("is-active");
        $("#id-business-sales-tab").addClass("is-active");
        $("#id-pro-sales-page").fadeOut();
        $("#id-business-sales-page").fadeIn();
    } else {
        $("#id-business-sales-tab").removeClass("is-active");
        activeTab.addClass("is-active");
        $("#id-business-sales-page").fadeOut();
        $("#id-pro-sales-page").fadeIn();
    }
}
