var express = require('express');
var modelCategory = require('../models/Category');
var modelBook = require('../models/Book');
var router = express.Router();

router.get('/IDBook=:id', async (req,res, next)=>{
    const book = await modelBook.getBook(req.params.id);
    const cats = await modelCategory.getListCategory();
    let block = false;
    if (book.SOLUONG>300)
        block = true;
    res.render('PhieuNhap', {
        listOption: cats,
        detailBook: book,
        block: block
    })
});

router.post('/IDBook=:id', async(req,res,next)=>{
    const id = parseInt(req.params.id);
    const book = await modelBook.getBook(id);
    const cats = await modelCategory.getListCategory();
    let block = false;
    if (book.SOLUONG < 301)
        {
            book.SOLUONG = book.SOLUONG + parseInt(req.body.addQuantity);
            modelBook.updateBook(book);
        }
    if (book.SOLUONG > 300)
        block = true;
    res.render('PhieuNhap', {
        listOption: cats,
        detailBook: book,
        block: block
    })
})
module.exports = router;