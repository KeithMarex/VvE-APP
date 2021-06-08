import Agenda_item from "~/models/Agenda_item"
import logger from "~/util/Logger";


export const postAgenda = (req, res) => {
    const item = createAgenda(req, res);//new Agenda_item(req.body);

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
        $or: [{
            date: {
                $gte: from,
                $lte: to
            }},
            {
            $and: [{date: {$lte: from}}, {enddate: {$gte: from}}]
            }
        ],
        organisation: res.locals.user.organizations[0]
    })
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
        date: newAgenda.date,
        enddate: newAgenda.enddate
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

export const getAgendaNext = (req, res) => {
    let filterDate = getToday();

    Agenda_item.findOne({
        date: {
            $gte: filterDate
        },
        organisation: res.locals.user.organizations[0]
    })
    .sort('date')
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json({message: err})
    });
}

export const getAgendaDetails = (req, res) => {
    const id = req.params.id;

    Agenda_item.findById(id)
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json({message: err})
    });
}

const createAgenda = (req, res) => {
    req.body.organisation = res.locals.user.organizations[0]

    return new Agenda_item(req.body);
}

const getMonthTimeFrame = (monthString) => { // YYYY-MM
    let from = new Date(monthString);
    let to = new Date(from);
    to.setMonth(to.getMonth() + 1);

    return [from, to];
}

function getToday() {
    let checkingDate = new Date(Date.now());
    checkingDate.setHours(0, 0, 0, 0);
    return checkingDate;
}
