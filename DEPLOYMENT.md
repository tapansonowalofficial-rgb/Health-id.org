# Deployment Guide — Neural Health ID

**www.health-id.in**

This guide covers every deployment option from free GitHub Pages to enterprise VPS.

---

## Quick Deploy (5 minutes)

### GitHub Pages — Free, Auto-deploys

```bash
# 1. Fork this repo on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/neural-health-id.git
cd neural-health-id

# 3. Enable GitHub Pages
# Go to: Settings → Pages → Source → GitHub Actions
# The workflow at .github/workflows/deploy.yml handles everything

# 4. Push to main — auto-deploys
git add .
git commit -m "feat: initial deployment"
git push origin main
```

**Live at:** `https://YOUR_USERNAME.github.io/neural-health-id`

---

## Custom Domain Setup (www.health-id.in)

### DNS Configuration

Add these records at your domain registrar:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | YOUR_USERNAME.github.io | 3600 |
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |

### GitHub Settings

1. Go to **Settings → Pages → Custom domain**
2. Enter `www.health-id.in`
3. Check **Enforce HTTPS**
4. Wait 15–30 minutes for DNS propagation

---

## Environment Variables (Production)

Set these as GitHub Secrets (**Settings → Secrets → Actions**):

```bash
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
ANTHROPIC_API_KEY=sk-ant-api03-...
MSG91_API_KEY=YOUR_MSG91_KEY
MSG91_TEMPLATE_ID=YOUR_TEMPLATE_ID
UIDAI_API_KEY=YOUR_UIDAI_KEY
```

### Injecting into index.html (GitHub Actions)

Add this step to `.github/workflows/deploy.yml`:

```yaml
- name: Inject environment config
  run: |
    sed -i "s|SUPABASE_URL_PLACEHOLDER|${{ secrets.SUPABASE_URL }}|g" index.html
    sed -i "s|SUPABASE_KEY_PLACEHOLDER|${{ secrets.SUPABASE_ANON_KEY }}|g" index.html
```

---

## Supabase Setup

### 1. Create Project

