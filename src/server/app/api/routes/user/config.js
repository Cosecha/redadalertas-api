import Joi from 'joi';

export const user = {
  validate: {
    payload: {
      email: Joi.string().email()
        .required(),
      password: Joi.string().required()
        .min(6)
        .max(40),
    },
  },
};

export const id = {
  validate: {
    params: {
      userID: Joi.string().required(),
    },
  },
};
