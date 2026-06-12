# URL-Shortner 

A RESTful backend service for creating and managing shortened URLs, built using Node.js and Express.

This project was developed as a backend assignment to demonstrate API design, routing, persistence, validation, business workflow implementation, error handling, and basic backend development practices.

---

# Features

* Create shortened URLs
* Redirect users to original URLs
* Track click counts for each shortened URL
* Retrieve all stored URLs
* Retrieve details of a specific URL
* Delete shortened URLs
* URL validation
* Rate limiting for URL creation
* File-based persistence using JSON storage
<<<<<<< HEAD
=======
* URL expiration support


---

# Tech Stack

* Node.js
* Express.js
* express-rate-limit
* File System (JSON persistence)
* Git & GitHub

---

# Project Structure

```text
.
├── data
│   └── urls.json
│
├── src
│   ├── controllers
│   │   └── urlController.js
│   │
│   ├── routes
│   │   └── urlRoutes.js
│   │
│   ├── services
│   │   ├── fileService.js
│   │   └── shortCodeService.js
│   │
│   └── app.js
│
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/AyushMit-13/URL-Shortner.git
cd URL-Shortner
```

---

## Install Dependencies

```bash
npm install
```

---

# Running the Application

Start the server:

```bash
npm start
```

Server runs at:

```text
http://localhost:3000
```

---

# Persistence

The application uses file-based persistence.

All URL records are stored in:

```text
data/urls.json
```

Data remains available even after restarting the server.

Example:

```json
[
  {
    "shortCode": "QYxe8a",
    "originalUrl": "https://github.com",
    "clicks": 2,
    "createdAt": "2026-06-09T20:18:59.209Z"
  }
]
```

---

# API Endpoints

## Health Check

### GET /

Response

```json
{
  "message": "URL Shortener API is running"
}
```

---

## Create Short URL

<<<<<<< HEAD
### POST /shorten
=======
### POST /shorten 
{
  "url": "https://github.com",
  "expiryDays": 30
}
>>>>>>> a99026d (Add URL expiration support)

Request

```json
{
  "url": "https://github.com"
}
```

Response

```json
{
  "shortCode": "QYxe8a",
  "shortUrl": "http://localhost:3000/QYxe8a"
}
```

---

## Get All URLs

### GET /urls

Response

```json
[
  {
    "shortCode": "QYxe8a",
    "originalUrl": "https://github.com",
    "clicks": 0,
    "createdAt": "2026-06-09T20:18:59.209Z"
  }
]
```

---

## Get URL Details

### GET /url/:shortCode

Example

```http
GET /url/QYxe8a
```

Response

```json
{
  "shortCode": "QYxe8a",
  "originalUrl": "https://github.com",
  "clicks": 0,
  "createdAt": "2026-06-09T20:18:59.209Z"
}
```

---

## Redirect to Original URL

### GET /:shortCode

Example

```http
GET /QYxe8a
```

Behavior

```text
Redirects user to the original URL
```

Example:

```text
http://localhost:3000/QYxe8a
        ↓
https://github.com
```

Click count is automatically incremented during each redirect.

---

## Delete URL

### DELETE /url/:shortCode

Example

```http
DELETE /url/QYxe8a
```

Response

```json
{
  "message": "Deleted successfully"
}
```

---

# Core Workflow: URL Redirection & Click Tracking

The primary business workflow implemented in this project is URL redirection with analytics tracking.

Workflow:

```text
Create URL
    ↓
Generate Short Code
    ↓
Store URL in urls.json
    ↓
User Visits Short URL
    ↓
Increment Click Counter
    ↓
Redirect to Original URL
```

Example:

```text
POST /shorten
      ↓
Creates QYxe8a

GET /QYxe8a
      ↓
Clicks: 0 → 1
      ↓
Redirect to GitHub
```

This workflow goes beyond simple CRUD operations and demonstrates custom backend business logic.

---

# Validation

The API validates URLs before shortening them.

### Invalid Request

Request

```json
{
  "url": "abcd"
}
```

Response

```json
{
  "message": "Invalid URL"
}
```

Only properly formatted URLs are accepted.

---

# Rate Limiting

To prevent abuse, URL creation is rate limited.

Configuration:

```text
Maximum 5 URL creation requests per hour per IP
```

If the limit is exceeded:

```json
{
  "message": "Maximum 5 URLs allowed per hour"
}
```

This serves as the project's core workflow beyond standard CRUD functionality.

---

# Error Handling

Example:

```json
{
  "message": "Short URL not found"
}
```

Common error scenarios:

* Invalid URL
* Unknown shortcode
* Rate limit exceeded

All errors are returned as JSON responses.

---

# Assumptions

* No authentication is required.
* URLs are publicly accessible.
* Data persistence through JSON files is sufficient for assignment requirements.
* Short codes are generated automatically.
* Rate limiting is applied only to URL creation.
* Click counts are updated during redirection.

---

# Future Improvements

* Database integration (MongoDB/PostgreSQL)
* Custom short codes
* User authentication
* URL expiration support
* Analytics dashboard
* QR code generation
* Docker containerization
* Automated testing using Jest and Supertest
* Swagger/OpenAPI documentation

---

# Author

**Ayush Mittal**

Backend Assignment – URL Shortener Backend API


<<<<<<< HEAD

=======
>>>>>>> a99026d (Add URL expiration support)
