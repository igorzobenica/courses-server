"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.studentValidator = void 0;
const express_validator_1 = require("express-validator");
exports.studentValidator = [
    (0, express_validator_1.check)("firstName").notEmpty().withMessage("First name is required"),
    (0, express_validator_1.check)("lastName").notEmpty().withMessage("Last name is required"),
    (0, express_validator_1.check)("email").isEmail().withMessage("Invalid email address"),
    (0, express_validator_1.check)("phone").notEmpty().withMessage("Phone number is required"),
    (0, express_validator_1.check)("courseId").notEmpty().withMessage("Course ID is required"),
];
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.validate = validate;
