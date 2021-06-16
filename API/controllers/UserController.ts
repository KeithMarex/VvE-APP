import User from '../models/User';
import { createTokens } from '../util/Auth';
import bcrypt from 'bcryptjs';
import logger from '~/util/Logger';
import generator from 'generate-password';
import { Types } from 'mongoose';
import { sendMail } from '~/util/Mailer';

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
            return res.status(400).json({ message: 'Email or password incorrect' });
        }
    })
    .catch(err => {
        logger.error(err);
        return res.status(400).json({ message: "Email or password incorrect" });
    });
}

// Creating a new users and generate password
export const register = async(req, res) => {
    const users = await createUsers(req.body, res.locals.user);
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

export const getUsers = (req, res) => {
    User.find({
        "organizations": Types.ObjectId(res.locals.user.organizations[0])
    }).select('-password')
    .then(result => {
        res.status(200).json(result)
    })
    .catch( err => {
        logger.error(err);
        res.status(400).json({message: err})
    })
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

export const putUser = (req, res) => {
    const id = req.params.id;
    User.findOneAndUpdate({ _id: req.params.id },
        buildUpdateQuery(req, res),
        {new: true})
    .select("-password")
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json( { message: err } )
    });
}

export const deleteUser = (req, res) => {
    User.deleteOne({ _id: Types.ObjectId(req.params.id) })
    .then(() => {
        res.status(200).send({message: "User deleted succesfully"});
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 404;
        res.status(status).json({message: err})
    });
}

// Creates all the user objects and generates a password for them
const createUsers = async(body: Array<any>, user) => {
    const passwords = generator.generateMultiple(body.length, {
        length: 10,
        numbers: true,
    })

    const users = [];

    for (let i=0; i < body.length; i++) {
        body[i].password = await bcrypt.hash(passwords[i], 12);
        body[i].organizations = [user.organizations[0]]
        users.push(new User(body[i]));
        sendMail("Account has been created", {
            firstname: body[i].firstname,
            lastname: body[i].lastname,
            password: passwords[i],
            email: body[i].email}, "register");
    }

    return users;
}

export const resetPassword = async (req, res) => {
    const email = req.body.email;
    if(email === undefined)
        res.status(500).send({message: "No email defined"});

    const password = generator.generate({length: 10, numbers: true});
    User.findOneAndUpdate({ email: email }, {
        password: await bcrypt.hash(password, 12)
    })
    .then(result => {
        sendMail("Password has been reset", {
            firstname: result["firstname"],
            lastname: result["lastname"],
            password: password,
            email: email
        }, "resetPassword");

        res.status(200).send({message: "Password reset successfully"})
    })
    .catch(err => {
        logger.error(err);
        const status = err.statusCode || 500;
        res.status(status).json({ message: err })
    });
}

const removePasswords = async(users: Array<any>) => {
    for (let i=0; i < users.length; i++) {
        users[i].password = null;
    }

    return users;
}

const buildUpdateQuery = (req, res) => {
    let query = {}

    if(req.body.role) {
        query["role"] = req.body.role;
    }

    return query;
}