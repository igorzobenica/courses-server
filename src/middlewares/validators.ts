import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const studentValidator = [
  check("firstName").notEmpty().withMessage("First name is required"),
  check("lastName").notEmpty().withMessage("Last name is required"),
  check("email").isEmail().withMessage("Invalid email address"),
  check("phone").notEmpty().withMessage("Phone number is required"),
  check("courseId").notEmpty().withMessage("Course ID is required"),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
