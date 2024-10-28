import { Github, FileCode2, Home, Info, BookOpen, Users } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <h2 className="mb-4 text-lg font-semibold text-primary">FoodSV</h2>
            <p className="text-sm text-muted-foreground">
              Proyecto de codigo abierto para tener mas informacion sobre los alimentos que consumimos.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h3 className="mb-4 text-sm font-semibold text-primary">Links útiles</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-sm text-muted-foreground hover:text-primary">
                    <Home className="inline-block w-4 h-4 mr-2" />
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-sm text-muted-foreground hover:text-primary">
                    <Info className="inline-block w-4 h-4 mr-2" />
                    Información
                  </a>
                </li>
                <li>
                  <a href="/contribute" className="text-sm text-muted-foreground hover:text-primary">
                    <Users className="inline-block w-4 h-4 mr-2" />
                    Contribuir
                  </a>
                </li>
                <li>
                  <a href="/docs" className="text-sm text-muted-foreground hover:text-primary">
                    <BookOpen className="inline-block w-4 h-4 mr-2" />
                    Documentación
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold text-primary">Recursos</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/your-repo"
                    className="text-sm text-muted-foreground hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="inline-block w-4 h-4 mr-2" />
                    Repositorio de GitHub
                  </a>
                </li>
                <li>
                  <a href="/api" className="text-sm text-muted-foreground hover:text-primary">
                    <FileCode2 className="inline-block w-4 h-4 mr-2" />
                    API
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FoodSV
          </p>
        </div>
      </div>
    </footer>
  )
}
