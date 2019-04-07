const Joi = require('joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) { req.value = {}; }
      req.value['body'] = result.value;
      next();
    }
  },

  schemas: {
    
    authSchema: Joi.object().keys({
      userName: Joi.string().required(),
      password: Joi.string().required()
    }),
    registerSchema: Joi.object().keys({
      userName: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      passwordVerify: Joi.string().required()
    }),


    archeologistSchema: Joi.object().keys({
      title: Joi.string().required(),
      date: Joi.string().required()
    }),
    newArcheologistSchema: Joi.object().keys({
      title: Joi.string().required(),
      body: Joi.string().required(),
      date: Joi.string().required()
    }),
    updateArcheologistSchema: Joi.object().keys({
      title: Joi.string().required(),
      body: Joi.string().required(),
      date: Joi.string().required(),
      oldBody: Joi.string().required(),
      oldDate: Joi.string().required()
    })
  }
}