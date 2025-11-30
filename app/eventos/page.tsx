import { EventsGrid } from "@/components/events-grid"
import { EventFilters } from "@/components/event-filters"

export default function EventsPage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Todos os Eventos</h1>
          <p className="text-muted-foreground">Descubra os melhores eventos culturais da sua região</p>
        </div>

        <EventFilters />

        <div className="mt-8">
          <EventsGrid />
        </div>
      </div>
    </div>
  )
}
