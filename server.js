// const express = require('express');
// const mongoose = require('mongoose');
// const taskRoutes = require('./routes/productRoutes'); // ✅ Import Task Routes
// const orderRoutes=require('./routes/orderRoutes')

// const app = express();
// app.use(express.json()); // ✅ Enable JSON parsing middleware

// // ✅ Use Task Routes
// app.use('/api', taskRoutes);
// app.use('/api', orderRoutes);

// mongoose.connect('mongodb://localhost:27017/ecommerce', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('✅ MongoDB Connected'))
//   .catch(err => console.error('❌ MongoDB Connection Error:', err));

// const PORT = 2228;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));


const express = require("express");
const mongoose = require("mongoose");

// ✅ Ensure correct paths
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes=require("./routes/cartRoutes");
const reviewRoutes=require("./routes/reviewRoutes")

const app = express();
app.use(express.json()); // ✅ Enable JSON parsing

// ✅ Use API routes properly
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/review", reviewRoutes);


mongoose
  .connect("mongodb://localhost:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = 2228;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));


