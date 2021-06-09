import Comment from "~/models/Comment"
import Ticket from "~/models/Ticket";
import logger from "~/util/Logger";
import { sendMailToBestuur, sendMailToBewoner } from "~/util/Mailer";

export const postComment = async(req, res) => {
    const comment = createComment(req, res);
    
    comment.save()
    .then(result => {
        // Comment aangemaakt, nu toevoegen aan ticket.
        pushCommentToTicket(req, res, result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json({message: err});
    });
}

const createComment = (req, res) => {
    req.fields.user = res.locals.user._id;
    if (res.locals.images) {
        req.fields.images = res.locals.images;
    }
    return new Comment(req.fields);
}

const pushCommentToTicket = (req, res, commentObject) => {
    Ticket.updateOne(
        { _id: req.fields.ticketID },
        { $push: { comments: commentObject._id }}
    )
    .then( () => {
        //Bestuurder mail
        sendMailToBestuur("[VvE] Er is een nieuw bericht op een ticket", "bericht_bestuurder.html");

        //Bewoner mail
        sendMailToBewoner("[VvE] U heeft een bericht geplaatst", "bericht_bewoner.html", res.locals.user._id);
    
        res.status(200).send(commentObject);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json({message: err});
    });

}

