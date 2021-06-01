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
    // verwijderen
    let date = new Date();
    // date.setDate(Date.now());
    console.log(date.toISOString());

    Agenda_item.find()
    .then(result => {
        console.log(result);

        res.status(201).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status.json({message: err}));
    });
}