/**
 * A Register Controller
 */

import {validationResult} from 'express-validator';

export const register = async (req, res) => {
  // errors
  const formErrors = [];

  // input fields
  const inputs = [{
    name: 'email',
    label: 'E-mail',
    type: 'text',
    value: req.body?.email ? req.body.email : '',
    error: req.formErrorFields?.email ? req.formErrorFields.email : ''
  }, {
    name: 'password',
    label: 'Password',
    type: 'password',
    value: req.body?.password ? req.body.password : '',
    error: req.formErrorFields?.password ? req.formErrorFields.password : ''
  }];

  // render the register page
  res.render('register', {
    layout: 'authentication',
    inputs,
    formErrors,
  });
};

export const postRegister = (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.formErrorFields = {};
      errors.array().forEach(({msg, param}) => {
        req.formErrorFields[param] = msg;
      });
      return next();
    }

  } catch (e) {
    next(e.message);
  }
};

export const login = async (req, res) => {
  // errors
  const formErrors = [];

  // input fields
  const inputs = [{
    name: 'email',
    label: 'E-mail',
    type: 'text'
  }, {
    name: 'password',
    label: 'Password',
    type: 'password'
  }];

  // render the login page
  res.render('login', {
    layout: 'authentication',
    inputs,
    formErrors
  });
};

export const postLogin = (req, res, next) => {
  try {

  } catch (e) {
    next(e.message);
  }
};

export const logout = (req, res, next) => {
  try {

  } catch (e) {
    next(e.message);
  }
};