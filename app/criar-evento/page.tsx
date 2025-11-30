import { EventForm } from "@/components/event-form"

export default function CreateEventPage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Criar Novo Evento</h1>
          <p className="text-muted-foreground">Compartilhe seu evento cultural com a comunidade</p>
        </div>

        <EventForm />
      </div>
    </div>
  )
}
