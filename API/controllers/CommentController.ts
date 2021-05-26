import Comment from "~/models/Comment"
import Ticket from "~/models/Ticket";
import logger from "~/util/Logger";
import { getAllBoardMemberMails, getMailFromCreatorObject, sendMail } from "~/util/Mailer";


export const postComment = async(req, res) => {
    const comment = createComment(req, res);
    
    comment.save()
    .then(result => {
        // Comment aangemaakt, nu toevoegen aan ticket.
        Ticket.updateOne(
            { _id: req.fields.ticketID },
            { $push: { comments: result._id }}
        ).then(async resultmodified => {
            sendMail("[VvE] Er is een nieuwe bericht op een ticket", 'bericht_bestuurder.html', await getAllBoardMemberMails());

            //Bewoner mail
            sendMail("[VvE] U heeft een bericht geplaatst", "bericht_bewoner.html", await getMailFromCreatorObject(res.locals.user._id));

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