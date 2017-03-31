var config = require('./conf/config');
var App = require('./app');
var EventsManager = require('./events/manager');
var CollaborationClient = require('./collaboration/client/client');

var app = new App();
var eventsManager = new EventsManager();
var collaborationClient = null;

function bootstrap(conf) {

    app.init({
        conf: conf,
        eventsManager: eventsManager
    });

    if (conf.collaboration.enabled === true) {
        conf.collaboration.app = app;
        collaborationClient = new CollaborationClient(conf.collaboration);
    }

}

config.load(bootstrap);
