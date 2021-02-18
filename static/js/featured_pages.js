$('.nav_back').click(function () {
    $('#page_style').addClass('animate_content');
    $('#footer').addClass('animate_content');
    setTimeout(function () {
        $('#rabbit_hole').hide();
        $('#home_content').show();
    }, 1500);

    setTimeout(function () {
        $('#footer').removeClass('animate_content');
        $('#page_style').removeClass('animate_content');
    }, 3000);
});

var colors = ["#726a95", "#709fb0", "#a0c1b8", "#8d93ab", "#bfdcae", "#519872", "#d9adad", "#c3aed6"];
var color;
var i, j, tId, ptId;

cards = document.getElementsByClassName('rabbit-card');
for (i = 0; i < cards.length; i++) {
    color = colors[Math.floor(Math.random() * colors.length)];
    $("#card_" + String(i)).css("background-color", color);
    $("#card_" + String(i)).css("border-color", color);
}

function update_theme_icon() {
    var c = Cookies.get("infinity_theme");
    if (c === "0") {
        $('#theme_button_featured').html("<i class='fas fa-sun' style='color: black'></i>");
    } else if (c === "1") {
        $('#theme_button_featured').html("<i class='fas fa-moon' style='color: white'></i>");
    } else if (c === "2") {
        $('#theme_button_featured').html("<i class='fas fa-tree' style='color: #f7f3f5'></i>");
    } else if (c === "3") {
        $('#theme_button_featured').html("<i class='fas fa-rocket' style='color: #DACDC5'></i>");
    }
}


update_theme_icon();