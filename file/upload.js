const multer = require("multer");

// to upload any file
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "./images")
  },
  filename : function(req, file, cb){
    cb(null,Date.now()+ file.originalname)
  }
})
// filtering specific file types
const filter = function(req, file, cb){
  if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg"){
    cb(null, true);
  }else{
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  fileFilter: filter
})
module.exports = upload;