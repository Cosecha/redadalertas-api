import Joi from 'joi';

export const event = {
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
  cors: {
    origin: ['*'],
    additionalHeaders: ['cache-control', 'x-requested-with', 'accept-language'],
  },
  auth: false,
};

export const updatedEvent = {
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
