const _ = require('lodash');
const router = require('express').Router(),
    {User} = require('../models/user'),
    {secure} = require('./middlewares');


router.post('/login', (req, res) => {
  var body = _.pick(req.body, ['username', 'password']);

  User.findByCredentials(body).then((user) => {
  	return user.generateApiKey().then((key) => {
	  	user.api_key = key;
		return user.save().then(() => {
	        res.cookie('api_key', key, {maxAge: 30 * 24 * 60 * 60 * 1000});
	  		res.send(user);
		})
	})
  }).catch((e) => {
      res.status(400).send();
  })
});


router.post('/logout', secure, (req, res) => {
  req.user.removeApiKey().then(() => {
    res.clearCookie('api_key');
    res.status(200).send();
  }, () => {
    res.status(400).send(e.toString());
  });
});


router.get('/', secure, (req, res) => {
  User.find({}).then((users) => 
    res.send(users)).catch((e) =>
      res.status(400).send(e))
});


router.post('/', secure, (req, res) => {
  var body = _.pick(req.body, ['username', 'password']);
  var user = new User(body);
  user.save().then(() =>
    res.send(user)).catch((e) =>
      res.status(400).send(e))
});

router.delete('/', secure, (req,res) => {
  let id = req.query['id'];
  User.findByIdAndDelete(id).then((user) =>
    !user ? Promise.reject() : res.status(200).send()).catch((e) =>
      res.status(404).send())
})

module.exports = router;