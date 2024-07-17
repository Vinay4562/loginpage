const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes'); // Adjust path as necessary

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Routes
app.use('/api/users', userRoutes); // Adjust route as necessary

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Server error' });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
