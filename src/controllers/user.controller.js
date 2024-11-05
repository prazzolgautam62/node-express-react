const User = require("../models/user.model.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
  return [
    body('name')
      .notEmpty().withMessage('Name is required.')
      .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long.'),
    body('email')
      .isEmail().withMessage('Email is not valid.')
      .notEmpty().withMessage('Email is required.'),
    body('password')
      .notEmpty().withMessage('Password is required.')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    body('passwordConfirmation')
      .notEmpty().withMessage('Password confirmation is required.')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password.');
        }
        return true;
      }),
  ];
};

// Create and Save a new User
exports.create = [
  userValidationRules(),
  (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        status: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Create a User
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      active: req.body.active
    });

    // Save User in the database
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while creating the User."
        });
      else {
        const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET_KEY, { expiresIn: 86400 });
        const response = { token: token, user: data };
        res.status(200).send({ status: true, message: 'User registered successfully!', data: response });
      }
    });
  }
];

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Validate request
  if (!email || !password) {
    return res.status(400).send({ message: "Email and password required!" });
  }

  // Find user by email
  User.findByEmail(email, async (err, user) => {
    if (err) {
      return res.status(200).send({status: false, message: "User not found." });
    }

    if (!user) {
      return res.status(200).send({status: false, message: "User not found." });
    }

    // Compare password
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(200).send({status: false, message: "Invalid password!" });
    }

    // Create token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: 86400 }); // 24 hours
    const data = {token: token, user: { id: user.id, name: user.name, email: user.email }};
    res.status(200).send({status: true, message: 'login successful!', data: data});
  });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
      });
    else res.send({status:true, message: 'User list retrieved',data:data});
  });
};

// Find a single User with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.userId
        });
      }
    } else res.send(data);
  });
};

// Update a User identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  User.updateById(
    req.params.userId,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.userId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a User with the specified userId in the request
exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.userId
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};
