TODO
====

Node Server
-----------

1. GUI

    - Bootstrappizza la GUI
    - Integra hbs templating
    - Usa struttura con un default layout template
    - Implementa menu di navigazione
        - Home
        - Componi (/canvas)
        - Login/logout dinamici a seconda se utente è loggato o no
    
2. Implementa login con utenti in mongodb

3. Collaboration Server

    - Modularizza e sottoponi a logica config driven inizialiazzazione di collaboration server

Client Page Canvas
------------------

0. Accepts Composition id via query string param GET['id']

    . Read composition data from compositions/<id> folder
        conf.json
        images
            background.jpg
            items
                <img>.png
                ...

1. Images

    . Images Menu supports lots of images navigation [DONE]
    . When adding an image, it must be placed always visibile (taking into consideration the page scroll offsets and zoom factor)
    . Dynamize images menu (read folder? read json? read db?)

2. Drawing

    . Element bringToFront

    . InputTextWidget

        Altre proprietà del testo editabili ???

            . Font Family ?
            . Color ?

3. Toolbar

    . Zoomin bloccato   [DONE]
    . Zoomout bloccato  [DONE]
    [. Bottone cancella tutto]
    [. Create an ancestor Tool class for all the Tool<specific> tool classes?]

4. Background

    [. Resize stage to background dimensions]

Hosting Provider
----------------

1. Cerca un hosting provider
    - Node.js
    - (socket.io)
