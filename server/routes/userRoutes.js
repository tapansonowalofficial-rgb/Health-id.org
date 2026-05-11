// Route to link a Parent to a Child via a unique 6-digit code
router.post('/link-guardian', async (req, res) => {
  const { childId, pairingCode, parentId } = req.body;
  
  // Logic: Verify pairing code, then update parent's 'monitoredUsers' list
  try {
    const child = await User.findOne({ _id: childId, pairingCode: pairingCode });
    if (!child) return res.status(404).send("Invalid Pairing Code.");
    
    await User.findByIdAndUpdate(parentId, { 
      $push: { monitoring: childId } 
    });
    
    res.status(200).send("Guardian Link Established Successfully.");
  } catch (err) {
    res.status(500).send("Link Failed.");
  }
});
