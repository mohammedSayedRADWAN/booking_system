import express from "express";
import { clearAndWrite, read, writeAuthors } from "../utils/middelware.js";
import { nanoid } from "nanoid";
import { fixBody } from "../utils/fixBody.js";
const book_keys = ["title", "authorId", "year", "isBorrowed"];
const router = express.Router();
router.get("", async (req, res) => {
  const books = await read("books");
  res.json({ message: "all books successfuly", books });
});
router.post("", async (req, res) => {
  const bookData = fixBody(req.body, book_keys);
  const { title, authorId, year, isBorrowed } = bookData;
  if (!title || !authorId || !year || isBorrowed === undefined) {
    return res
      .status(400)
      .json({ message: "title,authorId,year,isBorrowed are required" });
  }
  const authors = await read("authors");
  const authorIndex = authors.findIndex((author) => author.id === authorId);
  if (authorIndex === -1) {
    return res.status(404).json({ message: "author not found" });
  }

  const newBook = { id: nanoid(), ...bookData };
  await writeAuthors(newBook, "books");
  res.status(201).json({ massege: "book added successfuly", data: newBook });
});
router.get("/:id", async (req, res) => {
  const { id: bookId } = req.params;
  const books = await read("books");
  const bookFound = books.find((book) => book.id === bookId);
  if (!bookFound) {
    res.status(404).json({ message: "book not found" });
  }
  res.status(200).json({ massege: "book found successfuly", data: bookFound });
});
router.patch("/:id", async (req, res) => {
  const { id: bookId } = req.params;
  const bookData = fixBody(req.body, book_keys);
  const books = await read("books");
  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex === -1) {
    return res.status(404).json({ message: "book not found" });
  }

  //هياخد القيم الجديدة من bookData ويعدل على القيم القديمة اللى موجوده فى books[bookIndex]

  books[bookIndex] = { ...books[bookIndex], ...bookData };

  await clearAndWrite(books, "books");
  res.json({
    massege: "book updated successfuly",
    updatedBook: books[bookIndex],
  });
});
router.delete("/:id",async (req, res) => {
      const { id: bookId } = req.params;
  const books = await read("books");
   const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex === -1) {
    return res.status(404).json({ message: "book not found" });
  }

  res.status(200).json({
    massege: "book deleted successfuly",
    deletedBook: books[bookIndex],
  });
  books.splice(bookIndex, 1);
  await clearAndWrite(books, "books");
});

export default router;
