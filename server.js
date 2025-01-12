// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Storage configuration for uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Middleware to parse JSON
app.use(express.json());

// Handle image and post data upload
app.post('/upload', upload.single('image'), (req, res) => {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : '';

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    res.status(200).json({
        title,
        content,
        image
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});