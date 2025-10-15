-- TiffinMate Database Schema

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    address TEXT,
    city TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Vendors Table
CREATE TABLE IF NOT EXISTS vendors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    locality TEXT NOT NULL,
    food_type TEXT NOT NULL, -- Veg, Non-Veg, Jain, Mixed
    daily_price REAL NOT NULL,
    weekly_price REAL NOT NULL,
    monthly_price REAL NOT NULL,
    delivery_radius INTEGER DEFAULT 5, -- in km
    rating REAL DEFAULT 0,
    total_ratings INTEGER DEFAULT 0,
    happy_customers INTEGER DEFAULT 0,
    image_url TEXT,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Subscriptions Table
CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    vendor_id INTEGER NOT NULL,
    plan_type TEXT NOT NULL, -- Daily, Weekly, Monthly
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_amount REAL NOT NULL,
    status TEXT DEFAULT 'active', -- active, paused, cancelled, completed
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (vendor_id) REFERENCES vendors(id)
);

-- Deliveries Table
CREATE TABLE IF NOT EXISTS deliveries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subscription_id INTEGER NOT NULL,
    delivery_date DATE NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, delivered, missed
    delivered_at DATETIME,
    notes TEXT,
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(id)
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    vendor_id INTEGER NOT NULL,
    rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (vendor_id) REFERENCES vendors(id)
);

-- Insert sample vendors
INSERT INTO vendors (name, email, phone, description, address, city, locality, food_type, daily_price, weekly_price, monthly_price, delivery_radius, rating, total_ratings, happy_customers, image_url) VALUES
('Ghar Jaisa Khana', 'gharjaisa@tiffin.com', '9876543210', 'Authentic homely meals made with love. Special focus on nutrition and taste.', 'Shop 12, Market Road', 'Pune', 'Kothrud', 'Veg', 120, 750, 2800, 5, 4.5, 120, 350, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'),
('Maa Ke Haath Ka Swaad', 'maakeswaad@tiffin.com', '9876543211', 'Traditional home-cooked food. No artificial ingredients, pure vegetarian meals.', '45, Shivaji Nagar', 'Pune', 'Shivaji Nagar', 'Jain', 140, 850, 3200, 7, 4.7, 95, 280, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400'),
('Protein Plus Tiffin', 'proteinplus@tiffin.com', '9876543212', 'High-protein meals for fitness enthusiasts. Both veg and non-veg options available.', '23, FC Road', 'Pune', 'Deccan', 'Mixed', 160, 950, 3600, 6, 4.3, 80, 220, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400'),
('Hyderabadi Zaika', 'hyderabadi@tiffin.com', '9876543213', 'Authentic Hyderabadi cuisine with biryani specials. Non-veg specialties.', '67, Aundh Road', 'Pune', 'Aundh', 'Non-Veg', 150, 900, 3400, 8, 4.6, 110, 310, 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400'),
('Simple & Healthy Tiffin', 'simplehealthy@tiffin.com', '9876543214', 'Low oil, low spice, perfect for students and working professionals.', '89, Baner Road', 'Pune', 'Baner', 'Veg', 110, 700, 2600, 4, 4.4, 105, 290, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400'),
('South Indian Delights', 'southindian@tiffin.com', '9876543215', 'Authentic South Indian breakfast and meals. Idli, dosa, sambhar daily.', '34, Karve Road', 'Pune', 'Karve Nagar', 'Veg', 130, 800, 3000, 5, 4.8, 140, 400, 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400');

-- Insert sample users
INSERT INTO users (name, email, phone, address, city) VALUES
('Rahul Sharma', 'rahul@example.com', '9123456780', 'Room 203, PG House, Kothrud', 'Pune'),
('Priya Patel', 'priya@example.com', '9123456781', 'Flat 501, Deccan Heights', 'Pune'),
('Amit Kumar', 'amit@example.com', '9123456782', 'Hostel B, Room 45', 'Pune');
