# 🌿 Plant World – Full Stack E-Commerce Platform

![Homepage
Banner](https://github.com/sami5671/Plant_World_Full_Stack_MERN_Project/blob/main/plant_client_V2.0/public/Images/plantWorld.png)

> A modern full-stack plant e-commerce platform built with **React
> (Vite)**, **Node.js (Express)**, **MongoDB**, **Firebase**, and
> **Stripe**.

---

## 🏗️ System Architecture

![System 
Architecture](https://github.com/sami5671/Plant_World_Full_Stack_MERN_Project/blob/main/plant_client_V2.0/public/Images/Plant%20world%20Full-Stack%20Web%20App.svg)

## 🚀 Project Overview

Plant World is a complete full-stack web application designed for
selling plants online.  
It includes:

- 🔐 Authentication (JWT + Firebase Admin)
- 🛒 Product Management
- 👤 User & Admin Roles
- 💳 Stripe Payment Integration
- ☁️ Cloudinary Image Upload
- 📊 Dashboard & Analytics
- 📄 Invoice Generation (PDF)
- 🔥 Modern UI with TailwindCSS & Redux Toolkit

---

### 1. Admin

```bash
jamil@gmail.com
```

```bash
plant124P@
```

### 2. Moderator

```bash
kamal@gmail.com
```

```bash
plant124P@
```

### 3. User

```bash
nabil@gmail.com
```

```bash
plant124P@
```

# 🏗️ Project Structure

## 🔹 Backend – `plant_server_V2.0`

    plant_server_V2.0/
    │── src/
    │   ├── configs/
    │   ├── controllers/
    │   ├── admin/
    │   ├── auth/
    │   ├── plant/
    │   ├── user/
    │   ├── firebase/
    │   ├── helpers/
    │   ├── middlewares/
    │   ├── models/
    │   ├── routes/
    │   └── index.js
    │── .env
    │── package.json
    │── vercel.json

### ⚙️ Backend Setup

### 1️⃣ Install Dependencies

```bash
cd plant_server_V2.0
npm install
```

### 2️⃣ Create `.env` File

Create a `.env` file inside `plant_server_V2.0`:

    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret

    STRIPE_SECRET_KEY=your_stripe_secret

    FIREBASE_PROJECT_ID=your_project_id
    FIREBASE_CLIENT_EMAIL=your_client_email
    FIREBASE_PRIVATE_KEY=your_private_key

### 3️⃣ Run Backend

Development mode:

```bash
npm run dev
```

Production:

```bash
npm start
```

Backend runs at:

    http://localhost:5000

---

## 🔹 Frontend – `plant_client_V2.0`

    plant_client_V2.0/
    │── src/
    │   ├── api/
    │   ├── components/
    │   ├── features/
    │   ├── pages/
    │   ├── router/
    │   ├── Hooks/
    │   ├── layout/
    │   └── main.jsx
    │── index.html
    │── tailwind.config.js
    │── vite.config.js
    │── .env.local
    │── package.json

### ⚙️ Frontend Setup

### 1️⃣ Install Dependencies

```bash
cd plant_client_V2.0
npm install
```

### 2️⃣ Create `.env.local`

Inside `plant_client_V2.0`:

    VITE_API_URL=http://localhost:5000
    VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id

### 3️⃣ Run Frontend

```bash
npm run dev
```

Frontend runs at:

    http://localhost:5173

---

# 🔗 Connecting Frontend & Backend

Make sure:

- Backend is running on `http://localhost:5000`
- `VITE_API_URL` matches backend URL
- CORS is enabled in Express

---

# 🛠️ Tech Stack

## Frontend

- React 19
- Vite
- Redux Toolkit
- Tailwind CSS
- Firebase
- Stripe
- Chart.js
- Formik + Yup

## Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- Firebase Admin
- JWT Authentication
- Stripe API
- Cloudinary
- Helmet & CORS

---

# 📦 Build for Production

### Frontend

```bash
npm run build
```

### Backend

Deploy using: - Vercel - Render - Railway - DigitalOcean

---

# 🔐 Admin Access

Admin routes are protected with:

- JWT Middleware
- Role-based Authorization

Make sure admin role is set in database.

---

# 📄 API Base URL

    http://localhost:5000/api

---

# 👨‍💻 Author

**Md. Sami Alam**  
Full Stack Developer

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---

# 🎉 Final Notes

- Always keep `.env` files private
- Never push secrets to GitHub
- Use production environment variables when deploying

---

# 🌍 Homepage Preview

After running frontend:

👉 Open: **http://localhost:5173**  
You will see the Plant World homepage with products, categories,
authentication, and payment system ready.

---

💚 Happy Coding!
