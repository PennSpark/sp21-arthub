const route = require('express').Router()
const controller = require('../controller/controller');
const store = require('../middleware/multer')

// routes
route.get('/', controller.home);
route.get('/homepage', controller.homepage);
route.get('/login', controller.login);
// route.post('/uploadmultiple', store.any(), controller.uploads);
route.post('/uploadmultiple', store.any() , controller.uploads);
route.post('/loginsubmit', controller.loginsub);
route.post('/deleteimages', controller.deleteAll)



/*const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'text/plain') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    fileFilter,
    storage
});

app.post('/uploadmultiple', store.any(), function(req, res) {
    console.log(req.body)
});

app.post("/uploadmultiple", upload.single("images"), (req, res, next) => { 
    const file = req.file;
    console.log(file);
  
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    const multerText = Buffer.from(file.buffer).toString("utf-8");
  
    const result = {
      fileText: multerText,
      name: req.body.name // adding the name from req.body in the result
    };
  
    res.send(result);
});*/





/*var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(path.resolve(__dirname, 'public')));*/
/*const UploadModel = require('../model/schema');
const fs = require('fs');

var bodyParser = require('body-parser');*/

/*route.post('/uploadmultiple', function(req, res) {

    const files = store.single('images', 1);
    console.log('Maggie');
    console.log('body');
    console.log(files);

    /*if(!files){
        const error = new Error('Please choose files');
        error.httpStatusCode = 400;
        return next(error)
    }*/

    // convert images into base64 encoding
    /*let imgArray = files.map((file) => {
        let img = fs.readFileSync(file.path)

        return encode_image = img.toString('base64')
    })

    let result = imgArray.map((src, index) => {

        // create object to store data in the collection
        let finalImg = {
            filename : files[index].originalname,
            contentType : files[index].mimetype,
            imageBase64 : src
        }

        let newUpload = new UploadModel(finalImg);

        return newUpload
                .save()
                .then(() => {
                    return { msg : `${files[index].originalname} Uploaded Successfully...!`}
                })
                .catch(error =>{
                    if(error){
                        if(error.name === 'MongoError' && error.code === 11000){
                            return Promise.reject({ error : `Duplicate ${files[index].originalname}. File Already exists! `});
                        }
                        return Promise.reject({ error : error.message || `Cannot Upload ${files[index].originalname} Something Missing!`})
                    }
                })
    });

    Promise.all(result)
        .then( msg => {
                // res.json(msg);
            res.redirect('/homepage')
        })
        .catch(err =>{
            res.json(err);
        })
    
    console.log('Data received:\n' + JSON.stringify(req.body.clientname));
    //User is the model created in app.js of this project
    var newImage = UploadModel({
          filename: "title",
          description: req.body.description,
          image: req.body.images
    });
    console.log(newImage);
    
    res.send(newImage);
    // save the user
    controller.uploads(newImage);
});*/

module.exports = route;
