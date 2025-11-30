import express from "express"
import prisma from "../config/prisma.js"
import { authenticateToken, isAdmin } from "../middleware/auth.js"

const router = express.Router()

// Listar todos os usuários (Admin)
router.get("/", authenticateToken, isAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        createdAt: true,
        _count: {
          select: { events: true },
        },
      },
    })
    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao buscar usuários" })
  }
})

// Buscar usuário por ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const user = await prisma.user.findUnique({
      where: { id: Number.parseInt(id) },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        createdAt: true,
        events: {
          include: {
            city: true,
          },
        },
      },
    })

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" })
    }

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao buscar usuário" })
  }
})

// Atualizar usuário
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const { name, email } = req.body

    // Verificar se é o próprio usuário ou admin
    if (req.user.id !== Number.parseInt(id) && !req.user.isAdmin) {
      return res.status(403).json({ error: "Acesso negado" })
    }

    const user = await prisma.user.update({
      where: { id: Number.parseInt(id) },
      data: { name, email },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
      },
    })

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao atualizar usuário" })
  }
})

// Deletar usuário
router.delete("/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params
    await prisma.user.delete({ where: { id: Number.parseInt(id) } })
    res.json({ message: "Usuário deletado com sucesso" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao deletar usuário" })
  }
})

export default router
