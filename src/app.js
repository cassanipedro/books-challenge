const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const cookiesMiddleware = require('./middlewares/cookiesMiddleware');
const sessionMiddleware = require('./middlewares/sessionMiddleware');
const mainRouter = require('./routes/main');
 
 
const app = express();
 
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())
app.use(session({secret: 'booksApp'}));
app.use(cookiesMiddleware)
app.use(sessionMiddleware);
 
app.set('view engine', 'ejs');
app.set('views', 'src/views');
 
app.use('/', mainRouter);
 
app.listen(3006, () => {
 console.log('listening in http://localhost:3006');
});


