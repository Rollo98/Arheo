const multer = require('multer'),
  constants = require('./constants'),
  mongoose = require('mongoose'),
  crypto = require('crypto'),
  GridFsStorage = require('multer-gridfs-storage'),
  Grid = require('gridfs-stream');

mongoose.once('open', () => {
  // Init stream
  gfs = Grid(mongoose.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: `${constants.mongoURL}/${mongoose.getName()}`,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
// const upload = multer({ storage });
module.exports = { upload: multer({ storage }) }