# System Architecture

## Core Philosophy
Health-ID utilizes a **Zero-Knowledge Architecture**. Users retain full sovereignty over their medical records through biometric-linked encryption.

## Technical Stack
- **Frontend**: Vite + Vanilla JS (Transitioning to TypeScript)
- **Database**: Firebase Firestore (Encrypted at rest)
- **Security**: AES-256-GCM for client-side encryption
- **Identity**: Life-QR (Dynamic TOTP-based QR system)

## Data Flow
1. **Input**: User uploads prescription via Med-Scan.
2. **Encryption**: AES-256 key generated from user biometric signature.
3. **Storage**: Ciphertext stored in Firestore; keys never leave the device.
