import Joi from 'joi';

export const raid = {
  validate: {
    payload: {
      date: Joi.date().required(),
      description: Joi.string().required()
        .max(200),
      location: Joi.array().items(Joi.number())
        .min(2)
        .max(2)
        .required(),
      type: Joi.string().required(),
    },
  },
};

export const updatedRaid = {
  validate: {
    payload: {
      date: Joi.date(),
      description: Joi.string()
        .max(200),
      location: Joi.array().items(Joi.number())
        .min(2)
        .max(2),
      type: Joi.string(),
    },
  },
};
