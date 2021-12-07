import { Request } from "express";
import Authentication from "../../utils/Authentication";
import { Op } from "sequelize";

const db = require("../../db/models");

class AuthService {
  body: Request["body"];
  params: Request["params"];
  credential: {
    id: number;
    userName: string;
  };
  constructor(req: Request) {
    this.credential = req.app.locals.credential;

    this.body = req.body;
    this.params = req.params;
  }

  login = async () => {
    // check data user by email
    let { mobileNumber } = this.body;
    return mobileNumber;
  };

  verifyOtp = async () => {
    const myOtp = 1234;
    let { mobileNumber, otp } = this.body;
    // try {
    const isMobileNumberExist = await db.User.findOne({
      where: { mobileNumber: mobileNumber },
    });
    if (myOtp == otp) {
      if (!isMobileNumberExist) {
        const user = await db.User.create({
          mobileNumber,
        });
        return { isNewUser: true, user: user };
      } else {
        return { isNewUser: false, user: isMobileNumberExist };
      }
    } else {
      return false;
    }
  };

  updateProfile = async () => {
    let { name, emailId, devicesId, gender, onBoarded } = this.body;
    const isEmailAlreadyTaken = await db.User.findOne({
      where: {
        id: {
          [Op.ne]: this.credential.id,
        },
        emailId,
      },
    });
    const isUserExist = await db.User.findOne({
      where: { id: this.credential.id },
    });
    if (isEmailAlreadyTaken) {
      return {
        isError: true,
        data: { msg: "E-Mail I'd already linked with different account" },
      };
    } else {
      if (isUserExist) {
        const user = await db.User.update(
          {
            name,
            emailId,
            devicesId,
            gender,
            onBoarded,
            isActive: 1,
          },
          {
            where: {
              id: this.credential.id,
            },
            returning: true,
          }
        );
        return { isError: false, data: user[1] };
      } else {
        return { isError: true, data: { msg: "User not exist" } };
      }
    }
  };
}

export default AuthService;
