var hsv = [200, 50, 50];
var hueSliderHeight;
var gradientHeight;
var gradientWidth;


function colorPickerLoaded() {
    var mouseDownGradient = false;
    var picker = $("#id-color-picker");
    gradientHeight = Math.round(picker.height() - 5);
    gradientWidth = Math.round(picker.width() - 5);
    $("#id-color-picker")
        .mousedown(function () {
            mouseDownGradient = true;
            var left = Math.round(event.pageX - picker.offset().left);
            var top = Math.round(event.pageY - picker.offset().top);
            if (top > -1 && top < (gradientHeight + 1) && left > -1 && left < (gradientWidth + 1)) {
                setGradientPosition(left, top);
                sliderGradientChange();
            }
        })
        .mousemove(function () {
            if (mouseDownGradient) {
                var left = Math.round(event.pageX - picker.offset().left);
                var top = Math.round(event.pageY - picker.offset().top);
                if (top > -1 && top < (gradientHeight + 1) && left > -1 && left < (gradientWidth + 1)) {
                    setGradientPosition(left, top);
                    sliderGradientChange();
                }
            }
        })
        .mouseup(function () {
            mouseDownGradient = false;
        });

    var mouseDownSlider = false;
    var slider = $("#id-color-slider");
    hueSliderHeight = Math.round(slider.height());
    slider
        .mousedown(function () {
            mouseDownSlider = true;
            var top = Math.round(event.pageY - slider.offset().top);
            if (top > -1 && top < hueSliderHeight + 1) {
                setHueSliderPosition(top);
                sliderGradientChange();
            }
        })
        .mousemove(function () {
            if (mouseDownSlider) {
                var top = Math.round(event.pageY - slider.offset().top);
                if (top > -1 && top < hueSliderHeight + 1) {
                    setHueSliderPosition(top);
                    sliderGradientChange();
                }
            }
        })
        .mouseup(function () {
            mouseDownSlider = false;
        });

    $("#id-hsv-h").change(updateFromHSVInput);
    $("#id-hsv-s").change(updateFromHSVInput);
    $("#id-hsv-v").change(updateFromHSVInput);

    $("#id-rgb-r").change(updateFromRGBInput);
    $("#id-rgb-g").change(updateFromRGBInput);
    $("#id-rgb-b").change(updateFromRGBInput);

    $("#id-cmyk-c").change(updateFromCMYKInput);
    $("#id-cmyk-m").change(updateFromCMYKInput);
    $("#id-cmyk-y").change(updateFromCMYKInput);
    $("#id-cmyk-k").change(updateFromCMYKInput);

    $("#id-hex").change(updateFromHexInput);

    updateAllInputs();
}

function getHueSliderPosition() {
    return Math.round($("#id-color-slider-marker").offset().top - $("#id-color-slider").offset().top + 5);
}

function setHueSliderPosition(top) {
    $("#id-color-slider-marker").css("top", (top + 3) + "px");
}

function getGradientPosition() {
    var markerOffset = $("#id-color-marker").offset();
    var pickerOffset = $("#id-color-picker").offset();
    return {top: pickerOffset.top + gradientHeight - markerOffset.top, left: markerOffset.left - pickerOffset.left};
}

function setGradientPosition(left, top) {
    var marker = $("#id-color-marker");
    marker.css("left", left + "px");
    marker.css("top", top + "px");
}

function setHue(h) {
    hsv[0] = h;
}

function setSaturation(s) {
    hsv[1] = s;
}

function setValue(v) {
    hsv[2] = v;
}

function getHue() {
    return hsv[0];
}

function getSaturation() {
    return hsv[1];
}

function getValue() {
    return hsv[2];
}

function sliderGradientChange() {
    var gradientPosition = getGradientPosition();
    setHue(Math.round((getHueSliderPosition() / hueSliderHeight) * 360));
    setSaturation(Math.round((gradientPosition.left / gradientWidth) * 100));
    setValue(Math.round((gradientPosition.top / gradientHeight) * 100));

    updateBackgroundHue();
    updateAllInputs();
}

