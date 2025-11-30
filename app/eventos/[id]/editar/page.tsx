"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuthStore, useCityStore } from "@/lib/store"
import { api } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { format } from "date-fns"

interface EditEventFormProps {
  eventId: string
}

export function EditEventForm({ eventId }: EditEventFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [price, setPrice] = useState("0")
  const [capacity, setCapacity] = useState("")
  const [cityId, setCityId] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const { user } = useAuthStore()
  const { cities, fetchCities } = useCityStore()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchCities()
  }, [fetchCities])

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const fetchEvent = async () => {
      try {
        const event = await api.getEvent(eventId)

        // Verifica se o usuário é o criador do evento
        if (event.user.id !== user.id) {
          toast({
            title: "Acesso negado",
            description: "Você não tem permissão para editar este evento.",
            variant: "destructive",
          })
          router.push(`/eventos/${eventId}`)
          return
        }

        // Preenche o formulário com os dados do evento
        setTitle(event.title)
        setDescription(event.description)
        setDate(format(new Date(event.date), "yyyy-MM-dd'T'HH:mm"))
        setLocation(event.location)
        setCategory(event.category)
        setImageUrl(event.imageUrl || "")
        setPrice(event.price.toString())
        setCapacity(event.capacity?.toString() || "")
        setCityId(event.cityId.toString())
      } catch (error: any) {
        toast({
          title: "Erro ao carregar evento",
          description: error.message || "Tente novamente mais tarde.",
          variant: "destructive",
        })
        router.push("/eventos")
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [eventId, user, router, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      await api.updateEvent(eventId, {
        title,
        description,
        date,
        location,
        category,
        imageUrl: imageUrl || undefined,
        price: Number.parseFloat(price),
        capacity: capacity ? Number.parseInt(capacity) : undefined,
        cityId: Number.parseInt(cityId),
      })

      toast({
        title: "Evento atualizado!",
        description: "As alterações foram salvas com sucesso.",
      })
      router.push(`/eventos/${eventId}`)
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar evento",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) return null

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg border">
      <div className="space-y-2">
        <Label htmlFor="title">Título do evento</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Show de Música ao Vivo"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descreva os detalhes do seu evento..."
          rows={5}
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Data e hora</Label>
          <Input id="date" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger>
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Música">Música</SelectItem>
              <SelectItem value="Teatro">Teatro</SelectItem>
              <SelectItem value="Artes Visuais">Artes Visuais</SelectItem>
              <SelectItem value="Cinema">Cinema</SelectItem>
              <SelectItem value="Literatura">Literatura</SelectItem>
              <SelectItem value="Festival">Festival</SelectItem>
              <SelectItem value="Dança">Dança</SelectItem>
              <SelectItem value="Gastronomia">Gastronomia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Local</Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Ex: Teatro Municipal, Rua Principal 123"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cityId">Cidade</Label>
        <Select value={cityId} onValueChange={setCityId} required>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a cidade..." />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city.id} value={city.id.toString()}>
                {city.name}, {city.state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Preço (R$)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            required
          />
          <p className="text-xs text-muted-foreground">Digite 0 para eventos gratuitos</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="capacity">Capacidade (opcional)</Label>
          <Input
            id="capacity"
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="Ex: 100"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">URL da imagem (opcional)</Label>
        <Input
          id="imageUrl"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://exemplo.com/imagem.jpg"
        />
      </div>

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
          Cancelar
        </Button>
        <Button type="submit" className="flex-1" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            "Salvar Alterações"
          )}
        </Button>
      </div>
    </form>
  )
}
