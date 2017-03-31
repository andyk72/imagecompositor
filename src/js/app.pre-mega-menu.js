var Menu = require('./menu/menu');
var Konvas = require('./canvas/canvas');
var Toolbar = require('./toolbar/toolbar');
var InputTextWidget = require('./widgets/inputtextwidget');
var util = require('./util/util');
var Debug = require('./util/debug');

function App() {
    this.conf = {};
    this.eventsManager = null;
    this.menuBackgrounds = null;
    this.menuImages = null;
    this.menuTools = null;
    this.toolbar = null;
    this.konvas = null;
    this.inputTextWidget = null;
    this.collaboration = false;
    this.debug = null;
}

/**                                                                                     Init
 * ========================================================================================= */

/**
 * Inits the application
 */
App.prototype.init = function(options) {
    this.conf = options.conf;
    this.eventsManager = options.eventsManager;
    this.initMenuBackgrounds();
    this.initMenu();
    this.initMenuTools();
    this.initKonvas();
    this.initToolbar();
    this.initDebug();
}

/**                                                                         Menu Backgrounds
 * ========================================================================================= */

App.prototype.initMenuBackgrounds = function() {
    this.menuBackgrounds = new Menu({
        app: this,
        dom: {
            elementId: this.conf.menuBackgrounds.id,
            itemSelector: this.conf.menuBackgrounds.itemSelector
        },
        events: {
            click: function(evt) {
                this.konvas.setBackground({
                    src: evt.target.src
                });
            }.bind(this)
        }          
    });
}

/**                                                                              Menu Images
 * ========================================================================================= */

App.prototype.initMenu = function() {
    this.menuImages = new Menu({
        app: this,
        dom: {
            elementId: this.conf.menuImages.id,
            itemSelector: this.conf.menuImages.itemSelector
        },
        events: {

            click: function(evt) {

                // define image options
                var imageId = this.konvas.createImageId();
                var imageSrc = evt.target.src;
                var options = {
                    id: imageId,
                    src: imageSrc
                };

                // add image
                this.konvas.addImage(options);

                // dispacth sprite.create event
                this.eventsManager.dispatchSpriteCreate({
                    spriteType: 'Image',
                    spriteData: options
                });

            }.bind(this)
        }          
    });
};

/**                                                                               Menu Tools
 * ========================================================================================= */

App.prototype.initMenuTools = function() {
    this.menuTools = new Menu({
        app: this,
        dom: {
            elementId: this.conf.menuTools.id,
            itemSelector: this.conf.menuTools.itemSelector
        },
        events: {
            click: function(evt) {
                this.createInputTextWidget();
            }.bind(this)
        }          
    });
};

App.prototype.createInputTextWidget = function() {

    // inputTextWidget already created -> just show it
    if (this.inputTextWidget) {

        this.inputTextWidget.show();
    
    // inputTextWidget does not exist -> create it
    } else {

        this.inputTextWidget = new InputTextWidget({
            app: this,
            dom: {
                root: document.querySelector(this.conf.inputTextWidget.selectors.root),
                input: document.querySelector(this.conf.inputTextWidget.selectors.input),
                fontsize: document.querySelector(this.conf.inputTextWidget.selectors.fontsize),
                ok: document.querySelector(this.conf.inputTextWidget.selectors.ok),
                cancel: document.querySelector(this.conf.inputTextWidget.selectors.cancel)
            },
            events: {
                /**
                 * fontsize event listener
                 * changes the font size of input
                 * will be added to fontsize.onchange and bound to App
                 */
                fontsize: {
                    evtType: 'change',
                    evtListener: function(evt) {
                        this.inputTextWidget.setFontSize(evt.target.value);
                    }
                },
                /**
                 * ok event listener
                 * creates a text object on the canvas
                 * will be added to ok.onclick and bound to App
                 */
                ok: function(evt) {
                    var content = this.inputTextWidget.getContent();
                    var fontSize = this.inputTextWidget.getFontSize(true);
                    this.konvas.addText({
                        content: content,
                        fontSize: fontSize
                    });
                    this.deleteInputTextWidget();
                },
                /**
                 * cancel event listener
                 * removes the InputTextWidget
                 * will be added to cancel.onclick and bound to App
                 */
                cancel: function(evt) {
                    this.deleteInputTextWidget();
                }
            }
        });

    }
};

App.prototype.deleteInputTextWidget = function() {
    this.inputTextWidget.empty();
    this.inputTextWidget.hide();
};

/**                                                                                   Konvas
 * ========================================================================================= */

App.prototype.initKonvas = function() {
    this.konvas = new Konvas({
        app: this,
        stage: {
            elementId: this.conf.stage.id,
            canvasElementSelector: this.conf.stage.selectorCanvas,
            width: this.conf.stage.stageWidth,
            height: this.conf.stage.stageHeight,
            initialEditingScale: this.conf.stage.initialEditingScale
        },
        background: {
            src: this.conf.stage.backgroundImage
        }
    });
}

/**                                                                                  Toolbar
 * ========================================================================================= */

App.prototype.initToolbar = function() {
    var ref = this;
    // complete tools conf, adding target property
    var confDefault = this.conf.toolbar;
    var confMore = {
        tools: {
            save: {
                target: ref.konvas
            },
            zoomin: {
                target: ref.konvas
            },
            zoomout: {
                target: ref.konvas
            },
            zoom100: {
                target: ref.konvas
            }
        }
    };
    var conf = util.objectExtendSoft(confDefault, confMore);
    // instantiate toolbar
    this.toolbar = new Toolbar({
        app: this,
        conf: conf
    });
};

/**                                                                            Collaboration
 * ========================================================================================= */

App.prototype.enableCollaboration = function() {
    this.collaboration = true;
};

App.prototype.disableCollaboration = function() {
    this.collaboration = false;
};

/**                                                                                    Debug
 * ========================================================================================= */

App.prototype.initDebug = function() {
    // debug is enabled, instantiate it
    if (this.conf.debug.enabled) {
        this.conf.debug.app = this;
        this.debug = new Debug(this.conf.debug);
    // debug is disabled, hide the related element
    } else {
        document.querySelector(this.conf.debug.selector).style.display = 'none';
    }
};

module.exports = App;