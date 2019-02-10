const mongoose=require("./mongoose"),
      //uniqueValidator = require('mongoose-unique-validator'),
      { autoIncrement }=require('mongoose-plugin-autoinc');

let productSchema = new mongoose.Schema({
    //_id: {type: Number, index: true, unique: true},
    cattegory: {type: String, enum: ['smartphoane', 'ceasuri', "accesorii", "tablete"]},
    popularity: {type: Number, min: 1, max: 100},
    hottness: {type: Number, min: 1, max: 100},
    filter : {"ro": Object, "ru": Object},
    name: String,
    price: [Number],
    specs: {"ro": Object, "ru": Object},
    keywords: String,
    colors: [String],
    images: [[String]],
    thumbnail: String,
    video: {
      type: String,
      default: ""
    },
    warranty: {
      type: Number,
      default: 1
    }    
}),
archived_product = new mongoose.Schema(productSchema.obj, {strict: false});

productSchema.plugin(autoIncrement, 'Product');
archived_product.plugin(autoIncrement, 'Archived');
//productSchema.plugin(uniqueValidator);
productSchema.eachPath((path) => !['video', 'warranty'].includes(path) && productSchema.paths[path].required(true));
productSchema.set('toJSON', {
  versionKey:false,
  transform: function (doc, ret) {   
    ret.id = ret._id;
    delete ret._id  
}
});

productSchema.methods.toArchive = function() {
    let product = this.toJSON();
    product.ref = this.id;
    delete product.id;
    return product;
}


productSchema.pre('save', colorCheck);
productSchema.pre('save', memoryCheck);

function colorCheck(next) {
    try {
        this.colors.length !== this.filter["ro"]["Culoare"].length || this.colors.length !== this.filter["ru"]["Цвет"].length || this.colors.length !== this.images.length ? next(new Error("Color length doesn't match")) : next();
    }
    catch(e) {next(e)}
}

function memoryCheck(next) {
    try {
    if(this.filter["ro"]["Memorie"]) {
          return this.price.length !== this.filter["ro"]["Memorie"].length  || this.price.length !== this.filter["ru"]["Память"].length ?  next(new Error("Memory length doesn't match")) : next();
    }
    next();
    }
    catch(e) {next(e)}
}



module.exports = {
    "Product": mongoose.model("Product", productSchema, "Products"), 
    "Archived": mongoose.model("Archived", archived_product, "Archive")
};



