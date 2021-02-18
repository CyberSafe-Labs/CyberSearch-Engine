search_topics = {}

exact_match_integrations = {
    'calculator': 'calculator',

    'javascript': 'html_editor',
    'html': 'html_editor',
    'htmleditor': 'html_editor',
    'css': 'html_editor',
    'webeditor': 'html_editor',

    'baseconverter': 'base_converter',
    'baseconversion': 'base_converter',
    'base2': 'base_converter',
    'base3': 'base_converter',
    'base8': 'base_converter',
    'base16': 'base_converter',
    'binary': 'base_converter',
    'ternary': 'base_converter',
    'octal': 'base_converter',
    'hexadecimal': 'base_converter',

    'unitconverter': 'unit_converter',
    'unitconversion': 'unit_converter',
    'unitsconverter': 'unit_converter',
    'unitsconversion': 'unit_converter',
    'convertunits': 'unit_converter',
    'convertunit': 'unit_converter',
    'angle': 'unit_converter',
    'area': 'unit_converter',
    'datatransferrate': 'unit_converter',
    'digitalstorage': 'unit_converter',
    'energy': 'unit_converter',
    'force': 'unit_converter',
    'frequency': 'unit_converter',
    'length': 'unit_converter',
    'mass': 'unit_converter',
    'power': 'unit_converter',
    'pressure': 'unit_converter',
    'speed': 'unit_converter',
    'temperature': 'unit_converter',
    'time': 'unit_converter',
    'volume': 'unit_converter',
    'arcminute': 'unit_converter', 'arcsecond': 'unit_converter', 'Cycles': 'unit_converter',
    'degrees': 'unit_converter', 'gradians': 'unit_converter', 'microarcsecond': 'unit_converter',
    'microradian': 'unit_converter', 'milliarcsecond': 'unit_converter', 'milliradian': 'unit_converter',
    'radians': 'unit_converter', 'revolution': 'unit_converter', 'acre': 'unit_converter', 'are': 'unit_converter',
    'barn': 'unit_converter', 'hectare': 'unit_converter', 'rood': 'unit_converter',
    'squarecentimeter': 'unit_converter', 'squaredecimeter': 'unit_converter', 'squarefeet': 'unit_converter',
    'squareinch': 'unit_converter', 'squaremeter': 'unit_converter', 'squaremile': 'unit_converter',
    'squaremillimeter': 'unit_converter', 'squarerod': 'unit_converter', 'squareyard': 'unit_converter',
    'bitspersecond': 'unit_converter', 'gibibitpersecond': 'unit_converter', 'gigabitpersecond': 'unit_converter',
    'gigabytepersecond': 'unit_converter', 'kibibitpersecond': 'unit_converter',
    'kilobitpersecond': 'unit_converter', 'kilobytepersecond': 'unit_converter',
    'mebibitpersecond': 'unit_converter', 'megabitpersecond': 'unit_converter',
    'megabytepersecond': 'unit_converter', 'tebibitpersecond': 'unit_converter',
    'terabitpersecond': 'unit_converter', 'terabytepersecond': 'unit_converter', 'bit': 'unit_converter',
    'byte': 'unit_converter', 'gibibit': 'unit_converter', 'gibibyte': 'unit_converter', 'gigabit': 'unit_converter',
    'gigabyte': 'unit_converter', 'kibibit': 'unit_converter', 'kibibyte': 'unit_converter',
    'kilobit': 'unit_converter', 'kilobyte': 'unit_converter', 'mebibit': 'unit_converter',
    'mebibyte': 'unit_converter', 'megabit': 'unit_converter', 'megabyte': 'unit_converter',
    'pebibit': 'unit_converter', 'pebibyte': 'unit_converter', 'petabyte': 'unit_converter',
    'tebibit': 'unit_converter', 'tebibyte': 'unit_converter', 'terabit': 'unit_converter',
    'terabyte': 'unit_converter', 'attoelectronvolt': 'unit_converter', 'btu': 'unit_converter',
    'centielectronvolt': 'unit_converter', 'decaelectronvolt': 'unit_converter', 'decielectron': 'unit_converter',
    'electronvolt': 'unit_converter', 'erg': 'unit_converter', 'exaelectronvolt': 'unit_converter',
    'femtoelectronvolt': 'unit_converter', 'footpound': 'unit_converter', 'gigaelectron': 'unit_converter',
    'gramcalorie': 'unit_converter', 'hectoelectronvolt': 'unit_converter', 'joule': 'unit_converter',
    'kilocalorie': 'unit_converter', 'kiloelectronvolt': 'unit_converter', 'kilojoule': 'unit_converter',
    'megaelectronvolt': 'unit_converter', 'microelectronvolt': 'unit_converter',
    'millielectronvolt': 'unit_converter', 'nanoelectronvolt': 'unit_converter',
    'petaelectronvolt': 'unit_converter', 'picoelectronvolt': 'unit_converter', 'teraelectronvolt': 'unit_converter',
    'watthour': 'unit_converter', 'yoctoelectronvolt': 'unit_converter', 'yottaelectronvolt': 'unit_converter',
    'Zeptoelctronvolt': 'unit_converter', 'zettaelectronvolt': 'unit_converter', 'Dyne': 'unit_converter',
    'grahamforce': 'unit_converter', 'kilonewton': 'unit_converter', 'kilogramforce': 'unit_converter',
    'kip': 'unit_converter', 'newton': 'unit_converter', 'ounceforce': 'unit_converter',
    'poundforce': 'unit_converter', 'tonforcemetric': 'unit_converter', 'Exahertz': 'unit_converter',
    'gigahertz': 'unit_converter', 'hertz': 'unit_converter', 'kilohertz': 'unit_converter',
    'megahertz': 'unit_converter', 'microhertz': 'unit_converter', 'millihertz': 'unit_converter',
    'petahertz': 'unit_converter', 'terahertz': 'unit_converter', 'angstrom': 'unit_converter',
    'angstromUnit': 'unit_converter', 'centimeter': 'unit_converter', 'chains': 'unit_converter',
    'decameter': 'unit_converter', 'decimeter': 'unit_converter', 'feet': 'unit_converter',
    'hectometer': 'unit_converter', 'inch': 'unit_converter', 'inches': 'unit_converter', 'kilometer': 'unit_converter',
    'lightYear': 'unit_converter', 'link': 'unit_converter', 'meter': 'unit_converter', 'micrometer': 'unit_converter',
    'mil': 'unit_converter', 'mile': 'unit_converter', 'millimeter': 'unit_converter', 'nanometer': 'unit_converter',
    'nauticalMile': 'unit_converter', 'parsec': 'unit_converter', 'picometer': 'unit_converter',
    'rod': 'unit_converter', 'yard': 'unit_converter', 'atomicmassunit': 'unit_converter', 'carat': 'unit_converter',
    'centigram': 'unit_converter', 'decigram': 'unit_converter', 'dekagram': 'unit_converter', 'dram': 'unit_converter',
    'femtogram': 'unit_converter', 'frenchquintal': 'unit_converter', 'grain': 'unit_converter',
    'gram': 'unit_converter', 'hectogram': 'unit_converter', 'hundredweight': 'unit_converter',
    'kilogram': 'unit_converter', 'longton': 'unit_converter', 'megagram': 'unit_converter',
    'metricquintal': 'unit_converter', 'metricton': 'unit_converter', 'microgram': 'unit_converter',
    'milligram': 'unit_converter', 'ounce': 'unit_converter', 'picogram': 'unit_converter', 'pound': 'unit_converter',
    'shortTon': 'unit_converter', 'Slug': 'unit_converter', 'stick': 'unit_converter', 'stone': 'unit_converter',
    'tola': 'unit_converter', 'ton': 'unit_converter', 'troyounce': 'unit_converter', 'quintal': 'unit_converter',
    'exawatt': 'unit_converter', 'gigawatt': 'unit_converter', 'hp': 'unit_converter', 'kilowatt': 'unit_converter',
    'megawatt': 'unit_converter', 'petawatt': 'unit_converter', 'terawatt': 'unit_converter', 'watt': 'unit_converter',
    'atmosphere': 'unit_converter', 'bars': 'unit_converter', 'barye': 'unit_converter', 'centibar': 'unit_converter',
    'cmh2o': 'unit_converter', 'decibar': 'unit_converter', 'gigabar': 'unit_converter', 'gigapascal': 'unit_converter',
    'hectopascal': 'unit_converter', 'Kilobar': 'unit_converter', 'kilopascal': 'unit_converter',
    'megabar': 'unit_converter', 'megapascal': 'unit_converter', 'millibar': 'unit_converter',
    'millipascal': 'unit_converter', 'mmh2o': 'unit_converter', 'mmhg': 'unit_converter', 'pascal': 'unit_converter',
    'psi': 'unit_converter', 'standardatmosphere': 'unit_converter', 'technicalatmosphere': 'unit_converter',
    'torr': 'unit_converter', 'feetpersecond': 'unit_converter', 'kilometersperhour': 'unit_converter',
    'knot': 'unit_converter', 'metrespersecond': 'unit_converter', 'milesperhour': 'unit_converter',
    'kelvin': 'unit_converter', 'rankine': 'unit_converter', 'century': 'unit_converter', 'days': 'unit_converter',
    'decade': 'unit_converter', 'femtosecond': 'unit_converter', 'fortnight': 'unit_converter',
    'hours': 'unit_converter', 'microseconds': 'unit_converter', 'millennium': 'unit_converter',
    'milliseconds': 'unit_converter', 'minutes': 'unit_converter', 'months': 'unit_converter',
    'nanoseconds': 'unit_converter', 'picoseconds': 'unit_converter', 'seconds': 'unit_converter',
    'siderealYear': 'unit_converter', 'weeks': 'unit_converter', 'years': 'unit_converter',
    'beerbarrel': 'unit_converter', 'centilitre': 'unit_converter', 'cubiccentimeter': 'unit_converter',
    'cubicFoot': 'unit_converter', 'cubicInch': 'unit_converter', 'cubickilometer': 'unit_converter',
    'cubicMeter': 'unit_converter', 'cubicYard': 'unit_converter', 'cup': 'unit_converter',
    'decalitre': 'unit_converter', 'decilitre': 'unit_converter',
    'drop': 'unit_converter', 'fluidDram': 'unit_converter', 'fluidounce': 'unit_converter',
    'gallon': 'unit_converter', 'gill': 'unit_converter', 'hectolitre': 'unit_converter',
    'hogshead': 'unit_converter', 'litre': 'unit_converter', 'millilitre': 'unit_converter', 'minim': 'unit_converter',
    'oilbarrel': 'unit_converter', 'pint': 'unit_converter', 'quart': 'unit_converter', 'tablespoon': 'unit_converter',
    'teaspoon': 'unit_converter',

    'colorpicker': 'color_picker',
    'color': 'color_picker',
    'colors': 'color_picker',
    'rgbtohex': 'color_picker',
    'rgbtohsv': 'color_picker',
    'rgbtocmyk': 'color_picker',
    'hextorgb': 'color_picker',
    'hextohsv': 'color_picker',
    'hextocmyk': 'color_picker',
    'hsvtorgb': 'color_picker',
    'hsvtohex': 'color_picker',
    'hsvtocmyk': 'color_picker',
    'cmyktohex': 'color_picker',
    'cmyktorgb': 'color_picker',
    'cmyktohsv': 'color_picker',
    'colorpalete': 'color_picker',
    'colorpaletes': 'color_picker',

    'randomnumbergenerator': 'rand_num_generator',
    'randomnumbergenarator': 'rand_num_generator',
    'randomnumber': 'rand_num_generator',
    'randomvalue': 'rand_num_generator',
    'randomvaluegenerator': 'rand_num_generator',
    'randomnumbers': 'rand_num_generator',
    'randomvalues': 'rand_num_generator',
    'generaterandomvalue': 'rand_num_generator',
    'generaterandomvalues': 'rand_num_generator',
    'generaterandomnumber': 'rand_num_generator',
    'generaterandomnumbers': 'rand_num_generator',

    'stopwatch': 'stopwatch_timer',
    'timer': 'stopwatch_timer',
}


