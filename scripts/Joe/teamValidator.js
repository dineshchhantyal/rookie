const Joi = require("joi");

const teamValidator = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  members: Joi.array(),

  projectName: Joi.string().alphanum().min(3).max(30),

  description: Jio.object().key({
    info: Joi.string().alphanum().min(3).max(30).required(),
    link: Joi.string().uri(),
    image: Joi.string().uri(),
  }),
});

module.exports = teamValidator;
