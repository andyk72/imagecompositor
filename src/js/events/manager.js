/**
 * Events Manager
 *  Handle custom events application dispatching
 *  Built on top of the CustomEvent specification
 */

function EventsManager(options = {}) {
    this.dispatcher = options.defaultDispatcher || document;
}

/**
 * Dispatches a 'sprite.move' event for the data.sprite Konvas sprite
 * @param Object data
 *  .sprite Konvas.Sprite
 *  .spriteId String
 *  .spriteX Number
 *  .spriteY Number
 */
EventsManager.prototype.dispatchSpriteMove = function(data) {
    this.dispatch('sprite.move', {
        spriteId: data.spriteId,
        spriteX: data.spriteX,
        spriteY: data.spriteY
    });
};

/**
 * Dispatches a 'sprite.create' event
 * @param Object data
 *  .spriteType String
 *  .spriteData Object
 *      .id String
 *      .src String
 */
EventsManager.prototype.dispatchSpriteCreate = function(data) {
    this.dispatch('sprite.create', data);
};

/**
 * Dispatches a 'sprite.create' event
 * @param Object data
 *  .sprite Konvas.Sprite
 *  .spriteId String
 */
EventsManager.prototype.dispatchSpriteDelete = function(data) {
    this.dispatch('sprite.delete', {
        spriteId: data.spriteId
    });
};

/**
 * @param String eventType
 *  Any string identifying an event
 *  Sample
 *      'sprite.move'
 * @param Object payload
 *  Any format needed by eventType
 *  It is assigned to the .detail key of the CustomEvent(eventType, {detail: <myDetailObj>}) constructor method specification
 */
EventsManager.prototype.dispatch = function(eventType, payload) {
    console.log('EventsManager.dispatch ' + eventType);
    var event = new CustomEvent(eventType, {detail: payload});
    this.dispatcher.dispatchEvent(event);
};

module.exports = EventsManager;