import Ticket from '../models/Ticket';
import logger from '~/util/Logger';
import User from '~/models/User';
import { Types } from 'mongoose';

export const getTickets = async(req, res) => {
    const user = res.locals.user;
    let ticketsArray: Array<any> = [];
    if (user.role === 'user') {
        return getTicketsUser(req, res);
    } else {
        for (let i=0; i<user.organizations.length; i++) {
            try {
                let tickets = await getTicketsAdmin(req, res, user.organizations[i]);
                ticketsArray = ticketsArray.concat(tickets);
            } catch (err) {
                logger.error(err);
                const status = err.statusCode || 500;
                res.status(status).json({message: err})
                res.end()
            }
        }
        return res.status(200).send(ticketsArray);
    }
}

export const getTicket = (req, res) => {
    const id = req.params.id;
    Ticket.findById(id)
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json({message: err})
    });
}

export const postTicket = (req, res) => {
    const ticket = new Ticket(req.body);
    ticket.save()
    .then(result => {
        res.status(201).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json({message: err})
    });
}

export const putTicket = (req, res) => {
    const id = req.params.id;
    const ticket: any = new Ticket(req.body);
    Ticket.updateOne({ _id: id }, {
        assignee: ticket.assignee,
        status: ticket.status,
        comments: ticket.comments,
        tag: ticket.tag
     })
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json({message: err})
    });
}

const getTicketsUser = (req, res) => {
    Ticket.find({ user: req.locals.user._id })
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json({message: err})
    });
}

const getTicketsAdmin = (req, res, organization) => {
    return Ticket.aggregate([
        {
            "$lookup": {
                "from": User.collection.name,
                "localField": "creator",
                "foreignField": "_id",
                "as": "creator"
            }
        },
        { "$unwind": "$creator" },
        { "$match": { "creator.organizations": Types.ObjectId(organization)}},
        { "$set": {"creator": "$creator._id"}},
    ])
}