function updateGradientMarker() {
    setGradientPosition(Math.round((getSaturation() / 100) * gradientWidth), Math.round(gradientHeight - ((getValue() / 100) * gradientHeight)));
}

function updateSliderMarker() {
    var top = Math.round(getHue() / 360 * hueSliderHeight);
    setHueSliderPosition(top);
}

function updateBackgroundHue() {
    var rgb = hsvTorgb(getHue(), 100, 100);
    $("#id-color-picker").css("background-color", "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")");
}

function updateSample() {
    var rgb = hsvTorgb(getHue(), getSaturation(), getValue());
    $("#id-color-sample").css("background-color", "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")");
}

function updateHSVInputs() {
    $("#id-hsv-h").val(getHue());
    $("#id-hsv-s").val(getSaturation());
    $("#id-hsv-v").val(getValue());
}

function updateRGBInputs() {
    var rgb = hsvTorgb(getHue(), getSaturation(), getValue());
    $("#id-rgb-r").val(rgb[0]);
    $("#id-rgb-g").val(rgb[1]);
    $("#id-rgb-b").val(rgb[2]);
}

function hsvTorgb(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h[2], v = h[1], h = h[0];
    }
    h = h / 360;
    s = s / 100;
    v = v / 100;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            r = v, g = t, b = p;
            break;
        case 1:
            r = q, g = v, b = p;
            break;
        case 2:
            r = p, g = v, b = t;
            break;
        case 3:
            r = p, g = q, b = v;
            break;
        case 4:
            r = t, g = p, b = v;
            break;
        case 5:
            r = v, g = p, b = q;
            break;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function updateCMYKInputs() {
    var rgb = hsvTorgb(getHue(), getSaturation(), getValue());

    //remove spaces from input RGB values, convert to int
    var r = parseInt(('' + rgb[0]).replace(/\s/g, ''), 10);
    var g = parseInt(('' + rgb[1]).replace(/\s/g, ''), 10);
    var b = parseInt(('' + rgb[2]).replace(/\s/g, ''), 10);

    if (rgb[0] < 0 || rgb[1] < 0 || rgb[2] < 0 || rgb[0] > 255 || rgb[1] > 255 || rgb[2] > 255) {
        return;
    }

    var computedK;
    var computedC;
    var computedM;
    var computedY;
    if (r === 0 && g === 0 && b === 0) {
        computedK = 1;
        computedC = 0;
        computedM = 0;
        computedY = 0;
    } else {

        computedC = 1 - (r / 255);
        computedM = 1 - (g / 255);
        computedY = 1 - (b / 255);

        var minCMY = Math.min(computedC, Math.min(computedM, computedY));
        computedC = (computedC - minCMY) / (1 - minCMY);
        computedM = (computedM - minCMY) / (1 - minCMY);
        computedY = (computedY - minCMY) / (1 - minCMY);
        computedK = minCMY;
    }

    $("#id-cmyk-c").val(Math.round(computedC * 100));
    $("#id-cmyk-m").val(Math.round(computedM * 100));
    $("#id-cmyk-y").val(Math.round(computedY * 100));
    $("#id-cmyk-k").val(Math.round(computedK * 100));
}

function rgbTohsv(r, g, b) {
    r = r / 255;
    g = g / 255;
    b = b / 255;
    let v = Math.max(r, g, b), c = v - Math.min(r, g, b);
    let h = c && ((v === r) ? (g - b) / c : ((v === g) ? 2 + (b - r) / c : 4 + (r - g) / c));
    return {h: Math.round(60 * (h < 0 ? h + 6 : h)), s: Math.round((v && c / v) * 100), v: Math.round(v * 100)};
}

