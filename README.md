INSTALL
-------

    > npm install

DEVELOP
-------

    Start server

        > npm run dev

    On each code update, run

        > npm run bundle

    Visit web app

        http://localhost:3333

A3 Sizes
--------

    Real
        4962
        3508

    Half
        2482
        1754

Setup
-----

    Background Images Size
    ----------------------

    These setup must be used in order not to have properly rendered backround image.
    Properly rendered means neither grainy not cropped.
    This is necessary to cope with a strange konvajs feature: it creates a canvas which is double of the configured stage dimensions, which may result in a grainy exported background image.
    
    Next, the setup for an A3 exported image:

        Background images dimensions    => Real (4962 x 3508)
        
        Json canvas configuration

            Stage dimensions            => Half (2482 x 1754)
            Stage Initial scale         => 0.25

        canvas.js

            Canvas save scale           => 0.5

        toolzoom100.js

            Canvas scale                => 0.5


