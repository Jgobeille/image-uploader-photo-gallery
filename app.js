
const ejs        = require('ejs');
const multer     = require('multer');
const express    = require("express");
const bodyParser = require('body-parser');
const app        = express();
const path       = require('path');



//EJS view engine middleware
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.set('views',__dirname+'/views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


app.get('/', function(req, res){
    res.render("photo-gallery");
});

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
      if(err){
        res.render('photo-gallery', {
          msg: err
        });
      } else {
        console.log(req.file);
        res.send('test');
      }
    });
});


//multer
//const storage is the var that will be the setup for where we will be storing our photos
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  //init upload
  const upload = multer({
    storage: storage, // storage will be the staorge engine called out above
    limits:{filesize: 10000},
    filefilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('myFile');
  
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
  
const port = 3000;
module.exports = app;

app.listen(port, () => console.log(`The app has started on port ${port}`));
    

