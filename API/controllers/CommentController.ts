import Comment from "~/models/Comment"
import Ticket from "~/models/Ticket";
import logger from "~/util/Logger";


export const postComment = async(req, res) => {
    const comment = createComment(req, res);
    
    comment.save()
    .then(result => {
        // Comment aangemaakt, nu toevoegen aan ticket.
        Ticket.updateOne(
            { _id: req.fields.ticketID },
            { $push: { comments: result._id }}
        ).then(resultmodified => {
            res.status(200).send(result);
        })
        .catch(err => {
            logger.error(err);
            const status = err.statusCode || 500;
            res.status(status).json({message: err});
        });
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json({message: err});
    });
}

const createComment = (req, res) => {
    req.fields.creator = res.locals.user._id;
    if (res.locals.images) {
        req.fields.images = res.locals.images;
    }
    return new Comment(req.fields);
}