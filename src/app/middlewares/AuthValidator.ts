import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const validate = [
  check("mobileNumber")
    .isLength({ min: 10 })
    .isString()
    .withMessage("Mobile Number must be string"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .send({ errors: errors.array(), errorMessage: errors.array()[0] });
    }

    return next();
  },
];

export const updateProfileValidate = [
  check("emailId").isLength({ min: 1 }).withMessage("Email Id is mandatory"),
  check("name").isLength({ min: 1 }).withMessage("Name is mandatory"),
  check("devicesId").isLength({ min: 1 }).withMessage("Device Id is mandatory"),
  check("gender").isLength({ min: 1 }).withMessage("Gender is mandatory"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .send({ errors: errors.array(), errorMessage: errors.array()[0] });
    }

    return next();
  },
];
