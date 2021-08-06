const Joi = require("joi");

const tokenValidator = Joi.object({
    name: Joi.string().min(3).max(30).required(),

    rollno: Joi.string().required().max(3),

    token: Joi.string().required().min(11).max(11)
});

module.exports = tokenValidator;
