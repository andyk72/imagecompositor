var Konva = require('konva');
var konvaText = require('./draw/text');

function Konvas(options) {
    // declare all props
    this.app = options.app;
    this.initialEditingScale = {x:1, y:1};
    this.canvasElement = null;
    this.stage = null;
    this.layerBackground = null;
    this.layerComposition = null;
    this.spritesCount = 0;
    // setup
    this.setup(options);
    // scale to initialScale
    this.scaleReset();
}

Konvas.saveScale = {x:.5, y:.5};

/**
 * @param Object options
 *  .app App
 *      Refrence to eh main app instance
 *  .stage Object|Konva.Stage
 *      .elementId
 *      .width
 *      .height
 */
Konvas.prototype.setup = function(options) {
    this.setupStage(options.stage);
    this.createBackground(options.background);
    this.createLayer();
    this.canvasElementRegister(options.stage);
};

/**                                                                                    stage
 * ========================================================================================= */

Konvas.prototype.setupStage = function(stage) {
    this.initialEditingScale = stage.initialEditingScale;
    this.createStage(stage);
};

Konvas.prototype.createStage = function(stage) {
    if (stage.elementId) {
        this.stage = new Konva.Stage({
            container: stage.elementId,
            width: stage.width,
            height: stage.height
        });
    } else {
        this.stage = stage;
    }
};

Konvas.prototype.getStage = function() {
    return this.stage;
};

/**                                                                               background
 * ========================================================================================= */

/**
 * Creates the background
 *  - layer
 *  - image (if provided by background.src)
 * @param Object background
 *  .src String
 *  .layer Konva.Layer optional
 *  .draggable Boolean optional
 *  .click Function optional
 */
Konvas.prototype.createBackground = function(background) {
    this.layerBackground = new Konva.Layer();
    this.stage.add(this.layerBackground);
    if (background && background.src) {
        this.setBackground(background);
    }        
};

/**
 * Sets (adds) the background image
 * Previous backgorund images are covered (not replaced) by new ones
 * @param Object background
 *  .src String
 *  .layer Konva.Layer optional
 *  .draggable Boolean optional
 *  .click Function optional
 */
Konvas.prototype.setBackground = function(background) {

    var id = this.createSpriteId('Background');
    var src = background.src;
    var layer = background.layer || this.layerBackground;
    var click = background.click || function(){};
    var mouseover = background.mouseover || function(){};
    var mouseout = background.mouseout || function(){};
    var mouseenter = background.mouseenter || function(){};
    var mouseleave = background.mouseleave || function(){};
    var click = background.click || function(){};
    var draggable = background.draggable || false;

    this.addImage({
        id: id,
        layer: layer,
        src: src,
        click: click,
        mouseover: mouseover,
        mouseout: mouseout,
        mouseenter: mouseenter,
        mouseleave: mouseleave,
        draggable: draggable
    }); 

};

/**                                                                         <canvas> element
 * ========================================================================================= */

Konvas.prototype.canvasElementRegister = function(stage) {
    this.canvasElement = document.querySelector(stage.canvasElementSelector);
};

Konvas.prototype.canvasElementGetSize = function() {
    return {
        width: this.canvasElement.width,
        height: this.canvasElement.height
    }
};

/**                                                                                   images
 * ========================================================================================= */

Konvas.prototype.createLayer = function() {
    this.layerComposition = new Konva.Layer();
    this.stage.add(this.layerComposition);
};

Konvas.prototype.addImages = function() {};

/**
 * Adds the image described in options to the Konvas stage
 * @param Object options
 *  .src String
 *  .id String optional
 *      Defaults to the 'Image_<n>'
 *  .x Number optional
 *      Defaults to 0
 *  .y Number optional
 *      Defaults to 0
 *  .width Number optional
 *      Defaults to the original image size width
 *  .height Number optional
 *      Defaults to the original image size height
 *  .draggable Boolean optional
 *      Defaults to true
 *  .layer Konva.Layer optional
 *      Defaults to this.layerComposition
 *  .click Function optional
 *      Defaults to remove image
 *  .mouseenter Function optional
 *      Defaults to hand cursor
 *  .mouseleave Function optional
 *      Defaults to default cursor
 *  .mouseover Function optional
 *      Defaults to not implemented
 *  .mouseout Function optional
 *      Defaults to not implemented
 */
