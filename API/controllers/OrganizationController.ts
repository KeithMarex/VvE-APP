import User from '../models/User';
import Organization from '../models/Organization';
import logger from '~/util/Logger';
import { Types } from 'mongoose';
import { Response } from 'express';

export const getUsersOrganization = (req, res: Response) => {
    User.find({
        "organizations": Types.ObjectId(res.locals.user.organizations[0]),
        "role": "admin"
    }).select('-password')
    .then(result => {
        res.status(200).json(result)
    })
    .catch( err => {
        logger.error(err);
        res.status(400).json({message: err})
    })
}

export const getOrganizationTheme = (req, res: Response ) => {
    Organization.findById(res.locals.user.organizations[0]).populate('Theme').select('Theme')
    .then( result => {
        res.status(200).json(result)
    })
    .catch( err => {
        logger.error(err);
        res.status(500).json({ message: err })
    })
}