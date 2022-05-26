const bookController = require('../controller/book_controller')

const router = require('express').Router()

//add book
router.post('/', bookController.addABook)

//get all book
router.get('/', bookController.getAllBooks)

//get a book
router.get('/:id', bookController.getABook)

//update a book
router.put('/:id', bookController.updateBoook)

//delete a book
router.delete('/:id', bookController.deleteBook)


module.exports = router;