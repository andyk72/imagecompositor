var Konva = require('konva');

/**                                                                                  factory
 * ========================================================================================= */

var counter = 0;

/**
 * Creates and returns a Konva.Text instance, configured according to options
 * Does not attach the Text; it will be attached by the calling context (Konva.Stage)
 * @param Object options
 *  .layer Konva.Layer 
 *  .content String
 * 
 *  .id String optional
 *      Defaults to the image url
 *  .x Number optional
 *      Defaults to 0
 *  .y Number optional
 *      Defaults to 0
 *  .width Number optional
 *      Defaults to 300
 *  .padding Number optional
 *      Defaults to 20
 *  .align String optional
 *      Defaults to 'center'
 *  .fontFamily String optional
 *      Defaults to 'Calibri'
 *  .fontSize Number optional
 *      Defaults to 18
 *  .fill HexColorString optional
 *      Defaults to '#333'
 *  .draggable Boolean optional
 *      Defaults to true
 * 
 *  .click Function optional
 *      Defaults to remove text
 *  .mouseenter Function optional
 *      Defaults to hand cursor
 *  .mouseleave Function optional
 *      Defaults to default cursor
 *  .mouseover Function optional
 *      Defaults to not implemented
 *  .mouseout Function optional
 *      Defaults to not implemented
 */
function factory(options) {

    // initialize options (keys must be supported by Konva.Text() constructor)
    options = options || {};

    options.id = options.id || generateTextId();
    options.x = options.x || 0;
    options.y = options.y || 0;
    options.width = options.width || 300;
    options.padding = options.padding || 20;
    options.align = options.align || 'center';
    options.fontFamily = options.fontFamily || 'Calibri';
    options.fontSize = options.fontSize || 18;
    options.fill = options.fill || '#333';
    options.draggable = (options.draggable != undefined) ? options.draggable : true;

    options.text = options.content || 'COMPLEX TEXT\n\nAll the world\'s a stage, and all the men and women merely players. They have their exits and their entrances.';
    
    return new Text(options);

}

function generateTextId() {
    return 'text_' + ++counter;
}

/**                                                                               Text Class
 * ========================================================================================= */

function Text(options) {
    this.init(options);
}

Text.prototype.init = function(options) {
    this.konvaText = new Konva.Text(options);
    this.initEvents(options);
};

Text.prototype.initEvents = function(options) {

    var layer = options.layer;

    // Define events handlers
    var click = options.click || function(){
        this.remove();
        layer.draw();
    };
    var mouseenter = options.mouseenter || function(evt){
        document.body.style.cursor = 'pointer';
        layer.draw();
    };
    var mouseleave = options.mouseleave || function(){
        document.body.style.cursor = 'default';  
        layer.draw();  
    };
    var mouseover = options.mouseover || function(){console.log('[mouseover] not implemented')};
    var mouseout = options.mouseout || function(){console.log('[mouseout] not implemented')};

    // Assign events handlers
    this.konvaText.on('click', click);
    this.konvaText.on('mouseover', mouseover);
    this.konvaText.on('mouseout', mouseout);
    this.konvaText.on('mouseenter', mouseenter);
    this.konvaText.on('mouseleave', mouseleave);
};

Text.prototype.setContent = function(content) {
    this.konvaText.setText(content);
    this.konvaText.getLayer().draw();
};

/**                                                                                  exports
 * ========================================================================================= */

module.exports.factory = factory;
module.exports.count = counter;
