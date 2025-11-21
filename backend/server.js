// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173", "https://glittery-griffin-71ef68.netlify.app"],
    credentials: true
}));

app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Import Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("NovaAfriq Backend API Running...");
});

// MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
