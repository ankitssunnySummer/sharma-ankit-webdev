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
        UserService
            .findUserById(userId)
            .success(function (user) {
                vm.user = user;
            })
            .error(function () {

            });

        WebsiteService
            .findWebsitesByUser(userId)
            .success(function (websites) {
                vm.websites = websites;
            })
            .error(function () {

            });
    }

    function randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    function NewWebsiteController($routeParams, $location, WebsiteService, UserService) {
        var vm = this;
        delete vm.alert;
        var userId = $routeParams["uid"];
        vm.createWebsite = createWebsite;

        UserService
            .findUserById(userId)
            .success(function (user) {
                vm.user = user;
                WebsiteService
                    .findWebsitesByUser(userId)
                    .success(function (websites) {
                        vm.websites = websites;
                    })
                    .error(function (error) {
                        console.log(error);
                    });

            })
            .error(function (error) {
                console.log(error);
            });

        function createWebsite(name, description) {
            console.log("Inside controller create website.")
            if (name == undefined && description == undefined) {
                vm.alert = "Website Name and Description cannot be empty";
                $location.url("/user/" + userId + "/website");
            }
            else {
                var id = randomString(3, '0123456789');
                var newWebsite = { "_id": id, "name": name, "description": description};
                WebsiteService
                    .createWebsite(userId, newWebsite)
                    .success(function (website) {
                        $location.url("/user/" + userId + "/website");
                    })
                    .error(function (error) {
                        console.log(error);
                    });
            }
        }
    }

    function EditWebsiteController($routeParams, $location, WebsiteService, UserService) {
        var vm = this;
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        UserService
            .findUserById(userId)
            .success(function (user) {
                vm.user = user;
                WebsiteService
                    .findWebsitesByUser(userId)
                    .success(function (websites) {
                        vm.websites = websites;
                    })
                    .error(function () {

                    });
            })
            .error(function () {

            });


        WebsiteService
            .findWebsiteById(websiteId)
            .success(function (website) {
                vm.website= website;
            })
            .error(function () {

            });

        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsite(websiteId)
                .success(function (website) {
                    $location.url("/user/" + website.developerId + "/website");
                })
                .error(function () {

                });
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

                WebsiteService
                    .updateWebsite(websiteId, updatedWebsite)
                    .success(function (website) {
                        $location.url("/user/" + userId + "/website/");
                    })
                    .error(function () {

                    });
            }
        }
    }
})();