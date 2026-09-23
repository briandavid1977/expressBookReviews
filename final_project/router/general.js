const express = require('express');
let books = require("./booksdb.js");
const axios = require('axios');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// Task 6 - Register a new user
public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required"
      });
    }
  
    if (isValid(username)) {
      users.push({
        username: username,
        password: password
      });
  
      return res.status(200).json({
        message: "User successfully registered. Now you can login"
      });
    }
  
    return res.status(409).json({
      message: "User already exists!"
    });
  });

// Task 1 - Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});

// Task 2 - Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).json(books[isbn]);
});

// Task 3 - Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  let matchingBooks = {};

  Object.keys(books).forEach((key) => {
    if (books[key].author === author) {
      matchingBooks[key] = books[key];
    }
  });

  return res.status(200).json(matchingBooks);
});

// Task 4 - Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    let matchingBooks = {};
  
    Object.keys(books).forEach((key) => {
      if (books[key].title === title) {
        matchingBooks[key] = books[key];
      }
    });
  
    return res.status(200).json(matchingBooks);
  });

// Task 5 - Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
  
    if (books[isbn]) {
      return res.status(200).json(books[isbn].reviews);
    }
  
    return res.status(404).json({message: "Book not found"});
  });
// Task 10 - Get all books using async/await with Axios
const getAllBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  };
  // Test route for Task 10
public_users.get('/async/books', async (req, res) => {
    const data = await getAllBooks();
    return res.status(200).json(data);
  });
  // Task 11 - Search by ISBN using async/await with Axios
const getBookByISBN = async (isbn) => {
    try {
      const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  };
  
  // Test route for Task 11
  public_users.get('/async/isbn/:isbn', async (req, res) => {
    const data = await getBookByISBN(req.params.isbn);
    return res.status(200).json(data);
  });
  // Task 12 - Search by author using async/await with Axios
const getBooksByAuthor = async (author) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/author/${encodeURIComponent(author)}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  };
  
  // Test route for Task 12
  public_users.get('/async/author/:author', async (req, res) => {
    const data = await getBooksByAuthor(req.params.author);
    return res.status(200).json(data);
  });
  // Task 13 - Search by title using async/await with Axios
const getBooksByTitle = async (title) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/title/${encodeURIComponent(title)}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  };
  
  // Test route for Task 13
  public_users.get('/async/title/:title', async (req, res) => {
    const data = await getBooksByTitle(req.params.title);
    return res.status(200).json(data);
  });
module.exports.general = public_users;