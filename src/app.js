const express = require('express');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/groups', groupRoutes);
app.use('/expenses', expenseRoutes);

module.exports = app;