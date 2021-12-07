import { Request, Response } from "express";
import Authentication from "../../utils/Authentication";
import { handleResponse } from "../../utils/ResponseHandler";
import AuthService from "../services/AuthService";
const db = require("../../db/models");

class AuthController {
  login = async (req: Request, res: Response): Promise<Response> => {
    const service: AuthService = new AuthService(req);
    const user = await service.login();
    return handleResponse(res, user, {success: 'OTP sent succesfully', error: 'OTP Server down'})
  };
}

export default new AuthController();
