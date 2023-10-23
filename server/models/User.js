const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  first_name: {
    type: String,
    required: [true, 'Username required'],
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Email address required'],
    unique: true,
    validate: {
      validator(v) {
        return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
      },
      message: props => `${props.value} is not a valid email address.`
    },
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true }
);

const User = model('User', userSchema);

module.exports = User;