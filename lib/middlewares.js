const Joi = require('joi');
let {User} = require('./../models/user');

const schema = Joi.array().items(Joi.object().keys({
    id: Joi.number().integer().positive().required(),
    color: Joi.number().integer().min(0).required(),
    memory: Joi.number().integer().min(0).required(),
    quantity: Joi.number().integer().min(0).required(),
    price: Joi.number().integer().min(0).required()
}));

const validProducts = (req, res, next) => {
    Joi.validate(req.body, schema, (err) => {
        if(err) {
            console.error(err.toString());
            return res.status(400).end();
        }
        next();
    })
};

const secure = (req, res, next) => {
  var key = req.get('X-API-KEY');
  
  User.findByApiKey(key).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    req.user = user;
    next();
  }).catch((e) => {
  	res.clearCookie('api_key');
    res.status(401).send();
  });
};
 
 
 module.exports = {validProducts, secure};