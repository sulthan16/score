const Joi = require('joi')

module.exports = {
    register(req, res, next) {
        const schema = {
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            )
        }

        const { error } = Joi.validate(req.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'You must provide valid email address!'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: `The password provided failed to match the follwing rule
              <br>
              1. It Must contain Only the following characters: lower case, Uppercase, and number
              <br>
              2. It Mustbe at least  8 Characters in length and not greater than 32
              `
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'Invalid registration information'
                    })
            }
        } else {
            next()
        }
    }
}
