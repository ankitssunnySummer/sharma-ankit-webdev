/**
 * Created by Ankit on 10/13/2016.
 */

(function() {
    angular.module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;  //vm stands for View Model.

        vm.login = login;

        function login(username, password) {
            UserService
                .findUserByCredentials(username, password)
                .success(function (user) {
                    if (user != '0') {
                        $location.url("/user/" + user._id);
                    }
                    else {
                        vm.alert = "Username and/or password not found. Please try again.";
                    }
                })
                .error(function () {

                })
        }
    }

    function randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(username, password) {
            if(username == undefined || password == undefined) {
                vm.alert = "Username and/or Password cannot be blank. Please try again.";
                $location.url("/register");
            }
            else {
                var id = randomString(3, '0123456789');
                var newUser = {_id: id, username: username, password: password, firstName: "", lastName: ""};
                UserService
                    .createUser(newUser)
                    .success(function (user) {
                        $location.url("/user/" + user._id);
                    })
                    .error(function () {

                    });
            }
        }
    }

    function ProfileController($routeParams, $location, UserService) {
        var vm = this;
        delete vm.alert;
        var userId = $routeParams["uid"];
        UserService
            .findUserById(userId)
            .success(function (user) {
                if (user != '0') {
                    vm.user = user;
                }
                else {
                    vm.alert = "Username and/or password not found. Please try again.";
                }
            })
            .error(function () {

            })


        vm.updateProfile = updateProfile;
        vm.deleteUser = deleteUser;

        function updateProfile() {
            if(username === "" || email === "") {
                vm.alert = "Username and/or email cannot be empty. Please try again";
            }
            else {
                UserService
                    .updateUser(userId, vm.user)
                    .success(function (user) {
                        $location.url("/user/" + userId);
                    })
                    .error(function (error) {
                        console.log(error);
                    });
            }
        }

        function deleteUser(){
            UserService
                .deleteUser(userId)
                .success(function (userId) {
                    vm.alert = "User" + userId + "deleted.";
                    $location.url("/login");
                })
                .error(function (error) {
                    console.log(error);
                });
        }
    }
})();