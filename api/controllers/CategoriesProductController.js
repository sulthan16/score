const { Category } = require('../models');
module.exports = {
    async get(req, res) {
        try {
            const num = (req.query.num)
                ? req.query.num : 10;

            const search = (req.query.search)
                ? req.query.search : ''

            const categories = await Category.findAll({
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
    }
}