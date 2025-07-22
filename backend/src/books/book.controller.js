const Book = require('./book.model');

const postABook = async (req, res) => {
try{
    const newBook = new Book({...req.body});
    await newBook.save();
    res.status(200).send({message : "Book posted successfully", book: newBook});
}catch(error){
     console.error("Error creating book:", error);
     res.status(500).send({message: "Failed to create book"});
 } 
}

module.exports = {
    postABook
}