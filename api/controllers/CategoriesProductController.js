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
    },
    async store(req, res) {
		try {
			const category = await Category.create(req.body)
			res.send(songs)
		} catch (err) {
			console.log(err)
			res.status(500).send({
				error: 'error while insert data songs APIs'
			})
		}
	},
    async delete(req, res) {
		try {
			const { categoryId } = req.params
			const category = await Category.findByPk(categoryId)
			await category.destroy()
			res.status(200).send({
				status: 200,
				result: category
			})
		} catch (err) {
			console.log(err);
			res.status(500).send({
				error: 'error while trying delete Api'
			})
		}
	}
}