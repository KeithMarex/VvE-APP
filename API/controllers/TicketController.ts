import Ticket from '../models/Ticket';
import logger from '~/util/Logger';
import User from '~/models/User';
import { sendMailToBestuur, sendMailToBewoner } from '~/util/Mailer';
import { Types } from 'mongoose';
import { resolve6 } from 'dns';

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
    Ticket.findById(id).populate('images')
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
    const ticket = createTicket(req, res);
    ticket.save()
    .then(result => {
        //Bestuurder mail
        sendMailToBestuur("[VvE] Er is een nieuwe ticket aangemaakt", "ticket_bestuurder.html");

        //Bewoner mail
        sendMailToBewoner("[VvE] U heeft een ticket aangemaakt", "ticket_aangemaakt_bewoner.html", res.locals.user._id);

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
    Ticket.find({ creator: Types.ObjectId(res.locals.user._id) })
    .then(result => {
        console.log("This is the response: ", result)
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

const createTicket = (req, res) => {
    req.fields.creator = res.locals.user._id;
    if (res.locals.images) {
        req.fields.images = res.locals.images;
    }
    return new Ticket(req.fields);
}