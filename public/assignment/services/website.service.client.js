/**
 * Created by Ankit on 10/13/2016.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    function WebsiteService() {

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Facebook website"},
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Tweeter website"},
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Gizmode website"},
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Tic Tac Toe website"},
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Checkers website"},
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Chess website"}];

        var api = {
            createWebsite         : createWebsite,
            findWebsitesByUser    : findWebsitesByUser,
            findWebsiteById       : findWebsiteById,
            updateWebsite         : updateWebsite,
            deleteWebsite         : deleteWebsite};

        return api;

        function createWebsite(userId, website) {
            var newWebsite = {"_id": website._id, "name": website.name, "developerId": userId, "description": website.description};
            websites.push(newWebsite);
        }

        function findWebsitesByUser(userId) {
            var websitesPerUser = [];
            for(var w in websites) {
                if(websites[w].developerId === userId){
                    websitesPerUser.push(websites[w]);
                    }
            }
            if (websitesPerUser.length > 0)
                return websitesPerUser;
            else return null;
        }

        function  findWebsiteById(websiteId) {
            for(var w in websites) {
                if(websites[w]._id === websiteId)
                    return websites[w];
            }
            return null;
        }

        function  updateWebsite(websiteId, data) {
            var w;
            for(w in websites) {
                if(websites[w]._id === websiteId){
                    websites[w].description = data.description;
                    websites[w].name = data.name;
                    return true
                }
            }
            return false;
        }

        function deleteWebsite(websiteId) {
            var w;
            for(w in websites) {
                if(websites[w]._id === websiteId){
                    break;
                }
            }
            var deletedWebsite = websites.splice(w,1);
            return deletedWebsite[0];
        }
    }
})();