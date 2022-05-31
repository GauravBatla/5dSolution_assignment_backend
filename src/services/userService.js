
exports.add = (model, data) => {
    return new Promise((resolve, reject) => {
        model.create(data, (err, res) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            else {
                resolve(res)
            }
        })
    })
};

exports.find = (model, data) => {
    return new Promise((resolve, reject) => {
        model.find(data, (err, res) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            else {
                resolve(res)
            }
        })
    })
}
exports.update = (model, id,data) => {
    return new Promise((resolve, reject) => {
        model.findByIdAndUpdate(id,data, (err, res) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            else {
                resolve(res)
            }
        })
    })
}