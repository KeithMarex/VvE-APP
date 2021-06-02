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
    let [from, to] = getMonthTimeFrame(req.params.month);

    Agenda_item.find({
        date: {
            $gte: from,
            $lte: to
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

const getMonthTimeFrame = (monthString) => { // YYYY-MM
    let from = new Date(monthString);
    let to = new Date(from);
    to.setMonth(to.getMonth() + 1);

    return [from, to];
}