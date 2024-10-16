import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";

export default function Bar() {
  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm transition-shadow duration-300 data-[scrolled=true]:shadow-md">
        <div className="flex h-16 items-center px-4 md:px-6 justify-between">
          <a href="#" className="flex items-center gap-2">
            <MountainIcon className="h-6 w-6" />
          </a>
          <nav className="hidden lg:flex lg:gap-6">
            <a
              target="_blank"
              href="https://github.com/IrvinTM"
              className="text-sm font-extrabold text-muted-foreground transition-colors hover:text-foreground" 
            >
              Github
            </a>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-xs bg-background p-6"
            >
              <div className="grid gap-4">
                <a
                  target="_blank"
                  href="https://github.com/IrvinTM"
                  className="text-sm text-center font-extrabold text-muted-foreground transition-colors hover:text-foreground"
                >
                  Github
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8  5 4  5-5 5 15H2L8 3z" />
    </svg>
  );
}
