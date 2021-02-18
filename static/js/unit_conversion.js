var angle = [["Arcminute", 0.01666667], ["Arcsecond", 0.00027777777777777777], ["Cycles", 360], ["Degrees", 1],
    ["Gradians", 0.9], ["Microarcsecond", 0.0000000002777699390794231], ["Microradian", 0.00005729577951308232],
    ["Milliarcsecond", 0.00000027776993907942305], ["Milliradian", 0.05729577951308232], ["Radians", 57.29578],
    ["Revolution", 360]];
var area = [["Acre", 4046.86], ["Are", 100], ["Barn", 0.0000000000000000000000000001], ["Hectare", 10000],
    ["Rood", 1011.714], ["Square Centimeter", 0.0001], ["Square Decimeter", 0.01], ["Square Feet", 0.09290304],
    ["Square Inch", 0.00064516], ["Square Meter", 1], ["Square Mile", 2589988], ["Square Millimeter", 0.000001],
    ["Square Rod", 25.2929], ["Square Yard", 0.8361274]];
var dataTransferRate = [["Bits per second", 1], ["Gibibit per second", 1073742000], ["Gigabit per second", 1000000000],
    ["Gigabyte per second", 8000000000], ["Kibibit per second", 1024], ["Kilobit per second", 1000],
    ["Kilobyte per second", 8000], ["Mebibit per second", 1048576], ["Megabit per second", 1000000],
    ["Megabyte per second", 8000000], ["Tebibit per second", 1099512000000], ["Terabit per second", 1000000000000],
    ["Terabyte per second", 8000000000000]];
var digitalStorage = [["Bit", 1], ["Byte", 8], ["Gibibit", 1073742000], ["Gibibyte", 8589935000],
    ["Gigabit", 1000000000], ["Gigabyte", 8000000000], ["Kibibit", 1024], ["Kibibyte", 8192], ["Kilobit", 1000],
    ["Kilobyte", 8000], ["Mebibit", 1048576], ["Mebibyte", 8388608], ["Megabit", 1000000], ["Megabyte", 8000000],
    ["Pebibit", 1125900000000000], ["Pebibyte", 9007199000000000], ["Petabyte", 8000000000000000],
    ["Tebibit", 1099512000000], ["Tebibyte", 8796093000000], ["Terabit", 1000000000000], ["Terabyte", 8000000000000]];
var energy = [["Attoelectron volt", 0.0000000000000000000000000000000000001602177], ["BTU", 1055.056],
    ["Centielectron volt", 0.00000000000000000000160217673], ["Decaelectron volt", 0.000000000000000001602177],
    ["Decielectron", 0.00000000000000000001602177], ["Electronvolt", 0.0000000000000000001602177], ["Erg", 0.0000001],
    ["Exaelectron volt", 0.1602177], ["Femtoelectron volt", 0.0000000000000000000000000000000001602177],
    ["Foot Pound", 1.355818], ["Gigaelectron", 0.0000000001602177], ["Gramcalorie", 4.184],
    ["Hectoelectron volt", 0.00000000000000001602177], ["Joule", 1], ["Kilocalorie", 4184],
    ["Kiloelectron volt", 0.0000000000000001602177], ["Kilojoule", 1000], ["Megaelectron volt", 0.0000000000001602177],
    ["Microelectron volt", 0.0000000000000000000000001602177], ["Millielectron volt", 0.0000000000000000000001602177],
    ["Nanoelectron volt", 0.0000000000000000000000000001602177], ["Petaelectron volt", 0.0001602177],
    ["Picoelectron volt", 0.0000000000000000000000000000001602177], ["Teraelectron volt", 0.0000001602177],
    ["Watt Hour", 3600], ["Yoctoelectron volt", 0.0000000000000000000000000000000000000000001602177],
    ["Yottaelectron volt", 160217.7], ["Zeptoelctron volt", 0.0000000000000000000000000000000000000001602177],
    ["Zettaelectron volt", 160.2177]];
var force = [["Dyne", 0.00001], ["Graham Force", 0.00980665], ["Kilonewton", 1000], ["Kilogram Force", 9.80665],
    ["Kip", 4448.222], ["Newton", 1], ["Ounce Force", 0.2780139], ["Pound Force", 4.448222],
    ["Ton Force Metric", 9806.65]];
var frequency = [["Exahertz", 1000000000000000000], ["Gigahertz", 1000000000], ["Hertz", 1], ["Kilohertz", 1000],
    ["Megahertz", 1000000], ["Microhertz", 0.000001], ["Millihertz", 0.001], ["Petahertz", 1000000000000000],
    ["Terahertz", 1000000000000]];
