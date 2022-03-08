/**
 * The JWT authentication middleware
 */

import jwt from 'jsonwebtoken';

export const jwtAuth = (req, res, next) => {
  const token = req.cookies.token;

  try {
    req.user = jwt.verify(token, process.env.TOKEN_SALT);
    next();
  } catch (e) {
    res.clearCookie('token');
    return res.redirect('/login');
  }
};