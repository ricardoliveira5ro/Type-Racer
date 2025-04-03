# Server

The Type Racer backend is a real-time Node.js server built with Express and Socket.IO, designed to handle multiplayer typing races.

### 🔌 Tech Stack and Packages

- Node.js
- Socket IO
- express
- mongodb
- mongoose
- bcrypt
- jsonwebtoken
- validator
- resend
- jsonfile

### 🌐 API Endpoints

`/users`

- `/signup` **POST**: Create a new user account. <ins>Request body</ins> (*username*, *email*, *password*)
- `/login` **POST**: Authenticate a user. <ins>Request body</ins> (*email*, *password*)
    - Generates a new authentication token
    - Splits this token into 2 secure cookies and send to client. The signature cookie is http only
- `/token` **GET**: Verify token authenticity (Protected routes)
    - *jwtMiddleware* reconstructs the 2 cookies into the authentication token and set it as authorization request header
    - *authMiddleware* verify and decode the token in order to find the user
    - If the token is invalid the cookies are cleared
- `/logout` **POST**: Clear cookies and logout client
    - Uses *jwtMiddleware* and *authMiddleware*
    - Invalidates session authentication token
- `/profile` **GET**: Retrieve user profile information
    - Uses *jwtMiddleware* and *authMiddleware*
- `/password` **PUT**: Update user password. <ins>Request body</ins> (*oldPassword*, *newPassword*)
    - Authenticates with old password to verify user
    - Mongoose model encodes new password before saving `(/models/user.js)`
    - Uses *jwtMiddleware* and *authMiddleware*
- `/recovery` **POST**: Request password recovery <ins>Request body</ins> (*email*)
    - If the user exists (email) then creates *password_reset_token* and *password_reset_expiration* (1 hour), and send to user's email the reset password link using Resend service
    - The link is composed by protocol/domain/reset-password?user=(user.username)&reset_token=(token) 
- `/reset-token` **GET**: Verify reset token. <ins>Request query</ins> (*user*, *reset_token*)
    - *resetMiddleware* decode reset-token from db to verify its authenticity