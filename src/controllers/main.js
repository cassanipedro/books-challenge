const Sequelize = require('sequelize');
 
const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const Op = Sequelize.Op;
 
const mainController = {
 home: (req, res) => {
   db.Book.findAll({
     include: [{ association: 'authors' }]
   })
     .then((books) => {
       res.render('home', { books });
     })
     .catch((error) => console.log(error));
 },
 bookDetail: (req, res) => {
   // Implement look for details in the database
   db.Book.findByPk(req.params.id, {
     include: [{ association: 'authors' }]
   })
     .then(book => {
       console.log(book.dataValues.authors)
       res.render('bookDetail', {book: book.dataValues, authors: book.dataValues.authors})
     })
 },
 bookSearch: (req, res) => {
   res.render('search', { books: [], noResults: false });
 },
 bookSearchResult: (req, res) => {
   // Implement search by title
   db.Book.findAll({
     where: {
       title: {[Op.like]: `%${req.body.title}%`}
   },
   include: [{ association: 'authors' }]
   }).then(books => { res.render('search', { books: books, noResults: !books.length }) })
     .catch(error => console.error(error))
 },
 deleteBook: (req, res) => {
   // Implement delete book
   res.render('home');
 },
 authors: (req, res) => {
   db.Author.findAll()
     .then((authors) => {
       res.render('authors', { authors });
     })
     .catch((error) => console.log(error));
 },
 authorBooks: (req, res) => {
   // Implement books by author
   res.render('authorBooks');
 },
 register: (req, res) => {
   res.render('register');
 },
 processRegister: (req, res) => {
   db.User.create({
     Name: req.body.name,
     Email: req.body.email,
     Country: req.body.country,
     Pass: bcryptjs.hashSync(req.body.password, 10),
     CategoryId: req.body.category
   })
     .then(() => {
       res.redirect('/');
     })
     .catch((error) => console.log(error));
 },
 login: (req, res) => {
   // Implement login process
   res.render('login');
 },
 processLogin: (req, res) => {
   // Implement login process
   res.render('home');
 },
 edit: (req, res) => {
   // Implement edit book
   res.render('editBook', {id: req.params.id})
 },
 processEdit: (req, res) => {
   // Implement edit book
   res.render('home');
 }
};
 
module.exports = mainController;

