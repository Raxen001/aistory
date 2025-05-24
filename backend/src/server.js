import express from 'express';
import dotenv from 'dotenv';
import routesv1 from './routes/v1/index.js';
import cors from 'cors';

dotenv.config();
const app = express()
const port = 3000

// allow cors.
app.use(
    cors({
        origin: 'http://localhost:5173'
    })
);

app.use('/v1', routesv1);

app.listen(port, () => {
  console.log(`Started On port: ${port}`)
})
