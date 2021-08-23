const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts');

app.use(express.urlencoded());
app.use(cookieParser());


app.use(express.static('./assets'));  // this tell app in which folder it will find static file

app.use(expressLayouts);

//extrect style and script from subpages into the layout
app.set('layout extractStyles',true);     // write extract not extrect....suar
app.set('layout extractScripts',true);

// use express router
app.use('/', require('./routes'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
