/**
 * Created by Ankit on 10/30/2016.
 */
module.exports = function(app) {
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Facebook website"},
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Tweeter website"},
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Gizmode website"},
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Tic Tac Toe website"},
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Checkers website"},
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Chess website"}];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, resp) {
        console.log("Inside server");
        var userId = req.params.userId;
        var website = req.body;
        var newWebsite = {
            "_id": website._id,
            "name": website.name,
            "developerId": userId,
            "description": website.description};
        websites.push(newWebsite);
        resp.send(newWebsite);
        return;
    }

    function findAllWebsitesForUser(req, resp) {
        var userId = req.params.userId;
        var websitesPerUser = [];
        for(var w in websites) {
            if(websites[w].developerId === userId){
                websitesPerUser.push(websites[w]);
            }
        }
        if (websitesPerUser.length > 0) {
            resp.send(websitesPerUser);
            return;
        }
        else resp.send('0');
    }

    function findWebsiteById(req, resp) {
        var websiteId = req.params.websiteId;
        for(var w in websites) {
            if(websites[w]._id === websiteId){
                resp.send(websites[w]);
                return;
            }
        }
        resp.send('0');
    }

    function updateWebsite(req, resp) {
        var websiteId = req.params.websiteId;
        var data = req.body;
        for(var w in websites) {
            if(websites[w]._id === websiteId){
                websites[w].description = data.description;
                websites[w].name = data.name;
                resp.send(websites[w]);
                return;
            }
        }
        resp.send('0');
    }

    function deleteWebsite(req, resp){
        var websiteId = req.params.websiteId;
        var w;
        var flag = false;
        for(w in websites) {
            if(websites[w]._id === websiteId){
                flag = true;
                break;
            }
        }
        if (flag == true) {
            var deletedWebsite = websites.splice(w, 1);
            resp.send(deletedWebsite[0]);
        }
        else resp.send('0');
    }
};