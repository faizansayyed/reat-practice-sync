const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const { promisify } = require("util");
const gm = require("gm").subClass({ imageMagick: true });

exports.handler = async (event, context) => {
  try {
    const srcBucket = event.Records[0].s3.bucket.name;
    const srcKey = decodeURIComponent(
      event.Records[0].s3.object.key.replace(/\+/g, " ")
    );
    const dstBucket = srcBucket; // Use the same bucket
    const dstKey = `thumbnails/${srcKey.slice(0, -4)}_thumbnail.png`; // Output to "thumbnails" folder with PNG extension

    // Download the image from S3
    const getObject = promisify(s3.getObject.bind(s3));
    const data = await getObject({ Bucket: srcBucket, Key: srcKey });

    // Convert JPEG to PNG and resize to a small thumbnail
    const imageBuffer = data.Body;
    const thumbnailBuffer = await promisify(convertImage)(imageBuffer);

    // Upload the thumbnail PNG to S3
    await s3
      .putObject({
        Bucket: dstBucket,
        Key: dstKey,
        Body: thumbnailBuffer,
        ContentType: "image/png"
      })
      .promise();

    return "Success";
  } catch (error) {
    console.error(error);
    throw error;
  }
};

function convertImage(imageBuffer) {
  return new Promise((resolve, reject) => {
    gm(imageBuffer)
      .resize(100, 100) // Adjust the size as needed for your thumbnail
      .setFormat("png")
      .toBuffer("PNG", (error, buffer) => {
        if (error) {
          reject(error);
        } else {
          resolve(buffer);
        }
      });
  });
}
