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

export const putAgenda = (req, res) => {
    const id = req.params.id;
    const newAgenda : any = new Agenda_item(req.body);
    Agenda_item.updateOne({_id: id}, {
        title: newAgenda.title,
        description: newAgenda.description,
        date: newAgenda.date
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

export const deleteAgenda = (req, res) => {
    const id = req.params.id;
    Agenda_item.deleteOne({_id: id})
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json({message: err})
    });
}

const getMonthTimeFrame = (monthString) => { // YYYY-MM
    let from = new Date(monthString);
    let to = new Date(from);
    to.setMonth(to.getMonth() + 1);

    return [from, to];
}