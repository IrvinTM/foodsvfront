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
import { Category, NovaClasification, FoodItemAdd, } from '@/types/types'
import Bar from '../components/Bar.tsx'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { apiUrl } from '@/AppContext.ts'

export default function AddFood() {
  const [foodItem, setFoodItem] = useState<FoodItemAdd>({
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
    total_fats: 0,
    nova_group: "",
    saturated_fats: 0,
    trans_fats: 0,
    serving_size: 0,
  })

  const [isAuth, setIsAuth] = useState<boolean>(false)
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setFoodItem((prevFoodItem) => ({
      ...prevFoodItem,
      [name]: name === "calories" || name === "protein" || name === "cholesterol" || 
            name === "carbs" || name === "sugar" || name === "sodium" || 
            name === "totalFats" || name === "saturatedFats" || name === "transFats" || 
            name === "servingSize" ? parseFloat(value) || 0 : value
    }));
  };



  const handleAuth = (token:string)=>{
    setIsAuth(true)
    document.cookie = `g_t=${token}; expires=${new Date(Date.now() + 60 * 60 * 1000).toUTCString()};`
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
    const cookie = getCookie("g_t")
    console.log("this is the cookie wer sending"+ cookie)
    const response = await fetch(`${apiUrl}/api/foods/add`,{
      method: "POST",
      headers: {
        "content-Type": "application/json",
        "Authorization": `Bearer ${cookie}`
      },
      body: JSON.stringify(foodItem),
    });
    if(response.ok){
      toast({
        title: "Food added"
      })
    }else{
      const res = await response.text()
      toast({
        title: "Error",
        description: res
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

  return (
    <div>

      <Bar/>
      {
        !isAuth ? <div className="flex flex-col justify-center items-center pt-4">
          <h2 className="font-bold mb-4">You must login</h2>
          <br />
          <br />
          <GoogleLogin onSuccess={(credentialResponse: CredentialResponse)=>{ if(credentialResponse.credential === undefined){
            toast({title:"error"});
          }else{
            console.log("full credential is "+credentialResponse.clientId)
            handleAuth(credentialResponse.credential)

          }}} onError={()=>{toast({title: "There was an error logging in"})}} />
        </div>

          :

          <div className="space-y-4 flex flex-col items-center mt-2 pb-4">
            <div>
              <Label className='font-bold' htmlFor="name">Nombre</Label>
              <Input value={foodItem.name} className="rounded w-80" id="name" name="name" placeholder="Nombre del Alimento" onChange={handleInputChange} />
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
              <Label className='font-bold' htmlFor="nova_group">Clasificacion </Label>

              <Select onValueChange={handleSelectChange('nova_group')} value={foodItem.nova_group}>
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

              <Label className='font-bold' htmlFor="saturated_fats">Grasa Saturada</Label>
              <Input value={foodItem.saturated_fats} type='number' className="rounded w-80" id="saturated_fats" name="saturated_fats" placeholder="0g" onChange={handleInputChange} />
            </div>

            <div>

              <Label className='font-bold' htmlFor="transFats">Grasas Trasn</Label>
              <Input value={foodItem.trans_fats} type='number' className="rounded w-80" id="trans_fats" name="trans_fats" placeholder="0g" onChange={handleInputChange} />
            </div>

            <div>

              <Label className='font-bold' htmlFor="totalFats">Grasas Totales</Label>
              <Input value={foodItem.total_fats} type='number' className="rounded w-80" id="total_fats" name="total_fats" placeholder="0g" onChange={handleInputChange} />
            </div>
            <div>

              <Label className='font-bold' htmlFor="serving_size">Tamano de la porcion</Label>
              <Input value={foodItem.serving_size} type='number' className="rounded w-80" id="serving_size" name="serving_size" placeholder="0g" onChange={handleInputChange} />
            </div>


 
            <Button onClick={handleSubmit}>Agregar</Button>

          </div>


      }
      <Toaster />
    </div>

  )
}
