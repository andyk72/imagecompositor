var ToolZoomin = require('./toolzoomin');
var ToolZoomout = require('./toolzoomout');
var ToolZoom100 = require('./toolzoom100');
var ToolSave = require('./toolsave');
var util = require('../util/util');

function Toolbar(options) {
    this.app = options.app;
    this.conf = options.conf;
    this.tools = {};
    this.init(options);
}

Toolbar.prototype.init = function(options) {
    this.initDom(options.conf);
    this.initTools(options);
};

Toolbar.prototype.initDom = function(conf) {
    this.dom = {};
    this.dom.root = document.querySelector(conf.selector);
};

Toolbar.prototype.toolName2ClassName = function(toolName) {
    var firstUpper = toolName.charAt(0).toUpperCase() + toolName.substr(1);
    return 'Tool' + firstUpper;
};

Toolbar.prototype.initTools = function(options) {

    // aknowledge tools from conf
    this.tools = options.conf.tools;

    // for each aknowledged tool
    for (var toolName in this.tools) {
        
        // define the tool instance properties
        // ...base properties, plus...
        var toolBaseOptions = {
            toolbar: this,
            id: toolName,
        };
        // ...more properties from conf
        var toolSpecificOptions = this.tools[toolName];
        var toolOptions = util.objectExtendSoft(toolBaseOptions, toolSpecificOptions);

        // define the specific tool class, if any, based on toolName
        var toolClassName = this.toolName2ClassName(toolName);
        var toolDedicatedClass = eval(toolClassName);

        // if there is a specific tool dedicated class, create the tool instance out of it
        if (toolDedicatedClass) {
            toolInstance = new toolDedicatedClass(toolOptions);
        // else create the tool instance otu of the generic ToolbarTool class
        } else {
            toolInstance = new ToolbarTool(toolOptions);
        }

        // store the tool instance
        this.tools[toolName].instance = toolInstance;
    }
};

function ToolbarTool(options) {
    this.toolbar = options.toolbar;
    this.init(options);
}

ToolbarTool.prototype.init = function(options) {
    this.target = options.target;
    this.id = options.id;
    this.selector = options.selector;
    this.dom = document.querySelector(this.selector);
    this.initEvents(options.events);
};

ToolbarTool.prototype.initEvents = function(events) {
    for (var eventName in events) {
        this.dom.addEventListener(eventName, events[eventName]);
    }
};

ToolbarTool.prototype.toString = function() {
    for (var propertyName in this) {
        console.log(propertyName + ' = ' + this[propertyName]);
    }
};

module.exports = Toolbar;