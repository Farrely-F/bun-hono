# Bun Hono REST API Mini Project - Simple Social Media

This is a simple social media application built using the Bun Hono framework, a high-performance runtime for JavaScript and TypeScript. The application features JWT authentication, users, comments, and posts.

## Features

1. **User Authentication**:

   - Users can register, login, and logout using JWT authentication.
   - Passwords are securely hashed and salted before storage.

2. **User Management**:

   - Users can view and update their profile information.
   - Users can follow and unfollow other users.

3. **Post Management**:

   - Users can create, read, update, and delete their own posts.
   - Users can view posts made by users they follow.

4. **Comment Management**:
   - Users can comment on posts.
   - Users can view comments on posts.

## API Endpoints

### Authentication

- `POST /api/v1/register`: Register a new user.
- `POST /api/v1/login`: Login a user and receive a JWT token.
- `POST /api/v1/logout`: Logout a user and invalidate the JWT token.

### User Management

- `GET /api/v1/users`: Retrieve a list of users.
- `GET /api/v1/users/:userId`: Retrieve a user's profile.
- `PUT /api/v1/users/:userId`: Update a user's profile.
- `POST /api/v1/users/:userId/follow`: Follow a user.
- `DELETE /api/v1/users/:userId/follow`: Unfollow a user.

### Post Management

- `GET /api/v1/posts`: Retrieve a list of posts.
- `POST /api/v1/posts`: Create a new post.
- `GET /api/v1/posts/:postId`: Retrieve a specific post.
- `PUT /api/v1/posts/:postId`: Update a post.
- `DELETE /api/v1/posts/:postId`: Delete a post.

### Comment Management

- `GET /api/v1/posts/:postId/comments`: Retrieve comments for a post.
- `POST /api/v1/posts/:postId/comments`: Create a new comment on a post.
- `PUT /api/v1/comments/:commentId`: Update a comment.
- `DELETE /api/v1/comments/:commentId`: Delete a comment.

## Technologies Used

- **Backend**:
  - [Bun Hono](https://bun.sh/docs/hono): A high-performance runtime for JavaScript and TypeScript.
  - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): For JWT authentication.
  - [bcrypt](https://www.npmjs.com/package/bcrypt): For password hashing and salting.
- **Database**:
  - [PostgreSQL](https://www.postgresql.org): For the database.

## Getting Started

1. Install dependencies:

   ```bash
   bun install
   ```

2. Start the server:
   ```bash
   bun run dev
   ```
