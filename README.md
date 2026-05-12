# Sample Node.js + Express + MySQL API

A simple REST API built with Node.js, Express, TypeScript, and MySQL.  
This project demonstrates a clean backend structure with database connection pooling, environment configuration, and basic API setup.

---

## 🚀 Features

- Express.js REST API
- MySQL database integration
- TypeScript support
- Environment variables with dotenv
- Connection pooling
- Modular folder structure
- Error handling middleware
- CORS enabled
- Development with hot reload

---

## 📦 Tech Stack

- Node.js
- Express.js
- TypeScript
- MySQL
- mysql2
- dotenv
- tsx

---

## 📁 Project Structure

```bash
src/
│
├── config/
│
├── constants/
│
├── controllers/
│
├── interfaces/
│
├── repositories/
│
├── routes/
│
├── services/
│
├── utils/
│
└── server.ts
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/HtetO2Ko/node.js-with-mysql.git
```

Move into the project folder:

```bash
cd node.js-with-mysql
```

Install dependencies:

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5050
ACCESS_TOKEN_SECRET=your_access_token
REFRESH_TOKEN_SECRET=your_refresh_token
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=30d

DB_HOST=localhost
DB_USER='root'
DB_PASSWORD='your_password'
DB_NAME='sample_node_db'
DB_PORT=3306
DB_SSL=false
```

---

## 🗄️ MySQL Database Setup

Create database manually:

```sql
CREATE DATABASE sample_node_db;
```

---

## ▶️ Run Development Server

```bash
npm run dev
```

Server will run on:

```bash
http://localhost:5050
```
---

## 📡 Sample API

### Health Check

```http
GET /
```

Response:

```json
{
    "returncode": "300",
    "message": "API is working...",
    "data": null
}
```
