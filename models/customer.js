var mongoose=require("./mongoose"),
	moment= require("moment"),
    orase= require('../utils/orase'),
    {Product} = require('./product');

moment.locale('ro');

var customerSchema = new mongoose.Schema({
    lang: String,
	data: String, 
    ora: String,
    nume: {
        type: String,
        required: true,
        trim: true
    },
    oras: {
    	type: String,
    	default: "Chișinău"
    },
    telefon: {
        type: String,
        required: true,
        validate: (v)=> /[0-9.,\s+-]{6,20}/.test(v)     
    },
    products: [{
        	_id: Number,
            model: String, 
        	memory: mongoose.Schema.Types.Mixed,
        	color: mongoose.Schema.Types.Mixed,
        	quantity: Number,
        	price: Number,
            total: Number,
            original: Product.schema,
            id: Number
        }],
    checkout: {
        subtotal: Number,
        livrare: Number,
        total: Number
    },
    session: String
});


customerSchema.pre("save", async function(next) {
    let subtotal = 0, livrare = orase.distance[this.oras];
    this.data = moment().format("LL");
    this.ora =  moment().format("LT");
    this.oras = orase["ro"][this.oras];
    let original = await Product.find({_id : {$in: this.products.map((p) => p.id)}});
    this.products = original.map((found) => {
        let product = this.products.find((p) => p.id === found._id);
        subtotal += product.quantity * found.price[product.memory];
        return {
            _id: product.id,
            model: found.name,
            color: found.filter["ro"].Culoare[product.color],
            memory: found.filter["ro"].Memorie ? found.filter["ro"].Memorie[product.memory] : '-',
            quantity: product.quantity,
            price: found.price[product.memory],
            total: found.price[product.memory] * product.quantity,
            original: found 
        } 
    });
    this.checkout= {
        subtotal,
        livrare,
        total: subtotal + livrare
    }
    next();
});


module.exports= mongoose.model("Customer", customerSchema, "Customers");