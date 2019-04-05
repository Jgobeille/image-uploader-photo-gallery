
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
});



//multer
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  //init upload
  const upload = multer({
    storage: storage,
    limits:{filesize: 10000},
    filefilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('attachFile');
  
  //check file type
  function checkFileType(file, cb){
    //allowed extensions
    const filetypes = /jpeg|jpg|png|gif/;
    //check ext
    const extname =filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetpe = filetypes.test(file.mimetype);
    
    if(mimetype && extname){
      return cb(null, true)
    } else {
      cb('Error: Images Only!');
    }
  }
  

module.exports = app;

app.listen(3000);
    console.log("The app has started!");

