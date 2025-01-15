const photoModel = require('../models/Photo.model');
const s3 = require('../lib/s3')
require("dotenv").config();


//get all photos

const getAllPhotos = async (req, res) => {
    try {
      const photos = await photoModel.getAllPhotos();
      res.json(photos);
    } catch (err) {
      console.error('Error fetching photos:', err);  // Added error logging
      res.status(500).json({ message: 'Server Error' });  // Changed to send JSON response
    }
};

  //uploadPhoto

  const uploadPhoto = async (req, res) => {
    const { photos } = req.body;

    if (!Array.isArray(photos) || photos.length === 0) {
        return res.status(400).json({ message: "Photos array is required" });
    }

    try {
        const uploadedPhotos = [];

        for (const photo of photos) {
            const { src, alt, category } = photo;

            if (!src || !alt || !category) {
                return res.status(400).json({ message: "All fields are required for each photo" });
            }

            let srcUrl;

            if (src) {
                // Validate base64 input
                if (!/^data:image\/[a-zA-Z]+;base64,/.test(src)) {
                    return res.status(400).json({ message: "Invalid base64 image data" });
                }

                const buffer = Buffer.from(src.split(",")[1], "base64");
                const fileType = src.split(";")[0].split("/")[1];

                // Validate file type
                const supportedFileTypes = ["jpeg", "png", "gif", "webp"];
                if (!supportedFileTypes.includes(fileType)) {
                    return res.status(400).json({ message: "Unsupported file type" });
                }

                // Enforce size limit (10MB)
                if (buffer.length > 10 * 1024 * 1024) {
                    return res.status(400).json({ message: "File size exceeds limit" });
                }

                const params = {
                    Bucket: process.env.AWS_S3_BUCKET_NAME,
                    Key: `${Date.now()}.${fileType}`,
                    Body: buffer,
                    ContentType: fileType === "jpg" ? "image/jpeg" : `image/${fileType}`,
                    ContentEncoding: "base64",
                };

                const uploadResult = await s3.upload(params).promise();
                srcUrl = uploadResult.Location;
            }

            const newPhoto = await photoModel.uploadPhoto({
                src: srcUrl,
                alt,
                category,
            });

            uploadedPhotos.push(newPhoto);
        }

        return res.status(201).json({
            message: "Photos successfully uploaded",
            photos: uploadedPhotos
        });
    } catch (error) {
        console.error("Error uploading photos:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getPhotosByCategory = async (req, res) => {
    const { category } = req.params;

    if (!category) {
        return res.status(400).json({ message: 'Category is required' });
    }

    try {
        const photos = await photoModel.getPhotosByCategory(category);

        if (photos.length === 0) {
            return res.status(404).json({ message: 'No photos found for this category' });
        }

        res.json(photos);
      } catch (err) {
        console.error('Error fetching photos:', err);  // Added error logging
        res.status(500).json({ message: 'Server Error' });  // Changed to send JSON response
      }
}

const getPhotoById = async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({ message: 'Id is required' });
    }

    try {
        const photo = await photoModel.getPhotoById(id);

        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        res.json(photo);
      } catch (err) {
        console.error('Error fetching photo:', err);  // Added error logging
        res.status(500).json({ message: 'Server Error' });  // Changed to send JSON response
      }
}



module.exports = {getAllPhotos, uploadPhoto, getPhotosByCategory, getPhotoById}