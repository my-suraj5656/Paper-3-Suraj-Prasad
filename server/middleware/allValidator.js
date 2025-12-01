import Validator from "validatorjs";
import jwt from "jsonwebtoken";

// check validation rules
const checkValidationRules = (data, rules) => {
  try {
    const v = new Validator(data, rules);
    const validationResult = {
      status: true,
    };

    if (v.fails()) {
      const validationErrors = v.errors.all();
      validationResult.status = false;
      for (const key in validationErrors) {
        validationResult.error = validationErrors[key][0];
        break;
      }
    }

    return validationResult;
  } catch (error) {
    console.log("checkValidatorRules error:- ", error.message);
  }
};

// headers
const headersValidation = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];
    if (token === "null" || token === "undefined") {
      return res.status(401).json({ message: "Token is missing login again" });
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Token missing in authorization header" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      data: {
        status: false,
      },
    });
  }
};

export { checkValidationRules, headersValidation };
