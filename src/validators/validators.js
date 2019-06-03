const User = require('../models/UserModels')

exports.UserValidator = function (req, res, next) {
    req.check('email', 'Invalid email.').isEmail()
    req.check('email', 'Email is required.').notEmpty()
    req.check('name', 'Username is required.').notEmpty()
    req.check('name', 'Username must be than 2 characters').isLength()
    req.check('name', 'Username must be less 30 characters').isLength()
    req.password('password', 'Password must be more than 6 characters.').isLength()
    req.password('password', 'Password must is required.').notEmpty()
    req.password('password', 'Password confirm is required.').notEmpty()
    req.password('password', 'Password  mismatch').equaks(req.body.password)

    //check for errors
    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError})
    } next()
}

exports.PostValidator = function (req, res, next) {
    //title
    req.check('title', 'Title is required.').notEmpty();
    req.check('title', 'Title must be between 4 to 150 characters').isLength({ min: 4, max: 150 });
    //content
    req.check('content', 'Write a content').notEmpty();
    req.check('content', 'Content must be between 4 to 2000 characters').isLength({ min: 4, max: 2000 });

    //check for errors
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
}