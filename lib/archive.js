let router = require('express').Router({mergeParams: true}),
    {Archived} =require("../models/product.js"),
    {secure} = require("./middlewares");

router.get("/archive/:id", (req,res) => Archived.findById(req.params.id).then((p) => res.status(200).send(p)).catch((e)=> {
    console.error(e);
    res.status(400).send(e)
}));

module.exports = router;