"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCityStore } from "@/lib/store"
import { MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import { Loader2 } from "lucide-react"

export default function CitiesPage() {
  const { cities, loading, fetchCities } = useCityStore()

  useEffect(() => {
    fetchCities()
  }, [fetchCities])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Cidades</h1>
          <p className="text-muted-foreground">Explore eventos culturais em diferentes cidades</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <Link key={city.id} href={`/eventos?city=${city.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {city.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{city.state}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>
                      {city._count?.events || 0} evento{city._count?.events !== 1 ? "s" : ""}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {cities.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">Nenhuma cidade cadastrada ainda</p>
          </div>
        )}
      </div>
    </div>
  )
}
