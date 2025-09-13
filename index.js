import express from "express"
import path from "path"
import fs from "fs"
import http from "http"
import booksRoutes from "./routes/book.routes.js"
import authorsRoutes from "./routes/auth.routes.js"

const app = express()
// parser your data to avoid undefined
app.use(express.json())


app.get("/", (req, res) => {
    res.send("Hello World from server status 200")
})
app.use('/books',booksRoutes)
app.use('/authors',authorsRoutes)

app.use((req, res) => {
  res.status(404).json({ message: "endpoint not found" });
});
const port = ":4000"
app.listen(4000, () => console.log(`Server is running on http://localhost${port}`))