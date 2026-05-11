const express = require('express');
const twilio = require('twilio');
const app = express();
app.use(express.json());

// Twilio Setup (Get these from your Twilio Console)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;
const client = twilio(accountSid, authToken);

// Active Alert Memory (In a real app, use Redis)
let activeAlerts = {};

// 1. Initial Alert: Patient receives medication reminder
app.post('/api/med-alert', async (req, res) => {
  const { userId, userName, medName, userPhone, parentPhone } = req.body;

  // Send initial SMS to Patient
  await client.messages.create({
    body: `Health-ID Alert: Hi ${userName}, it's time for your ${medName}. Please confirm in-app.`,
    to: userPhone,
    from: twilioPhone
  });

  // Start the 15-minute Watchdog timer
  activeAlerts[userId] = setTimeout(async () => {
    // If this runs, it means the user never clicked "Confirm"
    await triggerParentAlert(userName, medName, parentPhone);
    delete activeAlerts[userId];
  }, 15 * 60 * 1000); // 15 Minutes

  res.status(200).json({ status: "Alert Sent & Watchdog Started" });
});

// 2. Confirmation: Patient clicks "Confirm Dose" in the App
app.post('/api/confirm-dose', (req, res) => {
  const { userId } = req.body;
  
  if (activeAlerts[userId]) {
    clearTimeout(activeAlerts[userId]); // STOP THE PARENT ALERT
    delete activeAlerts[userId];
    res.status(200).json({ status: "Success", message: "Watchdog stopped. Parent will not be notified." });
  } else {
    res.status(404).json({ status: "Error", message: "No active alert found." });
  }
});

// 3. Escalation Function: Alerts the Parent
async function triggerParentAlert(userName, medName, parentPhone) {
  try {
    await client.messages.create({
      body: `CRITICAL ALERT: ${userName} has NOT responded to their ${medName} medication reminder after multiple attempts. Please check on them immediately.`,
      to: parentPhone,
      from: twilioPhone
    });
    console.log(`Escalated to parent for ${userName}`);
  } catch (err) {
    console.error("Failed to notify parent:", err);
  }
}

app.listen(3000, () => console.log('Health-ID Backend Running on Port 3000'));
