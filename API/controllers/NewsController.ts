import News from "~/models/News";
import logger from "~/util/Logger";


export const postNews = (req, res) => {
    const news = createNews(req, res);

    news.save()
    .then(result => {
        res.status(201).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json({message: err});
    });
}

export const getAllNews = (req, res) => {
    const organizationid = res.locals.user.organizations[0];
    News.find({ organization: organizationid })
    .select('-organization')
    .populate('thumbnail')
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json({message: err})
    });
}

export const getNews = (req, res) => {
    const id = req.params.id;
    News.findById(id)
    .populate('thumbnail')
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json({message: err})
    });
}

export const deleteNews = (req, res) => {
    const id = req.params.id;
    News.deleteOne({_id: id})
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json({message: err})
    });
}

const createNews = (req, res) => {
    req.fields.organization = res.locals.user.organizations[0];
    if(res.locals.images) {
        req.fields.thumbnail = res.locals.images[0];
    }

    return new News(req.fields);
}