"use client"

import { useEffect, useState } from "react"
import { EventCard } from "@/components/event-card"
import { useEventStore } from "@/lib/store"
import { Loader2 } from "lucide-react"

export function EventsGrid() {
  const { events, loading, fetchEvents } = useEventStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchEvents()
  }, [fetchEvents])

  if (!mounted) return null

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">Nenhum evento encontrado</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
