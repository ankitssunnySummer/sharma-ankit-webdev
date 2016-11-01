module.exports = function(app) {

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder",  email: "alice@ankit.com"},
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",  email: "bob@ankit.com"},
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",  email: "charlie@ankit.com"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "Jose@ankit.com"}
    ];

    app.get("/api/user", findUser);
    app.post("/api/user", createUser);
    app.get("/api/user/:uid", findUserById);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);

    function createUser(req, resp) {
        var user = req.body;
        users.push(user);
        resp.send(user);
    }

    function findUser(req, resp) {
        var params = req.params;
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
        for(var u in users) {
            if(users[u].username === username) {
                resp.send(users[u]);
                return;
            }
        }
        resp.send('0');
    }

    function findUserByCredentials(req, resp) {
        var username = req.query.username;
        var password = req.query.password;
        for(var u in users) {
            if(users[u].username === username && users[u].password === password) {
                resp.send(users[u]);
                return;
            }
        }
        resp.send('0');
    }

    function findUserById(req, resp) {
        var userId = req.params.uid;
        for(var u in users) {
            if(users[u]._id === userId) {
                resp.send(users[u]);
                return;
            }
        }
        resp.send('0');
    }

    function updateUser(req, resp) {
        var user = req.body;
        for(var u in users) {
            if(users[u]._id === user._id) {
                users[u] = user;
                resp.send(user);
                return;
            }
        }
        resp.send('0');
    }

    function  deleteUser(req, resp) {
        var userId = req.params.uid;
        var flag = false;
        var u;
        for(u in users) {
            if(users[u]._id === userId) {
                flag = true;
                break;
            }
        }
        if( flag == true){
            var deletedUser = users.splice(u, 1);
            resp.send(deletedUser);
        }
        else resp.send('0');
    }
};