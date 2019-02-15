// aws config

const aws = require('aws-sdk');
require('dotenv').config();


// Setting aws configurations
aws.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'us-east-1'
});
// Decent bucket name
const bucketName = 'jubelio-s3-bucket';
// Initiating S3 instance
const s3 = new aws.S3({
  apiVersion: '2006-03-01',
  params: { 
    Bucket: bucketName
    }
});

const options = { partSize: 10 * 1024 * 1024, queueSize: 1 };

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
