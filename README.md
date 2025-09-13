# Basic Authentication in Next.js

<div align="center">

[![Next JS](https://img.shields.io/badge/-NextJS-000000?style=for-the-badge\&logo=next.js\&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/-TailwindCSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)](https://tailwindcss.com/)

A simple **Basic Authentication System** built with Next.js using JWT, bcrypt, and Nodemailer for email functionality.

<img src="public/img.jpg" alt="Basic Authentication" width="600" />

</div>

---

## 🔐 Authentication Overview

* Passwords are hashed using **bcrypt** before storing in the database.
* **JWT (jsonwebtoken)** is used for session handling.
* **axios** is used for API calls from the frontend.
* **nodemailer** is used to send emails (like verification or password reset).
* Backend built with Next.js API routes + Mongoose.

---

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/huzaifamushtaqofficial/basic_auth_next.git
cd basic_auth_next
```

### 2. Install dependencies

```bash
npm install  # or yarn install
```

### 3. Environment variables

Create a file named `.env` in the project root and add:

```bash
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_HOST=your_smtp_host
EMAIL_PORT=your_smtp_port
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
DOMAIN=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev  # or yarn dev
```

Now open [http://localhost:3000](http://localhost:3000).

---

## 🧭 Authentication Endpoints

### Backend API Routes

* POST `/api/users/signup` - Register a new user
* POST `/api/users/login` - Login user and get JWT
* POST `/api/users/verifyemail` - Verify email using token
* GET `/api/users/profile` - Get authenticated user profile

### Frontend Routes

* `/signup` - Registration page
* `/login` - Login page
* `/verifyemail` - Email verification page
* `/profile` - User profile page (protected)

---

## 📦 Dependencies (no versions listed)

* axios
* bcryptjs
* jsonwebtoken
* lucide-react
* mongoose
* motion
* next
* nodemailer
* react
* react-dom
* react-hot-toast

---

## 📜 License & Author Profile\
**License:** This project is released under an **open-source license**. You are free to use, modify, and distribute this code for any purpose, commercial or non-commercial, without attribution. The author provides this software “as is” and is **not responsible** for any issues, damages, or liabilities arising from its use, including any modifications you make.



**Author:** Huzaifa Mushtaq
**GitHub:** [https://github.com/huzaifamushtaqofficial](https://github.com/huzaifamushtaqofficial)

**LinkedIn:** [https://www.linkedin.com/in/huzaifamushtaqofficial/](https://www.linkedin.com/in/huzaifamushtaqofficial/)
