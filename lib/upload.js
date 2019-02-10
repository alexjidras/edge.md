const router = require('express').Router(),
       path = require('path'),
	   multer  = require('multer'),
	   sharp = require('sharp'), 
	   {secure} = require("./middlewares"),
	   chalk = require('chalk'),
	   fs = require('fs-extra');

let imgtypes = [{type: 'big', height: 460}, {type: 'medium', height: 250}, {type: 'small', height: 100}],
    public_folder = path.resolve('./client/public/images'),
    build_folder = path.resolve('./client/build/images'),
    storage = multer.diskStorage({
	  destination: function (req, file, cb) {
	    cb(null, `${public_folder}/original`)
	  },
	  filename: function (req, file, cb) {
	    cb(null, file.originalname)
	  }
	});


router.post('/upload', multer({ storage }).array('file'), (req,res) => {	
		Promise.all(req.files.map(({filename}) =>
			fs.copy(`${public_folder}/original/${filename}`, `${build_folder}/original/${filename}`).then(() => {
				let clean = sharp(`${public_folder}/original/${filename}`).trim().flatten({background:{ r: 255, g: 255, b: 255}});
		        return Promise.all(imgtypes.map(({type, height}) => 
		        	clean.resize(null, height).jpeg({quality: 90}).toFile(`${public_folder}/resize/${type}/${stripExt(filename)}.jpg`).then(({size}) => 	
		        		fs.copy(`${public_folder}/resize/${type}/${stripExt(filename)}.jpg`, `${build_folder}/resize/${type}/${stripExt(filename)}.jpg`).then(() => 
		        			log(`${filename}`,`${stripExt(filename)}.jpg`,size))
			        )
		        ));       	 
			}))
	).then(() =>
		res.status(200).end()).catch((e)=> {
		console.error(e && e.toString());
		res.status(500).send()
	});

})


let log = (orig, file, size) => console.log(`${chalk.green('DONE')} ${chalk.cyan(orig)} ---> ${chalk.blue(file)} ${chalk[size/1024.0 <50 ? 'magenta' : 'red']((size/1024.0).toFixed(2) + 'kb')}`);
let stripExt = (file) => file.replace(/\.(jpe?g|png|webp)/, '');

module.exports = router;