function updateHexInput() {
    var rgb = hsvTorgb(getHue(), getSaturation(), getValue());

    $("#id-hex").val(((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1));
}

function updateAllInputs() {
    updateHSVInputs();
    updateRGBInputs();
    updateCMYKInputs();
    updateHexInput();
    updateSample();
    updateBackgroundHue();
}

function updateFromHSVInput() {
    var hue = $("#id-hsv-h");
    if (hue.val() > 359) {
        hue.val(359);
    } else if (hue.val() < 0) {
        hue.val(0);
    }
    setHue(hue.val());

    var saturation = $("#id-hsv-s");
    if (saturation.val() > 100) {
        saturation.val(100);
    } else if (saturation.val() < 0) {
        saturation.val(0)
    }
    setSaturation(saturation.val());

    var value = $("#id-hsv-v");
    if (value.val() > 100) {
        value.val(100);
    } else if (value.val() < 0) {
        value.val(0);
    }
    setValue(value.val());

    updateRGBInputs();
    updateCMYKInputs();
    updateHexInput();
    updateSample();
    updateBackgroundHue();
    updateGradientMarker();
    updateSliderMarker();
}

function updateFromHexInput() {
    var hex = $("#id-hex").val();

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var rgb = result ? {
        r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16)
    } : {
        r: parseInt("ff", 16), g: parseInt("ff", 16), b: parseInt("ff", 16)
    };

    var hsvResults = rgbTohsv(rgb.r, rgb.g, rgb.b);
    setHue(hsvResults.h);
    setSaturation(hsvResults.s);
    setValue(hsvResults.v);

    updateRGBInputs();
    updateHSVInputs();
    updateCMYKInputs();
    updateSample();
    updateBackgroundHue();
    updateGradientMarker();
    updateSliderMarker();
}

function updateFromRGBInput() {
    var r = $("#id-rgb-r");
    var g = $("#id-rgb-g");
    var b = $("#id-rgb-b");
    if (r.val() < 0) {
        r.val(0);
    } else if (r.val() > 255) {
        r.val(255);
    }
    if (g.val() < 0) {
        g.val(0);
    } else if (g.val() > 255) {
        g.val(255);
    }
    if (b.val() < 0) {
        b.val(0);
    } else if (b.val() > 255) {
        b.val(255);
    }
    var hsvResults = rgbTohsv(r.val(), g.val(), b.val());
    setHue(hsvResults.h);
    setSaturation(hsvResults.s);
    setValue(hsvResults.v);

    updateHSVInputs();
    updateCMYKInputs();
    updateHexInput();
    updateSample();
    updateBackgroundHue();
    updateGradientMarker();
    updateSliderMarker();
}

function updateFromCMYKInput() {
    var cIn = $("#id-cmyk-c");
    var mIn = $("#id-cmyk-m");
    var yIn = $("#id-cmyk-y");
    var kIn = $("#id-cmyk-k");

    if (cIn.val() > 100) {
        cIn.val(100);
    } else if (cIn.val() < 0) {
        cIn.val(0);
    }
    if (mIn.val() > 100) {
        mIn.val(100);
    } else if (mIn.val() < 0) {
        mIn.val(0);
    }
    if (yIn.val() > 100) {
        yIn.val(100);
    } else if (yIn.val() < 0) {
        yIn.val(0);
    }
    if (kIn.val() > 100) {
        kIn.val(100);
    } else if (kIn.val() < 0) {
        kIn.val(0);
    }

    var k = kIn.val() / 100;
    var hsvResults = rgbTohsv(Math.round((1 - Math.min(1, (cIn.val() / 100) * (1 - k) + k)) * 255), Math.round((1 - Math.min(1, (mIn.val() / 100) * (1 - k) + k)) * 255), Math.round((1 - Math.min(1, (yIn.val() / 100) * (1 - k) + k)) * 255));

    setHue(hsvResults.h);
    setSaturation(hsvResults.s);
    setValue(hsvResults.v);

    updateRGBInputs();
    updateHSVInputs();
    updateHexInput();
    updateSample();
    updateBackgroundHue();
    updateGradientMarker();
    updateSliderMarker();
}
