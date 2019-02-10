let router = require('express').Router({mergeParams: true}),
    {validProducts} = require("./middlewares");

router.get("/", (req,res)=> {
    req.session.products = req.session.products || [];
    req.session.save((err) => {
        if(err) {
            console.error(err.toString());
            return res.status(500);
        }
        res.send(req.session.products); 
    })
});

router.post("/", validProducts, (req,res)=> {
        req.session.products = req.body;
        req.session.save((err) => {
            if(err) {
                console.error(err.toString());
                return res.status(500).end();
            };
            res.status(200).end();
        });
});

module.exports = router;