def topic_search_v2(words):
    searched_for = ''
    word_length = len(words)
    if words[0].lower() in search_topics:
        if word_length == 1:
            return search_topics[words[0].lower()], searched_for

        for word in words[1:]:
            searched_for += word + ' '
        return search_topics[words[0].lower()], searched_for

    if words[word_length - 1].lower() in search_topics:
        if word_length == 1:
            return search_topics[words[word_length - 1].lower()], searched_for

        for word in words[0:word_length - 1]:
            searched_for += word + ' '
        return search_topics[words[word_length - 1].lower()], searched_for

    return '', ''


def calculation_search(query):
    words = query.replace(' ', '')
    calculation = ''
    for word in words:
        is_number = False
        is_math_operation = False
        try:
            num = float(word)
            is_number = True
            calculation += str(num)
        except Exception as e:
            is_number = False

        if word == '(' or word == ')' or word == '^' or word == '*' or word == 'x' or word == '/' or word == '+' or word == '-':
            is_math_operation = True
            calculation += str(word)

        if is_number is False and is_math_operation is False:
            return False, ''

    return True, calculation


# This is the main one
def analyze_query_v2(query):
    words = str(query).split()

    topic = topic_search_v2(words)
    if topic[0] != '':
        return topic

    calculation = calculation_search(query)
    if calculation[0] is True:
        return 'calculator', calculation[1]

    query = query.replace(' ', '').lower()
    if query in exact_match_integrations:
        return exact_match_integrations[query], ''

    for word in words:
        if word in exact_match_integrations:
            return exact_match_integrations[word], ''

    return None, None


if __name__ == '__main__':
    analyze_query_v2('(4+3)/3')
