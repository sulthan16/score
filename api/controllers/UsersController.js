const { User, Company } = require('../models');
module.exports = {
    async get(req, res) {
        try {
            const num = (req.query.num)
                ? req.query.num : 10;

            const search = (req.query.search)
                ? req.query.search : ''

            let where = {};

            if (req.user.dataValues.CompanyId) {
                if (req.query.level) {
                    where = {
                        CompanyId: req.user.dataValues.CompanyId,
                        level: req.query.level
                    }
                } else {
                    where = {
                        CompanyId: req.user.dataValues.CompanyId
                    }
                }
            }

            const user = await User.findAll({
                limit: num,
                where,
                include: [Company]
            })

            res.status(200).send({ result: user, status: 200 });
        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: 'error while fething data user APIs'
            })
        }
    },
    async store(req, res) {
        try {
            const user = await User.create({
                email: req.body.email,
                password: req.body.password,
                level: req.body.level,
                CompanyId: req.body.CompanyId,
                RoleId: req.body.RoleId
            });
            res.status(200).send({ result: user, status: 200 });
        } catch (err) {
            res.status(500).send({
                error: 'error while inserting data user APIs'
            })
        }
    },
    async put(req, res) {
        try {
            const user = await User.update({
                email: req.body.email,
                password: req.body.password,
                level: req.body.level,
                CompanyId: req.body.CompanyId,
                RoleId: req.body.RoleId
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.status(200).send({ result: user, status: 200 });
        } catch (err) {
            res.status(500).send({
                error: 'error while inserting data user APIs'
            })
        }
    },
    async delete(req, res) {
        try {
            const { userId } = req.params;
            const user = await User.findByPk(userId);
            if (user.RoleId !== 1) {
                await user.destroy();
                res.status(200).send({
                    status: 200,
                    result: user
                })
            }else {
                res.status(200).send({
                    status: 200,
                    result: {},
                    message: 'Cannot Delete Administrator'
                })
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: 'error while trying delete Api'
            })
        }
    }
}