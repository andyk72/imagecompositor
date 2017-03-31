var canvastoimage = require('../canvas/canvastoimage');

function ToolSave(options) {
    this.toolbar = options.toolbar;
    this.init(options);
}

/**                                                                                     Init
 * ========================================================================================= */

ToolSave.prototype.init = function(options) {
    this.target = options.target;
    this.id = options.id;
    this.selector = options.selector;
    this.dom = document.querySelector(this.selector);
    this.initEvents(options.events);
};

/**                                                                                     Zoom
 * ========================================================================================= */

/**
 * Saves this.target (Konvas) to file using 'canvasToImage' module
 */
ToolSave.prototype.save = function() {
    var app = this.toolbar.app;
    // store the current target scale
    var currentScale = this.target.getScale();
    // set the target scale to the size right to save it
    this.target.scaleForSaving();
    // save the target to image
    canvastoimage.konvaConvert(this.target.getStage());
    // restore the target scale to the before-save state
    this.target.scale(currentScale);
}

/**                                                                                   Events
 * ========================================================================================= */

ToolSave.prototype.initEvents = function(events) {
    // native events
    this.addClickEvent();
    this.addMouseoverEvent();
    this.addMouseoutEvent();
    // add any passed in event listeners
    for (var eventName in events) {
        this.dom.addEventListener(eventName, events[eventName]);
    }
};

ToolSave.prototype.addClickEvent = function() {
    this.dom.addEventListener('click', this.click.bind(this));
};

ToolSave.prototype.addMouseoverEvent = function() {
    this.dom.addEventListener('mouseover', this.mouseover.bind(this));
};

ToolSave.prototype.addMouseoutEvent = function() {
    this.dom.addEventListener('mouseout', this.mouseout.bind(this));
};

/**
 * click event handler
 */
ToolSave.prototype.click = function(evt) {
    this.save();
};

/**
 * mouseover event handler
 */
ToolSave.prototype.mouseover = function(evt) {
    this.dom.style.cursor = 'pointer';
    this.dom.classList.add('toolbar__tool--on');
};

/**
 * mouseout event handler
 */
ToolSave.prototype.mouseout = function(evt) {
    this.dom.style.cursor = 'default';
    this.dom.classList.remove('toolbar__tool--on');
};

/**                                                                                    Utils
 * ========================================================================================= */

ToolSave.prototype.toString = function() {
    for (var propertyName in this) {
        console.log(propertyName + ' = ' + this[propertyName]);
    }
};

module.exports = ToolSave;