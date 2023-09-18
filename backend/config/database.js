const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((result) =>
        console.log("Mongoose connected to ", result.connections[0].host)
    )
    .catch((err) => console.log("error connecting to the database", err));

module.exports = mongoose;