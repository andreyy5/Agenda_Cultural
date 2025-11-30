import express from "express"
import prisma from "../config/prisma.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

// Listar todos os eventos
router.get("/", async (req, res) => {
  try {
    const { city, category, search } = req.query

    const where = {}

    if (city) {
      where.cityId = Number.parseInt(city)
    }

    if (category) {
      where.category = category
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    const events = await prisma.event.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        city: true,
      },
      orderBy: { date: "asc" },
    })

    res.json(events)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao buscar eventos" })
  }
})

// Buscar evento por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const event = await prisma.event.findUnique({
      where: { id: Number.parseInt(id) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        city: true,
      },
    })

    if (!event) {
      return res.status(404).json({ error: "Evento não encontrado" })
    }

    res.json(event)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao buscar evento" })
  }
})

// Criar evento
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, description, date, location, category, imageUrl, price, capacity, cityId } = req.body

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
        category,
        imageUrl,
        price: Number.parseFloat(price) || 0,
        capacity: capacity ? Number.parseInt(capacity) : null,
        userId: req.user.id,
        cityId: Number.parseInt(cityId),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        city: true,
      },
    })

    res.status(201).json(event)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao criar evento" })
  }
})

// Atualizar evento
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, date, location, category, imageUrl, price, capacity, cityId } = req.body

    // Verificar se o evento pertence ao usuário
    const existingEvent = await prisma.event.findUnique({
      where: { id: Number.parseInt(id) },
    })

    if (!existingEvent) {
      return res.status(404).json({ error: "Evento não encontrado" })
    }

    if (existingEvent.userId !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ error: "Acesso negado" })
    }

    const event = await prisma.event.update({
      where: { id: Number.parseInt(id) },
      data: {
        title,
        description,
        date: new Date(date),
        location,
        category,
        imageUrl,
        price: Number.parseFloat(price) || 0,
        capacity: capacity ? Number.parseInt(capacity) : null,
        cityId: Number.parseInt(cityId),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        city: true,
      },
    })

    res.json(event)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao atualizar evento" })
  }
})

// Deletar evento
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params

    // Verificar se o evento pertence ao usuário
    const existingEvent = await prisma.event.findUnique({
      where: { id: Number.parseInt(id) },
    })

    if (!existingEvent) {
      return res.status(404).json({ error: "Evento não encontrado" })
    }

    if (existingEvent.userId !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ error: "Acesso negado" })
    }

    await prisma.event.delete({ where: { id: Number.parseInt(id) } })
    res.json({ message: "Evento deletado com sucesso" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao deletar evento" })
  }
})

export default router
