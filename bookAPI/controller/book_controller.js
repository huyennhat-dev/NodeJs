const { Book, Author } = require('../model/model')

const bookController = {
    //ADD A BOOK
    addABook: async(req, res) => {
        try {
            const newBook = new Book(req.body);
            const savedBook = await newBook.save();
            if (req.body.author) {
                const author = Author.findById(req.body.author);
                await author.updateOne({ $push: { books: savedBook._id } });
            }
            res.status(200).json(savedBook);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //GET ALL BOOKS
    getAllBooks: async(req, res) => {
        try {
            const allBooks = await Book.find();
            res.status(200).json(allBooks);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // get A book
    getABook: async(req, res) => {
        try {
            const book = await Book.findById(req.params.id).populate('author')
            res.status(200).json(book)
        } catch (error) {
            res.status(500).json(error)

        }
    },

    // update book
    updateBoook: async(req, res) => {
        try {
            const book = await Book.findById(req.params.id)
            await book.updateOne({ $set: req.body })
            res.status(200).json('Updated successfully!')
        } catch (error) {
            res.status(500).json(error)
        }
    },

    // delete book
    deleteBook: async(req, res) => {
        try {
            await Author.updateMany({
                books: req.params.id
            }, {
                $pull: { books: req.params.id }
            })
            await Book.findByIdAndDelete(req.params.id)
            res.status(200).json('Deleted successfully!')
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = bookController;