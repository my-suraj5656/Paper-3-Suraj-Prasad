import userModule from "../module/userModule.js";
import { checkValidationRules } from "../../../../middleware/allValidator.js";
import validatorRules from "../../../validatorRule.js";

const userController = {
  // signup
  signUp(req, res) {
    try {
      const { body: data } = req;

      const valid = checkValidationRules(data, validatorRules.signupValidation);

      if (!valid.status) {
        return res.status(400).json({ message: valid.error });
      } else {
        return userModule.signUp(data, res);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // login
  login(req, res) {
    try {
      const { body: data } = req;

      const valid = checkValidationRules(data, validatorRules.loginValidation);

      if (!valid.status) {
        return res.status(400).json({ message: valid.error });
      } else {
        return userModule.login(data, res);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default userController;
