import { Schema } from 'mongoose';

// TO-DO: replace Strings with more appropriate data types
// TO-DO: everything with "required: false" should eventually be true

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
      'falsealarm',
      'other'
    ],
  },
  description: {
    type: String,
    intl: true,
    required: true
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
    by: {
      group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: false
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    },
  },
  updated: {
    by: {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    },
  },
  expire: {
    at: {
      // TO-DO: make this group's default expire time for event type
      type: Date,
      default: Date.now() + (1000 * 60 * 60 * 12), // 12 hours
      required: true
    },
    deleteOnExpire: {
      type: Boolean,
      default: false,
      required: true
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
    address_1: {
      type: String,
      required: true
    },
    address_2: String,
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipcode: {
      type: String,
      required: true
    },
    latitude: {
      type: String,
      required: true
    },
    longitude: {
      type: String,
      required: true
    },
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
  },
};

const eventSchema = new Schema(eventSchemaObj, {
  timestamps: {
    createdAt: "created.at",
    updatedAt: "updated.at"
  },
  toJSON: {
    virtuals: true // request returns a string where intl: true
  },
});

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
