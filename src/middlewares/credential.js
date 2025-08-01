const { credentialsService } = require("../services/credentialsService");
const { TokenService } = require("../services/tokenService");
const { ERROR_MESSAGES } = require("../utils/constants");
const { extractCodeAndMessageFromError } = require("../utils/error");

const isCredential = async (req, res, next) => {
  console.log("first2")
  try {
    const { authorization } = req.headers;
    console.log(authorization);
    const credential = TokenService.extractTokenFromHeaders(authorization);
    console.log(credential);


    if (!credential)
      throw new Error(JSON.stringify(ERROR_MESSAGES.CREDENTIAL_NOT_FOUND));

    const isValid = await credentialsService.findValidCredential(credential);

    if (!isValid) throw new Error(JSON.stringify(ERROR_MESSAGES.UNAUTHORIZED));
    next();
  } catch (error) {
    const { code, message } = extractCodeAndMessageFromError(error.message);
    res.status(code).send({ message });
  }
};

module.exports = {
  isCredential,
};
