import { Card } from "@/components/ui/card"
import { Music, Theater, Palette, Film, BookOpen, Users } from "lucide-react"
import Link from "next/link"

const categories = [
  { name: "Música", icon: Music, href: "/eventos?category=Música" },
  { name: "Teatro", icon: Theater, href: "/eventos?category=Teatro" },
  { name: "Artes Visuais", icon: Palette, href: "/eventos?category=Artes Visuais" },
  { name: "Cinema", icon: Film, href: "/eventos?category=Cinema" },
  { name: "Literatura", icon: BookOpen, href: "/eventos?category=Literatura" },
  { name: "Festivais", icon: Users, href: "/eventos?category=Festival" },
]

export function FeaturedCategories() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Categorias</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.name} href={category.href}>
                <Card className="p-6 hover:bg-accent transition-colors cursor-pointer h-full">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <Icon className="h-8 w-8 text-primary" />
                    <span className="font-semibold text-sm">{category.name}</span>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
