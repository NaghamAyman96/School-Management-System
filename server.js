require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const schoolRoutes = require('./mws/schoolRoutes');
const classroomRoutes = require('./mws/classroomRoutes');
const studentRoutes = require('./mws/studentRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/schools', schoolRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/students', studentRoutes);



// Connect to MongoDB
mongoose.connect('mongodb://localhost/school_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define a simple route to check server is running
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
