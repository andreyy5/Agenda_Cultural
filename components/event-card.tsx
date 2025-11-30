import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, DollarSign } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface Event {
  id: number
  title: string
  description: string
  date: string
  location: string
  category: string
  imageUrl?: string
  price: number
  city: {
    name: string
    state: string
  }
}

export function EventCard({ event }: { event: Event }) {
  const eventDate = new Date(event.date)

  return (
    <Link href={`/eventos/${event.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
        <div className="relative h-48 bg-muted overflow-hidden">
          {event.imageUrl ? (
            <img src={event.imageUrl || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
              <span className="text-4xl">{event.category.charAt(0)}</span>
            </div>
          )}
          <Badge className="absolute top-2 right-2">{event.category}</Badge>
        </div>

        <CardContent className="p-4 flex-1">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{event.title}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{format(eventDate, "d 'de' MMMM, yyyy", { locale: ptBR })}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>
                {event.city.name}, {event.city.state}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <DollarSign className="h-4 w-4" />
            <span>{event.price === 0 ? "Gratuito" : `R$ ${event.price.toFixed(2)}`}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
