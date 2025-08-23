# 🏗️ Next.js App Architecture - Improved Structure

## 📝 Overview

এই documentation এ improved Next.js app architecture এর বিস্তারিত ব্যাখ্যা আছে। Database query থেকে shুরু করে error handling পর্যন্ত সব কিছু proper service layer এবং best practices অনুযায়ী organize করা হয়েছে।

## 🏛️ Architecture Layers

### 1. **Presentation Layer** (Components & Pages)
- React components এবং Next.js pages
- User interaction এবং UI rendering
- Redux state management

### 2. **Business Logic Layer** (Server Actions)
- Form handling এবং server-side operations
- Validation এবং authentication
- Service layer এর সাথে communication

### 3. **Service Layer** (Services)
- Database operations এবং business logic
- Reusable functions এবং data processing
- Third-party integrations

### 4. **Data Access Layer** (Models & Database)
- MongoDB models এবং schemas
- Database connections এবং queries

## 📁 File Structure

```
📂 Project Root
├── 📂 app/                          # Next.js App Router
│   ├── 📂 api/                      # API Routes
│   │   ├── 📂 auth/
│   │   │   ├── login/route.js       # Login API endpoint
│   │   │   └── register/route.js    # Registration API endpoint
│   │   └── 📂 users/
│   │       └── route.js             # User management API
│   ├── layout.js                    # Root layout
│   └── page.js                      # Home page
├── 📂 actions/                      # Server Actions
│   └── authActions.js               # Authentication server actions
├── 📂 lib/                          # Core Libraries
│   ├── 📂 services/                 # Service Layer
│   │   ├── userService.js           # User operations service
│   │   └── eventService.js          # Event operations service
│   ├── 📂 validation/               # Input Validation
│   │   └── authValidation.js        # Authentication validation
│   ├── 📂 utils/                    # Utility Functions
│   │   └── errorHandler.js          # Error handling utilities
│   ├── 📂 middleware/               # Middleware Functions
│   │   └── security.js              # Security middleware
│   └── mongodb.js                   # Database connection
├── 📂 store/                        # Redux Store
│   ├── 📂 features/                 # Redux Slices
│   ├── 📂 thunks/                   # Async Actions
│   ├── store.js                     # Store configuration
│   ├── StoreProvider.jsx            # React-Redux Provider
│   └── index.js                     # Centralized exports
└── 📂 components/                   # React Components
    └── 📂 auth/                     # Authentication components
```

## 🔄 Data Flow

### 1. **User Interaction → Component**
```jsx
// LoginForm.jsx
const handleSubmit = async (formData) => {
  const result = await dispatch(loginUser(credentials));
};
```

### 2. **Component → Redux Thunk**
```javascript
// authThunks.js
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    const { performLogin } = await import('@/actions/authActions');
    return await performLogin(formData);
  }
);
```

### 3. **Redux → Server Action**
```javascript
// authActions.js
export async function performLogin(formData) {
  const user = await userService.authenticateUser(email, password);
  return user;
}
```

### 4. **Server Action → Service Layer**
```javascript
// userService.js
class UserService {
  async authenticateUser(email, password) {
    const user = await this.findUserByEmail(email);
    // Business logic here
    return user;
  }
}
```

### 5. **Service → Database**
```javascript
// userService.js (continued)
async findUserByEmail(email) {
  await dbConnect();
  const user = await User.findOne({ email }).lean();
  return user;
}
```

## 🛡️ Security Features

### 1. **Input Validation**
```javascript
// authValidation.js
export function validateLoginData(email, password) {
  const result = new ValidationResult();
  
  if (!EMAIL_REGEX.test(email)) {
    result.addError('email', 'সঠিক ইমেইল ঠিকানা দিন');
  }
  
  return result;
}
```

### 2. **Rate Limiting**
```javascript
// authValidation.js
export function checkRateLimit(identifier, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
  const attempts = rateLimitStore.get(key) || 0;
  
  if (attempts >= maxAttempts) {
    return { blocked: true, message: 'অনেক বেশি চেষ্টা...' };
  }
  
  return { blocked: false };
}
```

### 3. **Error Handling**
```javascript
// errorHandler.js
export function handleServerActionError(error, context = {}) {
  logError(error, context);
  
  const userFriendlyMessage = getUserFriendlyErrorMessage(error);
  return { success: false, error: userFriendlyMessage };
}
```

