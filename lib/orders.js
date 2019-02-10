let router = require('express').Router({mergeParams: true}),
	Customer=require("../models/customer.js");

router.post("/", (req, res)=> {
    let customer = req.body;
    customer.session = req.session.id;
    customer.lang = req.cookies.lang || 'ro';
    Customer.create(customer).then(() => 
        res.status(200).end(), (e) => {
            console.error(e.toString());
            res.status(400).end();
        });    
});

module.exports = router; 