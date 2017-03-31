const path = require('path');
const passport = require('passport');
const config = require('./config');

function init(app) {

    /*
        / (home)
    */

    app.get('/', function (req, res) {
        var file = path.resolve(config.rootPath + 'src/pages/home/home.html');
        res.sendFile(file);
    });

    /*
        /login
    */

    app.get('/login', function (req, res) {
        var file = path.resolve(config.rootPath + 'src/pages/login/login.html');
        res.sendFile(file);
    });

    app.post('/login', passport.authenticate('local', {
        successRedirect: '/canvas',
        failureRedirect: '/login'
    }));

    /*
        /logout
    */

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    /*
        /canvas
    */

    app.get('/canvas', passport.authenticationMiddleware(), function (req, res) {
        var file = path.resolve(config.rootPath + 'src/pages/canvas/canvas.html');
        res.sendFile(file);
    });

    /*
        404
    */

    app.use(function(req, res, next){
        var file = path.resolve(config.rootPath + 'src/pages/errors/404.html');
        res.status(404).sendFile(file);
    });

}

module.exports = {
    init: init
};