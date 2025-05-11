import express from 'express';

const app = express()
const port = 3000

import routesv1 from './routes/v1/index.js';

// const cors = require('cors');
// TODO: include cors and csp policies
//

app.use('/v1', routesv1);

app.listen(port, () => {
  console.log(`Started On port: ${port}`)
})
