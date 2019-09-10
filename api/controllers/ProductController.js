module.exports = {
  async getProduct (req, res) {
    try {
      res.send({
        user: 'hallo world'
      })
    } catch (err) {
      res.status(500).send({
        error: 'Error occured login!'
      })
    }
  }
}