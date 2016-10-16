/**
 * Created by Ankit on 10/13/2016.
 */
(function() {
    angular.module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, UserService, WebsiteService, PageService, WidgetService) {
    ///user/:uid/website/:wid/page/:pid/widget"
        var vm = this;
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];
        vm.user = UserService.findUserById(userId);
        vm.website = WebsiteService.findWebsiteById(websiteId);
        vm.page = PageService.findPageById(pageId);
        vm.widgets = WidgetService.findWidgetsByPageId(pageId);
    }

    function NewWidgetController($routeParams, UserService, WebsiteService, PageService, WidgetService) {
    ///user/:uid/website/:wid/page/:pid/widget/new
        var vm =this;
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];
        vm.user = UserService.findUserById(userId);
        vm.website = WebsiteService.findWebsiteById(websiteId);
        vm.page = PageService.findPageById(pageId);
        vm.widgets = WidgetService.findWidgetsByPageId(pageId);
    }

    function EditWidgetController($routeParams, $location, UserService, WebsiteService, PageService, WidgetService) {
        //"/user/:uid/website/:wid/page/:pid/:wgid"
        var vm = this;
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];
        var widgetId = $routeParams["wgid"];
        vm.user = UserService.findUserById(userId);
        vm.website = WebsiteService.findWebsiteById(websiteId);
        vm.page = PageService.findPageById(pageId);
        vm.widget = WidgetService.findWidgetById(widgetId);
        vm.deleteWidget = deleteWidget;

        function deleteWidget(widgetId) {
            if(WidgetService.deleteWidget(widgetId) != null)
                $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
        }
    }
})();       