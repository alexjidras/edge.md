const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const validator = require('validator');
//const uniqueValidator = require('mongoose-unique-validator');

let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  api_key : {
      type: String,
      validate: validator.isJWT  
  }
});


UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'username', 'api_key']);
};

UserSchema.methods.generateApiKey = function () {
  var user = this;
  return Promise.resolve(jwt.sign({_id: this._id.toHexString()}, process.env.SECRET).toString());
};

UserSchema.methods.removeApiKey = function () {
  var user = this;
  return user.update({
    $unset: {api_key: ""}
  });
};

UserSchema.statics.findByApiKey = function (key) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(key, process.env.SECRET);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'api_key': key
  });
};

UserSchema.statics.findByCredentials = function ({username, password}) {
  var User = this;

  return User.findOne({username}).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject(err);
        }
      });
    });
  });
};

UserSchema.pre('save', function (next) {
  var user = this;
  
  if (user.isModified('password')) {
    return bcrypt.genSalt(10).then((salt) => 
      bcrypt.hash(user.password, salt).then((hash) => {
        user.password = hash;
        next();
      })
    ).catch((e) => next(e))}
  next();
});

//UserSchema.plugin(uniqueValidator);

var User = mongoose.model('User', UserSchema, "Users");

module.exports = {User}
