const requireLogin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ err: 'You must login' })
    }

    next();
};

export default requireLogin;