# 💼 Job Portal Backend API

A RESTful backend service for a Job Portal application built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)**, featuring JWT-based authentication and role-based access for Recruiters and Job Seekers.

> 💡 **Unified Platform**: This backend connects seamlessly with the **WorkLink AI** frontend and ATS **Resume Builder Pro** suite.

---

## 🚀 Features

- 🔐 **Authentication & Authorization**: Secure user registration, password hashing with `bcryptjs`, and stateless JWT authentication.
- 👥 **Role-Based Access**: Support for `recruiter` (post jobs) and `jobseeker` (apply for jobs) roles.
- 📌 **Job Management**: Create, browse, and filter jobs with recruiter population.
- 🔍 **Advanced Search**: Search jobs by keyword (title), location, or required skill set.
- 📝 **Application Processing**: Job seekers can apply to open positions with duplicate application protection.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose ODM)
- **Security**: JSON Web Tokens (JWT), bcryptjs
- **Utilities**: CORS, dotenv, multer

---

## 📂 Project Structure

```bash
job-portal/
├── config/
│   └── db.js               # Database connection logic
├── controllers/
│   ├── authController.js   # Registration and login logic
│   └── jobController.js    # Job creation, listing, searching & applying
├── middleware/
│   └── authMiddleware.js   # JWT authentication protector
├── models/
│   ├── Application.js      # Job application schema
│   ├── Job.js              # Job posting schema
│   └── User.js             # User account schema
├── routes/
│   ├── authRoutes.js       # Auth endpoint routes
│   └── jobRoutes.js        # Job & application endpoint routes
├── .env.example            # Environment variables template
├── package.json
└── server.js               # Application entry point
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/the-anurag14/job-portal.git
cd job-portal
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory (based on `.env.example`):
```env
PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/job-portal?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
```

### 4. Run the Server
- **Production mode**:
  ```bash
  npm start
  ```
- **Development mode (auto-reload)**:
  ```bash
  npm run dev
  ```

---

## 📡 API Endpoints

### 🔑 Authentication (`/api/auth`)
| Method | Endpoint | Description | Protected |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user (`name`, `email`, `password`, `role`) | ❌ No |
| `POST` | `/api/auth/login` | Login and receive a JWT token | ❌ No |
| `GET` | `/api/auth/profile` | Get current user's authenticated profile | 🔒 Yes |

### 💼 Jobs (`/api/jobs`)
| Method | Endpoint | Description | Protected |
|---|---|---|---|
| `GET` | `/api/jobs` | Retrieve all posted jobs | ❌ No |
| `GET` | `/api/jobs/search` | Search jobs with query parameters (`keyword`, `location`, `skill`) | ❌ No |
| `POST` | `/api/jobs` | Post a new job (recruiter) | 🔒 Yes |
| `POST` | `/api/jobs/apply` | Apply for a job (`jobId`) (jobseeker only) | 🔒 Yes |

---

## 👨‍💻 Author

**Anurag Kumar**  
GitHub: [@the-anurag14](https://github.com/the-anurag14)
