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
 //   db.Book.destroy({
 //     where: {
 //         id: req.params.id
 //     },
 //     include: [{
 //       model: db.Author,
 //       as: 'authors'
 //   }],
 //     force: true,
 // })
 db.Book.destroy({
   where: {
     id: req.params.id
   },
   forcer: true
 })
 .then(() => {
   db.Book.findAll().then(books =>
   res.render('home', {books})
   )
 }).catch(errors => console.error(errors))
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
   db.Author.findByPk(req.params.id, {
     include: [{ association: 'books' }]
   }).then(result => res.render('authorBooks', {books: result.books}));
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
   db.Book.findByPk(req.params.id).then(book => {
     const {id, title, description, cover} = book;
     res.render('editBook', {id, title, description, cover})
   })
  
 },
 processEdit: (req, res) => {
   // Implement edit book
   console.log("--------------------------------------------------------", req.body)
   const {title, cover, description} = req.body;
   if(title && cover && description) {
     db.Book.update({title, cover, description}, {where:{id: req.params.id}})
     .then(() => db.Book.findAll({
       include: [{ association: 'authors' }]
     }))
     .then((books) => res.render('home', { books }));
     return;
   }
   let errors = {}
   if(!title){
     errors.title = {msg: "TE FALTA TITULO"}
   }
   if(!cover){
     errors.cover = {msg: "TE FALTA COVER"}
   }
   if(!description){
     errors.description = {msg: "TE FALTA DESCRIPTION"}
   }
   db.Book.findByPk(req.params.id).then(book => {
     const {id, title, description, cover} = book;
     console.log("ESTA ENTRANDO ACA")
     res.render('editBook', {id, title, description, cover, errors})
   })
 }
};
 
module.exports = mainController;

