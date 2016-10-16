/**Created by Ankit on 10/13/2016.*/
(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder",  email: "alice@ankit.com"},
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",  email: "bob@ankit.com"},
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",  email: "charlie@ankit.com"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "Jose@ankit.com"}
        ];

        var api = {
            createUser            : createUser,
            findUserById          : findUserById,
            findUserByUsername    : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser            : updateUser,
            deleteUser            : deleteUser,
        }

        return api;

        function createUser(user) {
            users.push(user);
        }

        function findUserById(id) {
            for(var u in users) {
                if(users[u]._id === id)
                    return users[u];
            }
            return null;
        }


        function findUserByUsername(username) {
            for(var u in users) {
                if(users[u].username === username)
                    return users[u];
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                if(users[u].username === username && users[u].password === password)
                    return users[u];
            }
            return null;
        }

        function updateUser(userId, user) {
            for(var u in users) {
                if(users[u]._id === userId) {
                    users[u].username = user.username;
                    users[u].email = user.email;
                    users[u].firstName = user.firstName;
                    users[u].lastName = user.lastName;
                    return true;
                }
            }
            return false;
        }

        function  deleteUser(userId) {
            var u;
            for(u in users) {
                if(users[u]._id === userId)
                    break;
            }
            if(users.splice(u, 1) != null)
                return true;
            else return false;
        }
    }
})();
