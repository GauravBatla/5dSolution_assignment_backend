const mongoose = require('mongoose')
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

exports.createConnction = () => {

    return new Promise((resove, reject) => {
        var connectionString = `mongodb://localhost:27017/newAssignment`;
        mongoose.connect(connectionString);
        mongoose.connection.on('connected', function () {
            console.log(("Mongoose default connection is open to ", connectionString));
            resove(("Mongoose default connection is open to ", connectionString))
        });
        mongoose.connection.on('error', function (err) {
            reject(err)
            console.log(("Mongoose default connection has occured " + err + " error"));

        });
        mongoose.connection.on('disconnected', function () {
            reject("db connection disonnect")
            console.log(("Mongoose default connection is disconnected"));
        });
    })
}