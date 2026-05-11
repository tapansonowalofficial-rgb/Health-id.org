const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  
  // The Guardian Link (Crucial for the Masterpiece logic)
  emergencyContact: {
    parentName: { type: String, required: true },
    parentPhone: { type: String, required: true }, // Format: +91...
    escalationTimer: { type: Number, default: 15 } // Minutes before alerting parent
  },

  // Health Profile
  bloodGroup: String,
  allergies: [String],
  currentMedications: [{
    name: String,
    dosage: String,
    time: String, // e.g., "08:00"
    isConfirmed: { type: Boolean, default: false }
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
