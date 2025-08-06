const express = require("express");
const chargeRoutes = require('./routes/charge');
const subscriptionRoutes = require('./routes/subscriptions');
const app = express();

app.use(express.json());

app.use('/app', chargeRoutes);
app.use('/app', subscriptionRoutes);

module.exports = app;