var length = [["Angstrom", 0.0000000001], ["Angstrom Unit", 149597870700], ["Centimeter", 0.01], ["Chains", 20.1168],
    ["Decameter", 10], ["Decimeter", 0.1], ["Feet", 0.3048], ["Hectometer", 100], ["Inch", 0.0254], ["Kilometer", 1000],
    ["Light Year", 9460730472580800], ["Link", 0.201168], ["Meter", 1], ["Micrometer", 0.000001], ["Mil", 0.0000254],
    ["Mile", 1609.344], ["Millimeter", 0.001], ["Nanometer", 0.000000001], ["Nautical Mile", 1852.00088832],
    ["Parsec", 30856775814913670], ["Picometer", 0.000000000001], ["Rod", 5.02921], ["Yard", 0.9144]];
var mass = [["Atomic Mass Unit", 0.000000000000000000000001660539], ["Carat", 0.2], ["Centigram", 0.01],
    ["Decigram", 0.1], ["Dekagram", 10], ["Dram", 1.771845], ["Femtogram", 0.000000000000001],
    ["French Quintal", 148950], ["Grain", 0.06479891], ["Gram", 1], ["Hectogram", 100], ["Hundredweight", 45359.24],
    ["Kilogram", 1000], ["Long Ton", 1016050], ["Megagram", 1000000], ["Metric Quintal", 100000],
    ["Metric Ton", 1000000], ["Microgram", 0.000001], ["Milligram", 0.001], ["Ounce", 28.34952],
    ["Picogram", 0.000000000001], ["Pound", 453.5924], ["Short Ton", 907185], ["Slug", 14593.9], ["Stick", 115],
    ["Stone", 6350.293], ["Tola", 11.6638], ["Ton", 907184.7], ["Troy Ounce", 31.10348], ["US Quintal", 45359.24]];
var power = [["Exawatt", 1000000000000000000], ["Gigawatt", 1000000000], ["HP", 745.6999], ["Kilowatt", 1000],
    ["Megawatt", 1000000], ["Petawatt", 1000000000000000], ["Terawatt", 1000000000000], ["Watt", 1]];
var pressure = [["Atmosphere", 14.69595], ["Bars", 14.50377], ["Barye", 0.00001450377], ["Centibar", 0.1450377],
    ["cmH2O", 0.01422334], ["Decibar", 1.450377], ["Gigabar", 1450377000], ["Gigapascal", 145037.7],
    ["Hectopascal", 0.01450377], ["Kilobar", 14503.77], ["Kilopascal", 0.1450377], ["Megabar", 1450377],
    ["Megapascal", 145.0377], ["Millibar", 0.01450377], ["Millipascal", 0.0000001450377], ["mmH2O", 0.001422334],
    ["mmHG", 0.01933672], ["Pascal", 0.0001450377], ["PSI", 1], ["Standard Atmosphere", 14.69595],
    ["Technical Atmosphere", 14.22334], ["Torr", 0.01933672]];
var speed = [["Feet per second", 1.09728], ["Kilometers per hour", 1], ["Knot", 1.852001], ["Metres per second", 3.6],
    ["Miles per hour", 1.609344]];
var temperature = [["Kelvin", 1], ["Rankine", 0.5555556]];
var time = [["Century", 876600], ["Days", 24], ["Decade", 87660], ["Femtosecond", 0.0000000000000000002777777777777778],
    ["Fortnight", 336], ["Hours", 1], ["Microseconds", 0.00000000027777777777777778], ["Millennium", 8766000],
    ["Milliseconds", 0.0000002777777777777778], ["Minutes", 0.016666666666666667], ["Months", 730.5],
    ["Nanoseconds", 0.0000000000002777777777777778], ["Picoseconds", 0.0000000000000002777777777777778],
    ["Seconds", 0.0002777777777777778], ["Sidereal Year", 8766.153], ["Weeks", 168], ["Years", 8766]];
var volume = [["Beerbarrel", 117.3478], ["Centilitre", 0.01], ["Cubic Centimeter", 0.001], ["Cubic Foot", 28.31685],
    ["Cubic Inch", 0.01638706], ["Cubic Kilometer", 1000000000], ["Cubic Meter", 0.001], ["Cubic Yard", 764.5549],
    ["Cup (Imperial)", 0.284131], ["Cup (US Legal)", 0.24], ["Decalitre", 10], ["Decilitre", 0.1], ["Drop", 0.00005],
    ["Fluid Dram", 0.003696691], ["Fluid Ounce (Imperial)", 0.0284131], ["Fluid Ounce (US)", 0.02957344],
    ["Gallon (Imperial)", 4.54609], ["Gallon (US)", 3.7854], ["Gill", 0.1182941], ["Hectolitre", 100],
    ["Hogshead", 238.481], ["Litre", 1], ["Millilitre", 0.001], ["Minim", 0.00006161152], ["Oilbarrel", 158.9873],
    ["Pint (US)", 0.4731765], ["Quart (Imperial)", 1.13652], ["Quart (US)", 0.946353],
    ["Tablespoon (Imperial)", 0.0177582], ["Tablespoon (US)", 0.0147868], ["Teaspoon (Imperial)", 0.00591939],
    ["Teaspoon (US)", 0.00492892]];

