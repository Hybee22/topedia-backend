import { v4 } from "uuid";
import userService from "../../services/user-service.js";
import colorService from "../../services/color-service.js";
import UserDTO from "../../dtos/users/index.js";
import { errorResMsg, successResMsg } from "../../utilities/response.js";
import Logger from "../../logger.js";

const logger = Logger;

const appEmitter = global.appEmitter;

class AuthController {
  async handleRegister(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!email || !password) {
        return errorResMsg(res, 400, {
          message: "Email address is required!",
        });
      }

      const userId = v4();

      const { user, tokens } = await userService.register({
        name,
        userId,
        email,
        password,
      });

      const defaultColor = await colorService.defaultColor();

      if (defaultColor) {
        appEmitter.emit("createInbox", {
          userId,
          name: "inbox",
          projectId: v4(),
          colorId: defaultColor,
        });
      }

      const userDTO = new UserDTO(user);

      return successResMsg(res, 201, {
        message: "Registration Successful",
        tokens,
        user: userDTO,
      });
    } catch (error) {
      logger.error(error);
      return errorResMsg(res, 500, {
        message: "Something went wrong with your registration",
      });
    }
  }

  async handleLogin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return errorResMsg(res, 400, {
          message: "Email/Password address is required!",
        });
      }

      const { user, tokens, message } = await userService.login({
        email,
        password,
      });

      if (message) {
        return errorResMsg(res, 401, {
          message,
        });
      }

      const userDTO = new UserDTO(user);

      return successResMsg(res, 200, {
        message: "Sign-in Successful",
        tokens,
        user: userDTO,
      });
    } catch (error) {
      console.error(error);
      logger.error(error);
      return errorResMsg(res, 500, {
        message: "Something went wrong with your login",
      });
    }
  }

  async handleForgotPassword() {}

  async handleResetPassword() {}
}

export default new AuthController();
