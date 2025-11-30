import { Hero } from "@/components/hero"
import { EventsGrid } from "@/components/events-grid"
import { FeaturedCategories } from "@/components/featured-categories"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedCategories />
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Próximos Eventos</h2>
          </div>
          <EventsGrid />
        </div>
      </section>
    </div>
  )
}
