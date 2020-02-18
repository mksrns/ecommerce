require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const flash = require('connect-flash');
const passport = require("passport");
const morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const path = require("path");

// Setting up port
const connUri = process.env.MONGO_LOCAL_CONN_URL;
let PORT = process.env.PORT || 3000;

//=== 1 - CREATE APP
// Creating express app and configuring middleware needed for authentication
const app = express();

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//=== 2 - SET UP DATABASE
// Configure mongoose's promise to global promise
mongoose.promise = global.Promise;
mongoose.connect(connUri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB --  database connection established successfully!'));
connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});

app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: 86400000,
        setHeaders: function(res, path) {
            res.setHeader("Expires", new Date(Date.now() + 2592000000*30).toUTCString());
      }
}));

//Morgan for testing status
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads', {
    maxAge: 86400000,
    setHeaders: function(res, path) {
        res.setHeader("Expires", new Date(Date.now() + 2592000000*30).toUTCString());
}}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'mysecret', 
    resave: false, 
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(flash());

//=== 3 - INITIALIZE PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());
require("./api/middlewares/jwt")(passport);

//=== 4 - CONFIGURE ROUTES
//Configure Route
require('./api/routes/index')(app);

//=== 5 - START SERVER
app.listen(PORT, () => console.log('Server running on http://localhost:'+PORT+'/'));

module.exports = app;