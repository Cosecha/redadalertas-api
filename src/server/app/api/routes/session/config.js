import Joi from 'joi';

const username = {
  validate: {
    payload: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
};

export default {
  username,
};
