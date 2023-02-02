import express from "express";
import bookSchema from "./model.js";
import mongoose from "mongoose";

const router = express.Router();
const Book = mongoose.model("livres", bookSchema);

//Get home page
router.get("/", (req, res) => {
  let category;
  Book.find({}, (error, data) => {
    if (error) {
      return console.error(error);
    } else {
      res.render("home", {
        title: "My Express App",
        books: data,
      });
    }
  });
});

//Get Page add Book
router.get("/addBook", (req, res) => {
  res.render("addBook");
});

//Add book
router.post("/addBook", (req, res) => {
  const book = new Book({
    isbn: req.body.isbn,
    name: req.body.name,
    author: req.body.author,
    price: req.body.price,
    description: req.body.description,
    genre: req.body.genre,
    published: new Date().toLocaleDateString(),
  });

  //Save book in the database
  book.save((error) => {
    if (error) {
      console.error(error);
      res
        .status(500)
        .send("Error while saving book to the database. Error = " + error);
    } else {
      res.redirect("/");
      console.log("book added");
    }
  });
});

//Get one book by ID
router.get("/book/:id", async (req, res) => {
  Book.findById(req.params.id, (error, book) => {
    if (error) {
      return console.error(error);
    } else {
      res.render("singleBook", {
        title: book.name,
        description: book.description,
        genre: book.genre,
        auteur: book.author,
        isbn: book.isbn,
        price: book.price,
        publishDate: book.published,
        id: book._id,
      });
    }
  });
});

//Delete book
router.get("/book/delete/:id", (req, res) => {
  Book.findByIdAndRemove(req.params.id, (error, book) => {
    if (error) {
      return console.error(error);
    } else {
      res.redirect("/");
      res.console.log("Book deleted");
    }
  });
});

//Get updateBook page
router.get("/book/updatePage/:id", async (req, res) => {
  try {
    Book.findById(req.params.id, (error, book) => {
      if (error) {
        return console.error(error);
      } else {
        res.render("updateBook", {
          title: book.name,
          description: book.description,
          genre: book.genre,
          auteur: book.author,
          isbn: book.isbn,
          price: book.price,
          publishDate: book.published,
          id: book._id,
        });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//updateBook
router.post("/book/update/:id", async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log("book updated");
    res.redirect(`/book/${req.params.id}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
