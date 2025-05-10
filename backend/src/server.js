const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const routesv1 = require('./routes/v1');

// TODO: include cors and csp policies
//

app.use('/v1', routesv1);

server = app.listen(port, () => {
  console.log(`Started On port: ${port}`)
})
