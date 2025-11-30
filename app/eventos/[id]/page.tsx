"use client"

import { useParams } from "next/navigation"
import { EventDetails } from "@/components/event-details"

export default function EventDetailPage() {
  const params = useParams()
  const id = params.id as string

  return (
    <div className="min-h-screen">
      <EventDetails eventId={id} />
    </div>
  )
}
