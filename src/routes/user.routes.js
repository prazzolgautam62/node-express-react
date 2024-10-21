const verifyToken = require("../middlewares/auth.middleware.js");
module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    // Create a new User
    app.post("/users", users.create);

    // Login User
    app.post("/login", users.login);
  
    // Retrieve all Users
    app.get("/users", verifyToken, users.findAll);
  
    // Retrieve a single User with userId
    app.get("/users/:userId", users.findOne);
  
    // Update a User with userId
    app.put("/users/:userId", users.update);
  
    // Delete a User with userId
    app.delete("/users/:userId", users.delete);
  
    // Delete all Users
    app.delete("/users", users.deleteAll);
  };
  