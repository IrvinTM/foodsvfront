import { Github, Twitter, Linkedin, Database, FileCode2, Home, Info, BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <h2 className="mb-4 text-lg font-semibold text-primary">Open Source Food Classification</h2>
            <p className="text-sm text-muted-foreground">
              An open-source project dedicated to classifying food items using machine learning. Join our community and
              contribute to making food recognition technology accessible to everyone.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h3 className="mb-4 text-sm font-semibold text-primary">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-sm text-muted-foreground hover:text-primary">
                    <Home className="inline-block w-4 h-4 mr-2" />
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-sm text-muted-foreground hover:text-primary">
                    <Info className="inline-block w-4 h-4 mr-2" />
                    About
                  </a>
                </li>
                <li>
                  <a href="/contribute" className="text-sm text-muted-foreground hover:text-primary">
                    <Users className="inline-block w-4 h-4 mr-2" />
                    Contribute
                  </a>
                </li>
                <li>
                  <a href="/docs" className="text-sm text-muted-foreground hover:text-primary">
                    <BookOpen className="inline-block w-4 h-4 mr-2" />
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold text-primary">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/your-repo"
                    className="text-sm text-muted-foreground hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="inline-block w-4 h-4 mr-2" />
                    GitHub Repository
                  </a>
                </li>
                <li>
                  <a href="/api" className="text-sm text-muted-foreground hover:text-primary">
                    <FileCode2 className="inline-block w-4 h-4 mr-2" />
                    API
                  </a>
                </li>
                <li>
                  <a href="/dataset" className="text-sm text-muted-foreground hover:text-primary">
                    <Database className="inline-block w-4 h-4 mr-2" />
                    Dataset
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Open Source Food Classification. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://twitter.com/your-account" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://www.linkedin.com/company/your-company"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
