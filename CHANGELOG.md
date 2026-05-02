# Changelog

All notable changes to Neural Health ID are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).  
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [4.1.0] — 2024-12-15 — LAUNCH RELEASE

### 🚀 Added
- Complete PWA with Service Worker offline support
- Real QR code generation (ISO/IEC 18004) using QRCode.js
- WebAuthn biometric authentication (fingerprint & Face ID)
- Full Aadhaar UIDAI OTP verification flow
- Account recovery via phone, email, or Aadhaar
- Onboarding wizard after first registration
- Appointment booking with .ics calendar export
- Appointment reschedule modal
- Appointment cancellation with confirmation
- Medication manager (add/remove individual medications)
- Emergency contact direct-call `<a href="tel:">` link
- Print health card (opens printer dialog, no third-party deps)
- Share health report (Web Share API + clipboard fallback)
- Export full health data as JSON
- Notifications system with mark-all-read
- Security controls toggles (2FA, biometric, notifications, auto-lock)
- GitHub Actions CI/CD pipeline with security scanning
- CNAME auto-creation for custom domain deployment
- sitemap.xml and robots.txt auto-generation
- security.txt (.well-known) for responsible disclosure
- Complete README with Supabase schema, deployment guides
- SECURITY.md with bug bounty program
- MIT License with health disclaimer

### 🔒 Security
- SHA-256 password hashing with unique per-app salt
- 256-bit cryptographically random session tokens
- Account lockout after 5 failed login attempts
- Aadhaar stored as hash ONLY (DISHA Act 2022 compliant)
- Brute force protection on OTP (3 attempts max)
- OTP expiry enforced (5 minutes)
- CI secret scanning on every push

### 🎨 Design
- Orbitron + Share Tech Mono + Rajdhani typography system
- Neural particle canvas background animation
- Holographic grid with breathing glow
- 3D orbiting brain component
- Corner-accent glass cards
- Sparkline vital charts
- Password strength meter
- Real-time toggle switches with animation
- Boot sequence with progress bar
- Toast notification system
- Bottom sheet modals with backdrop dismiss

### 📱 PWA
- Service Worker with cache-first strategy
- Web App Manifest with maskable icons
- Install prompt banner
- iOS Safari standalone mode
- Hardware back button support
- Safe area insets for notched devices

---

## [4.0.0] — 2024-11-01

### Added
- Complete rewrite from v3 — single-file architecture
- AI Health Intelligence using Claude claude-sonnet-4-20250514
- 8-tab navigation: Home, Records, Neural AI, Doctors, Schedule, SOS, Security, Profile
- Real QR code for emergency ID
- Supabase-compatible database layer
- Full profile edit modals for all sections

---

## [3.0.0] — 2024-09-15

### Added
- Initial public release
- Basic health ID card with QR
- Vitals display
- Doctor finder
- Appointment list

---

## [Unreleased]

### Planned for v4.2.0
- React Native mobile app (iOS + Android)
- Supabase real-time sync
- ABHA (Ayushman Bharat Health Account) integration
- Push notification support
- Camera-based vitals measurement
- Hospital provider portal

### Planned for v5.0.0
- Wearable device integration (Apple Health, Google Fit)
- Telemedicine video consultation
- Government health scheme linkage (PM-JAY)
- Multi-language support (Hindi, Tamil, Bengali, Telugu)
