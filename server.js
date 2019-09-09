const PORT = process.env.PORT || 5000;
const { sequelize } = require('./api/models');
const app = require('./app');

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server started on port ${PORT}`);
        });
    });


