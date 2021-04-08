import 'dotenv/config'
import './config/passport.ts';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';

import swaggerDocument from './util/swagger.json';
import { isAuth } from './middleware/isAuth';
import { successLog } from '~/util/Logger';

import UserRouter from './routes/UserRouter';

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.use(express.json());

// Documentation middleware
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// passport middleware
app.use(passport.initialize());

//ROUTES
app.use(cors());
app.use('/users' ,UserRouter);

//LISTENER
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(result => {
        app.listen(process.env.PORT);
        console.log(`Running on port ${process.env.PORT}`);
        successLog.log({
            level: 'low',
            message: "Api is running"
        })
    })
    .catch(err => console.log(err));