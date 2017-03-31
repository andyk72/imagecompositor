function ToolZoom100(options) {
    this.toolbar = options.toolbar;
    this.init(options);
}

/**                                                                                     Init
 * ========================================================================================= */

ToolZoom100.prototype.init = function(options) {
    this.target = options.target;
    this.id = options.id;
    this.selector = options.selector;
    this.dom = document.querySelector(this.selector);
    this.initEvents(options.events);
};

/**                                                                                     Zoom
 * ========================================================================================= */

/**
 * Zooms 
 */
ToolZoom100.prototype.zoom = function() {
    var konvas = this.target;
    konvas.scale({
        x: .5,
        y: .5
    });
}

/**                                                                                   Events
 * ========================================================================================= */

ToolZoom100.prototype.initEvents = function(events) {
    // native events
    this.addClickEvent();
    this.addMouseoverEvent();
    this.addMouseoutEvent();
    // add any passed in event listeners
    for (var eventName in events) {
        this.dom.addEventListener(eventName, events[eventName]);
    }
};

ToolZoom100.prototype.addClickEvent = function() {
    this.dom.addEventListener('click', this.click.bind(this));
};

ToolZoom100.prototype.addMouseoverEvent = function() {
    this.dom.addEventListener('mouseover', this.mouseover.bind(this));
};

ToolZoom100.prototype.addMouseoutEvent = function() {
    this.dom.addEventListener('mouseout', this.mouseout.bind(this));
};

/**
 * click event handler
 */
ToolZoom100.prototype.click = function(evt) {
    this.zoom();
};

/**
 * mouseover event handler
 */
ToolZoom100.prototype.mouseover = function(evt) {
    this.dom.style.cursor = 'pointer';
    this.dom.classList.add('toolbar__tool--on');
};

/**
 * mouseout event handler
 */
ToolZoom100.prototype.mouseout = function(evt) {
    this.dom.style.cursor = 'default';
    this.dom.classList.remove('toolbar__tool--on');
};

/**                                                                                    Utils
 * ========================================================================================= */

ToolZoom100.prototype.toString = function() {
    for (var propertyName in this) {
        console.log(propertyName + ' = ' + this[propertyName]);
    }
};

module.exports = ToolZoom100;