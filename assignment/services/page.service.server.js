/**
 * Created by Ankit on 10/30/2016.
 */

module.exports = function(app) {
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "title": "This is Post 1" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "title":"This is Post 2" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "title": "This is Post 3"}
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, resp) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        var newPage = {"_id": page._id, "name": page.name, "websiteId": websiteId, "title": page.title};
        pages.push(newPage);
        resp.send(newPage);
    }

    function findAllPagesForWebsite(req, resp) {
        var websiteId = req.params.websiteId;
        var pagesPerWebsite = [];
        for(var p in pages) {
            if(pages[p].websiteId === websiteId)
                pagesPerWebsite.push(pages[p]);
        }
        if (pagesPerWebsite.length > 0) {
            resp.send(pagesPerWebsite);
            return;
        }
        else resp.send('0');
    }

    function findPageById(req, resp) {
        var pageId = req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id === pageId) {
                resp.send(pages[p]);
                return;
            }
        }
        resp.send('0');
    }

    function updatePage(req, resp) {
        var pageId = req.params.pageId;
        var page = req.body;
        for(var p in pages) {
            if(pages[p]._id === pageId){
                pages[p].name = page.name;
                pages[p].title = page.title;
                resp.send(pages[p]);
                return;
            }
        }
        resp.send('0');
    }

    function deletePage(req, resp) {
        var pageId = req.params.pageId;
        var p;
        var flag = false;
        for(p in pages) {
            if(pages[p]._id === pageId){
                flag = true;
                break;
            }
        }
        if (flag == true) {
            var deletedPage = pages.splice(p, 1);
            resp.send(deletedPage[0]);
        }
        else resp.send('0');
    }
};