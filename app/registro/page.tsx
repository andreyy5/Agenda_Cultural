import { RegisterForm } from "@/components/register-form"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Criar Conta</h1>
          <p className="text-muted-foreground">Junte-se à comunidade cultural</p>
        </div>

        <RegisterForm />

        <p className="text-center mt-6 text-sm">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-primary hover:underline font-semibold">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  )
}
