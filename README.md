# Book Reservation System
This project is an Express-based server that manages a book reservation system. It includes two sets of routes: one for customers and one for administrators. The server uses the zod package for request validation and @flatten-js/interval-tree to manage book reservations efficiently. Additionally, the server uses a mutex to ensure thread safety when both admins and customers are accessing the inventory concurrently.

## Features
### Customer Routes:
Allows customers to search for books and make reservations.
### Admin Routes:
Allows admins to add new books, remove existing books, and update book prices.
### Validation: 
Uses zod to ensure request payloads are correct and to provide clear error messages.
### Efficient Reservation Management: 
Uses an interval tree to manage and check book reservations.
### Concurrency Handling: 
Uses a mutex to prevent race conditions when the inventory is accessed by multiple users simultaneously.

## Installation
1. Clone the repository
2. Install the dependencies:
```
npm install 
```
3. Start the server:
```
npm start
```

## Routes

### Admin Routes: 
Add a Book: POST /api/admin
Remove a Book: DELETE /api/admin
Update Book Price: PATCH /api/admin

### Customer Routes
Get Books: GET /api/
Reserve a Book: PUT /api/
