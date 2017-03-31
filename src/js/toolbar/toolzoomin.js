function ToolZoomin(options) {
    this.toolbar = options.toolbar;
    this.init(options);
}

ToolZoomin.zoomFactor = 0.2;
ToolZoomin.zoomMax = 0.1;

/**                                                                                     Init
 * ========================================================================================= */

ToolZoomin.prototype.init = function(options) {
    this.target = options.target;
    this.id = options.id;
    this.selector = options.selector;
    this.dom = document.querySelector(this.selector);
    this.zoomFactor = options.zoomFactor || ToolZoomin.zoomFactor;
    this.zoomMax = options.zoomMax || ToolZoomin.zoomMax;
    this.initEvents(options.events);
};

/**                                                                                     Zoom
 * ========================================================================================= */

/**
 * Zooms 
 */
ToolZoomin.prototype.zoom = function(zoomFactor) {
    var zoomFactor = zoomFactor || this.zoomFactor;
    var konvas = this.target;
    var currentScale = konvas.getScale();
    var nextScale = currentScale.x + zoomFactor;
    if (nextScale > this.zoomMax) {
        nextScale = this.zoomMax;
    }
    konvas.scale({
        x: nextScale,
        y: nextScale
    });
}

/**                                                                                   Events
 * ========================================================================================= */

ToolZoomin.prototype.initEvents = function(events) {
    // native events
    this.addClickEvent();
    this.addMouseoverEvent();
    this.addMouseoutEvent();
    // add any passed in event listeners
    for (var eventName in events) {
        this.dom.addEventListener(eventName, events[eventName]);
    }
};

ToolZoomin.prototype.addClickEvent = function() {
    this.dom.addEventListener('click', this.click.bind(this));
};

ToolZoomin.prototype.addMouseoverEvent = function() {
    this.dom.addEventListener('mouseover', this.mouseover.bind(this));
};

ToolZoomin.prototype.addMouseoutEvent = function() {
    this.dom.addEventListener('mouseout', this.mouseout.bind(this));
};

/**
 * click event handler
 */
ToolZoomin.prototype.click = function(evt) {
    this.zoom();
};

/**
 * mouseover event handler
 */
ToolZoomin.prototype.mouseover = function(evt) {
    this.dom.style.cursor = 'pointer';
    this.dom.classList.add('toolbar__tool--on');
};

/**
 * mouseout event handler
 */
ToolZoomin.prototype.mouseout = function(evt) {
    this.dom.style.cursor = 'default';
    this.dom.classList.remove('toolbar__tool--on');
};

/**                                                                                    Utils
 * ========================================================================================= */

ToolZoomin.prototype.toString = function() {
    for (var propertyName in this) {
        console.log(propertyName + ' = ' + this[propertyName]);
    }
};

module.exports = ToolZoomin;