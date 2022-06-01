import express from 'express'
import routes from './routes/api/images'

const app = express()
const port = 3000

// Add routes.
app.use('/api', routes)

// Listening to the port.
app.listen(port, () => {
    console.log(`Server started at localhost:${port}`)
})
