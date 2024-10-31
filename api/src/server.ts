import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import { router } from './routes'
import { AppDataSource } from './datasource'
import { exemploDeUso } from './init'

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api", router)

AppDataSource.initialize().then(() => {
    console.log('Database initialized')
    exemploDeUso();
    app.listen(3000, () => {
        console.log('Server running on port 3000')
    })
}).catch((error) => console.log(error))