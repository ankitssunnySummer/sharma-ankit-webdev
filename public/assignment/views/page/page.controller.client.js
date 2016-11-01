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
            .error(function () {
                console.log(error);
            });

        PageService
            .findPageByWebsiteId(websiteId)
            .success(function (pages) {
                vm.pages = pages;
            })
            .error(function (error) {
                console.log(error);
            });
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
        vm.createPage = createPage;

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
            .error(function () {
                console.log(error);
            });

        function createPage(name, title) {
            if(name == undefined || title == undefined){
                vm.alert = "New page needs to have a name and a title. Try again";
            }
            else {
                var id = randomString(3, '0123456789');
                var newPage = { "_id": id, "name": name, "title": title};
                PageService
                    .createPage(websiteId, newPage)
                    .success(function (page) {
                        $location.url("/user/" + userId + "/website/" + websiteId + "/page" );
                    })
                    .error(function (error) {
                        console.log(error);
                    });
            }
        }
    }

    function EditPageController($routeParams, $location, UserService, WebsiteService, PageService) {
        ///user/:uid/website/:wid/page/:pid
        var vm = this;
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

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
            .error(function () {
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

        function updatePage(name, title) {
            delete vm.alert;

            if(name === "" || title === "") {
                vm.alert = "Page name and/or Title cannot be empty. Please try again";
            }
            else {
                var updatedPage =   {"name": name, "title": title};
                PageService
                    .updatePage(pageId, updatedPage)
                    .success(function (page) {
                        $location.url("/user/" + userId + "/website/" + websiteId + "/page");
                    })
                    .error(function () {
                        console.log(error);
                    });
            }
        }

        function deletePage(pageId) {
            PageService
                .deletePage(pageId)
                .success(function (page) {
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page");
                })
                .error(function (error) {
                    console.log(error);
                    vm.alert = "Unable to remove page. Please try again";

                });
        }
    }
})();