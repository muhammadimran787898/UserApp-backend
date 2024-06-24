import joi from "joi";

const userRegisterschema = joi.object({
  name: joi.string().required(),
  email: joi.string().required().email(),
  password: joi
    .string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})"
      )
    )
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long, and include at least one lowercase letter, one uppercase letter, one digit, and one special character.",
    }),
});

const userUpadte = joi.object({
  name: joi.string(),
  email: joi.string(),
  password: joi.string(),
});

const forgotpasswordschema = joi.object({
  email: joi.string(),
});

const resetpasswordSchema = joi.object({
  password: joi.string(),
});

export { userUpadte, userRegisterschema, forgotpasswordschema, resetpasswordSchema };
