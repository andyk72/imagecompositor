var urlparse = require('url-parse');
var confStageSizes = require('./confstagesizes');

var COMPOSITION_ID = urlparse(document.location, true).query['id'] || 'default';

console.log('id = ' + COMPOSITION_ID);

//var CONF_FOLDER = 'conf/';
var CONF_FOLDER = 'compositions/' + COMPOSITION_ID + '/';
var DEFAULT_CONF_FILE = CONF_FOLDER + 'conf.json';

console.log('CONF_FOLDER = ' + CONF_FOLDER);

/**
 * Loads the config json file
 * Three cases with the following priority logic (implemented in _getFile())
 *  1. Loads the file defined in 'c' GET param (relative to CONF_FOLDER), if any
 *  2. Loads the file argument, if any
 *  3. Loads DEFAULT_CONF_FILE
 * @param Function callback,
 * @param String file optional
 * @usages
 *  config.loadJSON(bootstrap);
 *      Loads (from CONF_FOLDER)
 *          DEFAULT_CONF_FILE
 *          or
 *          The file passed in as 'c' GET param
 *  config.loadJSON(bootstrap, 'conf/custom/myconf.json');
 *      Loads 'conf/custom/myconf.json'
 */
function loadJSON(callback, file) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', _getFile(file), true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(_jsonCompile(xobj.responseText));
        }
    };
    xobj.send(null);  
}

/**
 * Turns jsonText into Object
 * Compiles stage width and height if they are expressed with javascript expressions
 */
function _jsonCompile(jsonText) {

    // create object form JSON
    var json = JSON.parse(jsonText);

    // compile stage width and height
    if (isNaN(parseInt(json.stage.stageWidth))) {
        json.stage.stageWidth = eval(json.stage.stageWidth);
        json.stage.stageHeight = eval(json.stage.stageHeight);
    }

    return json;

}

/**
 * Returns the file path to be loaded
 * @return string
 */
function _getFile(file) {
    var fileNameFromUrl = _paramInUrl('c');
    if (fileNameFromUrl) {
        file = CONF_FOLDER + fileNameFromUrl + '.json';
    } else {
        file = file || DEFAULT_CONF_FILE;
    }
    return file;
}

/**
 * Returns the value of the query string param named paramName, if any
 * Returns undefined if paramName is not in the query string
 * @return String|undefined
 */
function _paramInUrl(paramName) {
    var url = urlparse(document.location, true);
    return url.query[paramName];
}

module.exports.load = loadJSON;