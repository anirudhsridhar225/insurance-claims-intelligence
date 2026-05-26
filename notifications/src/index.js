import express from 'express'

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', (req, res) => {
    console.log("main health check")
    res.json({ message : "hello world" })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})