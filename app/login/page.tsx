import { LoginForm } from "@/components/login-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Bem-vindo de volta</h1>
          <p className="text-muted-foreground">Entre na sua conta para continuar</p>
        </div>

        <LoginForm />

        <p className="text-center mt-6 text-sm">
          Não tem uma conta?{" "}
          <Link href="/registro" className="text-primary hover:underline font-semibold">
            Cadastre-se aqui
          </Link>
        </p>
      </div>
    </div>
  )
}
