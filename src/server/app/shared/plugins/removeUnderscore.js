const removeUnderscore = (schema) => {
  const transform = function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  };

  schema.options.toObject = schema.options.toObject || {};
  schema.options.toJSON = schema.options.toJSON || {};
  schema.options.toObject.transform = transform;
  schema.options.toJSON.transform = transform;
  schema.set('toObject', schema.options.toObject);
  schema.set('toJSON', schema.options.toJSON);
};

export default removeUnderscore;
