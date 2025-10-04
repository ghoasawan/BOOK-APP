# 📚 BookShelf - Book Management App

A modern, full-stack book management application built with Next.js, featuring user authentication, book cataloging, and an intuitive interface.

## 🚀 Live Demo

**Deployment Link:** [Add your deployment URL here]
*Note: Please update this with your actual deployment URL (Vercel, Netlify, etc.)*

### Quick Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/Book-App)

**Deployment Guide:** See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## ✨ Features Implemented

### 🔐 Authentication System
- **User Registration**: Multi-step signup process with form validation
- **User Login**: Secure authentication with NextAuth.js
- **Session Management**: JWT-based session handling
- **Password Security**: Bcrypt hashing for password protection
- **Protected Routes**: Authentication-required pages and API endpoints

### 📖 Book Management
- **Book Catalog**: Browse books with pagination (9 books per page)
- **Add Books**: Create new book entries with cover photos
- **Book Details**: View comprehensive book information
- **Book Search**: Search functionality in the header
- **Book Deletion**: Remove books from the catalog
- **Rating System**: Star-based rating display for books

### 🎨 User Interface
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Material-UI components with custom styling
- **Animations**: Framer Motion animations and GSAP text effects
- **Loading States**: Redux-managed loading indicators
- **Interactive Elements**: Hover effects and smooth transitions

### 🗄️ Database & Backend
- **PostgreSQL Database**: Robust data storage with Prisma ORM
- **API Routes**: RESTful API endpoints for CRUD operations
- **Data Validation**: Server-side validation with Yup schemas
- **File Upload**: Image handling for book cover photos
- **Pagination**: Efficient data loading with pagination support

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI** - Component library
- **Framer Motion** - Animation library
- **GSAP** - Advanced animations
- **Redux Toolkit** - State management
- **Formik & Yup** - Form handling and validation

### Backend
- **NextAuth.js** - Authentication
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **Bcryptjs** - Password hashing
- **Axios** - HTTP client

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Prisma Studio** - Database management

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd Book-App/my-app
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/bookshelf_db"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Optional: For production
NEXTAUTH_URL="https://your-domain.com"
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npm run prisma:seed
```

### 5. Start Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## 🔧 Environment Variables Setup

### Step-by-Step .env.local Creation

1. **Create the file**: In your project root (`my-app/` directory), create a new file named `.env.local`

2. **Database Configuration**:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/bookshelf_db"
   ```
   - Replace `username` with your PostgreSQL username
   - Replace `password` with your PostgreSQL password
   - Replace `bookshelf_db` with your desired database name

3. **NextAuth Configuration**:
   ```env
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ```
   - For development, use `http://localhost:3000`
   - Generate a secure secret key (you can use `openssl rand -base64 32`)

4. **Production Configuration** (when deploying):
   ```env
   NEXTAUTH_URL="https://your-domain.com"
   NEXTAUTH_SECRET="your-production-secret"
   ```

### Database Setup Options

#### Option 1: Local PostgreSQL
1. Install PostgreSQL locally
2. Create a database named `bookshelf_db`
3. Update the `DATABASE_URL` accordingly

#### Option 2: Cloud Database (Recommended)
1. **Supabase** (Free tier available):
   - Create account at supabase.com
   - Create new project
   - Copy the connection string to `DATABASE_URL`

2. **Railway** (Free tier available):
   - Create account at railway.app
   - Create PostgreSQL service
   - Copy connection string to `DATABASE_URL`

## 🔐 Authentication Flow Details

### Registration Process
1. **Step 1**: User enters personal information (firstName, lastName, email, password)
2. **Step 2**: User uploads profile picture (optional)
3. **Validation**: Server-side validation with Yup schemas
4. **Password Hashing**: Bcrypt encryption before database storage
5. **User Creation**: New user record created in PostgreSQL

### Login Process
1. **Credentials**: User enters email and password
2. **Validation**: Client-side and server-side validation
3. **Authentication**: NextAuth.js credentials provider
4. **Password Verification**: Bcrypt comparison with stored hash
5. **Session Creation**: JWT token generation and session management
6. **Redirect**: Authenticated users redirected to home page

### Session Management
- **JWT Strategy**: Stateless authentication with JSON Web Tokens
- **Session Persistence**: Redux state management for user data
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Logout**: Session invalidation and cleanup

### Security Features
- **Password Hashing**: Bcrypt with salt rounds
- **Input Validation**: Comprehensive validation on client and server
- **CSRF Protection**: Built-in NextAuth.js security
- **Session Security**: Secure cookie handling

## 📱 Application Structure

```
src/
├── app/
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── books/          # Book CRUD operations
│   │   └── signup/         # User registration
│   ├── components/         # Reusable components
│   ├── books/              # Book pages
│   ├── login/              # Authentication pages
│   ├── signup/             # Registration pages
│   └── addBook/            # Book creation
├── lib/                    # Utility functions
├── redux/                  # State management
└── generated/              # Prisma generated files
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add environment variables in Netlify dashboard

### Manual Deployment
1. Build the application: `npm run build`
2. Start production server: `npm start`
3. Configure reverse proxy (nginx/Apache)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](link-to-issues) page
2. Create a new issue with detailed description
3. Contact the development team

## 🔄 Recent Updates

- ✅ User authentication system
- ✅ Book management CRUD operations
- ✅ Responsive design implementation
- ✅ Database integration with Prisma
- ✅ File upload functionality
- ✅ Pagination system
- ✅ Search functionality
- ✅ Rating system

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**