Konvas.prototype.addImage = function(options) {

    var ref = this;
    var app = ref.app;

    /**
     * Inner function actually creating the Konvas image
     * @param Image imageObj
     *  The laoded javascript Image object
     * @param Object konvaOptions
     *  = options
     */
    function konvaImageAdd(imageObj, konvaOptions) {

        var layer = konvaOptions.layer || ref.layerComposition;
        var id = (konvaOptions.id) ? konvaOptions.id : ref.createSpriteId('Image', konvaOptions);
        var x = konvaOptions.x || 0;
        var y = konvaOptions.y || 0;
        var width = konvaOptions.width || imageObj.width;
        var height = konvaOptions.height || imageObj.height;
        var draggable = (konvaOptions.draggable != undefined) ? konvaOptions.draggable : true;

        // create Konva.Image
        var konvaImage = new Konva.Image({
            id: id,
            x: x,
            y: y,
            width: width,
            height: height,
            draggable: draggable
        });
        konvaImage.image(imageObj);

        // assign events
        konvaImageAddEvents(konvaImage, konvaOptions, layer);

        // add to layer
        layer.add(konvaImage);
        layer.draw();

        // update spritesCount
        ref.spritesCount++;
        
        // return created image
        return ref.getObjectById(id);
        
    };

    function konvaImageAddEvents(konvaImage, konvaOptions, layer) {

        // mouse events

        var click = konvaOptions.click || function(){

            this.remove();
            layer.draw();

            app.eventsManager.dispatchSpriteDelete({
                sprite: this,
                spriteId: this.getId(),
            });

        };
        var mouseover = konvaOptions.mouseover || function(){console.log('[mouseover] not implemented')};
        var mouseout = konvaOptions.mouseout || function(){console.log('[mouseout] not implemented')};
        var mouseenter = konvaOptions.mouseenter || function(evt){
            document.body.style.cursor = 'pointer';
            layer.draw();
        };
        var mouseleave = konvaOptions.mouseleave || function(){
            document.body.style.cursor = 'default';  
            layer.draw();  
        };

        konvaImage.on('click', click);
        konvaImage.on('mouseover', mouseover);
        konvaImage.on('mouseout', mouseout);
        konvaImage.on('mouseenter', mouseenter);
        konvaImage.on('mouseleave', mouseleave);

        // drag events (add only if defined)

        var dragstart = konvaOptions.dragstart;
        // dragmove handler in collaboration mode
        var dragmove = (!app.collaboration) ? undefined : function(evt) {
            var image = evt.target;
            // dispacth sprite.move event
            this.eventsManager.dispatchSpriteMove({
                sprite: image,
                spriteId: image.getId(),
                spriteX: image.getX(),
                spriteY: image.getY(),
            });         
        }.bind(app);
        var dragend = konvaOptions.dragend;
        
        if (dragstart instanceof Function) {
            konvaImage.on('dragstart', dragstart);
        }
        if (dragmove instanceof Function) {
            konvaImage.on('dragmove', dragmove);
        }
        if (dragend instanceof Function) {
            konvaImage.on('dragend', dragend);
        }

    }

    // loads the image file
    // once loaded, triggers addKonvaImage function
    var imageObj = new Image();
    imageObj.onload = function() {
        var imageAdded = konvaImageAdd(this, options);
    };
    imageObj.src = options.src;

};

Konvas.prototype.createSpriteId = function(spriteTypeId, options) {
    var id;
    if (options && options.id) {
        id = options.id;
    } else {
        var count = (options && options.imageCount) ? options.imageCount : this.getNextSpriteCount();
        id = spriteTypeId + '_' + count;
    }
    return id;
};

Konvas.prototype.createImageId = function(options) {
    var id;
    if (options && options.id) {
        id = options.id;
    } else {
        var count = (options && options.imageCount) ? options.imageCount : this.getNextSpriteCount();
        id = 'Image_' + count;
    }
    return id;
};

Konvas.prototype.getNextSpriteCount = function() {
    return this.spritesCount + 1;
};

/**                                                                                     text
 * ========================================================================================= */

Konvas.prototype.addText = function(options) {

    var layer = options.layer = options.layer || this.layerComposition;

    var text = konvaText.factory(options);
    this.spritesCount.text = konvaText.count;

    // add to layer
    layer.add(text.konvaText);
    layer.draw();
};

/**                                                                                 deleting
 * ========================================================================================= */

Konvas.prototype.deleteObjById = function(objId) {
    this.deleteObj(this.getObjectById(objId));
};

Konvas.prototype.deleteObj = function(obj) {
    obj.remove();
    this.stage.draw();
};

/**                                                                              positioning
 * ========================================================================================= */

Konvas.prototype.positionObjById = function(objId, position) {
    this.positionObj(this.getObjectById(objId), position);
};

Konvas.prototype.positionObj = function(obj, position) {
    obj.x(position.x);
    obj.y(position.y);
    this.stage.draw();
};

/**                                                                                  scaling
 * ========================================================================================= */

/**
 * Returns the full canvas (=stage) scale
 */
Konvas.prototype.getScale = function() {
    return this.getObjScale(this.stage);
};

/**
 * Returns obj scale
 */
Konvas.prototype.getObjScale = function(obj) {
    return obj.scale();
};

/**
 * Scales the full canvas (=stage) according to scaleObj contents
 * @param Object amount
 *  .x Number
 *  .y Number
 */
Konvas.prototype.scale = function(amount) {
    this.scaleObj(this.stage, amount);
};

/**
 * Scales the full canvas (=stage) to the initial editing scale
 */
Konvas.prototype.scaleReset = function() {
    this.scaleObj(this.stage, this.initialEditingScale);
};

/**
 * Scales the full canvas (=stage) to scale for saving
 */
Konvas.prototype.scaleForSaving = function() {
    this.scaleObj(this.stage, Konvas.saveScale);
};

/**
 * Scales obj by amount
 * @param Object amount
 *  .x Number
 *  .y Number
 * @usages
 *  k.scaleObj(k.stage, {x: .5, y: .5})
 *      Set the whole stage to half of the original size
 *  k.scaleObj(k.stage, {x: 1, y: 1})
 *      Set the whole stage to the original size
 *  k.scaleObj(k.layer, {x: 2, y: 2})
 *      Set k.layer layer to double the original size
 */
Konvas.prototype.scaleObj = function(obj, amount) {
    obj.scale(amount);
    this.stage.draw();
};

/**                                                                                    utils
 * ========================================================================================= */

Konvas.prototype.getObjectById = function(id) {
    return this.stage.findOne('#' + id);
};

module.exports = Konvas;