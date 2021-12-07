import BaseRoutes from "../../shared/BaseRouter";
import { updateProfileValidate, validate } from "../middlewares/AuthValidator";
import { auth } from "../middlewares/AuthMiddleware";

// Controllers
import AuthController from "../controllers/AuthController";

class AuthRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("/login", validate, AuthController.login);
  }
}

export default new AuthRoutes().router;
