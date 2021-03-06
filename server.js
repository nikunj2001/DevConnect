const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 5000;

// ConnectDB
connectDB();

// Init Middleware

// Body pareser provided by express
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/post', require('./routes/api/post'));
app.use('/api/admin', require('./routes/api/admin'));

// Serve static client assests in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
