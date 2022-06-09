const { validationResult } = require('express-validator');

exports.runValidation = (req, res, next) => {
    const errors = validationResult(req);
    console.log("errrr: ", errors);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() });
    }
    next();
};