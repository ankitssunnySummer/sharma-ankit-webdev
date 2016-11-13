module.exports = function(app, models) {

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder",  email: "alice@ankit.com"},
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",  email: "bob@ankit.com"},
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",  email: "charlie@ankit.com"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "Jose@ankit.com"}
    ];

    var UserModel = models.UserModel;
    app.get("/api/user", findUser);
    app.post("/api/user", createUser);
    app.get("/api/user/:uid", findUserById);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);

    function createUser(req, resp) {
        var user = req.body;
        UserModel
            .findUserByUsername(user.username)
            .then (
                function (returnedUser) {
                    if (returnedUser == null) {
                        UserModel
                            .createUser(user)
                            .then(
                                function (createdUser) {
                                    resp.json(createdUser);
                                },
                                function (error) {
                                    console.log("Creating User failed:" + error);
                                }
                            );
                    }
                    else {
                        resp.json(null);
                    }
                },
                function (error) {
                    console.log("Creating User failed:" + error);
                }
            )
    }


    function findUser(req, resp) {
        var query = req.query;
        if (query.username && query.password) {
            findUserByCredentials(req, resp);
        }
        else if(query.username) {
            findUserByUsername(req, resp);
        }
    }

    function findUserByUsername(req, resp) {
        var username = req.query.username;
        UserModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    resp.json(user);
                },
                function (error) {
                    console.log("failed in User Server: " + error);
                }
            );
    }

    function findUserByCredentials(req, resp) {
        var username = req.query.username;
        var password = req.query.password;
        UserModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    resp.json(user);
                },
                function (error) {
                    console.log("Find by credentials failed: " + error);
                }
            )
    }

    function findUserById(req, resp) {
        var userId = req.params.uid;
        UserModel
            .findUserById(userId)
            .then(
                function (user) {
                    resp.json(user);
                },
                function (error) {
                    console.log("Find User By ID failed: " + error);
                }
            )
    }

    function updateUser(req, resp) {
        var user = req.body;
        UserModel
            .updateUser(user._id, user)
            .then (
                function (user) {
                    resp.json(user)
                },
                function (error) {
                    console.log("Update User failed: " + error);
                }
            )
    }

    function  deleteUser(req, resp) {
        var userId = req.params.uid;
        UserModel
            .deleteUser(userId)
            .then(
                function (user) {
                    resp.json(user)
                },
                function (error) {
                    console.log("Delete User failed: " + error);
                }
            );
    }
};