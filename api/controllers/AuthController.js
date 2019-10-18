const { User, RoleAccess, Module, Feature } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../../config/server')
const _lo = require('lodash');

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
          include: [{ model: Feature, include: [Module] }],
        })
      }
      let menuTitle = [];
      let menuChild = [];
      let c = [];
      roleAccess.map(value => {
        menuTitle.push({ id: value.Feature.Module.id, name: value.Feature.Module.name });
        menuChild.push({
          id: value.Feature.id,
          name: value.Feature.name,
          show: value.show === '1',
          read: value.read === '1',
          put: value.put === '1',
          delete: value.delete === '1',
          create: value.create === '1',
          path: value.Feature.path, ModuleId: value.Feature.ModuleId
        });
      })
      if (menuChild.length > 0) {
        c = _lo.uniqBy(menuTitle, 'id');
        let d = _lo.map(c, function (o) {
          let e = _lo.filter(menuChild, function (item) {
            return o.id === item.ModuleId;
          });
          return e;
        });
        c.map((item) => {
          _lo.forEach(d, function (value, key) {
            let f = value[key].ModuleId;
            if (item.id === f) {
              item.menu = value
            }
          });
          return item
        });
        c.map(item => {
          if (item.menu === undefined) {
            c.filter(el => el.id !== item.id);
          }
          return item
        })
        c = _lo.sortBy(c, [function (o) { return o.id; }]);
      }

      res.status(200).send({
        user: {
          email: userJson.email,
          id: userJson.id,
          menu: c,
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