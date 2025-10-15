const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Database initialization
const dbPath = path.join(__dirname, "database", "tiffinmate.db");
const schemaPath = path.join(__dirname, "database", "schema.sql");

// Ensure database directory exists
const dbDir = path.join(__dirname, "database");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database");
    initializeDatabase();
  }
});

// Initialize database with schema
function initializeDatabase() {
  const schema = fs.readFileSync(schemaPath, "utf8");
  db.exec(schema, (err) => {
    if (err) {
      console.error("Error initializing database:", err.message);
    } else {
      console.log("Database initialized successfully");
    }
  });
}

// ==================== VENDOR ENDPOINTS ====================

// Get all vendors with filters
app.get("/api/vendors", (req, res) => {
  const {
    city,
    locality,
    food_type,
    min_price,
    max_price,
    delivery_radius,
    sort_by,
  } = req.query;

  let query = "SELECT * FROM vendors WHERE is_active = 1";
  let params = [];

  if (city) {
    query += " AND LOWER(city) = LOWER(?)";
    params.push(city);
  }

  if (locality) {
    query += " AND LOWER(locality) LIKE LOWER(?)";
    params.push(`%${locality}%`);
  }

  if (food_type) {
    query += ' AND (food_type = ? OR food_type = "Mixed")';
    params.push(food_type);
  }

  if (min_price) {
    query += " AND monthly_price >= ?";
    params.push(parseFloat(min_price));
  }

  if (max_price) {
    query += " AND monthly_price <= ?";
    params.push(parseFloat(max_price));
  }

  if (delivery_radius) {
    query += " AND delivery_radius >= ?";
    params.push(parseInt(delivery_radius));
  }

  // Sorting
  if (sort_by === "price_low") {
    query += " ORDER BY monthly_price ASC";
  } else if (sort_by === "price_high") {
    query += " ORDER BY monthly_price DESC";
  } else if (sort_by === "rating") {
    query += " ORDER BY rating DESC";
  } else {
    query += " ORDER BY rating DESC, happy_customers DESC";
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Get single vendor by ID
app.get("/api/vendors/:id", (req, res) => {
  const { id } = req.params;

  db.get("SELECT * FROM vendors WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: "Vendor not found" });
    } else {
      res.json(row);
    }
  });
});

// Create new vendor
app.post("/api/vendors", (req, res) => {
  const {
    name,
    email,
    phone,
    description,
    address,
    city,
    locality,
    food_type,
    daily_price,
    weekly_price,
    monthly_price,
    delivery_radius,
    image_url,
  } = req.body;

  const query = `INSERT INTO vendors (name, email, phone, description, address, city, locality, 
                   food_type, daily_price, weekly_price, monthly_price, delivery_radius, image_url) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(
    query,
    [
      name,
      email,
      phone,
      description,
      address,
      city,
      locality,
      food_type,
      daily_price,
      weekly_price,
      monthly_price,
      delivery_radius,
      image_url,
    ],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID, message: "Vendor created successfully" });
      }
    }
  );
});

// Update vendor
app.put("/api/vendors/:id", (req, res) => {
  const { id } = req.params;
  const fields = req.body;

  const setClauses = Object.keys(fields)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = [...Object.values(fields), id];

  db.run(
    `UPDATE vendors SET ${setClauses} WHERE id = ?`,
    values,
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({
          message: "Vendor updated successfully",
          changes: this.changes,
        });
      }
    }
  );
});

// ==================== USER ENDPOINTS ====================

// Get all users
app.get("/api/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Get user by ID
app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(row);
    }
  });
});

// Create new user
app.post("/api/users", (req, res) => {
  const { name, email, phone, address, city } = req.body;

  const query =
    "INSERT INTO users (name, email, phone, address, city) VALUES (?, ?, ?, ?, ?)";

  db.run(query, [name, email, phone, address, city], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: this.lastID, message: "User created successfully" });
    }
  });
});

// Search user by email or phone
app.get("/api/users/search", (req, res) => {
  const { email, phone } = req.query;

  let query = "SELECT * FROM users WHERE ";
  let params = [];

  if (email) {
    query += "email = ?";
    params.push(email);
  } else if (phone) {
    query += "phone = ?";
    params.push(phone);
  } else {
    return res.status(400).json({ error: "Email or phone required" });
  }

  db.get(query, params, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(row);
    }
  });
});

// Vendor login endpoint
app.get("/api/vendors/login", (req, res) => {
  const { email, phone } = req.query;

  const query =
    "SELECT * FROM vendors WHERE email = ? AND phone = ? AND is_active = 1";

  db.get(query, [email, phone], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res
        .status(404)
        .json({ error: "Vendor not found or invalid credentials" });
    } else {
      res.json(row);
    }
  });
});

// ==================== SUBSCRIPTION ENDPOINTS ====================

// Get all subscriptions for a user
app.get("/api/subscriptions/user/:userId", (req, res) => {
  const { userId } = req.params;

  const query = `
        SELECT s.*, v.name as vendor_name, v.food_type, v.image_url
        FROM subscriptions s
        JOIN vendors v ON s.vendor_id = v.id
        WHERE s.user_id = ?
        ORDER BY s.created_at DESC
    `;

  db.all(query, [userId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Get all subscriptions for a vendor
app.get("/api/subscriptions/vendor/:vendorId", (req, res) => {
  const { vendorId } = req.params;

  const query = `
        SELECT s.*, u.name as user_name, u.email as user_email, u.phone as user_phone
        FROM subscriptions s
        JOIN users u ON s.user_id = u.id
        WHERE s.vendor_id = ?
        ORDER BY s.created_at DESC
    `;

  db.all(query, [vendorId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Get single subscription
app.get("/api/subscriptions/:id", (req, res) => {
  const { id } = req.params;

  const query = `
        SELECT s.*, v.name as vendor_name, v.food_type, v.image_url, u.name as user_name
        FROM subscriptions s
        JOIN vendors v ON s.vendor_id = v.id
        JOIN users u ON s.user_id = u.id
        WHERE s.id = ?
    `;

  db.get(query, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: "Subscription not found" });
    } else {
      res.json(row);
    }
  });
});

// Create new subscription
app.post("/api/subscriptions", (req, res) => {
  const { user_id, vendor_id, plan_type, start_date, end_date, total_amount } =
    req.body;

  const query = `INSERT INTO subscriptions (user_id, vendor_id, plan_type, start_date, end_date, total_amount) 
                   VALUES (?, ?, ?, ?, ?, ?)`;

  db.run(
    query,
    [user_id, vendor_id, plan_type, start_date, end_date, total_amount],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        // Create delivery entries for each day
        createDeliveryEntries(this.lastID, start_date, end_date);
        res.json({
          id: this.lastID,
          message: "Subscription created successfully",
        });
      }
    }
  );
});

// Helper function to create delivery entries
function createDeliveryEntries(subscriptionId, startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const query =
    "INSERT INTO deliveries (subscription_id, delivery_date, status) VALUES (?, ?, ?)";

  for (
    let date = new Date(start);
    date <= end;
    date.setDate(date.getDate() + 1)
  ) {
    const dateStr = date.toISOString().split("T")[0];
    db.run(query, [subscriptionId, dateStr, "pending"]);
  }
}

// Update subscription status (pause/resume/cancel)
app.patch("/api/subscriptions/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.run(
    "UPDATE subscriptions SET status = ? WHERE id = ?",
    [status, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({
          message: "Subscription status updated",
          changes: this.changes,
        });
      }
    }
  );
});

// ==================== DELIVERY ENDPOINTS ====================

// Get deliveries for a subscription
app.get("/api/deliveries/subscription/:subscriptionId", (req, res) => {
  const { subscriptionId } = req.params;
  const { month, year } = req.query;

  let query = "SELECT * FROM deliveries WHERE subscription_id = ?";
  let params = [subscriptionId];

  if (month && year) {
    query +=
      ' AND strftime("%m", delivery_date) = ? AND strftime("%Y", delivery_date) = ?';
    params.push(month.padStart(2, "0"), year);
  }

  query += " ORDER BY delivery_date ASC";

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Update delivery status
app.patch("/api/deliveries/:id", (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const delivered_at = status === "delivered" ? new Date().toISOString() : null;

  db.run(
    "UPDATE deliveries SET status = ?, delivered_at = ?, notes = ? WHERE id = ?",
    [status, delivered_at, notes, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: "Delivery updated", changes: this.changes });
      }
    }
  );
});

// Get delivery statistics for a subscription
app.get("/api/deliveries/stats/:subscriptionId", (req, res) => {
  const { subscriptionId } = req.params;
  const { month, year } = req.query;

  let query = `
        SELECT 
            COUNT(*) as total_deliveries,
            SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) as delivered_count,
            SUM(CASE WHEN status = 'missed' THEN 1 ELSE 0 END) as missed_count,
            SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_count
        FROM deliveries 
        WHERE subscription_id = ?
    `;

  let params = [subscriptionId];

  if (month && year) {
    query +=
      ' AND strftime("%m", delivery_date) = ? AND strftime("%Y", delivery_date) = ?';
    params.push(month.padStart(2, "0"), year);
  }

  db.get(query, params, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(row);
    }
  });
});

// ==================== REVIEW ENDPOINTS ====================

// Get reviews for a vendor
app.get("/api/reviews/vendor/:vendorId", (req, res) => {
  const { vendorId } = req.params;

  const query = `
        SELECT r.*, u.name as user_name
        FROM reviews r
        JOIN users u ON r.user_id = u.id
        WHERE r.vendor_id = ?
        ORDER BY r.created_at DESC
    `;

  db.all(query, [vendorId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Create new review
app.post("/api/reviews", (req, res) => {
  const { user_id, vendor_id, rating, comment } = req.body;

  const query =
    "INSERT INTO reviews (user_id, vendor_id, rating, comment) VALUES (?, ?, ?, ?)";

  db.run(query, [user_id, vendor_id, rating, comment], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      // Update vendor rating
      updateVendorRating(vendor_id);
      res.json({ id: this.lastID, message: "Review added successfully" });
    }
  });
});

// Helper function to update vendor rating
function updateVendorRating(vendorId) {
  const query = `
        UPDATE vendors 
        SET rating = (SELECT AVG(rating) FROM reviews WHERE vendor_id = ?),
            total_ratings = (SELECT COUNT(*) FROM reviews WHERE vendor_id = ?)
        WHERE id = ?
    `;

  db.run(query, [vendorId, vendorId, vendorId]);
}

// ==================== SERVE HTML PAGES ====================

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/search", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "search.html"));
});

app.get("/vendor", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "vendor.html"));
});

app.get("/tracking", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "tracking.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.get("/vendor-dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "vendor-dashboard.html"));
});

app.get("/register-vendor", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register-vendor.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🍱 TiffinMate server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Database connection closed");
    process.exit(0);
  });
});
