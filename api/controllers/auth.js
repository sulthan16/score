const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../../config/server')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async login (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })

      if (!user) {
        res.status(403).send({
          error: 'Wrong credentials!'
        })
      }

      const isPasswordValid = await user.comparePassword(password)

      if (!isPasswordValid) {
        res.status(403).send({
          error: 'Password Invalid'
        })
      }

      const userJson = user.toJSON();
      const jwt = jwtSignUser(userJson);
      user.update({
        token: jwt,
        updatedAt: new Date,
      }, {
        where: {
          id: userJson.id
        }
      })
      res.send({
        user: {
          email: userJson.email,
          id: userJson.id,
          createdAt: userJson.createdAt,
          updatedAt: userJson.updatedAt
        },
        token: jwt
      })
    } catch (err) {
      res.status(500).send({
        error: 'Error occured login!'
      })
    }
  }
}