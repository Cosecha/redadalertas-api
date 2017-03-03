import Joi from 'joi';

export const user = {
  validate: {
    payload: {
      phoneNumber: Joi.string()
        .required()
        .min(10)
        .max(10),
    },
  },
};

export const newSession = {
  validate: {
    payload: {
      phoneNumber: Joi.string()
        .required()
        .min(10)
        .max(10),
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
