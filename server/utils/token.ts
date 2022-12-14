import jwt from "jsonwebtoken"

export const generateToken = (params = {}) => {
  return jwt.sign(params, process.env.PRIVATE_KEY, {
    expiresIn: 86400,
  });
}