1. Go to [supabase.com](https://supabase.com) → New Project
2. Name: `neural-health-id`
3. Region: **Southeast Asia (Singapore)** or **South Asia (Mumbai)** for India
4. Generate a strong database password

### 2. Run Schema

In Supabase SQL Editor, run `docs/schema.sql`:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table
CREATE TABLE public.users (
  uid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hid TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  email TEXT,
  name TEXT NOT NULL,
  dob DATE,
  gender TEXT,
  aadhaar_hash TEXT,
  aadhaar_mask TEXT,
  password_hash TEXT NOT NULL,
  pin TEXT DEFAULT '',
  blood_type TEXT DEFAULT '',
  height TEXT DEFAULT '',
  weight TEXT DEFAULT '',
  city TEXT DEFAULT '',
  allergies TEXT[] DEFAULT ARRAY[]::TEXT[],
  conditions TEXT[] DEFAULT ARRAY[]::TEXT[],
  medications JSONB DEFAULT '[]'::JSONB,
  emergency_contact JSONB DEFAULT '{}'::JSONB,
  insurance JSONB DEFAULT '{}'::JSONB,
  vitals JSONB DEFAULT '{}'::JSONB,
  records JSONB DEFAULT '[]'::JSONB,
  appointments JSONB DEFAULT '[]'::JSONB,
  notifications JSONB DEFAULT '[]'::JSONB,
  health_score INTEGER DEFAULT 0,
  verified JSONB DEFAULT '{"phone":false,"email":false,"aadhaar":false}'::JSONB,
  security_settings JSONB DEFAULT '{"twoFA":true,"biometric":false,"notifications":true,"autoLock":true}'::JSONB,
  login_attempts INTEGER DEFAULT 0,
  locked BOOLEAN DEFAULT false,
  onboarded BOOLEAN DEFAULT false,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users access own data only" ON public.users
  FOR ALL USING (auth.uid()::TEXT = uid::TEXT);

-- Performance indexes
CREATE INDEX idx_users_phone ON public.users(phone);
CREATE INDEX idx_users_hid   ON public.users(hid);
CREATE INDEX idx_users_email ON public.users(email);
```

### 3. Enable Auth

In Supabase: **Authentication → Providers → Email** — Enable  
**Authentication → Providers → Phone** — Enable (requires Twilio or MSG91)

---

## MSG91 SMS OTP Setup

1. Register at [msg91.com](https://msg91.com)
2. Create an OTP template:
   ```
   Your Neural Health ID OTP is ##OTP##. Valid for 5 minutes. 
   Do not share with anyone. -NHID
   ```
3. Get your `authkey` and `template_id`
4. Update `index.html`:
   ```javascript
   // In DB.sendOTP(), uncomment and configure:
   await fetch('https://api.msg91.com/api/v5/otp', {
     method: 'POST',
     headers: { 'authkey': 'YOUR_MSG91_KEY', 'Content-Type': 'application/json' },
     body: JSON.stringify({ mobile: '91' + phone, otp, template_id: 'YOUR_TEMPLATE_ID', otp_expiry: 5 })
   });
   ```

---

## UIDAI Aadhaar API Setup

### Sandbox (Testing)

```
Base URL: https://stage1.uidai.gov.in/uidVerifyService/2.5
Endpoint: /verifyUID
Method: POST
```

### Production

1. Register at [developer.uidai.gov.in](https://developer.uidai.gov.in)
2. Complete empanelment process
3. Sign Aadhaar Ecosystem Partner Agreement
4. Receive production API credentials

**Important:** Production Aadhaar API requires formal empanelment with UIDAI. Allow 4–8 weeks for approval.

---

## Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
vercel env add ANTHROPIC_API_KEY

# Deploy to production
vercel --prod
```

**Add domain:**
```bash
vercel domains add www.health-id.in
```

---

## Nginx + Ubuntu VPS

```bash
# Install Nginx
sudo apt update && sudo apt install -y nginx certbot python3-certbot-nginx

# Create web directory
sudo mkdir -p /var/www/neural-health-id
sudo cp index.html /var/www/neural-health-id/

# Nginx config
sudo nano /etc/nginx/sites-available/health-id.in
```

```nginx
server {
    server_name www.health-id.in health-id.in;
    root /var/www/neural-health-id;
    index index.html;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-Frame-Options DENY always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
    add_header Content-Security-Policy "default-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://cdnjs.cloudflare.com https://api.anthropic.com; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;" always;

    # Gzip
    gzip on;
    gzip_types text/html text/css application/javascript application/json;
    gzip_min_length 1024;

    # Cache static assets
    location ~* \.(js|css|png|jpg|svg|ico|woff|woff2|ttf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ /index.html;
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate";
    }

    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/health-id.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/health-id.in/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_session_cache shared:SSL:10m;
}

server {
    listen 80;
    server_name www.health-id.in health-id.in;
    return 301 https://www.health-id.in$request_uri;
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/health-id.in /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# SSL certificate
sudo certbot --nginx -d www.health-id.in -d health-id.in

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

---

## Post-Deployment Checklist

- [ ] App loads at your domain
- [ ] HTTPS enforced (no HTTP access)
- [ ] Demo login works (9999999999 / Demo@1234)
- [ ] QR code renders in Emergency tab
- [ ] AI chat responds (Anthropic API connected)
- [ ] OTP sends on registration
- [ ] PWA install prompt appears on mobile
- [ ] App works offline (Service Worker active)
- [ ] Google Search Console — domain verified
- [ ] Google Analytics / Plausible — tracking active
- [ ] uptime monitor configured (UptimeRobot)
- [ ] Error monitoring configured (Sentry)
- [ ] Backup strategy in place (Supabase auto-backups)

---

## Performance Targets

| Metric | Target | Tool |
|--------|--------|------|
| First Contentful Paint | < 1.5s | Lighthouse |
| Time to Interactive | < 3.0s | Lighthouse |
| Lighthouse Score | > 90 | Chrome DevTools |
| Cumulative Layout Shift | < 0.1 | Core Web Vitals |
| PWA Score | 100 | Lighthouse |

---

## Support

- Email: support@health-id.in
- GitHub Issues: [github.com/YOUR_USERNAME/neural-health-id/issues](https://github.com/YOUR_USERNAME/neural-health-id/issues)
- Website: [www.health-id.in](https://www.health-id.in)
