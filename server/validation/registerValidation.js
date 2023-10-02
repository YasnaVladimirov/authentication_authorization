const { check } = require("express-validator");

const validateRegistration = [
  check("username")
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3, max: 23 }).withMessage("Username must be between 3 and 23 characters")
    .matches(/[A-Z][a-z]/)
    .withMessage("Username must contain at least one lowercase and uppercase letter"),
  check("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 5, max: 24 }).withMessage("Password must be between 5 and 24 characters")
    .matches(/\d/)
    .withMessage("Password must contain at least one digit")
    .matches(/[!@#$%]/)
    .withMessage("Password must contain at least one of the special characters: !@#$%"),
  check("matchPassword")
    .notEmpty().withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    })
];

module.exports = {
  validateRegistration,
};