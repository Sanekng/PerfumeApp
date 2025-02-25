const express =require('express');
const { getSummaryInformation, getCustomerInsights, getInventoryOverview, getQuickActions, getRecentActivities, getSalesOrderAnalytics } = require("../controllers/dashboard.controller");

const router = express.Router();

router.get("/summary", getSummaryInformation);
router.get("/insights", getCustomerInsights);
router.get("/analytics", getSalesOrderAnalytics);
router.get("/inventory", getInventoryOverview);
router.get("/activities", getRecentActivities);
router.get("/actions", getQuickActions);

module.exports = router;