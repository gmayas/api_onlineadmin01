import express, { Application } from 'express';
import morgan from 'morgan';

import bodyParser from 'body-parser';
const cors = require('cors')

import AuthUserRoutes from './routes/authuser/authuser.routes';
import AdminGralRoutes from './routes/admingral/admingral.routes';

const app: Application = express();

// settings
app.set('port', 5000 || process.env.PORT);

// Middlewares
app.use(morgan('dev'));
/*app.use(express.urlencoded({ extended: true }))
app.use(express.json());*/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// Routes
app.use('/api/authuser', AuthUserRoutes);
app.use('/api/admingral', AdminGralRoutes);
//
export default app;