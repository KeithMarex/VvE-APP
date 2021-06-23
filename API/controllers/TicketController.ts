import Ticket from '../models/Ticket';
import logger from '~/util/Logger';
import User from '~/models/User';
import { sendAdminMail, sendMail } from '~/util/Mailer';
import { validateBodyPutTicket } from '~/validators/TicketPutValidator';
import { Types } from 'mongoose';
import Tag from '~/models/Tag';

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
    Ticket.findById(id).populate('images').populate({
        path: 'comments',
        model: 'Comment',
        populate: [{
            path: 'images',
            model: 'Image'
        },{
            path: 'user',
            model: 'User'
        }]
    })
    .populate("creator", "-password")
    .populate("assignee", "-password")
    .populate("tag")
    .then(result => {
        res.status(200).send(removePasswordFromCommentUser(result));
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

        sendAdminMail("Er is een nieuwe ticket aangemaakt", {
            organization: res.locals.user.organizations[0],
            ticketTitle: result["title"],
            ticketDescription: result["description"],
            firstname: res.locals.user.firstname,
            lastname: res.locals.user.lastname }
        , "ticket");

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
    const body = validateBodyPutTicket(req.body);
    Ticket.updateOne({ _id: id }, body)
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json( { message: err } )
    });
}

const getTicketsUser = (req, res) => {
    Ticket.find({ creator: Types.ObjectId(res.locals.user._id) })
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
        {
            "$lookup": {
                "from": User.collection.name,
                "localField": "assignee",
                "foreignField": "_id",
                "as": "assignee"
            }
        },
        { "$unwind": "$assignee" },
        {
            "$lookup": {
                "from": Tag.collection.name,
                "localField": "tag",
                "foreignField": "_id",
                "as": "tag"
            }
        },
        { "$unwind": {path: "$tag", preserveNullAndEmptyArrays: true} },
        { "$project": {"creator.password": 0, "assignee.password": 0} }
    ])
}

const createTicket = (req, res) => {
    req.fields.creator = res.locals.user._id;
    if (res.locals.images) {
        req.fields.images = res.locals.images;
    }
    return new Ticket(req.fields);
}

const removePasswordFromCommentUser = (data) => {
    data.comments.forEach(comment => {
        if(comment.user)
            comment.user.password = null;
    });
    return data;
}