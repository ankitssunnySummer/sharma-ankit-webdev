/**
 * Created by Ankit on 10/13/2016.
 */
(function() {
    angular.module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController)

    function WebsiteListController($routeParams, WebsiteService, UserService) {
        var vm = this;
        var userId = $routeParams["uid"];
        vm.user= UserService.findUserById(userId);
        vm.websites = WebsiteService.findWebsitesByUser(userId);
    }

    function randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    function NewWebsiteController($routeParams, $location, WebsiteService, UserService) {
        var vm = this;
        var userId = $routeParams["uid"];
        vm.user= UserService.findUserById(userId);
        vm.websites = WebsiteService.findWebsitesByUser(userId);
        vm.createWebsite = createWebsite;
        function createWebsite(name, description) {
            if (name == undefined && description == undefined)
                $location.url("/user/" + userId + "/website");
            else {
                var id = randomString(3, '0123456789');
                var newWebsite = { "_id": id, "name": name, "description": description};
                WebsiteService.createWebsite(userId, newWebsite);
                $location.url("/user/" + userId + "/website");
            }
        }
    }

    function EditWebsiteController($routeParams, $location, WebsiteService, UserService) {
        var vm = this;
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        vm.user= UserService.findUserById(userId);
        vm.websites = WebsiteService.findWebsitesByUser(userId);
        vm.website= WebsiteService.findWebsiteById(websiteId);
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function deleteWebsite(websiteId) {
            var website = WebsiteService.deleteWebsite(websiteId);
            if(website != null)
                $location.url("/user/" + website.developerId + "/website");
        }

        function updateWebsite(name, description) {
            delete vm.alert;
            if(name === "" || description === ""){
                vm.alert = "Name and/or Description cannot be empty. Please try again";
            }
            else {
                var updatedWebsite = {
                    "name": name,
                    "description": description
                };
                WebsiteService.updateWebsite(websiteId, updatedWebsite);
                $location.url("/user/" + userId + "/website/" + websiteId);
            }
        }
    }
})();