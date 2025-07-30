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

//get all books
const getAllBooks = async (req , res) => {
   try{
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send({message : "Books fetched successfully", books: books})
   }catch(error){
    console.error("Error fetching books:", error);
    res.status(500).send({message: "Failed to fetch books"});
   }
}

//get single book   
const getSingleBook = async (req, res) => {
      try{
        console.log("Single book request received for ID:", req.params.id);
        const {id} = req.params;
        let book;
        
        // Check if ID is valid MongoDB ObjectId format
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
          // Search by MongoDB ID
          book = await Book.findById(id);
        } else {
          // Search by title (URL decoded)
          const decodedTitle = decodeURIComponent(id);
          console.log("Searching by title:", decodedTitle);
          book = await Book.findOne({ title: decodedTitle });
        }
        
        if(!book) {
          console.log("Book not found with identifier:", id);
          return res.status(404).send({message : "Book not found!"});
        }
        console.log("Book fetched successfully:", book.title);
        res.status(200).send({message: "Book fetched successfully", book: book})
   }catch(error){
    console.error("Error fetching book:", error);
    console.error("Error details:", error.message);
    res.status(500).send({message: "Failed to fetch book"});
   }
}

//update book data 
const UpdateBook = async (req , res) =>{
    try{
        console.log("Update request received for book ID:", req.params.id);
        console.log("Update data:", req.body);
        const {id} = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id , req.body, {new: true});
        if(!updatedBook) {
          console.log("Book not found with ID:", id);
          return res.status(404).send({message : "Book not found!"});
        }
        console.log("Book updated successfully:", updatedBook.title);
        res.status(200).send({
            message: "Book updated successfully",
            book: updatedBook
        })
    }catch(error){
        console.error("Error updating book:", error);
        res.status(500).send({message: "Failed to update book"});   
        }
}


//Delete book
const deleteABook = async (req , res) => {
    try {
        console.log("Delete request received for book ID:", req.params.id);
        const {id} = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if(!deletedBook) {
            console.log("Book not found with ID:", id);
            return res.status(404).send({message : "Book not found!"});
        }
        console.log("Book deleted successfully:", deletedBook.title);
        res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook
        })
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).send({message: "Failed to delete book"});
    }
};

module.exports = {
    postABook,
    getAllBooks,
    getSingleBook,
    UpdateBook,
    deleteABook
}