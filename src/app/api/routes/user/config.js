import Joi from 'joi';

export const user = {
  validate: {
    payload: {
      phoneNumber: Joi.string().required().min(10).max(10),
    },
  },
};

