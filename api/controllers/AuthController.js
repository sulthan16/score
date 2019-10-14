const { User, RoleAccess, Module, Feature } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../../config/server')

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async login(req, res) {
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

      let roleAccess = null;
      if (userJson.RoleId) {
        roleAccess = await RoleAccess.findAll({
          where: {
            RoleId: userJson.RoleId
          },
          include: [{ model: Module }, { model: Feature }],
        })
      }

      res.status(200).send({
        user: {
          email: userJson.email,
          id: userJson.id,
          role: roleAccess,
          createdAt: userJson.createdAt,
          updatedAt: userJson.updatedAt
        },
        token: jwt
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Error occured login!'
      })
    }
  }
}