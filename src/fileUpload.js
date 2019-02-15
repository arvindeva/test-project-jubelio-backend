// aws config

const aws = require('aws-sdk');
require('dotenv').config();


// Setting aws configurations
aws.config.update({
  // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  region: 'us-east-1'
});
// bucket name
const bucketName = 'jubelio-s3-bucket';
// Initiating S3 instance
const s3 = new aws.S3({
  apiVersion: '2006-03-01',
  params: { 
    Bucket: bucketName
    }
});

// queue size
const options = { partSize: 10 * 1024 * 1024, queueSize: 1 };

// Upload gambar ke S3
async function fileUpload(file) {
  const params = {
    Bucket: bucketName,
    Key: `${Date.now().toString()}.png`, 
    Body: file,
    ContentType: 'image/png',
    ACL: 'public-read'
  };
  let fileResp = null;
  await s3
    .upload(params, options)
    .promise()
    .then(res => {
      fileResp = res;
    });
  return fileResp;
}
module.exports = fileUpload;
