/**
 * A Register Controller
 */

import {validationResult} from 'express-validator';
import {getConnection} from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
  // errors
  const formErrors = req.formErrors ?? [];

  // input fields
  const inputs = [{
    name: 'email',
    label: 'E-mail',
    type: 'text',
    value: req.body?.email ?? '',
    error: req.formErrorFields?.email ?? ''
  }, {
    name: 'password',
    label: 'Password',
    type: 'password',
    value: req.body?.password ?? '',
    error: req.formErrorFields?.password ?? ''
  }];

  // render the register page
  res.render('register', {
    layout: 'authentication',
    inputs,
    formErrors,
  });
};

export const postRegister = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.formErrorFields = {};
      errors.array().forEach(({msg, param}) => {
        req.formErrorFields[param] = msg;
      });
      return next();
    }

    const userRepository = getConnection().getRepository('User');

    // Validate if user exists
    const user = await userRepository.findOne({
      where: {
        email: req.body.email
      }
    });

    if (user) {
      req.formErrors = [{message: 'Gebruiker bestaat reeds.'}];
      next();
    }

    // hash the password
    const hashedPassword = bcrypt.hashSync(req.body.password, 12);

    await userRepository.save({
      email: req.body.email,
      password: hashedPassword
    });

    res.redirect('/login');
  } catch (e) {
    next(e.message);
  }
};

export const login = async (req, res) => {
  // errors
  if (req.cookies.token) {
    return res.redirect('/');
  }
  const formErrors = req.formErrors ? req.formErrors : [];

  // input fields
  const inputs = [{
    name: 'email',
    label: 'E-mail',
    type: 'text',
    value: req.body?.email ?? '',
    error: req.formErrorFields?.email ?? ''
  }, {
    name: 'password',
    label: 'Password',
    type: 'password',
    value: req.body?.password ?? '',
    error: req.formErrorFields?.password ?? ''
  }];

  // render the login page
  res.render('login', {
    layout: 'authentication',
    inputs,
    formErrors
  });
};

export const postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.formErrorFields = {};
      errors.array().forEach(({msg, param}) => {
        req.formErrorFields[param] = msg;
      });
      return next();
    }

    const userRepository = getConnection().getRepository('User');

    // Validate if user exists
    const user = await userRepository.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!user) {
      req.formErrors = [{message: 'Gebruiker bestaat niet!.'}];
      return next();
    }

    const isEqual = bcrypt.compareSync(req.body.password, user.password);

    if (!isEqual) {
      req.formErrors = [{message: 'Wachtwoord in onjuist!'}];
      return next();
    }

    // Create a webtoken
    const token = jwt.sign(
      {userId: user.id, email: user.email},
      process.env.TOKEN_SALT,
      {expiresIn: '1h'}
    );

    // Add the cookie in response
    res.cookie('token', token, {httpOnly: true});

    // Redirect to home page
    res.redirect('/');
  } catch (e) {
    next(e.message);
  }
};

export const logout = (req, res, next) => {
  try {
    res.clearCookie('token');
    return res.redirect('/login');
  } catch (e) {
    next(e.message);
  }
};