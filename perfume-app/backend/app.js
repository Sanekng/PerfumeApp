const express = require('express');
const cors = require('cors');
const app = express();
const customerRoute = require('./routes/customer.routes');
const perfumeRoute = require('./routes/perfume.routes');
const orderRoute = require('./routes/order.routes');
const notificationRoute = require('./routes/notification.routes');
const sellerRoute = require('./routes/seller.routes');
const connectDB = require('./config/db.config');
const {PORT} = require('./config/config');

// Allow CORS from the React app running on localhost:5173
const corsOptions = {
    origin: 'http://localhost:5173', // Adjust if needed for other origins
    methods: 'GET,POST,PUT,DELETE', // Allow only necessary methods
    credentials: true, // Allow cookies to be sent (if needed)
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Use Routes
app.use('/api/customers', customerRoute);
app.use('/api/perfumes', perfumeRoute);
app.use('/api/orders', orderRoute);
app.use('/api/sellers', sellerRoute);
app.use('/api/notifications', notificationRoute);


app.use((req, res, next) => {
    res
        .status(404)
        .json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

// for later use when error middleware is created
// app.use(errorHandler);

(async()=> {
    try{
        await connectDB();
        if (require.main === module) {
            // Start the server only if the file is run directly (not imported)
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        }
    } catch (e) {
        console.error('Error connecting to the database:', e.message);
        process.exit(1);
    }

})();


module.exports = app;