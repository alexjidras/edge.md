let router = require('express').Router({mergeParams: true}),
    {Product, Archived} =require("../models/product.js"),
    {secure} = require("./middlewares"),
    upload = require('./upload'),
    archive = require('./archive');

router.get("/", (req,res)=> {
    Product.find({}).then((products) => res.send(products));
});

router.post("/", secure, (req, res)=> {
        Product.create(req.body).then((product) =>
            res.json(product)).catch((e) => {
                console.error(e.toString());
                res.status(400).send(e.toString())});
});

router.get("/:id", (req,res)=> {
    Product.findById(req.params.id).then((product) => res.send(product));
});

router.put("/", secure, (req, res) => {
    Product.findByIdAndUpdate(req.body.id, req.body, {new: true}).then((product) =>
        res.json(product)).catch((e) => {
            console.error(e.toString());
            res.status(400).send(e.toString())});
});

router.delete("/:id", secure, (req, res) => {
    Product.findByIdAndRemove(req.params.id).then((product) => {
        return product ? Archived.create(product.toArchive()) : Promise.reject("No such id")}).then(() => 
	        res.status(200).end()).catch((e) => { 
	            res.status(400).end(e.toString());
        	})
})



router.use(secure, upload);
router.use(secure, archive);

module.exports = router;