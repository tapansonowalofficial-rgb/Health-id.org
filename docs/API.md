# Health-ID API Specification (v1.0.0)

## Security Protocol
All requests must be encrypted using **AES-256-GCM**. No PII (Personally Identifiable Information) should be transmitted in plaintext.

### 1. Authentication
**Endpoint:** `POST /auth/verify`
- **Header:** `Authorization: Bearer <Firebase_Token>`
- **Body:** `{ "deviceId": "UUID", "biometricSignature": "String" }`

### 2. Life-QR Generation
**Endpoint:** `GET /identity/qr-token`
- **Function:** Generates a short-lived (60s) TOTP-based token for emergency medical access.

### 3. Med-Scan Vision Integration
**Endpoint:** `POST /vision/analyze`
- **Input:** Base64 Image String (Prescription/Report)
- **Output:** Structured JSON containing `medication_name`, `dosage`, and `frequency`.
