//Requieres
const express = require('express'); //express server
const exphbs = require('express-handlebars'); //handlebars views engine
const path = require('path'); //path module. This allow us to manage correct path, independent if server are running in Windows or Linux server
const morgan = require('morgan'); //this module allow us to see the server request in console
const methodOverride = require('method-override'); //this module extends the forms methods
const flash = require('connect-flash'); //allow us to send messages to the users (success, warnings, errors, etc.)
const session = require('express-session'); //allow us to create users sessions into the servers

//Initializations
const app = express(); //Initialize the server

//Settings
app.set('port', process.env.PORT || 10000); //set the port listening
app.set('views', path.join(__dirname, '/views')); //set the views folder
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), '/layouts'),
  partialsDir: path.join(app.get('views'), '/partials'),
  extname: '.hbs'
})); //create a view engine
app.set('view engine', '.hbs'); //set the view engine create previuslly

//Middlewares: are funtions that execute for each petitions to the server
app.use(express.urlencoded({extended: false})); //allows us to encode the special characters sending via form. the poperty extended is needed for accept only data (not images, for example)
app.use(morgan('dev')); //this module allow us to see the server request in console
app.use(methodOverride('_method')); //override the method sending via form and changing to the method passed in _method parameter. It is used for DELETE, PUT and other method distinct to GET and POST
app.use(session({
  secret: 'secret',       //secret word for the session
  resave: true,           //default config of the module
  saveUninitialized: true //default config of the module
}));
app.use(flash()); //this Middleware add to the request the flash method that allow us to send messages

//Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg'); //We define our own Middleware. This function get the value of succes_msg saved in req and assign it to the local variable succes_msg
  next(); //the next() function is necessary to continue to the execution of the Server. If next is not defined, then server stop in this point. 
});
app.use((req, res, next) =>{
  res.locals.error_msg = req.flash('error_msg');
  next();
})

//Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/moneda.routes'));
app.use(require('./routes/tipocuenta.routes'));
app.use(require('./routes/cuentas.routes'));

//Static Files
app.use(express.static(path.join(__dirname, '/public')));

module.exports = app;