var categories = [["angle", angle], ["area", area], ["datatransferrate", dataTransferRate],
    ["digitalstorage", digitalStorage], ["energy", energy], ["force", force], ["frequency", frequency],
    ["length", length], ["mass", mass], ["power", power], ["pressure", pressure], ["speed", speed],
    ["temperature", temperature], ["time", time], ["volume", volume]];

function setAvailableConversionUnits() {
    let category = $("#conversion-categories").val();
    let leftUnitSelect = $("#left-conversion-unit");
    let rightUnitSelect = $("#right-conversion-unit");
    leftUnitSelect.empty();
    rightUnitSelect.empty();
    switch (category) {
        case "angle":
            angle.forEach(populateSubMenu);
            break;

        case "area":
            area.forEach(populateSubMenu);
            break;

        case "datatransferrate":
            dataTransferRate.forEach(populateSubMenu);
            break;

        case "digitalstorage":
            digitalStorage.forEach(populateSubMenu);
            break;

        case "energy":
            energy.forEach(populateSubMenu);
            break;

        case "force":
            force.forEach(populateSubMenu);
            break;

        case "frequency":
            frequency.forEach(populateSubMenu);
            break;

        case "length":
            length.forEach(populateSubMenu);
            break;

        case "mass":
            mass.forEach(populateSubMenu);
            break;

        case "power":
            power.forEach(populateSubMenu);
            break;

        case "pressure":
            pressure.forEach(populateSubMenu);
            break;

        case "speed":
            speed.forEach(populateSubMenu);
            break;

        case "temperature":
            temperature.forEach(populateSubMenu);
            break;

        case "time":
            time.forEach(populateSubMenu);
            break;

        case "volume":
            volume.forEach(populateSubMenu);
            break;

        default:
            angle.forEach(populateSubMenu);
    }
}

function populateSubMenu(value, index, array) {
    $("#left-conversion-unit").append(new Option(value[0], value[0]));
    $("#right-conversion-unit").append(new Option(value[0], value[0]));
}


function calculateConversion(input) {
    let category = $("#conversion-categories").val();
    let leftUnitSelect = $("#left-conversion-unit").val();
    let rightUnitSelect = $("#right-conversion-unit").val();
    let leftUnitInput = $("#left-conversion-input");
    let rightUnitInput = $("#right-conversion-input");
    var list = [];

    switch (category) {
        case "angle":
            list = angle;
            break;
        case "area":
            list = area;
            break;
        case "datatransferrate":
            list = dataTransferRate;
            break;
        case "digitalstorage":
            list = digitalStorage;
            break;
        case "energy":
            list = energy;
            break;
        case "force":
            list = force;
            break;
        case "frequency":
            list = frequency;
            break;
        case "length":
            list = length;
            break;
        case "mass":
            list = mass;
            break;
        case "power":
            list = power;
            break;
        case "pressure":
            list = pressure;
            break;
        case "speed":
            list = speed;
            break;
        case "temperature":
            list = temperature;
            break;
        case "time":
            list = time;
            break;
        case "volume":
            list = volume;
            break;
        default:
            return;
    }

    if (input) {
        rightUnitInput.val(getConversionValue(list, leftUnitSelect, leftUnitInput.val(), rightUnitSelect));
    } else {
        leftUnitInput.val(getConversionValue(list, rightUnitSelect, rightUnitInput.val(), leftUnitSelect));
    }
}

function getConversionValue(list, fromUnit, fromInput, toUnit) {
    var conversionRatio = [0, 0];
    list.forEach(function (value, index, array) {
        if (value[0] === fromUnit) {
            conversionRatio[0] = value[1];
        }
        if (value[0] === toUnit) {
            conversionRatio[1] = value[1];
        }
    });

    var output;
    try {
        output = ((eval(fromInput) * conversionRatio[0]) / conversionRatio[1]).toString();
        if (output === "NaN") {
            output = "";
        }
    } catch (e) {
        output = "";
    }

    return output;
}

function selectUnits() {
    var category = checkInclusion(categories);
    if (category != null) {
        $("#conversion-categories").val(category);
    }
    setAvailableConversionUnits();
}


function checkInclusion(list) {
    var query = $("#search_query").val().replace(' ', '').toLowerCase();
    for (var i = 0; i < list.length; ++i) {
        var key = list[i][0].replace(' ', '').toLowerCase();
        if (query.includes(key)) {
            return list[i][0];
        } else if (typeof list[1] == "object") {
            var child = checkSubInclusion(query, list[i]);
            if (child != null) {
                return child;
            }
        }
    }
    return null;
}

function checkSubInclusion(query, list) {
    for (var i = 0; i < list[1].length; ++i) {
        var key = list[1][i][0].replace(' ', '').toLowerCase();
        if (query.includes(key)) {
            return list[0];
        }
    }
    return null;
}
