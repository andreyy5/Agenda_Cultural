"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, DollarSign, Users, Loader2, Pencil, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { api } from "@/lib/api"
import { useAuthStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface EventDetailsProps {
  eventId: string
}

export function EventDetails({ eventId }: EventDetailsProps) {
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  const { user } = useAuthStore()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await api.getEvent(eventId)
        setEvent(data)
      } catch (error) {
        console.error("Erro ao carregar evento:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [eventId])

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await api.deleteEvent(eventId)
      toast({
        title: "Evento excluído!",
        description: "O evento foi removido com sucesso.",
      })
      router.push("/eventos")
    } catch (error: any) {
      toast({
        title: "Erro ao excluir evento",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      })
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!event) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">Evento não encontrado</p>
        <Button asChild className="mt-4">
          <Link href="/eventos">Voltar para eventos</Link>
        </Button>
      </div>
    )
  }

  const eventDate = new Date(event.date)
  const isOwner = user && event.user && user.id === event.user.id

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
        {event.imageUrl ? (
          <img src={event.imageUrl || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/30 to-accent/30">
            <span className="text-9xl">{event.category.charAt(0)}</span>
          </div>
        )}
        <Badge className="absolute top-4 right-4 text-lg py-2 px-4">{event.category}</Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>

          <div className="flex items-center gap-2 text-muted-foreground mb-6">
            <span>Organizado por</span>
            <span className="font-semibold text-foreground">{event.user.name}</span>
          </div>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-muted-foreground leading-relaxed">{event.description}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-semibold">Data e Hora</p>
                <p className="text-sm text-muted-foreground">
                  {format(eventDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </p>
                <p className="text-sm text-muted-foreground">{format(eventDate, "HH:mm")}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-semibold">Local</p>
                <p className="text-sm text-muted-foreground">{event.location}</p>
                <p className="text-sm text-muted-foreground">
                  {event.city.name}, {event.city.state}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-semibold">Ingresso</p>
                <p className="text-lg font-bold text-primary">
                  {event.price === 0 ? "Gratuito" : `R$ ${event.price.toFixed(2)}`}
                </p>
              </div>
            </div>

            {event.capacity && (
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold">Capacidade</p>
                  <p className="text-sm text-muted-foreground">{event.capacity} pessoas</p>
                </div>
              </div>
            )}
          </div>

          <Button className="w-full" size="lg">
            Participar do Evento
          </Button>

          {isOwner && (
            <div className="flex gap-2">
              <Button asChild variant="outline" className="flex-1 bg-transparent">
                <Link href={`/eventos/${eventId}/editar`}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Editar
                </Link>
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="flex-1" disabled={deleting}>
                    {deleting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Trash2 className="h-4 w-4 mr-2" />}
                    Excluir
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. O evento será permanentemente excluído.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Excluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
