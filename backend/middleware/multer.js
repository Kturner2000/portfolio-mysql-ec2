const multer = require('multer')

const storage = multer.memoryStorage(); // Store files in memory buffer
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
    fileFilter: (req, file, cb) => {
        const supportedFileTypes = /jpeg|jpg|png|gif|webp/;
        const extname = supportedFileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = supportedFileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error("Unsupported file type"));
    },
});

module.exports = upload;