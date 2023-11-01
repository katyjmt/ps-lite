const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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
  },
  designs: [{
    type: Schema.Types.ObjectId, 
    ref: 'Design'
  }],
  orders: [{
    type: Schema.Types.ObjectId, 
    ref: 'Order'
  }],
}, { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;