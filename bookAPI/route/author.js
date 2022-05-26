const authorController = require('../controller/author_controller')

const router = require('express').Router()


//add author
router.post('/', authorController.addAuthor)

//get all author
router.get('/', authorController.getAllAuthor)

//get an author
router.get('/:id', authorController.getAnauthor)

//update a author
router.put('/:id', authorController.updateAuthor)

module.exports = router;