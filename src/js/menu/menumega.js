/**
 * @param Object options
 *  .app App
 *      Refrence to eh main app instance
 *  .dom
 *      .elementId
 *      .itemSelector
 */
function MenuMega(options) {
    this.app = options.app;
    this.dom = {};
    this.init(options);
}

MenuMega.cursorPointer = function(evt) {
    document.body.style.cursor = 'pointer';
};

MenuMega.cursorDefault = function(evt) {
    document.body.style.cursor = 'default';
};

MenuMega.prototype.init = function(options) {
    this.initDom(options.dom);
    this.initEvents(options.events);
};

/**
 * @param Object dom
 *  .elementId
 *  .itemSelector
 */
MenuMega.prototype.initDom = function(dom) {
    this.dom = {};
    this.dom.root = document.getElementById(dom.elementId);
    this.dom.btnShow = document.querySelector(dom.btnShowSelector);
    this.dom.btnHide = document.querySelector(dom.btnHideSelector);
    this.dom.itemsContainer = document.querySelector(dom.itemsContainerSelector);
    this.dom.items = document.querySelectorAll(dom.itemSelector);
};

MenuMega.prototype.initEvents = function(events) {

    var ref = this;

    // btn show and btn hide events
    this.dom.btnShow.addEventListener('click', ref.itemsShow.bind(ref));
    this.dom.btnShow.addEventListener('mouseover', MenuMega.cursorPointer);
    this.dom.btnShow.addEventListener('mouseout', MenuMega.cursorDefault);
    this.dom.btnHide.addEventListener('click', ref.itemsHide.bind(ref));
    this.dom.btnHide.addEventListener('mouseover', MenuMega.cursorPointer);
    this.dom.btnHide.addEventListener('mouseout', MenuMega.cursorDefault);

    // items events
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

MenuMega.prototype.itemsShow = function() {
    this.dom.itemsContainer.classList.toggle('hide');
};

MenuMega.prototype.itemsHide = function() {
    this.dom.itemsContainer.classList.toggle('hide');
};

MenuMega.prototype.toString = function() {
    for (var p in this) {
        console.log(p + ' = ' + this[p]);
    }
};

module.exports = MenuMega;