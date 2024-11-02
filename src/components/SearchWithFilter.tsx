import { useContext, useEffect, useState } from "react"
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
import { AppContext } from "@/AppContext"
import { myContext } from "@/types/types"




const categories = [
  { id: "SNACKS", name: "Snaks" },
  { id: "VEGETABLES", name: "Vegetales" },
  { id: "GRAINS", name: "Granos" },
  { id: "SWEETS", name: "Dulces" },
  { id: "BEVERAGES", name: "Bevidas" },
  //todo condiments: fix according to the backend
  { id: "CONDIMENTS", name: "Condimentos" },
]

export default function SearchWithFilter() {

  const data = useContext<myContext>(AppContext)

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  }


  useEffect(() => {
const categoriesString = selectedCategories.map((id) => categories.find(c => c.id === id)?.id).join(",")
    data.setCategories(categoriesString)
  }, [selectedCategories, data.setCategories, data])

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <Input
            type="search"
            placeholder="Buscar..."
            value={data.searchTerm}
            onChange={(e) => data.setSearchTerm(e.target.value)}
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
                onCheckedChange={() => {toggleCategory(category.id) }}
              >
                {category.name}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button onClick={() => {data.handleSearch(0,5)}}>Buscar</Button>
      </div>
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
