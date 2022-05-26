const { Book, Author } = require('../model/model')

const authorController = {
    //add author
    addAuthor: async(req, res) => {
        try {
            const newAuthor = new Author(req.body)
            const savedAuthor = await newAuthor.save()
            res.status(200).json(savedAuthor)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //get all author
    getAllAuthor: async(req, res) => {
        try {
            const author = await Author.find()
            res.status(200).json(author)

        } catch (error) {
            res.status(500).json(error)
        }
    },

    // get An author
    getAnauthor: async(req, res) => {
        try {
            const author = await Author.findById(req.params.id).populate('books')
            res.status(200).json(author)
        } catch (error) {
            res.status(500).json(error)

        }
    },

    // update author
    updateAuthor: async(req, res) => {
        try {
            const author = await Author.findById(req.params.id)
            await author.updateOne({ $set: req.body })
            res.status(200).json('Updated successfully!')
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = authorController;