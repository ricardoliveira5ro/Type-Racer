# Server

The Type Racer backend is a real-time Node.js server built with Express and Socket.IO, designed to handle multiplayer typing races.

### 📁 Project Structure
```
📁 src/ 
├── 📂 config/      # .env files not committable
├── 📂 db/          # MongoDB connection setup
├── 📂 emails/      # Email templates
├── 📂 errors/      # Error class/object
├── 📂 middleware/  # Middleware handlers
├── 📂 models/      # MongoDB schemas
├── 📂 routes/      # API endpoints  
├── 📂 seed/        # Seed data (quotes)
├── 📂 utils/       # Helper functions
├── 📄 app.js       # Express setup  
└── 📄 index.js     # Server entry point 
```
<br>

### 🌐 API Endpoints

`/users`

- `/signup` `POST`:
    - Creates a new user account
    - Request body `{ username, email, password }`
- `/login` `POST`:
    - Authenticates a user
    - Request body `{ email, password }`
    - Generates a new authentication token
    - Splits the token into **two secure cookies** sent to the client (signature cookie is `HTTP-only`)
- `/token` `GET`:
    - Verifies token authenticity (used for protected routes).
    - `jwtMiddleware` reconstructs the two cookies into the auth token and sets it as authorization request header
    - `authMiddleware` decodes and verifies the token to identify the user
    - If the token is invalid the cookies are cleared
- `/logout` `POST`: 
    - Clear cookies and logout client
    - Uses `jwtMiddleware` and `authMiddleware`
    - Invalidates the session token
- `/profile` `GET`: 
    - Retrieves user profile information
    - Uses `jwtMiddleware` and `authMiddleware`
- `/password` `PUT`: 
    - Updates user password 
    - Request body `{ oldPassword, newPassword }`
    - Authenticates the user with oldPassword
    - Mongoose model (`/models/user.js`) hashes the new password before saving
    - Uses `jwtMiddleware` and `authMiddleware`
- `/recovery` `POST`:
    - Initiates password recovery
    - Request body `{ email }`
    - If the user exists (email) then creates `password_reset_token` and `password_reset_expiration` (1 hour validity), and sends a reset link via Resend email service
    - Link format `protocol/domain/reset-password?user=<username>&reset_token=<token>` 
- `/reset-token` `GET`: 
    - Verify reset token.
    - Request body `{ user, reset_token }`
    - `resetMiddleware` decode reset-token from db to verify its authenticity
- `/reset` `POST`: 
    - Resets (updates) the password
    - Request body `{ password }`
    - `resetMiddleware` decode reset-token from db to verify its authenticity
- `/players` `GET`: 
    - Returns the number of online players
    - Counts number of socket clients connected (multiple browser tabs count as separate players)

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

### 🚀 Deployment

- **Static Files**: Serves the React frontend build
- **Routing**: Backend `/api` namespace. Frontend shares the same domain.
- **Database**: Hosted on MongoDB Atlas.
- **Hosting**: Deployed on Render