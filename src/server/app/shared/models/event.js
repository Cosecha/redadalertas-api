import { Schema } from 'mongoose';

// TO-DO: replace Strings with more appropriate data types
// TO-DO: everything with "required: false" should be true

const eventSchemaObj = {
  type: {
    type: String,
    required: true,
    enum: [
      'sweep',
      'targeted',
      'checkpoint',
      'traffic',
      'i9',
      'action',
      'other'
    ],
  },
  description: {
    type: String,
    intl: true
  },
  present: {
    type: [{
      // TO-DO: implement Agency stub in bootstrap.js
      // _id: false,
      // agency: {
      //   type: Schema.Types.ObjectId,
      //   ref: 'Agency'
      // }
      agency: String
    }]
  },
  created: {
    at: {
      type: Date,
      default: Date.now
    },
    by: {
      group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: false
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
      }
    },
  },
  updated: {
    at: {
      type: Date,
      default: Date.now
    },
    by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
  },
  expire: {
    at: {
      type: Date,
      required: false
    },
    deleteOnExpire: {
      type: Boolean,
      required: false
    },
  },
  verified: {
    type: [{
      _id: false,
      required: false,
      by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      at: {
        type: Date,
        default: Date.now,
      },
    }]
  },
  location: {
    address_1: String,
    address_2: String,
    city: String,
    state: String,
    zipcode: Number,
    latitude: Number,
    longitude: Number,
    description: {
      type: String,
      intl: true
    }
  },
  radius: {
    mi: { // miles
      type: Number,
      required: false
    },
    km: { // kilometers
      type: Number,
      required: false
    },
  }
};

const eventSchema = new Schema(eventSchemaObj);

eventSchema.getAuthLevel = (payload, doc)=> {
  if (payload && doc && payload.user && doc.created) {
    const userGroup = payload.user.belongs.find({ to: doc.created.by.group });
    const userRole = userGroup ? userGroup.as : false;
    const userRoleInDoc = userRole ? doc.permissions[userRole] : false;
    if (userGroup && userRole && userRoleInDoc) return userRole;
  }
}

module.exports.eventSchema = eventSchema;
module.exports.eventSchemaObj = eventSchemaObj;
