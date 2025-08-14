import express, { json } from 'express'
import { router } from './routes'
import { middlewares } from './medllewares/index'

const app = express()

app.use(json())
app.use(router)
app.use(middlewares.validateEditTask)


app.listen(3000, () => {
    console.log('servidor rodando na porta 3000')
})