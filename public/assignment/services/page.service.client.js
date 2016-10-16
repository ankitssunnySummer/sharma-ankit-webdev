/**
 * Created by Ankit on 10/13/2016.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    function PageService() {

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "title": "This is Post 1" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "title":"This is Post 2" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "title": "This is Post 3"}
        ];

        var api = {
            createPage             : createPage,
            findPageByWebsiteId    : findPageByWebsiteId,
            findPageById           : findPageById,
            updatePage             : updatePage,
            deletePage             : deletePage};

        return api;

        function createPage(websiteId, page) {
            var newPage = {"_id": page._id, "name": page.name, "websiteId": websiteId, "title": page.title};
            pages.push(newPage);
        }

        function findPageByWebsiteId(websiteId) {
            var pagesPerWebsite = [];
            for(var p in pages) {
                if(pages[p].websiteId === websiteId)
                    pagesPerWebsite.push(pages[p]);
            }
            if (pagesPerWebsite.length > 0)
                return pagesPerWebsite;
            else return null;
        }

        function findPageById(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId)
                    return pages[p];
            }
            return null;
        }

        function updatePage(pageId, page) {
            var p;
            for(p in pages) {
                if(pages[p]._id === pageId){
                    pages[p].name = page.name;
                    pages[p].title = page.title;
                    return true
                }
            }
            return false;
        }

        function deletePage(pageId) {
            var p;
            for(p in pages) {
                if(pages[p]._id === pageId){
                    break;
                }
            }
            var deletedPage = pages.splice(p,1);
            return deletedPage[0];
        }
    }
})();
