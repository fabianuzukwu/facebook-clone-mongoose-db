require('dotenv').config()
require('./database/database')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4090
const userRouter = require('./routers/userRouter')
const postRouter = require('./routers/postRouter')


app.use(express.json())
app.use(userRouter)
app.use(postRouter)

 app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`)
       })
