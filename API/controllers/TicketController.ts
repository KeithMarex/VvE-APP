import Ticket from '../models/Ticket';
import logger from '~/util/Logger';

export const getTickets = (req, res) => {
    if (req.locals.user.role === 'user') {
        getTicketsUser(req, res);
    } else {
        getTicketsAdmin(req, res);
    }
}

export const getTicket = async (req, res) => {
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

export const postTicket = async (req, res) => {
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

export const putTicket = async (req, res) => {
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

const getTicketsAdmin = (req, res) => {
    Ticket.find({ organizations: req.locals.user.organizations })
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json({message: err})
    });
}