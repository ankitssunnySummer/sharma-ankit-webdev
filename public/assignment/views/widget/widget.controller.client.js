/**
 * Created by Ankit on 10/13/2016.
 */
(function() {
    angular.module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, UserService, WebsiteService, PageService, WidgetService, $sce) {
        var vm = this;
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeImage = checkSafeImage;
        vm.checkSafeYouTube = checkSafeYouTube;

        UserService
            .findUserById(userId)
            .success(function (user) {
                vm.user = user;
            })
            .error(function (error) {
                console.log(error);
            });

        WebsiteService
            .findWebsiteById(websiteId)
            .success(function (website) {
                vm.website = website;
            })
            .error(function (error) {
                console.log(error);
            });

        PageService
            .findPageById(pageId)
            .success(function (page) {
                vm.page = page;
            })
            .error(function (error) {
                console.log(error);
            });

        WidgetService
            .findWidgetsByPageId(pageId)
            .success(function (widgets) {
                vm.widgets = widgets;
            })
            .error(function (error) {
                console.log("In error" +error);
            });

        function checkSafeHtml(text) {
            return $sce.trustAsHtml(text);
        }

        function checkSafeImage(url) {
            return $sce.trustAsResourceUrl(url);
        }

        function checkSafeYouTube(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
    }

    function NewWidgetController($routeParams, UserService, WebsiteService, PageService, WidgetService) {
        var vm =this;
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];

        UserService
            .findUserById(userId)
            .success(function (user) {
                vm.user = user;
            })
            .error(function (error) {
                console.log(error);
            });

        WebsiteService
            .findWebsiteById(websiteId)
            .success(function (website) {
                vm.website = website;
            })
            .error(function (error) {
                console.log(error);
            });

        PageService
            .findPageById(pageId)
            .success(function (page) {
                vm.page = page;
            })
            .error(function (error) {
                console.log(error);
            });

        WidgetService
            .findWidgetsByPageId(pageId)
            .success(function (widgets) {
                vm.widgets = widgets;
            })
            .error(function (error) {
                console.log(error);
            });
    }

    function EditWidgetController($routeParams, $location, UserService, WebsiteService, PageService, WidgetService) {
        var vm = this;
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];
        var widgetId = $routeParams["wgid"];
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;

        UserService
            .findUserById(userId)
            .success(function (user) {
                vm.user = user;
            })
            .error(function (error) {
                console.log(error);
            });

        WebsiteService
            .findWebsiteById(websiteId)
            .success(function (website) {
                vm.website = website;
            })
            .error(function (error) {
                console.log(error);
            });

        PageService
            .findPageById(pageId)
            .success(function (page) {
                vm.page = page;
            })
            .error(function (error) {
                console.log(error);
            });

        WidgetService
            .findWidgetById(widgetId)
            .success(function (widgets) {
                vm.widget = widgets;
            })
            .error(function (error) {
                console.log(error);
            });

        function deleteWidget(widgetId) {
            WidgetService
                .deleteWidget(widgetId)
                .success(function (deletedWidget) {
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
                })
                .error(function (error) {
                    console.log(error);
                });
        }

        function updateWidget(wid, widget) {
            WidgetService
                .updateWidget(wid, widget)
                .success(function (widget) {
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
                })
                .error(function (error) {
                    console.log(error);
                });
        }
    }
})();       