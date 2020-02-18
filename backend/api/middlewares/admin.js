const passport = require("passport");

module.exports = (req, res, next) => {
    passport.authenticate('jwt', function(err, user, info) {
        if (err) return next(err);

        if (!user.is_admin) return res.status(401).json({message: "Not an admin"});

        req.user = user;

        next();

    })(req, res, next);
};