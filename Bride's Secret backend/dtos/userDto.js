const { body, check } = require('express-validator');

exports.userRegisterDTO = [
    body('UserName')
        .isString().isLength({ min: 3, max: 20 })
    ,
       body('email')
        .isEmail()
    ,
    body('password')
        .isLength({ min: 8 }).withMessage('Check ur password')
    // .isStrongPassword()
    ,
    check().custom((value, { req }) => {
        const allowedProps = ["UserName", "email", "password"];
        const unallowedProps = Object.keys(req.body).filter(prop => !allowedProps.includes(prop))
        if (unallowedProps.length > 0) {
            throw new Error(`Unexpected Fields : ${unallowedProps.join(',')}`);

        }
        return true;
    })
]

