import  AWS from 'aws-sdk';
import mime from 'mime-types';
import handleError from '../exceptions/exception';
import config from './configs.js'
const s3 = new AWS.S3({
  accessKeyId: config.R2_ACCESS_KEY_ID,
  secretAccessKey: config.R2_SECRET_ACCESS_KEY,
  endpoint: config.R2_ENDPOINT,
  region: 'auto',
  signatureVersion: 'v4',
});

const bucket = config.R2_BUCKET;

// brought in multer for multipart upload , use it to pass data to this function 
/**\
 * function for batch upload.
 * @param {Array} files - Array of files with `buffer`, `originalname`, and `mimetype` (done with multer).
 * @param {string} folder - optional r2 folder name , default is root.
*/

export async function uploadImages(files, folder = '') {
    try {
        const uploads = files.map(file => {
            const key = folder ? `${folder}/${file.originalname}` : file.originalname;
            const contentType = file.mimetype || mime.lookup(file.originalname) || 'application/octet-stream';

            return uploadImage(file.buffer, key, contentType);
        });

        return Promise.all(uploads);
    }catch(e){
        handleError(`Failed to upload Image at ${key}:` , error);
    }
  
}
//if needed can it make it public as well
async function uploadImage(buffer, key, contentType) {
    try {
        const params = {
            Bucket: bucket,
            Key: key,
            Body: buffer,
            ContentType: contentType,
        };
        return s3.upload(params).promise();
    }
    catch(e){
        throw e;
    }
}

/**
 * @param {string} key - the file name if present in root , or the abs path.
*/
export async function getImage() {
  const params = {
    Bucket: bucket,
    Key: key,
  };
  try {
    const data = await s3.getObject(params).promise();
    console.log(data);
    return data.Body;
  } catch (error) {
    handleError(`Failed to get file ${key}:` , error);
  }
}
