# TiffinMate Authentication System Guide

## Overview

TiffinMate now has a complete authentication system for both **Users (Tiffin Subscribers)** and **Vendors (Tiffin Service Providers)**.

## Key Features Implemented

### 1. Login System

- **Dual-tab login page** at `/login`
  - User login (email only - auto-creates account)
  - Vendor login (email + phone verification)
- Session stored in `localStorage` for client-side authentication
- Automatic redirect to appropriate dashboard after login

### 2. User Dashboard (`/dashboard`)

- View all active subscriptions
- See delivery statistics (total deliveries, upcoming, completed)
- Track monthly spending
- Pause/resume subscriptions
- Quick navigation to tracking page

### 3. Vendor Dashboard (`/vendor-dashboard`)

- View vendor business statistics
- See all active subscriptions to your service
- View customer reviews
- Monitor revenue and customer metrics
- Manage subscription status

### 4. Tracking Page Integration

- Now requires login to view subscriptions
- Fetches subscriptions for the logged-in user only
- Shows helpful messages if no subscriptions exist
- Redirects to login if not authenticated

### 5. Subscription Flow Update

- Vendor profile page now requires login to subscribe
- Removed redundant user information form
- Uses logged-in user data automatically
- Validates authentication before processing subscription

### 6. Smart Navigation

- All pages now have authentication-aware navigation
- **When logged out:** Shows "Login" button
- **When logged in as User:** Shows Dashboard, Track, Logout
- **When logged in as Vendor:** Shows Vendor Dashboard, Logout
- Consistent across all pages (home, search, vendor, tracking, register-vendor)

## How to Use

### As a Tiffin Subscriber (User):

1. **Browse tiffin services** without login at `/search`
2. **Click on a vendor** to view their profile
3. **Click "Subscribe"** → Redirected to `/login` if not logged in
4. **Login with email** (account created automatically if new)
5. **Complete subscription** with just start date
6. **Track deliveries** at `/tracking` or `/dashboard`
7. **Manage subscriptions** - pause, resume, or cancel from dashboard

### As a Tiffin Vendor:

1. **Register your service** at `/register-vendor`
2. **Login at** `/login` → Switch to "Vendor Login" tab
3. **Enter email and phone** (must match registration)
4. **Access vendor dashboard** to see:
   - Total active subscriptions
   - Customer reviews
   - Revenue metrics
   - Customer details

## Session Management

### Session Structure (localStorage)

```javascript
{
  userId: 1,           // User or Vendor ID
  name: "John Doe",    // User or Vendor name
  type: "user",        // "user" or "vendor"
  loginTime: "2025-10-15T10:30:00.000Z"
}
```

### Logout

- Click "Logout" in navigation (appears when logged in)
- Clears session from localStorage
- Redirects to homepage

## API Endpoints Added

### User Authentication

- `GET /api/users/search?email=xxx` - Find user by email
- `GET /api/users/search?phone=xxx` - Find user by phone
- `POST /api/users` - Create new user (auto-signup)

### Vendor Authentication

- `GET /api/vendors/login?email=xxx&phone=xxx` - Vendor login verification
- `GET /api/vendors/:id` - Get vendor details

### Subscriptions

- `GET /api/subscriptions/user/:userId` - Get user's subscriptions
- `GET /api/subscriptions/vendor/:vendorId` - Get vendor's subscriptions
- `POST /api/subscriptions` - Create new subscription

## Testing the System

### Test User Journey:

1. Visit http://localhost:3000
2. Click "Search Tiffin"
3. Click on any vendor card
4. Click a subscription plan (Daily/Weekly/Monthly)
5. You'll be redirected to login
6. Enter email: `test@example.com`
7. Auto-logged in and redirected back to subscribe
8. Complete subscription
9. View in Dashboard or Tracking page

### Test Vendor Journey:

1. Visit http://localhost:3000/register-vendor
2. Fill vendor details (remember email and phone!)
3. Submit registration
4. Go to http://localhost:3000/login
5. Switch to "Vendor Login" tab
6. Enter registered email and phone
7. Access Vendor Dashboard
8. View your subscriptions and metrics

## Sample Accounts (Already in Database)

### Sample Users:

- Email: `john@example.com`, Phone: `9876543210`
- Email: `priya@example.com`, Phone: `9876543211`
- Email: `amit@example.com`, Phone: `9876543212`

### Sample Vendors (Use these for testing):

- **Ghar Jaisa Khana**: email: `contact@gharjaisa.com`, phone: `9876543210`
- **Maa ke Hath ka Khana**: email: `maa@khana.com`, phone: `9876543211`
- **Fresh Tiffin Service**: email: `fresh@tiffin.com`, phone: `9876543212`

## Security Notes

⚠️ **Current Implementation (Development Mode):**

- Uses localStorage for session management
- No password authentication
- No server-side session validation
- Suitable for development and testing

🔒 **For Production, you should add:**

- Password-based authentication
- JWT tokens or server-side sessions
- Secure HTTP-only cookies
- Input validation and sanitization
- Rate limiting
- HTTPS enforcement
- Password hashing (bcrypt)

## Files Modified

### New Files:

1. `public/login.html` - Dual-tab login page
2. `public/dashboard.html` - User dashboard
3. `public/vendor-dashboard.html` - Vendor dashboard

### Updated Files:

1. `server.js` - Added authentication endpoints and routes
2. `public/index.html` - Updated navigation
3. `public/search.html` - Updated navigation
4. `public/vendor.html` - Updated navigation + subscription flow
5. `public/tracking.html` - Updated navigation + session-based loading
6. `public/register-vendor.html` - Updated navigation

## Next Steps for Enhancement

1. **Add passwords** - Implement password-based authentication
2. **Email verification** - Send verification emails on signup
3. **Forgot password** - Password reset functionality
4. **Profile management** - Edit user/vendor profiles
5. **Notifications** - Email/SMS for deliveries, subscriptions
6. **Payment integration** - Razorpay/Stripe for online payments
7. **Admin panel** - For platform management

---

✅ **Your TiffinMate platform is now fully functional with authentication!**

Users can login, subscribe to tiffin services, track deliveries, and manage their subscriptions. Vendors can login, view their customers, and manage their business through the dashboard.
