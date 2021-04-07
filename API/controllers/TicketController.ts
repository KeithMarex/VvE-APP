import Ticket from '../models/Ticket';

export const getTickets = async (req, res) => {
    Ticket.find({ user: req.locals.user._id })
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        const status = err.statusCode || 500;
        res.status(status).json({message: err})
    });
}