const express = require('express');
const app = express();
const path = require('path');

// Serve db.json file
app.get('/db.json', (req, res) => {
  res.sendFile(path.join(__dirname, '../db.json'));
});

// Define other routes or middleware here...

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