### 4. **Data Sanitization**
```javascript
// authValidation.js
export function sanitizeUserInput(input) {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
}
```

## 📊 Service Layer Benefits

### ✅ **Before (Direct DB in Actions)**
```javascript
// ❌ Old Pattern
export async function performLogin(formData) {
  await dbConnect();
  const user = await User.findOne({ email }).lean();
  const isValid = await bcrypt.compare(password, user.password);
  // Mixed concerns: validation, DB, business logic
}
```

### ✅ **After (Service Layer)**
```javascript
// ✅ New Pattern
export async function performLogin(formData) {
  const validation = validateLoginData(email, password);
  if (!validation.isValid) throw createAuthError(validation.getFirstError());
  
  const user = await userService.authenticateUser(email, password);
  return user;
}
```

## 🔧 API Routes vs Server Actions

### 🚀 **Server Actions** (Form Handling)
- Direct form submissions
- Better UX with progressive enhancement
- Automatic error boundaries

```javascript
// authActions.js
'use server'
export async function performLogin(formData) {
  // Handle form data directly
}
```

### 🌐 **API Routes** (External/AJAX Calls)
- Third-party integrations
- Mobile app APIs
- AJAX requests

```javascript
// /api/auth/login/route.js
export async function POST(request) {
  const body = await request.json();
  // Handle JSON data
}
```

## 📈 Performance Optimizations

### 1. **Connection Pooling**
```javascript
// mongodb.js
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
```

### 2. **Lean Queries**
```javascript
// userService.js
const user = await User.findOne({ email }).lean(); // Faster than full Mongoose docs
```

### 3. **Selective Field Return**
```javascript
// userService.js
const { password: _, ...userWithoutPassword } = user;
return userWithoutPassword; // Don't return sensitive data
```

## 🧪 Error Categories

### 1. **Validation Errors (400)**
```javascript
throw createValidationError('email', 'সঠিক ইমেইল দিন');
```

### 2. **Authentication Errors (401)**
```javascript
throw createAuthError('ইমেইল বা পাসওয়ার্ড ভুল');
```

### 3. **Rate Limit Errors (429)**
```javascript
throw createRateLimitError('অনেক বেশি চেষ্টা করা হয়েছে');
```

### 4. **Database Errors (500)**
```javascript
throw new DatabaseError('ডাটাবেস সমস্যা হয়েছে');
```

## 🔐 Security Best Practices

### 1. **Password Security**
- bcrypt hashing with salt rounds 12+
- No password in logs or responses
- Secure password policies

### 2. **Input Security**
- XSS protection via sanitization
- SQL injection prevention
- CSRF protection

### 3. **Request Security**
- Rate limiting per IP/user
- Request size limits
- Bot detection

### 4. **Response Security**
- Security headers
- CORS policies
- Error message sanitization

## 🚀 Future Enhancements

### 1. **JWT Authentication**
```javascript
// TODO: Implement JWT tokens
const token = await generateJWTToken(user);
return { user, token };
```

### 2. **Redis Caching**
```javascript
// TODO: Add Redis for rate limiting and sessions
const cachedUser = await redis.get(`user:${userId}`);
```

### 3. **Email Services**
```javascript
// TODO: Add email notifications
await sendWelcomeEmail(user.email, user.name);
```

### 4. **Monitoring & Analytics**
```javascript
// TODO: Add request monitoring
await sendToLoggingService(error, context);
```

## 💡 Development Tips

### 1. **Debugging**
- Use Redux DevTools for state tracking
- Check server action responses in Network tab
- Use console.log strategically in development

### 2. **Testing**
- Test validation functions individually
- Mock service layer for component tests
- Test error scenarios

### 3. **Performance**
- Use React.memo for heavy components
- Implement lazy loading
- Monitor bundle sizes

## 📝 Migration Guide

### From Old Pattern to New Pattern:

1. **Move DB queries to services**
2. **Add validation layer**
3. **Implement error handling**
4. **Update components for error handling**
5. **Add security middleware**

এই architecture এর সাহায্যে আপনার Next.js app আরো scalable, maintainable এবং secure হবে! 🎉
