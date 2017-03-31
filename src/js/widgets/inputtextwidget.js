/**
 * @property App app
 *  The App instance
 * @property Object dom
 *  The widget's HTML elements dom references
 *  .root HTMLElement
 *  .input HTMLElement
 *  .fontsize HTMLElement
 *  .ok HTMLElement
 *  .cancel HTMLElement
 */

function InputTextWidget(options, show = true) {
    this.setup(options);
    if (show) {
        this.show();
    }
}

InputTextWidget.DEFAULT_EVENT_TYPE = 'click';

/**                                                                                    setup
 * ========================================================================================= */

InputTextWidget.prototype.setup = function(options) {
    this.app = options.app;
    this.setupDom(options.dom);
    this.setupEvents(options.events);
};

InputTextWidget.prototype.setupDom = function(dom) {
    this.dom = dom;
};

/**
 * Sets up widget events
 * Each key defines an event listener to be attached to the dom object defined by the key itself
 * So keys must be equal to this.dom keys for the listeners to be properly attached to the dom elements
 * If the key value is a function, that function will be used as the default event type (InputTextWidget.DEFAULT_EVENT_TYPE) listener
 * If the key value is an object, the object.evtListener function will be used as the object.evtType event listener
 * @param Object events
 *  .<eventId> Function|Object
 *  Sample
 *      Event listener for the cancel dom element
 *      The 'click' (InputTextWidget.DEFAULT_EVENT_TYPE) event type will fire the function
 *      .cancel: function(evt) {
 *          this.deleteInputTextWidget();
 *      }
 *      Event listener for the fontsize dom element
 *      The 'change' event type will fire the .evtListener function
 *      .fontsize: {
 *          evtType: 'change',
 *          evtListener: function(evt) {
 *              var input = this.inputTextWidget.dom.input;
 *              input.style.fontSize = evt.target.value;
 *          }
 *      },
 */
InputTextWidget.prototype.setupEvents = function(events) {
    var eventObj, evtType, evtListener;
    for (var eventName in events) {
        eventObj = events[eventName];
        // eventObj defines only the event listener (it is a Function), assign it to the default event type ('click')
        if (eventObj instanceof Function) {
            evtType = InputTextWidget.DEFAULT_EVENT_TYPE;
            evtListener = eventObj;
        // eventObj defines both event type and event listener 
        } else {
            evtType = eventObj.evtType;
            evtListener = eventObj.evtListener;
        }
        this.dom[eventName].addEventListener(evtType, evtListener.bind(this.app));
    }
};

/**                                                                                show/hide
 * ========================================================================================= */

InputTextWidget.prototype.show = function() {
    this.dom.root.classList.remove('hidden');
};

InputTextWidget.prototype.hide = function() {
    this.dom.root.classList.add('hidden');
};

/**                                                                          input text area
 * ========================================================================================= */

InputTextWidget.prototype.getContent = function() {
    return this.dom.input.value;
};

InputTextWidget.prototype.setContent = function(content) {
    this.dom.input.value = content;
};

InputTextWidget.prototype.empty = function() {
    this.dom.input.value = '';
};

InputTextWidget.prototype.getFontSize = function(asInt) {
    var fontSize = this.dom.input.style.fontSize;
    if (asInt) {
        fontSize = parseInt(fontSize.split('px')[0]);
    }
    return fontSize; 
};

InputTextWidget.prototype.setFontSize = function(value) {
    this.dom.input.style.fontSize = value;
};

module.exports = InputTextWidget;