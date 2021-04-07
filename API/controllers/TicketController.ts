import Ticket from '../models/Ticket';

export const getTickets = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
    .then( async(user: any) => {
        const isEqual = await bcrypt.compare(password, user.password)

        if (isEqual) {
            const [accesstoken, refreshToken] = createTokens(user);
            res.cookie('access-token', accesstoken, { maxAge: 60 * 60 * 24 * 7 * 1000 , httpOnly: true, secure: true });
            res.cookie('refresh-token', refreshToken, { maxAge: 60 * 60 * 24 * 7 * 1000, httpOnly: true, secure: true });
            user.password = null;
            return res.status(200).json(user);
        } else {
            return res.status(401).json({ message: 'Password incorrect' });
        }
    })
    .catch(err => {
        return res.status(500).json({ message: err });
    });
}

// Creating a new user and giving tokens for authentication
export const register = async(req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, 12);
    const user = new User(req.body);

    user.save()
    .then((result: any) => {
        const [accesstoken, refreshToken] = createTokens(result);
        res.cookie('access-token', accesstoken, { maxAge: 60 * 60 * 24 * 7 * 1000 , httpOnly: true, secure: true });
        res.cookie('refresh-token', refreshToken, { maxAge: 60 * 60 * 24 * 7 * 1000, httpOnly: true, secure: true });
        result.password = null;
        res.status(201).send(result);
    })
    .catch(err => {
        const status = err.statusCode || 500;
        res.status(status).json({message: err});
    });
}

export const getUser = (req, res) => {
    const id = req.params.id;
    User.findById(id).select('-password')
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        const status = err.statusCode || 500;
        res.status(status).json({message: err})
    });
}
