# STIWK2124-A1-Group5
# Accessible Reading List (ARL) — Backend

## Course Information

Course: STIWK2124 Web Engineering  
Semester: A252 – Feb 2025/2026  
Assignment: Assignment 1 — CLO2: Build Backend  
Lecturer: Dr Munya Saleh Saeed Ba Matraf

---

## Project Overview

This project is the backend for the **Accessible Reading List (ARL)** web application.
It provides REST API services to manage books including create, read, update, delete, search, and pagination.

---

## Technologies Used

* Java (Spring Boot)
* Spring Data JPA
* MySQL
* Maven
* Git & GitHub

---

## Database Setup

1. Open MySQL
2. Create database:

```sql
CREATE DATABASE arl_db;
```

3. Create book table (basic example):

```sql
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    description TEXT
);
```

4. Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/arl_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

---

## How to Run the Project

1. Clone the repository:

```bash
git clone https://github.com/NurJuwana/STIWK2124-A1-Group5.git
```

2. Open in VS Code / IntelliJ

3. Run the Spring Boot application

4. Server will start at:

```
http://localhost:8080
```

---

## API Endpoints

### Get All Books (Pagination)

```
GET /api/books?page=0&size=5
```

### Search Books

```
GET /api/books?q=keyword
```

### Add Book

```
POST /api/books
```

### Update Book

```
PUT /api/books/{id}
```

### Delete Book

```
DELETE /api/books/{id}
```

---

## Demo Video

📎 https://youtu.be/HykeuqUZ2gU?si=waKp2Lk_RHqu4lVI

---

## Features Implemented

* CRUD operations
* Pagination
* Search functionality
* Input validation
* RESTful API design

---

## Repository

GitHub Link:
https://github.com/NurJuwana/STIWK2124-A1-Group5

---

## Notes

* Make sure MySQL is running before starting the project
* Adjust database credentials if needed

---
