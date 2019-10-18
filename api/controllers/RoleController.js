const { RoleAccess } = require('../models');
module.exports = {
    async get(req, res) {
        try {
            const num = (req.query.num)
                ? req.query.num : 10;

            const search = (req.query.search)
                ? req.query.search : ''

            const categories = await RoleAccess.findAll({
                limit: num,
                // where: {
                //     $or: [
                //         'title'
                //     ].map(value => ({
                //         [value]: {
                //             $like: `%${search}%`
                //         }
                //     }))
                // }
            })
            res.status(200).send({ result: categories, status: 200 });
        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: 'error while fething data categories APIs'
            })
        }
    },
    async store(req, res) {
        try {
            const roleAccess = await RoleAccess.create({
                title: req.body.title,
                thumb: req.body.thumb
            });
            res.status(200).send({ result: roleAccess, status: 200 });
        } catch (err) {
            res.status(500).send({
                error: 'error while inserting data products APIs'
            })
        }
    },
    async put(req, res) {
        try {
            const roleAccess = await RoleAccess.update({
                title: req.body.title,
                thumb: req.body.thumb
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.status(200).send({ result: roleAccess, status: 200 });
        } catch (err) {
            res.status(500).send({
                error: 'error while inserting data products APIs'
            })
        }
    },
    async delete(req, res) {
        try {
            const { roleAccessId } = req.params
            const roleAccess = await RoleAccess.findByPk(roleAccessId)
            await RoleAccess.destroy()
            res.status(200).send({
                status: 200,
                result: roleAccess
            })
        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: 'error while trying delete Api'
            })
        }
    }
}