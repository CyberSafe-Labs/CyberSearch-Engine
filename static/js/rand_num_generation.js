function loadRandNumber() {
    $("#id-rand-num-generate").click(getRandomNumber);
    $("#id-rand-lower-limit").change(getRandomNumber);
    $("#id-rand-upper-limit").change(getRandomNumber);
}

function getRandomNumber() {
    var max = parseInt($("#id-rand-upper-limit").val());
    var min = parseInt($("#id-rand-lower-limit").val());
    var rand = Math.random();

    $("#id-rand-num-output").html(Math.round((rand * (max - min)) + min));
}
