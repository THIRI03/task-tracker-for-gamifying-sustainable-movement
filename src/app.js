/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/
//////////////////////////////////////////////////////
// INCLUDES
//////////////////////////////////////////////////////
const express = require('express');

//////////////////////////////////////////////////////
// CREATE APP
//////////////////////////////////////////////////////
const app = express();

//////////////////////////////////////////////////////
// USES
//////////////////////////////////////////////////////
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//////////////////////////////////////////////////////
// SETUP ROUTES
//////////////////////////////////////////////////////
const mainRoutes = require('./routes/mainRoutes');
app.use("/api", mainRoutes);

//////////////////////////////////////////////////////
// SETUP ROUTES
//////////////////////////////////////////////////////
app.use("/", express.static('public'));

//////////////////////////////////////////////////////
// EXPORT APP
//////////////////////////////////////////////////////
module.exports = app;