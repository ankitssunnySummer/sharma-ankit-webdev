/**
 * Created by Ankit on 10/13/2016.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService() {

        var widgets  = [{ "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
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

        var api = {
            createWidget            : createWidget,
            findWidgetsByPageId     : findWidgetsByPageId,
            findWidgetById          : findWidgetById,
            updateWidget            : updateWidget,
            deleteWidget            : deleteWidget};

        return api;

        function createWidget(pageId, widget)  {
            var newWidget = { "_id": widget.id, "widgetType": widget.type, "pageId": pageId, "size": widget.size, "text": widget.text};
            widgets.push(newWidget);
        }

        function findWidgetsByPageId(pageId) {
            var widgetsPerPage = [];
            for(var w in widgets) {
                if(widgets[w].pageId === pageId)
                    widgetsPerPage.push(widgets[w]);
            }
            if (widgetsPerPage.length > 0)
                return widgetsPerPage;
            else return null;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId)
                    return widgets[w];
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            var w;
            for(w in widgets) {
                if(widgets[w]._id === widgetId){
                    widgets[w] = widget;
                    return true
                }
            }
            return false;
        }

        function deleteWidget(widgetId) {
            var w;
            for(w in widgets) {
                if(widgets[w]._id === widgetId){
                    break;
                }
            }
            if(widgets.splice(w,1) != null)
                return true
            else return false;
        }
    }
})();