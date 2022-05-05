import jwt from "jsonwebtoken";
import { errorResMsg } from "../utilities/response.js";

const accessTokenSecret = process.env.TASKS_JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.TASKS_JWT_REFRESH_TOKEN_SECRET;
const expiresIn = process.env.TASKS_JWT_EXPIRES_IN;
const refreshExpiresIn = process.env.TASKS_REFRESH_JWT_EXPIRES_IN;

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn,
    });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: refreshExpiresIn,
    });

    return { accessToken, refreshToken };
  }
  async generateEmailToken(payload) {
    const emailToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn,
    });

    return { emailToken };
  }

  verifyTokens(payload, res) {
    let secret = payload.accessToken ? accessTokenSecret : refreshTokenSecret;

    let errRes;

    return jwt.verify(payload.accessToken, secret, (err, decoded) => {
      if (err && err.name === "TokenExpiredError") {
        errRes = errorResMsg(res, 400, "TOKEN Expired");
      }

      if (err && err.name === "JsonWebTokenError") {
        errRes = errorResMsg(res, 400, err.message);
      }

      return { decoded, err: errRes };
    });
  }

  generateRefreshToken() {}
}

export default new TokenService();
