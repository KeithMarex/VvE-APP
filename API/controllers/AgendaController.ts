import { now } from "mongoose";
import Agenda_item from "~/models/Agenda_item"
import logger from "~/util/Logger";


export const postAgenda = (req, res) => {
    const item = new Agenda_item(req.body);

    item.save()
    .then(result => {
        res.status(201).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status.json({message: err}));
    })
}

export const getAgenda = (req, res) => {
    Agenda_item.find({
        date: {
            $gte: req.params.from,
            $lte: req.params.to
    }})
    .then(result => {
        res.status(201).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status.json({message: err}));
    });
}