# 🚀 Deployment Guide - TiffinMate

This guide helps you deploy TiffinMate to production.

## 📋 Pre-Deployment Checklist

- [ ] Test all features locally
- [ ] Update email addresses and contact info
- [ ] Add your domain name
- [ ] Set up proper database (consider PostgreSQL for production)
- [ ] Add environment variables
- [ ] Set up HTTPS/SSL
- [ ] Configure CORS for your domain
- [ ] Add analytics (Google Analytics, etc.)
- [ ] Set up error logging
- [ ] Create backup strategy

---

## 🌐 Option 1: Deploy to Render (Recommended)

### Why Render?

- Free tier available
- Easy Node.js deployment
- Automatic HTTPS
- Great for beginners

### Steps:

1. **Push to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit - TiffinMate"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Create Render Account**

   - Go to https://render.com
   - Sign up with GitHub

3. **Create New Web Service**

   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Configure:
     - **Name**: tiffinmate
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free

4. **Add Environment Variables** (if needed)

   ```
   NODE_ENV=production
   PORT=3000
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-5 minutes)
   - Your app will be live at: `https://tiffinmate.onrender.com`

### Note on Database:

- SQLite works but consider upgrading to PostgreSQL for production
- Render provides free PostgreSQL database

---

## 🔷 Option 2: Deploy to Railway

### Steps:

1. **Push to GitHub** (same as above)

2. **Create Railway Account**

   - Go to https://railway.app
   - Sign up with GitHub

3. **Deploy**

   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your TiffinMate repo
   - Railway auto-detects Node.js

4. **Add Custom Domain** (optional)
   - Go to Settings → Domains
   - Add your domain

Your app will be live at: `https://tiffinmate.up.railway.app`

---

## 🟣 Option 3: Deploy to Heroku

### Steps:

1. **Install Heroku CLI**

   ```bash
   brew install heroku/brew/heroku  # macOS
   ```

2. **Login to Heroku**

   ```bash
   heroku login
   ```

3. **Create Heroku App**

   ```bash
   heroku create tiffinmate-app
   ```

4. **Add Procfile**
   Create `Procfile` in root:

   ```
   web: node server.js
   ```

5. **Deploy**

   ```bash
   git push heroku main
   ```

6. **Open App**
   ```bash
   heroku open
   ```

Your app: `https://tiffinmate-app.herokuapp.com`

---

## 💧 Option 4: Deploy to DigitalOcean

### Steps:

1. **Create Droplet**

   - Ubuntu 22.04
   - Basic plan ($6/month)
   - SSH access

2. **Connect via SSH**

   ```bash
   ssh root@YOUR_DROPLET_IP
   ```

3. **Install Node.js**

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
   apt-get install -y nodejs
   ```

4. **Upload Code**

   ```bash
   # On your local machine
   scp -r ./Tiffinmate root@YOUR_DROPLET_IP:/var/www/
   ```

5. **Install Dependencies & Run**

   ```bash
   cd /var/www/Tiffinmate
   npm install
   npm install -g pm2
   pm2 start server.js
   pm2 startup
   pm2 save
   ```

6. **Set up Nginx (reverse proxy)**

   ```bash
   apt-get install nginx
   nano /etc/nginx/sites-available/tiffinmate
   ```

   Add:

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable:

   ```bash
   ln -s /etc/nginx/sites-available/tiffinmate /etc/nginx/sites-enabled/
   systemctl restart nginx
   ```

---

## 🔒 Add HTTPS/SSL

### Using Let's Encrypt (Free):

```bash
apt-get install certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com
```

---

## 📊 Upgrade to PostgreSQL (Production)

### 1. Install PostgreSQL driver:

```bash
npm install pg
```

### 2. Update server.js:

Replace SQLite code with:

```javascript
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
```

### 3. Convert queries:

Replace `db.run()` with pool queries.

---

## 🔐 Environment Variables

Create `.env` file (don't commit to Git):

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
EMAIL_API_KEY=your_email_key
PAYMENT_API_KEY=your_payment_key
```

Install dotenv:

```bash
npm install dotenv
```

Load in server.js:

```javascript
require("dotenv").config();
```

---

## 📈 Add Monitoring

### 1. Error Tracking (Sentry)

```bash
npm install @sentry/node
```

### 2. Performance Monitoring

- Use New Relic
- Or DataDog
- Or Built-in platform monitoring

### 3. Uptime Monitoring

- UptimeRobot (free)
- Pingdom
- StatusCake

---

## 🔄 Set Up CI/CD

### GitHub Actions Example:

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: |
          # Your deploy commands
```

---

## 📧 Set Up Email Service

For notifications:

- SendGrid
- Mailgun
- Amazon SES
- Postmark

---

## 💳 Integrate Payment Gateway

### Razorpay (India):

```bash
npm install razorpay
```

### Stripe (International):

```bash
npm install stripe
```

---

## 🔍 SEO Optimization

1. Add meta tags to all HTML pages
2. Create sitemap.xml
3. Add robots.txt
4. Set up Google Search Console
5. Add structured data (JSON-LD)

---

## 📱 Progressive Web App (PWA)

Add `manifest.json` and service worker for:

- Offline functionality
- Install on mobile
- Push notifications

---

## 🔐 Security Checklist

- [ ] Use HTTPS everywhere
- [ ] Add rate limiting
- [ ] Sanitize user inputs
- [ ] Use prepared statements (SQL injection prevention)
- [ ] Add CSRF protection
- [ ] Set security headers
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets

---

## 📊 Analytics Setup

### Google Analytics:

Add to all HTML pages:

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=YOUR_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "YOUR_GA_ID");
</script>
```

---

## 🎯 Performance Optimization

1. **Enable Gzip Compression**

   ```javascript
   const compression = require("compression");
   app.use(compression());
   ```

2. **Add Caching**

   ```javascript
   app.use(express.static("public", { maxAge: "1d" }));
   ```

3. **Optimize Images**

   - Use WebP format
   - Compress images
   - Lazy loading

4. **CDN for Static Files**
   - Cloudflare
   - AWS CloudFront

---

## 🔄 Backup Strategy

### Automated Database Backups:

```bash
# Daily backup cron job
0 2 * * * pg_dump database > backup_$(date +%Y%m%d).sql
```

### Backup to Cloud:

- AWS S3
- Google Cloud Storage
- Backblaze B2

---

## 📞 Custom Domain Setup

1. **Buy domain** (Namecheap, GoDaddy, etc.)

2. **Add DNS records:**

   ```
   Type: A
   Name: @
   Value: YOUR_SERVER_IP

   Type: CNAME
   Name: www
   Value: yourdomain.com
   ```

3. **Update platform settings** to use custom domain

---

## 🎉 Post-Deployment

1. **Test everything** on production
2. **Monitor logs** for errors
3. **Check performance** (load time, uptime)
4. **Set up alerts** for downtime
5. **Create backup schedule**
6. **Document any changes**

---

## 📞 Support Resources

- **Render Docs**: https://render.com/docs
- **Railway Docs**: https://docs.railway.app
- **Heroku Docs**: https://devcenter.heroku.com
- **DigitalOcean Tutorials**: https://www.digitalocean.com/community/tutorials

---

## 🆘 Common Issues

### Port Issues:

Make sure to use `process.env.PORT` in production:

```javascript
const PORT = process.env.PORT || 3000;
```

### Database Connection:

Check database URL format for your platform.

### Static Files Not Loading:

Ensure `public` folder is included in deployment.

---

**Good luck with your deployment! 🚀🍱**

Remember: Start with Render (easiest) and upgrade as you grow!
