"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Menu, X } from "lucide-react"
import { useState } from "react"
import { useAuthStore } from "@/lib/store"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuthStore()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Calendar className="h-6 w-6 text-primary" />
            <span>Agenda Cultural</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/eventos" className="hover:text-primary transition-colors">
              Eventos
            </Link>
            <Link href="/cidades" className="hover:text-primary transition-colors">
              Cidades
            </Link>

            {user ? (
              <>
                <Button asChild variant="outline">
                  <Link href="/criar-evento">Criar Evento</Link>
                </Button>
                <Button variant="ghost" onClick={logout}>
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/login">Entrar</Link>
                </Button>
                <Button asChild>
                  <Link href="/registro">Cadastrar</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="/eventos"
              className="block py-2 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Eventos
            </Link>
            <Link
              href="/cidades"
              className="block py-2 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cidades
            </Link>

            {user ? (
              <>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/criar-evento" onClick={() => setMobileMenuOpen(false)}>
                    Criar Evento
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                  }}
                >
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    Entrar
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/registro" onClick={() => setMobileMenuOpen(false)}>
                    Cadastrar
                  </Link>
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
