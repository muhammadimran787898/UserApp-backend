import joi from "joi";

const userUpadteSchema = joi.object({
  name: joi.string(),
  email: joi.string().email(),
  password: joi.string(),
  age: joi.number(),
  address: joi.string(),
  gender: joi.string(),
  status: joi.string(),
  mobile: joi.number(),
  state: joi.string(),
  city: joi.string(),
  country: joi.string(),

});
export { userUpadteSchema };
