# 🚀 Quick Start Guide - TiffinMate

## Installation & Setup (5 minutes)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start the Server

```bash
npm start
```

### Step 3: Open Your Browser

Navigate to: **http://localhost:3000**

That's it! The database will be automatically created with sample data.

---

## 🎮 Test the Application

### Test User Journey:

1. **Homepage** (`http://localhost:3000`)

   - View features and benefits
   - Click "Search Tiffin Services"

2. **Search & Browse** (`http://localhost:3000/search`)

   - Enter "Pune" in the search
   - Apply filters (Veg, price range)
   - View 6 pre-loaded vendors
   - Click on any vendor card

3. **View Vendor Profile** (`http://localhost:3000/vendor?id=1`)

   - See full vendor details
   - Compare pricing plans
   - Read reviews
   - Click "Subscribe Monthly"

4. **Subscribe to a Plan**

   - Fill in the subscription form
   - Name: "Test User"
   - Email: "test@example.com"
   - Phone: "9876543210"
   - Address: "Test Address"
   - City: "Pune"
   - Submit the form

5. **Track Deliveries** (`http://localhost:3000/tracking`)
   - Select your subscription
   - View calendar with delivery status
   - See monthly statistics
   - Test pause/resume features

### Test Vendor Registration:

1. **Register as Vendor** (`http://localhost:3000/register-vendor`)
   - Fill in business details
   - Set pricing (daily, weekly, monthly)
   - Submit registration
   - Get vendor ID confirmation

---

## 📊 Sample Data Included

### Pre-loaded Vendors (6):

1. **Ghar Jaisa Khana** (Veg) - ₹2,800/month
2. **Maa Ke Haath Ka Swaad** (Jain) - ₹3,200/month
3. **Protein Plus Tiffin** (Mixed) - ₹3,600/month
4. **Hyderabadi Zaika** (Non-Veg) - ₹3,400/month
5. **Simple & Healthy Tiffin** (Veg) - ₹2,600/month
6. **South Indian Delights** (Veg) - ₹3,000/month

### Sample Users (3):

- Rahul Sharma (User ID: 1)
- Priya Patel (User ID: 2)
- Amit Kumar (User ID: 3)

---

## 🔧 Development Mode

For automatic server restart on file changes:

```bash
npm run dev
```

---

## 🗄️ Database Management

### View Database:

The SQLite database is located at: `database/tiffinmate.db`

You can use tools like:

- [DB Browser for SQLite](https://sqlitebrowser.org/) (GUI)
- SQLite CLI
- VS Code SQLite extensions

### Reset Database:

Delete the database file and restart the server:

```bash
rm database/tiffinmate.db
npm start
```

---

## 🌐 API Testing

### Test APIs with curl or Postman:

**Get All Vendors:**

```bash
curl http://localhost:3000/api/vendors
```

**Get Vendors in Pune:**

```bash
curl "http://localhost:3000/api/vendors?city=Pune"
```

**Get Veg Vendors:**

```bash
curl "http://localhost:3000/api/vendors?food_type=Veg"
```

**Get User Subscriptions:**

```bash
curl http://localhost:3000/api/subscriptions/user/1
```

**Get Vendor Reviews:**

```bash
curl http://localhost:3000/api/reviews/vendor/1
```

---

## 📱 Key Pages & Routes

| Page            | URL                | Description                |
| --------------- | ------------------ | -------------------------- |
| Homepage        | `/`                | Landing page with features |
| Search          | `/search`          | Find tiffin services       |
| Vendor Profile  | `/vendor?id=X`     | Vendor details & subscribe |
| Tracking        | `/tracking`        | Delivery calendar          |
| Register Vendor | `/register-vendor` | Vendor registration form   |

---

## 🎨 Customization

### Change Theme Color:

Edit `public/css/style.css` - Line 9:

```css
--primary-green: #4c8022; /* Change to your color */
```

### Modify Port:

Edit `server.js` or set environment variable:

```bash
PORT=8080 npm start
```

---

## 🐛 Troubleshooting

### Port Already in Use:

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=8080 npm start
```

### Database Errors:

- Delete `database/tiffinmate.db` and restart
- Check file permissions on `database/` folder

### Module Not Found:

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Next Steps

1. ✅ Test all features
2. 🎨 Customize colors and branding
3. 📝 Add more sample data
4. 🔐 Implement user authentication
5. 💳 Integrate payment gateway
6. 🚀 Deploy to production

---

## 🌟 Ready for Production?

### Deployment Checklist:

- [ ] Add environment variables for production
- [ ] Set up proper database (PostgreSQL/MySQL)
- [ ] Add user authentication
- [ ] Implement payment processing
- [ ] Set up SSL/HTTPS
- [ ] Add error logging
- [ ] Create admin dashboard
- [ ] Set up email notifications

### Recommended Platforms:

- **Render** (recommended for Node.js)
- **Heroku**
- **Railway**
- **DigitalOcean**
- **AWS/Azure/GCP**

---

**Happy Testing! 🎉🍱**

For issues or questions, check the main README.md file.
