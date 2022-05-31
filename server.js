const express = require('express')
const bodyParser = require('body-parser')
require('./src/config/dbCon').createConnction().then().catch()
const app = express()
const userRoute = require('./src/routes/mainRoute')
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use('/', userRoute)
app.post('/', (req, res) => {
    return res.json(req.body)
})
const PORT = 3000
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log('info',
        `
        ################################################
        🛡️  Server listening on port: ${PORT} 🛡️
        ################################################
    `,);
})