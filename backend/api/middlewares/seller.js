const passport = require("passport");

module.exports = (req, res, next) => {
    passport.authenticate('jwt', function(err, user, info) {
        if (err) return next(err);

        if (!user.is_seller) return res.status(401).json({message: "Not a seller"});

        req.user = user;

        next();

    })(req, res, next);
};