````md
# Accessible Reading List (ARL) — Frontend Integration

## Course Information

**Course:** STIWK2124 Web Engineering  
**Semester:** A252 – Feb 2025/2026  
**Assignment:** Assignment 2 — CLO2: Build the Frontend & Integrate Securely  
**Lecturer:** Dr. Munya Saleh Saeed Ba Matraf  

---

# Project Overview

Accessible Reading List (ARL) is a web application developed using Angular and Spring Boot.  
This project focuses on integrating the Angular frontend with the backend REST API developed in Assignment 1.

The system allows users to:

- View book list
- Search books
- Add books
- Edit books
- Delete books
- Validate forms
- Connect securely using Basic Authentication

---

# Technologies Used

## Frontend
- Angular
- TypeScript
- HTML
- CSS
- Bootstrap
- Angular HttpClient

## Backend
- Spring Boot
- Spring Data JPA
- MySQL

## Tools
- Visual Studio Code
- GitHub
- Postman

---

# Backend Setup

## 1. Clone Backend Repository

```bash
git clone <backend-repository-link>
```

---

## 2. Create Database in MySQL

```sql
CREATE DATABASE arl_db;
```

---

## 3. Configure application.properties

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/arl_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

---

## 4. Run Backend Server

```bash
mvn spring-boot:run
```

Backend runs at:

```bash
http://localhost:8080
```

---

# Frontend Setup

## 1. Clone Frontend Repository

```bash
git clone <frontend-repository-link>
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Run Angular Application

```bash
ng serve
```

Frontend runs at:

```bash
http://localhost:4200
```

---

# API Integration

The Angular frontend communicates with the Spring Boot backend using Angular HttpClient.

Example API endpoint:

```typescript
http://localhost:8080/api/books
```

Implemented API operations:

- GET → Retrieve books
- POST → Add books
- PUT → Update books
- DELETE → Remove books

---

# Authentication & Security

Basic Authentication is implemented for protected operations:

- POST
- PUT
- DELETE

Public access is allowed for:

- GET requests

CORS configuration is enabled to allow Angular frontend access from:

```bash
http://localhost:4200
```

---

# Features Implemented

- Book listing
- Search functionality
- Add book feature
- Edit book feature
- Delete book feature
- Form validation
- API error handling
- Basic Authentication
- Frontend & backend integration

---

# Screenshots

## Book List
(Add screenshot here)

---

## Search Function
(Add screenshot here)

---

## Form Validation
(Add screenshot here)

---

# Demo Video

Demo video link:

```bash
(Add Google Drive / YouTube link here)
```

---

# Group Members

| Name | Matric Number |
|------|------|
| NUR FARISYA BINTI AHMAD SHUKRI | 303383 |
| NUR JUWANA BINTI MOHD YUNUS | 307864 |
| SITI NUR IRDINA BINTI AHMAD SUKARDI | 307504 |
| ALIYYAH SAFIAH BINTI HAZLY | 305604 |
| NUR SYATHIRAH BINTI MOHD FAIZATUL IZHAM | 305766 |

---

# How to Run the Project

1. Start MySQL server
2. Run Spring Boot backend
3. Run Angular frontend
4. Open browser:

```bash
http://localhost:4200
```

5. Test:
- View books
- Search books
- Add/edit/delete books

---

# License

This project is developed for educational purposes under STIWK2124 Web Engineering.
````
