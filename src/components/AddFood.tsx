import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { FoodItem, Category, NovaClasification } from '@/types/types'
import Bar from '../components/Bar.tsx'

export default function AddFood() {
  const [foodItem, setFoodItem] = useState<FoodItem>({
    name: "",
    description: "",
    image: "",
    category: "",
    calories: 0,
    protein: 0,
    cholesterol: 0,
    carbs: 0,
    sugar: 0,
    sodium: 0,
    warnings: [],
    totalFats: 0,
    novaGroup: "",
    saturatedFats: 0,
    transFats: 0,
    servingSize: 0,
  })


  const novaClasifications: Map<NovaClasification, string> = new Map([
    [NovaClasification.PROCESSED_FOODS, "Alimentos procesados"],
    [NovaClasification.ULTRA_PROCESSED_FOODS, "Alimentos ultraprocesados"],
    [NovaClasification.PROCESSED_CULINARY_INGREDIENTS, "Ingredientes culinarios procesados"],
    [NovaClasification.UNPROCESSED_OR_MINIMALLY_PROCESSED_FOODS, "Alimentos no procesados o mínimamente procesados"],
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFoodItem(prev => ({ ...prev, [name]: name === 'name' || name === 'image' ? value : parseFloat(value) }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFoodItem(prev => ({ ...prev, [name]: value }))
    
  }

  const handleSubmit = () => {
    toast({
      title: "Food item data:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(foodItem, null, 2)}</code>
        </pre>
      ),
    })
  }
  const { toast } = useToast()
  return (
    <div>
      <Bar/>
      <div className="space-y-4 flex flex-col items-center mt-2 pb-4">
        <div>
          <Label className='font-bold' htmlFor="name">Nombre</Label>
          <Input className="rounded w-80" id="name" name="name" placeholder="Nombre del Alimento" onChange={handleInputChange} />
        </div>
      
        <div>
          <div>
            <Label className='font-bold' htmlFor="description">Descripcion</Label>
            <Input className="rounded w-80" id="image" name="image" placeholder="Descripcion del Alimento" onChange={handleInputChange} />
          </div>

          <Label className='font-bold' htmlFor="image">URL de la Imagen</Label>
          <Input className="rounded w-80" id="image" name="image" placeholder="http://imagenes.com/imagen.jpg" onChange={handleInputChange} />
        </div>

        <div  className="rounded w-80 ">
          <Label className='font-bold' htmlFor="category">Categorias </Label>
          <Select onValueChange={handleSelectChange('category')} value={foodItem.category}>
            <SelectTrigger  >
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent  className="rounded w-80">
              {Array.of(Category).map(([key, value]) => (
                <SelectItem key={key} value={value}>
                  {key}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div  className="rounded w-80 ">
          <Label className='font-bold' htmlFor="nova-clasification">Clasificacion </Label>

          <Select onValueChange={handleSelectChange('novaGroup')} value={foodItem.novaGroup}>
            <SelectTrigger  >
              <SelectValue placeholder="Seleccionar categoria" />
            </SelectTrigger>
            <SelectContent  className="rounded w-80">
              {Array.from(novaClasifications).map(([key, value]) => (
                <SelectItem key={key} value={key.toString()}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>

          </Select>
        </div>

        <div>

          <Label className='font-bold' htmlFor="calories">Calorias</Label>
          <Input type='number' className="rounded w-80" id="calories" name="calories" placeholder={"0"} onChange={handleInputChange} />
        </div>

        <div>

          <Label className='font-bold' htmlFor="protein">Proteinas</Label>
          <Input type='number' className="rounded w-80" id="protein" name="protein" placeholder={"0g"} onChange={handleInputChange} />
        </div>

        <div>

          <Label className='font-bold' htmlFor="cholesterol">Colesterol</Label>
          <Input type='number' className="rounded w-80" id="colesterol" name="colesterol" placeholder={foodItem.cholesterol.toString()+"mg"} onChange={handleInputChange} />
        </div>
 
        <div>

          <Label className='font-bold' htmlFor="carbs">Carboidratos</Label>
          <Input type='number' className="rounded w-80" id="carbs" name="carbs" placeholder="0g" onChange={handleInputChange} />
        </div>
        <div>

          <Label className='font-bold' htmlFor="sugar">Azucar</Label>
          <Input type='number' className="rounded w-80" id="sugar" name="sugar" placeholder="0g" onChange={handleInputChange} />
        </div>

        <div>

          <Label className='font-bold' htmlFor="sodium">Sodio</Label>
          <Input type='number' className="rounded w-80" id="sodium" name="sodium" placeholder="0mg" onChange={handleInputChange} />
        </div>

        <div>

          <Label className='font-bold' htmlFor="totalFats">Grasas Totales</Label>
          <Input type='number' className="rounded w-80" id="totalFats" name="totalFats" placeholder="0g" onChange={handleInputChange} />
        </div>

        <div>

          <Label className='font-bold' htmlFor="saturatedFats">Grasa Saturada</Label>
          <Input type='number' className="rounded w-80" id="saturatedFats" name="saturatedFats" placeholder="0g" onChange={handleInputChange} />
        </div>

        <div>

          <Label className='font-bold' htmlFor="transFats">Grasas Trasn</Label>
          <Input type='number' className="rounded w-80" id="transFats" name="transFats" placeholder="0g" onChange={handleInputChange} />
        </div>

        <div>

          <Label className='font-bold' htmlFor="servingSize">Tamano de la porcion</Label>
          <Input type='number' className="rounded w-80" id="servingSize" name="servingSize" placeholder="0g" onChange={handleInputChange} />
        </div>
        <Button onClick={handleSubmit}>Submit</Button>

      </div>
      <Toaster />
    </div>

  )
}
