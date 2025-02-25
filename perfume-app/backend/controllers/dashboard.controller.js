const Customer = require('../models/customer.model');
const Order = require('../models/order.model');
const Perfume = require('../models/perfume.model');
const Activity = require('../models/activity.model');

exports.getSummaryInformation = async (req, res, next) => {
    try {
        const totalSales = await Order.aggregate([
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]);

        const totalOrders = await Order.countDocuments();
        const totalCustomers = await Customer.countDocuments();
        const lowStockPerfumes = await Perfume.find({ stock: { $lt: 5 } },null, null );

        const recentOrders = await Order.find(null,null,null).sort({ createdAt: -1 }).limit(5).populate('perfume', 'name').populate('customer', 'name surname');

        res.status(200).json({data:
        {
                totalSales: totalSales[0]?.total || 0,
                totalOrders,
                totalCustomers,
                lowStockPerfumes,
                recentOrders
        }, success: true
    });

    } catch (error) {
        next(error);
    }
}

exports.getCustomerInsights = (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
}

exports.getSalesOrderAnalytics = (req, res, next) =>{
    try {

    } catch (error) {
        next(error);
    }
}

exports.getInventoryOverview = (req, res, next) =>{
    try {

    } catch (error) {
        next(error);
    }
}

exports.getRecentActivities = async (req, res, next) =>{
    try {
        const activities = await Activity.find().sort({timestamps: -1}).limit(50);

        res.json({data: activities, success: true});
    } catch (error) {
        next(error);
    }
}

exports.getQuickActions = (req, res, next) =>{
    try {

    } catch (error) {
        next(error);
    }
}

