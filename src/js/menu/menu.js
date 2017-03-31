/**
 * @param Object options
 *  .app App
 *      Refrence to eh main app instance
 *  .dom
 *      .elementId
 *      .itemSelector
 */
function Menu(options) {
    this.app = options.app;
    this.dom = {};
    this.init(options);
}

Menu.prototype.init = function(options) {
    this.initDom(options.dom);
    this.initEvents(options.events);
};

/**
 * @param Object dom
 *  .elementId
 *  .itemSelector
 */
Menu.prototype.initDom = function(dom) {
    this.dom = {};
    this.dom.root = document.getElementById(dom.elementId);
    this.dom.items = document.querySelectorAll(dom.itemSelector);
};

Menu.prototype.initEvents = function(events) {

    var ref = this;

    // set event handlers, with default fallback
    var click = (events && events.click) ? events.click : function(evt) {
        ref.app.konvas.addImage({
            src: this.src
        });
    };
    var mouseover = (events && events.mouseover) ? events.mouseover : function(evt) {
        document.body.style.cursor = 'pointer';
    };
    var mouseout = (events && events.mouseout) ? events.mouseout : function(evt) {
        document.body.style.cursor = 'default';
    };

    // assign events to all the items
    for (var i = 0; i < this.dom.items.length; i++) {
        var item = this.dom.items[i];
        item.addEventListener('click', click);
        item.addEventListener('mouseover', mouseover);
        item.addEventListener('mouseout', mouseout);
    }

};

Menu.prototype.toString = function() {
    for (var p in this) {
        console.log(p + ' = ' + this[p]);
    }
};

module.exports = Menu;