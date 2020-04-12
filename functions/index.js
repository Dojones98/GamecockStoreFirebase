const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require ('cors')({origin: true});
const path = require ('path');
const sharp = require ('sharp');
const uuidv4 = require('uuid/v4');
const uuid = uuidv4();
admin.initializeApp();
const gcs = admin.storage();

const THUMB_MAX_WIDTH = 200;
const THUMB_MAX_HEIGHT = 200;



exports.sanitizeName = functions.firestore.document('products/{id}')
    .onCreate((snapshot, context) => {
      const original = snapshot.data();
      var altered = original
      altered.name = altered.name.replace(/ugly|messy|trash|body|bad/ig, '')
      console.log("Here is the name to uppercase: " + altered.name);
      return snapshot.ref.set(altered);
    });


exports.updateItem = functions.firestore
    .document('products/{id}')
    .onUpdate((change, context) => {
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const newValue = change.after.data();
      const previousValue = change.before.data();
      var toSubmit;
      toSubmit = newValue;

      var oldPrice = previousValue.price;
      var newPrice = newValue.price;

      console.log("Here is hte price before arithmatic: " + oldPrice)
      if(newPrice < (oldPrice - oldPrice/2)){
        newPrice = oldPrice/2;
        toSubmit.price = newPrice;

        console.log("Here is the price after arithamtic: " + toSubmit.price);
      
      }

      return change.after.ref.set(toSubmit);
    });

    exports.generateThumbnail = functions.storage.object().onFinalize((object) => {
        const fileBucket = object.bucket; // The Storage bucket that contains the file.
        const filePath = object.name; // File path in the bucket.
        const contentType = object.contentType; // File content type.
      
        // Exit if this is triggered on a file that is not an image.
        // Get the file name.
        const fileName = path.basename(filePath);
        // Exit if the image is already a thumbnail.
        if (fileName.startsWith('thumb_')) {
          console.log('Already a Thumbnail.');
          return null;
        }
      
        // Download file from bucket.
        const bucket = gcs.bucket(fileBucket);

        const thumbFileName = `thumb_${fileName}`;
        const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);
        const thumbnailUploadStream = bucket.file(thumbFilePath).createWriteStream({
            metadata : { 
                contentType : contentType,
                metadata : {
                    firebaseStorageDownloadTokens: uuid
                }
            }});
      
        // Create Sharp pipeline for resizing the image and use pipe to read from bucket read stream
        const pipeline = sharp();
        pipeline.resize(THUMB_MAX_WIDTH, THUMB_MAX_HEIGHT,{fit: 'inside', withoutEnlargement: true }).pipe(thumbnailUploadStream);
      
        bucket.file(filePath).createReadStream().pipe(pipeline);
      
        return new Promise((resolve, reject) =>
            thumbnailUploadStream.on('finish', resolve).on('error', reject));
      });
    




