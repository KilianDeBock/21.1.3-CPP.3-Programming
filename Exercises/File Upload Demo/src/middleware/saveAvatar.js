/**
 * Middleware to save our avatar
 */

import sharp from 'sharp';
import { PUBLIC_PATH } from '../consts.js';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

/**
 *
 * @param {*} req The request
 * @param {*} res The response
 * @param {*} next The callback for the next funtion in the chain
 * @returns
 */
export const saveAvatar = async (req, res, next) => {
  // get the file out of response
  const file = req.file;

  // if there is no file go to next chain in the middleware
  if (!file) return next();

  // Validate incoming
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    const ext = file.originalname.split('.').pop();
    await sharp(file.buffer)
      .resize(128, 128, {
        fit: sharp.fit.cover,
        withoutEnlargement: true,
      })
      .toFile(path.join(PUBLIC_PATH, 'images', 'avatars', `${uuidv4()}.${ext}`));
    // Go  to the next chain
    next();
  } else {
    console.error('The given file was incorect.');
  }
};