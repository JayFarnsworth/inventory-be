const express = require("express");
const router = express.Router();
require('dotenv').config();

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
  apiVersion: "2006-03-01",
  region: process.env.S3_BUCKET_REGION,
  credentials: {
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY_ID
  }
});


const upload = multer({
  storage: multerS3({
    s3, // The s3 instance from above
    // The name of your S3 bucket
    bucket: process.env.S3_BUCKET_NAME,
    key: (request, file, next) => {
      // This names the file. This example prepends the
      // UNIX timestamp to original name of the file,
      // which helps with duplicate file names
      next(null, `files/${Date.now()}_${file.originalname}`);
    }
  })
});


router.post("/upload", upload.single("file"), (request, response) => {
  // Return the URL the file was uploaded to- optionally, store it
  // in a database first.
  console.log('file uploaded')
  response.json({ data: request.file.location });
});


module.exports = router;
