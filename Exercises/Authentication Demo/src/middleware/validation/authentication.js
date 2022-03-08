import {body} from 'express-validator';

/**
 * The authentication validators
 */

export default [
  body('email')
    .notEmpty()
    .withMessage('Email is een verplicht veld')
    .bail()
    .isEmail()
    // .normalizeEmail()
    .withMessage('Email is niet juist.'),
  body('password')
    .isLength({min: 6})
    .withMessage('Wachtwoord moet minstens 6 karakters lang zijn.'),
];