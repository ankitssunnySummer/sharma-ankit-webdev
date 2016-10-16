/**
 * Created by Ankit on 10/13/2016.
 */
(function() {
    angular.module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, UserService, WebsiteService, PageService) {
        var vm = this;
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        vm.user = UserService.findUserById(userId);
        vm.website = WebsiteService.findWebsiteById(websiteId);
        vm.pages = PageService.findPageByWebsiteId(websiteId);
    }

    function randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    function NewPageController($routeParams, $location, UserService, WebsiteService, PageService) {
        var vm = this;
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        vm.user = UserService.findUserById(userId);
        vm.website = WebsiteService.findWebsiteById(websiteId);
        vm.createPage = createPage;

        function createPage(name, title) {
            if(name == undefined || title == undefined){
                vm.alert = "New page needs to have a name and a title. Try again";
            }
            else {
                var id = randomString(3, '0123456789');
                var newPage = { "_id": id, "name": name, "title": title};
                PageService.createPage(websiteId, newPage);
                $location.url("/user/" + userId + "/website/" + websiteId + "/page" );
            }
        }
    }

    function EditPageController($routeParams, $location, UserService, WebsiteService, PageService) {
        ///user/:uid/website/:wid/page/:pid
        var vm = this;
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];
        vm.user = UserService.findUserById(userId);
        vm.website = WebsiteService.findWebsiteById(websiteId);
        vm.page = PageService.findPageById(pageId);
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function updatePage(name, title) {
            delete vm.alert;

            if(name === "" || title === "") {
                vm.alert = "Page name and/or Title cannot be empty. Please try again";
            }
            else {
                var updatedPage =   {"name": name, "title": title};
                PageService.updatePage(pageId, updatedPage);
                $location.url("/user/" + userId + "/website/" + websiteId + "/page");
            }
        }

        function deletePage(pageId) {
            if(PageService.deletePage(pageId) != null)
                $location.url("/user/" + userId + "/website/" + websiteId + "/page");
            else
                vm.alert = "Unable to remove page. Please try again";
        }
    }
})();