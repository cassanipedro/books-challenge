const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const mainRouter = require('./routes/main');
 
 
const app = express();
 
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({secret: 'booksApp'}))
 
app.set('view engine', 'ejs');
app.set('views', 'src/views');
 
app.use('/', mainRouter);
 
app.listen(3016, () => {
 console.log('listening in http://localhost:3016');
});


