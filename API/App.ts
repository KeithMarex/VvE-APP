require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` })
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
import TagRouter from './routes/TagRouter';
import CommentRouter from './routes/CommentRouter';
import AgendaRouter from './routes/Agenda_itemRouter';
import OrganizationRouter from './routes/OrganizationRouter';
import NewsRouter from './routes/NewsRouter';

const corsOptions = {
    origin: `http://localhost:${process.env.APP_PORT}`,
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
app.use('/user', UserRouter);
app.use('/organization', isAuth, OrganizationRouter);
app.use('/tag', isAuth, TagRouter);
app.use('/ticket' ,isAuth, TicketRouter);
app.use('/comment', isAuth, CommentRouter);
app.use('/agenda', isAuth, AgendaRouter);
app.use('/news', isAuth, NewsRouter);

//LISTENER
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => {
        app.listen(process.env.PORT);
        logger.info(`Running on port ${process.env.PORT}`);
    })
    .catch(err => logger.error(err));