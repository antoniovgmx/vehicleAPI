const express = require('express');

const app = express();

// API Routes
app.use('/api/', require('./routes/api'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));