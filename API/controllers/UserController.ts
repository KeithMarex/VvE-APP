import User from '../models/User';
import { createTokens } from '../util/Auth';
import bcrypt from 'bcryptjs';
import logger from '~/util/Logger';
import generator from 'generate-password';
import { Types } from 'mongoose';
import { Response } from 'express';

export const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
    .then( async(user: any) => {
        const isEqual = await bcrypt.compare(password, user.password)

        if (isEqual) {
            const [accesstoken, refreshToken] = createTokens(user);
            res.cookie('access-token', accesstoken, { maxAge: 60 * 60 * 24 * 40 * 1000 , httpOnly: true, secure: false });
            res.cookie('refresh-token', refreshToken, { maxAge: 60 * 60 * 24 * 40 * 1000, httpOnly: true, secure: false });
            user.password = null;
            return res.status(200).json(user);
        } else {
            return res.status(401).json({ message: 'Password incorrect' });
        }
    })
    .catch(err => {
        logger.error(err);
        return res.status(500).json({ message: err });
    });
}

// Creating a new users and generate password
export const register = async(req, res) => {
    const users = await createUsers(req.body);

    let i: number;
    try {
        for (i=0; i < users.length; i++) {
            await users[i].save()
        }
    }
    catch (err) {
        logger.error(err)
        const status = err.statusCode || 500;
        return res.status(status).json({ message: `Error when creating users only: ${i} users have been created` });
    }
    return res.status(201).json(await removePasswords(users));
}

export const getUser = (req, res) => {
    const id = req.params.id;
    User.findById(Types.ObjectId(id)).select('-password')
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json({message: err})
    });
}

export const getUsersOrganization = (req, res: Response) => {
    User.find({
        "organizations": req.params.id,
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

// Creates all the user objects and generates a password for them
const createUsers = async(body: Array<any>) => {
    const passwords = generator.generateMultiple(body.length, {
        length: 10,
        numbers: true,
    })

    const users = [];

    for (let i=0; i < body.length; i++) {
        body[i].password = await bcrypt.hash(passwords[i], 12);
        users.push(new User(body[i]))
    }

    return users;
}

const removePasswords = async(users: Array<any>) => {
    for (let i=0; i < users.length; i++) {
        users[i].password = null;
    }

    return users;
}