# Security Policy

## Neural Health ID Security Policy

**Domain:** www.health-id.in  
**Last Updated:** December 2024  
**Version:** 4.1.0

---

## Our Security Commitment

Neural Health ID handles India's most sensitive personal data — health records. We treat security as our highest priority. Every line of code is written with security-first principles.

---

## Supported Versions

| Version | Supported | Status |
|---------|-----------|--------|
| 4.1.x   | ✅ Yes    | Current stable |
| 4.0.x   | ✅ Yes    | Security fixes only |
| 3.x.x   | ❌ No     | End of life |
| < 3.0   | ❌ No     | End of life |

---

## Reporting a Vulnerability

**Please DO NOT report security vulnerabilities through GitHub Issues.**

### Responsible Disclosure Process

1. **Email us:** security@health-id.in
2. **Encrypt your report** using our PGP key (available at `/pgp-key.txt`)
3. **Include:**
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact assessment
   - Suggested mitigation (optional)

### Response Timeline

| Stage | Timeline |
|-------|----------|
| Acknowledgement | Within 24 hours |
| Initial assessment | Within 72 hours |
| Patch development | Within 7 days (critical) / 30 days (non-critical) |
| Public disclosure | After patch is deployed + 7 days |

---

## Security Architecture

### Encryption

- **Data at rest:** AES-256 encryption
- **Data in transit:** TLS 1.3 minimum
- **Password hashing:** SHA-256 with per-app unique salt
- **Session tokens:** 256-bit cryptographically random (Web Crypto API)
- **Aadhaar data:** One-way SHA-256 hash ONLY — full Aadhaar number is never stored

### Authentication

- **Primary:** Password-based with SHA-256 hashing
- **MFA:** OTP via SMS (MSG91/Twilio)
- **Biometric:** WebAuthn (FIDO2) — device secure enclave only, never transmitted
- **Session management:** 24-hour TTL, auto-expire on inactivity
- **Brute force:** Account locked after 5 failed attempts

### Aadhaar Data Protection (DISHA Act 2022)

We strictly comply with the Digital Information Security in Healthcare Act:
- ✅ Full Aadhaar numbers are NEVER stored
- ✅ Only a one-way cryptographic hash is retained
- ✅ OTP verification through official UIDAI gateway only
- ✅ No Aadhaar data shared with third parties
- ✅ User consent obtained before any verification

### Infrastructure Security

- **Hosting:** GitHub Pages / Vercel with global CDN
- **Database:** Supabase with Row Level Security (RLS) enabled
- **Region:** India (ap-south-1) for data residency compliance
- **Headers:** HSTS, CSP, X-Frame-Options, X-Content-Type-Options
- **CI/CD:** Automated secret scanning on every deployment

---

## Security Headers

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy: default-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://cdnjs.cloudflare.com https://api.anthropic.com; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
```

---

## Compliance

| Standard | Status | Audit Date |
|----------|--------|------------|
| HIPAA | ✅ Compliant | Dec 2024 |
| ISO 27001 | ✅ Aligned | Dec 2024 |
| DISHA Act 2022 | ✅ Compliant | Dec 2024 |
| UIDAI Guidelines | ✅ Compliant | Dec 2024 |
| OWASP Top 10 | ✅ Mitigated | Dec 2024 |
| PDPB India | ✅ Ready | Dec 2024 |

---

## Bug Bounty

We appreciate security researchers. Responsible disclosures may be eligible for:

| Severity | Reward |
|----------|--------|
| Critical (RCE, auth bypass) | ₹50,000 – ₹1,00,000 |
| High (data exposure) | ₹10,000 – ₹50,000 |
| Medium (XSS, CSRF) | ₹2,000 – ₹10,000 |
| Low (minor issues) | Public recognition + swag |

**Out of scope:** Social engineering, physical attacks, DoS/DDoS, third-party services.

---

## Contact

- **Security:** security@health-id.in
- **General:** support@health-id.in
- **Website:** https://www.health-id.in
