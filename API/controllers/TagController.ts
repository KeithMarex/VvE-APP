import Tag from '../models/Tag';
import logger from '~/util/Logger';

export const getTags = async (req, res) => {
    const organizationid = res.locals.user.organizations[0];

    Tag.find({organization: organizationid})
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json({message: err})
    });
}

export const getTag = async (req, res) => {
    const id = req.params.id;
    Tag.findById(id)
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json({message: err})
    });
}

export const postTag = async (req, res) => {
    const tag = new Tag(req.body);
    tag.save()
    .then(result => {
        res.status(201).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json({message: err})
    });
}

export const putTag = async (req, res) => {
    const id = req.params.id;
    const tag: any = new Tag(req.body);
    Tag.updateOne({ _id: id }, {
        name: tag.name,
        color: tag.color,
     })
    .then(() => {
        res.status(200);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json({message: err})
    });
}

export const deleteTag = async (req, res) => {
    const id = req.params.id;
    Tag.deleteOne({_id: id})
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json({message: err})
    });
}