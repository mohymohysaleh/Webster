const express = require('express');
const connectDB = require('./config/mongo');
const musicRoutes = require('./routes/mediaRoutes');

const app = express();

connectDB();

app.use(express.json());

app.use('/api', musicRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
