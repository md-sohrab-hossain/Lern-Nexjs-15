# Redux Store Structure

এই folder এ Redux এর সব file organized ভাবে আছে। সহজ এবং বোঝার মতো করে সাজানো।

## 📁 File Structure

```
store/
├── 📄 index.js              # Main export file - সব import এখান থেকে করুন
├── 📄 store.js              # Store configuration
├── 📄 StoreProvider.jsx     # React Provider component
├── 📁 features/             # Feature-based slices
│   └── authSlice.js         # Authentication slice
├── 📁 thunks/              # Async actions
│   └── authThunks.js        # Authentication async actions
└── 📄 README.md            # This file
```

## 🚀 কিভাবে ব্যবহার করবেন

### Component এ Redux ব্যবহার করার জন্য:

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, clearError } from '@/store';

const MyComponent = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.auth);
  
  // Login function
  const handleLogin = (credentials) => {
    dispatch(loginUser(credentials));
  };
  
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {user && <p>Welcome, {user.name}!</p>}
    </div>
  );
};
```

### নতুন Feature যোগ করার জন্য:

1. **Slice তৈরি করুন**: `features/yourFeatureSlice.js`
2. **Thunks তৈরি করুন** (যদি API call লাগে): `thunks/yourFeatureThunks.js`
3. **Store এ add করুন**: `store.js` এ reducer add করুন
4. **Export করুন**: `index.js` এ export add করুন

## 💡 সুবিধাসমূহ

- ✅ **সব imports এক জায়গা থেকে** - `@/store` থেকে সব কিছু import করুন
- ✅ **Organized structure** - features আলাদা, thunks আলাদা
- ✅ **Bengali comments** - সহজ ভাষায় ব্যাখ্যা
- ✅ **TypeScript ready** - ভবিষ্যতে TypeScript যোগ করা যাবে
- ✅ **Scalable** - নতুন features সহজেই যোগ করা যাবে

## 📱 Available Actions

### Authentication:
- `loginUser(credentials)` - User login করার জন্য
- `registerUser(userData)` - User registration করার জন্য  
- `logoutUser()` - User logout করার জন্য
- `clearError()` - Error message clear করার জন্য
- `clearAuth()` - Auth state clear করার জন্য

## 🔧 Development Tips

- Redux DevTools browser extension ব্যবহার করুন
- State changes track করার জন্য console.log ব্যবহার করুন
- Async actions এর জন্য error handling সবসময় রাখুন
