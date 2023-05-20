import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';
import cloudinary from 'cloudinary';
dotenv.config();
cloudinary.v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

//  Remove uploaded image function
const removeUploadedImage = async (imageArray, preset) => {
  imageArray.map((img) =>
    cloudinary.api.delete_resources(
      `${preset}/${img}`,
      function (error, result) {
        if (error) {
          throw new Error(error.response.data);
        }
      }
    )
  );
};

//  upload multiple image function
const cloudinaryImageUploadMethod = asyncHandler(async (file, preset) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      { upload_preset: `${preset}` },
      (err, result) => {
        if (err) {
          console.log(err);
        }
        resolve({
          img: result,
        });
      }
    );
  });
});

export { cloudinary, removeUploadedImage, cloudinaryImageUploadMethod };
