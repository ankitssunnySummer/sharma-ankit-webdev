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
            var user = UserService.findUserByCredentials(username, password);
            if (user != null) {
                $location.url("/user/" + user._id);
            }
            else {
                vm.alert = "Username and/or password not found. Please try again.";
            }
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
                UserService.createUser(newUser);
                $location.url("/user/" + newUser._id);
            }
        }
    }

    function ProfileController($routeParams, $location, UserService) {
        var vm = this;
        var userId = $routeParams["uid"];
        vm.user  = UserService.findUserById(userId);
        vm.updateProfile = updateProfile;


        function updateProfile(username, email, firstName, lastName) {
            delete vm.alert;
            if(username === "" || email === "") {
                vm.alert = "Username and/or email cannot be empty. Please try again";
            }
            else {
                console.log("isnide else");
                var updatedUser = {
                    _id: userId,
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    email: email};
                UserService.updateUser(userId, updatedUser);
                $location.url("/user/" + userId);
            }
        }
    }
})();