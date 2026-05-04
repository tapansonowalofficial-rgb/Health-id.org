# API Integration Guide

## Authentication
`POST /api/v1/auth/verify`
Requires: `Firebase-ID-Token`
Response: `200 OK` with session validation.

## Medical Record Retrieval
`GET /api/v1/records/{health_id}`
Returns encrypted JSON payload. Decryption must occur on the client side using the user's private key.
