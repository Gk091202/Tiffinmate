# 🍱 TiffinMate - Homely Meals, Daily Delivered

TiffinMate is a complete web platform connecting students, working professionals, and PG residents with local mess and tiffin service providers. Users can search, compare, subscribe to meal plans, and track their daily deliveries through an intuitive calendar system.

## 🌟 Features

### For Users

- 🔍 **Smart Search & Filters** - Find tiffin services by location, food type, price range, and delivery radius
- 💰 **Flexible Plans** - Choose from daily, weekly, or monthly subscription plans
- 📅 **Visual Tracking** - Interactive calendar showing delivery status (delivered ✅, missed ❌, pending ⏳)
- ⭐ **Reviews & Ratings** - Read authentic reviews from other users
- ⏸️ **Subscription Management** - Pause, resume, or cancel subscriptions anytime

### For Vendors

- 📝 **Easy Registration** - Simple form to list your tiffin service
- 📊 **Business Dashboard** - Manage subscriptions and deliveries
- 🎯 **Reach More Customers** - Get discovered by students and professionals near you

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js with Express.js
- **Database**: SQLite3
- **Design**: Responsive, mobile-first design with custom CSS

## 📁 Project Structure

```
Tiffinmate/
├── database/
│   ├── schema.sql          # Database schema and sample data
│   └── tiffinmate.db       # SQLite database (auto-generated)
├── public/
│   ├── css/
│   │   └── style.css       # Global styles
│   ├── index.html          # Homepage
│   ├── search.html         # Search & filter page
│   ├── vendor.html         # Vendor profile page
│   ├── tracking.html       # Delivery tracking calendar
│   └── register-vendor.html # Vendor registration
├── server.js               # Express server & API endpoints
├── package.json            # Project dependencies
└── README.md              # Documentation
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

### Installation

1. **Clone or navigate to the project directory**

   ```bash
   cd Tiffinmate
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the server**

   ```bash
   npm start
   ```

   For development with auto-reload:

   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

The database will be automatically created and populated with sample data on first run.

## 📊 Database Schema

The application uses SQLite with the following tables:

- **users** - User accounts and contact information
- **vendors** - Tiffin service providers and their details
- **subscriptions** - User subscriptions to vendors
- **deliveries** - Daily delivery tracking records
- **reviews** - User reviews and ratings for vendors

## 🎨 Design Theme

- **Primary Color**: Green (#4c8022) - representing freshness and health
- **Design Style**: Clean, minimal, modern
- **Responsive**: Mobile-first approach, works on all devices

## 📱 Pages Overview

### 1. Homepage (`/`)

- Hero section with main CTAs
- Feature highlights
- How it works section
- Statistics and testimonials

### 2. Search Page (`/search`)

- Location-based search
- Advanced filters (food type, price, delivery radius)
- Sort by rating, price, or distance
- Vendor cards with quick info

### 3. Vendor Profile (`/vendor?id=X`)

- Detailed vendor information
- Photo gallery
- Subscription plans comparison
- Customer reviews
- Subscribe button with form modal

### 4. Tracking Page (`/tracking`)

- Subscription selector
- Interactive monthly calendar
- Delivery status visualization
- Monthly statistics
- Pause/resume/cancel options

### 5. Vendor Registration (`/register-vendor`)

- Multi-section registration form
- Business details
- Pricing setup
- Location and delivery settings

## 🔌 API Endpoints

### Vendors

- `GET /api/vendors` - Get all vendors (with filters)
- `GET /api/vendors/:id` - Get single vendor
- `POST /api/vendors` - Create new vendor
- `PUT /api/vendors/:id` - Update vendor

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `POST /api/users` - Create new user

### Subscriptions

- `GET /api/subscriptions/user/:userId` - Get user's subscriptions
- `GET /api/subscriptions/:id` - Get single subscription
- `POST /api/subscriptions` - Create subscription
- `PATCH /api/subscriptions/:id/status` - Update status

### Deliveries

- `GET /api/deliveries/subscription/:id` - Get deliveries for subscription
- `GET /api/deliveries/stats/:id` - Get delivery statistics
- `PATCH /api/deliveries/:id` - Update delivery status

### Reviews

- `GET /api/reviews/vendor/:vendorId` - Get vendor reviews
- `POST /api/reviews` - Create new review

## 💡 Sample Data

The database comes pre-populated with:

- 6 sample vendors (various food types and locations in Pune)
- 3 sample users
- Sample reviews and ratings

## 🔧 Configuration

### Port Configuration

Default port is 3000. You can change it by setting the `PORT` environment variable:

```bash
PORT=8080 npm start
```

### Database Location

The SQLite database is stored at `database/tiffinmate.db`. Delete this file to reset the database.

## 🎯 Future Enhancements

- User authentication and login system
- Payment gateway integration
- Real-time notifications
- Vendor dashboard for managing deliveries
- Mobile apps (iOS & Android)
- GPS-based delivery tracking
- Admin panel for platform management
- Multi-language support

## 💰 Monetization Model

1. **Platform Fee** - Small monthly fee from users
2. **Vendor Commission** - Per-delivery or subscription-based commission
3. **Premium Listings** - Featured vendor placements
4. **Advertisements** - Sponsored listings and banner ads
5. **Delivery Partners** - Integration with delivery services (future)

## 🤝 Contributing

This is a startup project. Contributions, issues, and feature requests are welcome!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For support, email support@tiffinmate.com or create an issue in the repository.

## 🙏 Acknowledgments

- Built with vanilla JavaScript for simplicity and ease of learning
- Designed for easy deployment on platforms like Render, Heroku, or Netlify
- Sample food images from Unsplash

---

**Made with ❤️ for homely food lovers**

Happy coding! 🚀🍱
