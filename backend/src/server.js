import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routesv1 from './routes/v1/index.js'

dotenv.config()

const app = express()
const port = 3000

// allow cors.
app.use(
    cors({
        origin: 'http://localhost:5173',
    })
)

app.use(express.json())
app.use('/v1', routesv1)

app.listen(port, () => {
    console.log(`Started On port: ${port}`)
})
