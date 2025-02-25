const express = require('express');
const cors = require('cors');
const app = express();
const customerRoute = require('./routes/customer.routes');
const perfumeRoute = require('./routes/perfume.routes');
const orderRoute = require('./routes/order.routes');
const notificationRoute = require('./routes/notification.routes');
const sellerRoute = require('./routes/seller.routes');
const dashboardRoute = require('./routes/dashboard.routes');
const connectDB = require('./config/db.config');
const {PORT} = require('./config/config');
const errorHandler = require('./middlewares/errorHandler');
const AppError = require('./utils/app.error');

// Allow CORS from the React app running on localhost:5173
const corsOptions = {
    origin: '*', // Adjust if needed for other origins
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
app.use('/api/dashboard', dashboardRoute);


app.all('*', (req, res, next) => {
    next(new AppError(`Route not found: ${req.originalUrl}`, 404))
})

app.use(errorHandler);

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