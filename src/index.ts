import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import './database/database';

function init() {
    app.listen(process.env.PORT || 5000, function() {
        console.log('Server listening on port 5000');
        });
};

init();
