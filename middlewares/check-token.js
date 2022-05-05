import tokenService from "../services/token-service.js";

const checkToken = (req, res, next) => {
  const token = req.headers["authorization"];
  const authToken = token.split(" ")[1];

  const { decoded, err } = tokenService.verifyTokens(
    { accessToken: authToken },
    res
  );

  if (err) {
    return next(err);
  }

  req.user = decoded;
  return next();
};

export default checkToken;
