const db = require('../models');
const { Product, Stock } = require('../models');
module.exports = {
	async get(req, res) {
		try {
			const search = (req.query.barcode) ? req.query.barcode : '';
			const stocks = await db.sequelize.query(
				'SELECT c.*,p.*,ct.title as categoryTitle FROM stocks c LEFT JOIN stocks c2 ON c.ProductId = c2.ProductId AND c.createdAt < c2.createdAt LEFT JOIN products p ON c.ProductId = p.id LEFT JOIN categories ct ON ct.id = p.CategoryId WHERE c2.createdAt is NULL GROUP BY c.ProductId', {
				replacements: { limit: 10, shorting: 'DESC', barcode: search }
			})

			res.status(200).send({ result: stocks[0], status: 200 });
		} catch (err) {
			res.status(500).send({
				error: 'error while fething data products APIs'
			})
		}
	},
	async store(req, res) {
		try {
			const product = await Product.create({
				title: req.body.title,
				thumb: req.body.thumb,
				images: req.body.images,
				price: req.body.price,
				sellPrice: req.body.sellPrice,
				barcode: req.body.barcode,
				discon: req.body.thumb,
				CategoryId: req.body.CategoryId
			});
			if (product.id) {
				await Stock.create({
					stock: 20,
					type: req.body.type,
					total: req.body.total || 20,
					ProductId: product.id
				})
			}
			res.status(200).send({ result: product, status: 200 });
		} catch (err) {
			res.status(500).send({
				error: 'error while inserting data products APIs'
			})
		}
	},
	async delete(req, res) {
		try {
			const { id } = req.params
			const product = await Product.findByPk(id);
			await Stock.destroy({ where: { ProductId: id } })
			await product.destroy()
			res.status(200).send({
				status: 200,
				result: null
			})
		} catch (err) {
			console.log(err);
			res.status(500).send({
				error: 'error while trying delete Api'
			})
		}
	}
}