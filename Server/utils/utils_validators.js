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
      email: Joi.string().email().required(),
      password: Joi.string().required()

    }),
    registerSchema: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }),
    noteSchema: Joi.object().keys({
      title: Joi.string().required(),
      date: Joi.string().required()
    }),
    newNoteSchema: Joi.object().keys({
      title: Joi.string().required(),
      body: Joi.string().required(),
      date: Joi.string().required()
    }),
    updateNoteSchema: Joi.object().keys({
      title: Joi.string().required(),
      body: Joi.string().required(),
      date: Joi.string().required(),
      oldBody: Joi.string().required(),
      oldDate: Joi.string().required()
    })
  }
}