/**
 * A Register Controller
 */

export const register = async (req, res) => {
  // errors
  const formErrors = [{
    message: 'Another annoying error.'
  }, {
    message: 'Something went wrong.'
  }];

  // input fields
  const inputs = [{
    name: 'email',
    label: 'E-mail',
    type: 'text',
    error: 'Something went wrong'
  }, {
    name: 'password',
    label: 'Password',
    type: 'password'
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