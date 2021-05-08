const UploadModel = require('../model/schema');
const fs = require('fs');

exports.home = async (req, res) => {
    //const all_images = await UploadModel.find()
    res.render('login', {});
}

exports.loginsub = async (req, res) => {
    res.redirect('/homepage');
}

exports.homepage = async (req, res) => {
    const all_images = await UploadModel.find()
    res.render('main', {images : all_images});
}

exports.login = async (req, res) => {
    res.render('login', {});
}

exports.deleteAll = async (req, res) => {
    UploadModel.deleteMany({}).then(function(){
        console.log("Data deleted"); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
    res.redirect('/homepage');
}

exports.uploads = (req, res , next) => {
    const body = req.body;
    const files = req.files;
    const desc = req.body.description;

    if(!files){
        const error = new Error('Please choose files');
        error.httpStatusCode = 400;
        return next(error)
    }

    // convert images into base64 encoding
    let imgArray = files.map((file) => {
        let img = fs.readFileSync(file.path)

        return encode_image = img.toString('base64')
    })

    let result = imgArray.map((src, index) => {

        // create object to store data in the collection
        let finalImg = {
            filename : files[index].originalname,
            contentType : files[index].mimetype,
            imageBase64 : src,
            description : desc
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
}
/*exports.uploads = (req, res , next) => {
    const files = req.files;
    console.log('Maggie')

    if(!files){
        const error = new Error('Please choose files');
        error.httpStatusCode = 400;
        return next(error)
    }

    // convert images into base64 encoding
    let imgArray = files.map((file) => {
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
}*/