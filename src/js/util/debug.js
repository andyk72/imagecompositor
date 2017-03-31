function Debug(options) {
    this.app = options.app;
    this.active = options.active;
    this.dom = {
        root: document.querySelector(options.selector),
        content: document.querySelector(options.selectorContent)
    };
    this.content = '';
    this.log('Debug');
    this.start();
}

Debug.nl = '<br />';

Debug.prototype.start = function() {
    msg = 'window.innerWidth = ' + window.innerWidth + Debug.nl;
    msg += 'window.innerHeight = ' + window.innerHeight + Debug.nl;
    canvasSize = this.app.konvas.canvasElementGetSize();
    msg += 'canvas.width = ' + canvasSize.width + Debug.nl;
    msg += 'canvas.height = ' + canvasSize.height + Debug.nl;
    this.log(msg);
}

Debug.prototype.log = function(msg, append = true) {
    var content = (append) ? this.content : '' ;
    content += msg + Debug.nl;
    this.dom.content.innerHTML = content;
    this.content = this.dom.content.innerHTML;
}

module.exports = Debug;