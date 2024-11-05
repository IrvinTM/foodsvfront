import { useEffect, useState } from 'react'
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
import { FoodItem, Category, NovaClasification, } from '@/types/types'
import Bar from '../components/Bar.tsx'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

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
    servingSize: 22,
  })

  const [isAuth, setIsAuth] = useState<boolean>(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFoodItem(prev => ({ ...prev, [name]: name === 'name' || name === 'image' || name === 'description' ? value : parseFloat(value) }))
  }


  const handleAuth = (token:string)=>{
    setIsAuth(true)
    document.cookie = `g_t=${token}; expires=${new Date(Date.now() + 40 * 60 * 1000).toUTCString()};`
    console.log("the cookie is"+ getCookie("g_t"))
  }

  function getCookie(name: string): string | null {
    const cookieArray: string[] = document.cookie.split('; ');

    for (const cookie of cookieArray) {
      const [cookieName, cookieValue] = cookie.split('=');

      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }

    return null; 
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFoodItem(prev => ({ ...prev, [name]: value }))
    
  }

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:8080/api/foods/add",{
      method: "POST",
      headers: {
        "content-Type": "application/json",
        "Authorization": `Bearer ${getCookie("g_t")}`
      },
      body: JSON.stringify(foodItem),
    });
    if(response.ok){
      toast({
        title: await response.json()
      })
    }
  }
    
  const { toast } = useToast()

  useEffect(()=>{
    if(getCookie("g_t") !== null){
      setIsAuth(true)
    }else{
      setIsAuth(false)
    }}, [])

  const Form = ()=>{
    return( 
      <div className="space-y-4 flex flex-col items-center mt-2 pb-4">
        <div>
          <Label className='font-bold' htmlFor="name">Nombre</Label>
          <Input value={foodItem.name } className="rounded w-80" id="name" name="name" placeholder="Nombre del Alimento" onChange={handleInputChange} />
        </div>
      
        <div>
          <div>
            <Label className='font-bold' htmlFor="description">Descripcion</Label>
            <Input value={foodItem.description} className="rounded w-80" id="description" name="description" placeholder="Descripcion del Alimento" onChange={handleInputChange} />
          </div>

          <Label className='font-bold' htmlFor="image">URL de la Imagen</Label>
          <Input value={foodItem.image} className="rounded w-80" id="image" name="image" placeholder="http://imagenes.com/imagen.jpg" onChange={handleInputChange} />
        </div>

        <div  className="rounded w-80 ">
          <Label className='font-bold' htmlFor="category">Categorias </Label>
          <Select onValueChange={handleSelectChange('category')} value={foodItem.category}>
            <SelectTrigger  >
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent  className="rounded w-80">
              {Array.from(Category).map(([key, value]) => (
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
              {Array.from(NovaClasification).map(([key, value]) => (
                <SelectItem key={key} value={value}>
                  {key}
                </SelectItem>
              ))}
            </SelectContent>

          </Select>
        </div>

        <div>

          <Label className='font-bold' htmlFor="calories">Calorias</Label>
          <Input value={foodItem.calories} type='number' className="rounded w-80" id="calories" name="calories" placeholder={"0"} onChange={handleInputChange} />
        </div>

        <div>

          <Label className='font-bold' htmlFor="protein">Proteinas</Label>
          <Input value={foodItem.protein} type='number' className="rounded w-80" id="protein" name="protein" placeholder={"0g"} onChange={handleInputChange} />
        </div>
        <div>

          <Label className='font-bold' htmlFor="carbs">Carboidratos</Label>
          <Input value={foodItem.carbs} type='number' className="rounded w-80" id="carbs" name="carbs" placeholder="0g" onChange={handleInputChange} />
        </div>
 
        <div>

          <Label className='font-bold' htmlFor="sodium">Sodio</Label>
          <Input value={foodItem.sodium} type='number' className="rounded w-80" id="sodium" name="sodium" placeholder="0mg" onChange={handleInputChange} />
        </div>

        <div>

          <Label className='font-bold' htmlFor="sugar">Azucar</Label>
          <Input value={foodItem.sugar} type='number' className="rounded w-80" id="sugar" name="sugar" placeholder="0g" onChange={handleInputChange} />
        </div>

        <div>

          <Label className='font-bold' htmlFor="cholesterol">Colesterol</Label>
          <Input value={foodItem.cholesterol} type='number' className="rounded w-80" id="cholesterol" name="cholesterol" placeholder={"0mg"} onChange={handleInputChange} />
        </div>
 

        <div>

          <Label className='font-bold' htmlFor="saturatedFats">Grasa Saturada</Label>
          <Input value={foodItem.saturatedFats} type='number' className="rounded w-80" id="saturatedFats" name="saturatedFats" placeholder="0g" onChange={handleInputChange} />
        </div>

        <div>

          <Label className='font-bold' htmlFor="transFats">Grasas Trasn</Label>
          <Input value={foodItem.transFats} type='number' className="rounded w-80" id="transFats" name="transFats" placeholder="0g" onChange={handleInputChange} />
        </div>

        <div>

          <Label className='font-bold' htmlFor="totalFats">Grasas Totales</Label>
          <Input value={foodItem.totalFats} type='number' className="rounded w-80" id="totalFats" name="totalFats" placeholder="0g" onChange={handleInputChange} />
        </div>
        <div>

          <Label className='font-bold' htmlFor="servingSize">Tamano de la porcion</Label>
          <Input value={foodItem.servingSize} type='number' className="rounded w-80" id="servingSize" name="servingSize" placeholder="0g" onChange={handleInputChange} />
        </div>


 
        <Button onClick={handleSubmit}>Agregar</Button>

      </div>
    )
  }
  return (
    <div>

      <Bar/>
      {
        !isAuth ? <div className="flex flex-col justify-center items-center pt-4">
          <h2 className="font-bold mb-4">You must login</h2>
          <br />
          <br />
          <GoogleLogin onSuccess={(credentialResponse: CredentialResponse)=>{ if(credentialResponse.credential === undefined){
            toast({title:"error"})
          }else{
            handleAuth(credentialResponse.credential)

          }}} onError={()=>{toast({title: "There was an error logging in"})}} />
        </div> : <Form/>

      }
      <Toaster />
    </div>

  )
}
