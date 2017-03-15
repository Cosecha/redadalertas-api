import Joi from 'joi';

export const username = {
  validate: {
    payload: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
};
