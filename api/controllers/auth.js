module.exports = {
  async login (req, res) {
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