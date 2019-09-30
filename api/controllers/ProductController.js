const db = require('../models');
module.exports = {
	async get(req, res) {
		try {
			const { num } = req.query
			// const search = (req.query.search) ? req.query.search : ''

			const stocks = await db.sequelize.query(
				'SELECT c.*,p.*,ct.title as categoryTitle FROM stocks c LEFT JOIN stocks c2 ON c.ProductId = c2.ProductId AND c.createdAt < c2.createdAt LEFT JOIN products p ON c.ProductId = p.id LEFT JOIN categories ct ON ct.id = p.CategoryId WHERE c2.createdAt is NULL GROUP BY c.ProductId', {
				replacements: { limit: 10, shorting: 'DESC' }
			})

			res.status(200).send({ result: stocks[0], status: 200 });
		} catch (err) {
			console.log(err);
			res.status(500).send({
				error: 'error while fething data products APIs'
			})
		}
	}
}