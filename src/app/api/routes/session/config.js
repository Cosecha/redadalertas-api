import Joi from 'joi';

const username = {
  validate: {
    payload: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
};

export default {
  username,
};
