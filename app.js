const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const path = require('path')

// Setting up Express
const app = express()

// Setting up Middleware
app.use(express.json())

// Setting up routes
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/links', require('./routes/links.route'))

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))

// Setting up Mongoose connection
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB connection established'))
  .catch(error => {
    console.log('Server error', error.message)
    process.exit(1)
  })
