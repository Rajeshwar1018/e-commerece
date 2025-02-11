// const express = require('express');
// const Routes = require('./routes/productRoutes'); // Import task routes
// const mongoose =  require('mongoose')

// const app = express();
// const PORT = 2228;

// mongoose.connect('mongodb://localhost:27017/e-commerece')
// .then(() => console.log("MongoDB Connected"))
// .catch((error) => console.log("MongoDb Connection Error", error))

// // Middleware to parse incoming JSON
// app.use(express.json());

// // Register routes
// app.use("/api", Routes); // All task routes will be prefixed with '/api'

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// // Graceful shutdown: close DB connection on SIGINT (Ctrl + C)
// process.on('SIGINT', async () => {
//     try {
//         await mongoose.connection.close(); // Close MongoDB connection
//         console.log('MongoDB connection closed');
//         process.exit(0);
//     } catch (err) {
//         console.error('Error closing MongoDB connection', err);
//         process.exit(1);
//     }
// });

// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();
// app.use(express.json()); // Middleware to parse JSON

// // ✅ Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/ecommerce', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('✅ MongoDB Connected');
// }).catch(err => console.error('❌ MongoDB Connection Error:', err));

// const PORT = 2228;
// app.listen(PORT, () => {
//     console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/productRoutes'); // ✅ Import Task Routes

const app = express();
app.use(express.json()); // ✅ Enable JSON parsing middleware

// ✅ Use Task Routes
app.use('/api', taskRoutes);

mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const PORT = 2228;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

