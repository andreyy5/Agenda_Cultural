"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { useState } from "react"
import { useEventStore } from "@/lib/store"

export function EventFilters() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const { fetchEvents } = useEventStore()

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (search) params.append("search", search)
    if (category) params.append("category", category)
    fetchEvents(params.toString())
  }

  return (
    <div className="bg-card p-6 rounded-lg border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Input
            placeholder="Buscar eventos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">Todas</SelectItem>
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

        <Button onClick={handleSearch} className="w-full">
          <Search className="h-4 w-4 mr-2" />
          Buscar
        </Button>
      </div>
    </div>
  )
}
