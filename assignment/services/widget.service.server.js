/**
 * Created by Ankit on 10/30/2016.
 */
module.exports = function (app) {
    var widgets  = [{ "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 1, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "111", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://www.youtube.com/embed/kb6bWsa_LdQ" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}];

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../uploads' });

    app.post ("/api/upload", upload.single('uploadedFile'), uploadImage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    function createWidget(req, resp) {
        var pageId = req.params.pageId;
        var widget = req.body;
        var newWidget = { "_id": widget.id, "widgetType": widget.type, "pageId": pageId, "size": widget.size, "text": widget.text};
        widgets.push(newWidget);
        resp.send(newWidget);
    }

    function findAllWidgetsForPage(req, resp) {
        var pageId = req.params.pageId;
        var widgetsPerPage = [];
        for(var w in widgets) {
            if(widgets[w].pageId === pageId)
                widgetsPerPage.push(widgets[w]);
        }
        if (widgetsPerPage.length > 0) {
            resp.send(widgetsPerPage);
        }
        else resp.send('0');
    }

    function findWidgetById(req, resp) {
        var widgetId = req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                resp.send(widgets[w]);
                return;
            }
        }
        resp.send('0');
    }

    function updateWidget(req, resp) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId){
                widgets[w] = widget;
                resp.send(widgets[w]);
                return;
            }
        }
        resp.send('0');
    }

    function deleteWidget(req, resp) {
        var widgetId = req.params.widgetId;
        var w;
        var flag = false;
        for (w in widgets) {
            if (widgets[w]._id === widgetId) {
                flag = true;
                break;
            }
        }
        if (flag == true) {
            var deletedWidget = widgets.splice(w, 1);
            resp.send(deletedWidget);
        }
        else resp.send('0');
    }

    function uploadImage(req, resp) {
        var widget;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                widget = widgets[w];
                break;
            }
        }
        // now setting the url of this widget to be the file name that was created
        widget.url = filename;
        resp.send(myFile);
    }
};