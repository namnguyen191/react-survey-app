const requireCredits = (req, res, next) => {
    if (req.user.credits < 1) {
        return res.status(402).send({ err: 'Not enough  credits!' });
    }

    next();
};

export default requireCredits;
