import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import cityRoutes from "./routes/cities.js"
import eventRoutes from "./routes/events.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/cities", cityRoutes)
app.use("/api/events", eventRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Agenda Cultural API is running" })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: "Algo deu errado!" })
})

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
  console.log(`📍 API disponível em http://localhost:${PORT}/api`)
})
