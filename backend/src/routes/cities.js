import express from "express"
import prisma from "../config/prisma.js"
import { authenticateToken, isAdmin } from "../middleware/auth.js"

const router = express.Router()

// Listar todas as cidades
router.get("/", async (req, res) => {
  try {
    const cities = await prisma.city.findMany({
      include: {
        _count: {
          select: { events: true },
        },
      },
      orderBy: { name: "asc" },
    })
    res.json(cities)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao buscar cidades" })
  }
})

// Buscar cidade por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const city = await prisma.city.findUnique({
      where: { id: Number.parseInt(id) },
      include: {
        events: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })

    if (!city) {
      return res.status(404).json({ error: "Cidade não encontrada" })
    }

    res.json(city)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao buscar cidade" })
  }
})

// Criar cidade (Admin)
router.post("/", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { name, state } = req.body
    const city = await prisma.city.create({
      data: { name, state },
    })
    res.status(201).json(city)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao criar cidade" })
  }
})

// Atualizar cidade (Admin)
router.put("/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params
    const { name, state } = req.body
    const city = await prisma.city.update({
      where: { id: Number.parseInt(id) },
      data: { name, state },
    })
    res.json(city)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao atualizar cidade" })
  }
})

// Deletar cidade (Admin)
router.delete("/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params
    await prisma.city.delete({ where: { id: Number.parseInt(id) } })
    res.json({ message: "Cidade deletada com sucesso" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao deletar cidade" })
  }
})

export default router
