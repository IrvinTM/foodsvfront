import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface searchWithFilterProps {
  handleSearch: (searchTerm: string, searchCategories: string[]) => void;
}


const categories = [
  { id: "Snaks", name: "Snaks" },
  { id: "Vegetables", name: "Vegetales" },
  { id: "Grains", name: "Granos" },
  { id: "Sweets", name: "Dulces" },
  { id: "Beverages", name: "Bevidas" },
  { id: "Condiments", name: "Condimentos" },
]

export default function SearchWithFilter({  handleSearch } : searchWithFilterProps) {

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(searchTerm, selectedCategories)
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-grow">
          <Input
            type="search"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Categorias</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filtrar por Categoria</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
              >
                {category.name}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button type="submit">Buscar</Button>
      </form>
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Categorias Seleccionadas:{" "}
          <span className="font-semibold">
            {selectedCategories.length > 0
              ? selectedCategories.map((id) => categories.find(c => c.id === id)?.name).join(", ")
              : "Todas"}
          </span>
        </p>
      </div>
    </div>
  )
}
