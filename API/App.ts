import 'dotenv/config'
import './config/Passport';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';

import swaggerDocument from './util/swagger.json';
import { isAuth } from './middleware/IsAuth';
import logger from '~/util/Logger';
import UserRouter from './routes/UserRouter';
import TicketRouter from './routes/TicketRouter';

const corsOptions = {
    origin: 'http://localhost',
    credentials: true
}

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.use(express.json());

// Documentation middleware
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// passport middleware
app.use(passport.initialize());
//ROUTES
app.use(cors(corsOptions));
app.use('/user' ,UserRouter);
app.use('/ticket' ,isAuth, TicketRouter);

//LISTENER
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => {
        app.listen(process.env.PORT);
        logger.info(`Running on port ${process.env.PORT}`);
    })
    .catch(err => logger.error(err));