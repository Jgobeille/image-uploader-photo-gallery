
const ejs        = require('ejs');
const multer     = require('multer');
const express    = require("express");
const bodyParser = require('body-parser');
const app        = express();


//EJS view engine middleware
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.set('views',__dirname+'/views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


app.get('/', function(req, res){
    res.render("photo-gallery");
})

module.exports = app;

app.listen(3000);
    console.log("The app has started!");
