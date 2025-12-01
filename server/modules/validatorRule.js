const validatorRules = {
  signupValidation: {
    fullname: "required|string",
    email: "required|email",
    phone: "required|string",
    password: "required|string|min:6",
  },
  loginValidation: {
    email: "required|email",
    password: "required|string",
  },
};

export default validatorRules;
