import User from '../models/User';
import Organization from '../models/Organization';
import logger from '~/util/Logger';
import fs from 'fs';
import { Types } from 'mongoose';
import { Response } from 'express';
import { validateTheme } from '../validators/ThemeValidator';
import File from '../models/File';
import path from 'path';

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

export const putOrganizationTheme = (req, res: Response ) => {
    const body = validateTheme(req.body);
    Organization.updateOne({ _id: Types.ObjectId(res.locals.user.organizations[0]) }, {"$set": body})
    .then ( () => {
        res.status(200).json({ message: "Success" })
    })
    .catch( err => {
        logger.error(err);
        res.status(400).json({ message: err })
    })
}

export const getOrganization = (req, res) => {
    const organizationid = res.locals.user.organizations[0];
    Organization.findById(organizationid)
    .populate("logo")
    .select("-emailcredentials")
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json({message: err});
    });
}

export const putOrganization = (req, res) => {
    const organizationid = res.locals.user.organizations[0];
    Organization.findOneAndUpdate({_id: organizationid },
        buildUpdateQuery(req, res),
        {new: true})
    .populate("logo")
    .select("-emailcredentials")
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json( { message: err } )
    });
}

export const postFile = (req, res) => {
    const file = createFile(req, res, req.files.file);

    file.save()
    .then(() => {
        res.status(200).send({message: "File uploaded successfully"});
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json( { message: err } )
    });
}

export const getFiles = (req, res) => {
    const organizationid = res.locals.user.organizations[0]
    File.find({ organisation: organizationid})
    .select('-data')
    .then(result => {

        res.status(200).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json( { message: err } )
    });
}

export const getFile = (req, res) => {
    const id = req.params.id;
    const organizationid = res.locals.user.organizations[0];
    
    File.findOne({ _id: id, organisation: organizationid })
    .then(file => {
        serveFileFromTemp(req, res, file);        
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json( { message: err } )
    });
}

export const deleteFile = (req, res) => {
    const id = req.params.id;

    File.deleteOne({_id: id})
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json( { message: err } )
    });
}

const buildUpdateQuery = (req, res) => {
    let query = {}
    if(req.fields.name) {
        query["name"] = req.fields.name;
    }

    if(res.locals.images) {
        query["logo"] = res.locals.images[0];
    }

    return query;
}

const createFile = (req, res, file) => {
    let fileInstance = new File({
        filename: file.name,
        type: file.type,
        data: fs.readFileSync(file.path),
        filesize: fs.statSync(file.path).size,
        organisation: res.locals.user.organizations[0]
    });

    return fileInstance;
}

const serveFileFromTemp = (req, res, file) => {
    const dir = path.join("./", 'temp/')
    const writePath = dir + file["filename"]
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    fs.writeFileSync(writePath, file["data"]);

    res.sendFile(file["filename"], {
        root: dir
    }, err => {
        if(err)
            logger.error(err);
        fs.unlinkSync(writePath);
    });
}