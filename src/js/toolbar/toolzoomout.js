function ToolZoomout(options) {
    this.toolbar = options.toolbar;
    this.init(options);
}

ToolZoomout.zoomFactor = 0.2;
ToolZoomout.zoomMax = 0.01;

/**                                                                                     Init
 * ========================================================================================= */

ToolZoomout.prototype.init = function(options) {
    this.target = options.target;
    this.id = options.id;
    this.selector = options.selector;
    this.dom = document.querySelector(this.selector);
    this.zoomFactor = options.zoomFactor || ToolZoomout.zoomFactor;
    this.zoomMax = options.zoomMax || ToolZoomout.zoomMax;
    this.initEvents(options.events);
};

/**                                                                                     Zoom
 * ========================================================================================= */

/**
 * Zooms 
 */
ToolZoomout.prototype.zoom = function(zoomFactor) {
    var zoomFactor = zoomFactor || this.zoomFactor;
    var konvas = this.target;
    var currentScale = konvas.getScale();
    var nextScale = currentScale.x - zoomFactor;
    if (nextScale < this.zoomMax) {
        nextScale = this.zoomMax;
    }
    konvas.scale({
        x: nextScale,
        y: nextScale
    });
}

/**                                                                                   Events
 * ========================================================================================= */

ToolZoomout.prototype.initEvents = function(events) {
    // native events
    this.addClickEvent();
    this.addMouseoverEvent();
    this.addMouseoutEvent();
    // add any passed in event listeners
    for (var eventName in events) {
        this.dom.addEventListener(eventName, events[eventName]);
    }
};

ToolZoomout.prototype.addClickEvent = function() {
    this.dom.addEventListener('click', this.click.bind(this));
};

ToolZoomout.prototype.addMouseoverEvent = function() {
    this.dom.addEventListener('mouseover', this.mouseover.bind(this));
};

ToolZoomout.prototype.addMouseoutEvent = function() {
    this.dom.addEventListener('mouseout', this.mouseout.bind(this));
};

/**
 * click event handler
 */
ToolZoomout.prototype.click = function(evt) {
    this.zoom();
};

/**
 * mouseover event handler
 */
ToolZoomout.prototype.mouseover = function(evt) {
    this.dom.style.cursor = 'pointer';
    this.dom.classList.add('toolbar__tool--on');
};

/**
 * mouseout event handler
 */
ToolZoomout.prototype.mouseout = function(evt) {
    this.dom.style.cursor = 'default';
    this.dom.classList.remove('toolbar__tool--on');
};

/**                                                                                    Utils
 * ========================================================================================= */

ToolZoomout.prototype.toString = function() {
    for (var propertyName in this) {
        console.log(propertyName + ' = ' + this[propertyName]);
    }
};

module.exports = ToolZoomout;