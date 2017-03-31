/**
 * Socket.io realtime collaboration client implementation
 */

/**
 * @param Object conf
 *  .app App
 *  .enabled Boolean
 *  .serverUrl String
 */
function CollaborationClient(conf) {
    console.log('CollaborationClient()');
    this.conf = conf;
    this.app = this.conf.app;
    this.app.enableCollaboration();
    this.socket = null;
    this.setup();
}

CollaborationClient.prototype.setup = function() {
    this.setupSocket();
    this.setupEvents();
    // TODO -> more setup here....
};

CollaborationClient.prototype.setupSocket = function() {
    this.socket = io(this.conf.serverUrl);
};

CollaborationClient.prototype.setupEvents = function() {

    var self = this;
    var app = self.app;

    // From server

    /**
     * sprite.create listener
     * @param Object data
     *  .spriteType String
     *      ['Image' | 'Text']
     *  .spriteData Object
     *      .id String
     *      .src String
     */
    this.socket.on('sprite.create', function(data) {
        switch(data.spriteType) {
            case 'Image':
                app.konvas.addImage({
                    id: data.spriteData.id,
                    src: data.spriteData.src
                });
                break;
            case 'Text':
                console.log('TODO -> lancia creazione Text');
                break;
        }
    });

    /**
     * @param Object data
     *  .spriteId String
     *      "Image_4"
     */
    this.socket.on('sprite.delete', function(data) {
        app.konvas.deleteObjById(data.spriteId);
    });

    /**
     * sprite.move listener
     * @param Object data
     *  .spriteId String
     *      "Image_4"
     *  .spriteX Number
     *  .spriteY Number
     */
    this.socket.on('sprite.move', function(data) {
        app.konvas.positionObjById(data.spriteId, {
            x: data.spriteX,
            y: data.spriteY
        });
    });

    // To server (triggered by client gui event listeners)

    document.addEventListener('sprite.create', self.onSpriteCreate.bind(self) , false);
    document.addEventListener('sprite.delete', self.onSpriteDelete.bind(self) , false);
    document.addEventListener('sprite.move', self.onSpriteMove.bind(self) , false);
};

CollaborationClient.prototype.onSpriteCreate = function(evt) {
    console.log('CollaborationClient.onSpriteCreate()');
    var data = evt.detail;
    this.socket.emit('sprite.create', data);
};

CollaborationClient.prototype.onSpriteDelete = function(evt) {
    console.log('CollaborationClient.onSpriteDelete()');
    var data = evt.detail;
    this.socket.emit('sprite.delete', data);
};

/**
 * @param Object evt
 *  ...
 *  .detail Object
 *      .spriteId
 *      .spriteX
 *      .spriteY
 */
CollaborationClient.prototype.onSpriteMove = function(evt) {
    console.log('CollaborationClient.onSpriteMove()');
    var data = evt.detail;
    this.socket.emit('sprite.move', data);
};

module.exports = CollaborationClient;