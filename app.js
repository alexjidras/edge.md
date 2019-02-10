let cookieParser = require('cookie-parser'),
    helmet = require('helmet'),    
    bodyParser = require('body-parser'),
    express = require('express'),
    path=require('path'),
    app=express.Router({mergeParams: true}),
    referrerPolicy = require('referrer-policy'),
    url=require("url"),
    //Ddos=require('ddos'),
    mongoose = require('./models/mongoose'),
    session = require('express-session'),
    SessionStore = require('connect-mongodb-session')(session),
    store = new SessionStore({
      uri: process.env.MONGODB_URI,
      collection: 'Sessions'
    }),    
    api = require('./lib/api'),
    auth = require('./lib/auth'),
    cart = require('./lib/cart'),
    orders = require('./lib/orders');

     
//app.use(new Ddos({burst:6, limit:15}).express);
app.use(helmet());
app.use(referrerPolicy({ policy: 'origin' }));
app.use((req,res,next)=> req.get('Referer') && url.parse(req.get('Referer')).hostname !== req.hostname ? res.status(400).end() : next());

app.use(bodyParser.json());
app.use((err, req, res, next) => {
  return err instanceof SyntaxError ? res.status(400).send(err) : res.status(500).send();
});

app.use('/api', api);
app.use('/users', auth);

app.use(cookieParser());
app.use((req,res,next) => {
	!req.cookies.lang && res.cookie("lang", 'ro', {maxAge: 30 * 24 * 60 * 60 * 1000});
    !req.cookies.sort && res.cookie("sort", "1" , {maxAge: 30 * 24 * 60 * 60 * 1000});
    !req.cookies.hot && res.cookie("hot", "1" , {maxAge: 30 * 24 * 60 * 60 * 1000});
    next();
});

app.use(session({
  secret: process.env.SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  },
  store,
  resave: false,
  saveUninitialized: true
}));

app.use('/cart', cart);
app.use('/orders', orders);
    
app.use((req, res, next) => res.status(404).send());
module.exports = app;

