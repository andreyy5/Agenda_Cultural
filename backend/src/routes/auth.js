import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import prisma from "../config/prisma.js"

const router = express.Router()

// Registro de usuário
router.post("/register", async (req, res) => {
  try {
    console.log("Registro de usuário:", req.body)
    const { name, email, password } = req.body

    // Verificar se usuário já existe
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ error: "Email já cadastrado" })
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        createdAt: true,
      },
    })

    // Gerar token
    const token = jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })

    res.status(201).json({ user, token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao registrar usuário" })
  }
})

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Buscar usuário
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" })
    }

    // Verificar senha
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(401).json({ error: "Credenciais inválidas" })
    }

    // Gerar token
    const token = jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      token,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao fazer login" })
  }
})

export default router
