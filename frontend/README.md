🚀 NovaAfriq — Fashion E-Commerce Platform

A full-stack MERN (MongoDB, Express, React, Node.js) web application designed for African designers to upload, manage, and sell their products online.

✨ Features
🛍 User Features

Browse all fashion products

Filter by category & price

View product details

Add items to cart

Secure authentication (JWT)

Fully responsive modern UI

🎨 Designer Features

Upload new products (with image upload)

Automatically optimized image handling

View only their own products in the dashboard

Edit / delete uploaded products

Designer analytics:

Total products

Total views (if implemented)

Revenue (future feature)

🛠 Admin Features (optional future)

Manage all products

Manage users

View platform-wide analytics

🧱 Tech Stack
Frontend

React.js

React Router

Axios

TailwindCSS

Context API (Auth management)

Backend

Node.js

Express.js

MongoDB + Mongoose

Multer (image uploads)

JWT Authentication

bcrypt

📁 Project Structure
NovaAfriq/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/products/
│   ├── server.js
│
├── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   └── manifest.json
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.js
│
└── README.md

⚙️ Backend Setup
1️⃣ Install Dependencies
cd backend
npm install

2️⃣ Create .env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

3️⃣ Start Server
npm start

💻 Frontend Setup
1️⃣ Install Dependencies
cd frontend
npm install

2️⃣ Start React App
npm start


Your frontend will run at:
http://localhost:3000

Your backend will run at:
http://localhost:5000

📸 Image Upload System

Multer is used to store images in:

backend/uploads/products/


Images are served publicly via:

http://localhost:5000/uploads/products/filename.png


Front-end automatically normalizes image URLs to ensure proper loading.

🔐 Authentication Flow

User logs in → backend returns JWT token

Token stored in localStorage

Axios interceptor attaches token automatically

Backend validates token before protected routes

📊 Designer Dashboard

Includes:

List of designer's uploaded products

Product thumbnails (normalized size)

Edit/Delete buttons

Upload new product button

Coming soon: Analytics + revenue tracking

🧪 API Endpoints
Public
Method	Route	Description
GET	/api/products	Get all products
GET	/api/products/:id	Get product by ID
Designer
Method	Route	Description
POST	/api/products/upload	Upload new product
GET	/api/products/my-products	Get designer's products
PUT	/api/products/:id	Edit product
DELETE	/api/products/:id	Delete product
🛑 Troubleshooting
🔥 Images not showing?

Check:

app.use("/uploads", express.static("uploads"))

🔥 Designer dashboard shows “No products”?

Ensure:

JWT is valid

Frontend uses /products/my-products (correct route)

Backend uses designer: req.user.id

🔥 Favicon not updating?

Clear browser cache:

Ctrl + Shift + R

❤️ Credits

NovaAfriq Fashion Platform
Designed & Developed with ❤️ to showcase African fashion talent.