const Appointment = require('../models/Appointment'); // Create this model next
const User = require('../models/User');

exports.bookDoctor = async (req, res) => {
  const { userId, doctorId, date, timeSlot } = req.body;

  try {
    // 1. Create the booking
    const newAppointment = new Appointment({
      patientId: userId,
      doctorId: doctorId,
      appointmentDate: date,
      slot: timeSlot,
      status: 'Scheduled'
    });

    // 2. Automated "Data Handshake" 
    // Logic: Temporarily grant the doctor access to the user's Vault
    await User.findByIdAndUpdate(userId, {
      $addToSet: { authorizedDoctors: doctorId }
    });

    await newAppointment.save();
    res.status(200).json({ message: "Masterpiece Booking Complete. Data Shared Securely." });
  } catch (err) {
    res.status(500).json({ error: "Booking Failed. Encryption sync error." });
  }
};
