var express = require('express');
var modelBook = require('../models/Book');
var modelCategory = require('../models/Category');
const multer = require('multer');
const path = require('path');
const helpers = require('./helpers');
//const { isUndefined } = require('util');
var router = express.Router();

var upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: async function (req, file, cb) {
        let id= req.body.btnID;
        console.log(file);
        // if(id == undefined){
        // id = await modelBook.getNextID();
        // }
        
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

router.get('/Book', async (req, res, next) => {
    const listOption = await modelCategory.getListCategory();
    res.render('DetailBook', { listOption });
});
router.get('/Book/IDBook=:id', async (req, res, next) => {

    const listOption = await modelCategory.getListCategory();
    const detailBook = await modelBook.getBook(req.params.id);
    console.log(detailBook);

    res.render('DetailBook', { listOption, detailBook });
});
router.get('/Book/DataBook=:id', async (req, res, next) => {
    const detailBook = await modelBook.getBook(req.params.id);
    res.send(detailBook);
});

router.get('/Book/DataBook=:id/TheLoai', async(req,res,ext)=>{
    const detailBook = await modelBook.getBook(req.params.id);
    const Cat = await modelCategory.getNameCategory(detailBook.THELOAI);
    res.send(Cat[0].TEN);
});

router.post('/Book/SaveOrUpdate', (req, res, next) => {
    // 'profile_pic' is the name of our file input field in the HTML form

    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('imgavatar');


    upload(req, res,async function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            console.log("error");
            return res.send(req.fileValidationError);
        }
        // else if (!req.file) {
        //     return res.send('Please select an image to upload');
        // }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        var book = req.body;

        //book.path=req.file.path;

        let entity = {
            TEN: book.BookName,
            THELOAI: book.genre,
            TACGIA: book.author,
            GIA: book.Price,
            MIEUTA: book.description
        }
        let idsave;
        if (book.btnID === 'null') {// Thêm sách
            if(req.file){
                entity.IMAGE = req.file.path;
            }
            idsave = await modelBook.SaveBook(entity);
        } else { // Cập nhật sách
            entity.ID = book.btnID;

            if (req.file) { // Cập nhật có file ảnh
                entity.IMAGE = req.file.path;
                id = modelBook.UpdateBook(entity);
            }else{ // Cập nhật không có file ảnh
                id=modelBook.UpdateBookNoImage(entity);
            }
        }
        console.log(entity);
        if(idsave){
            res.redirect(`/admin/Book/IDBook=${idsave}`);
        }else{
        res.redirect(`/admin/Book/IDBook=${book.btnID}`);
        }
    });
});
module.exports = router;