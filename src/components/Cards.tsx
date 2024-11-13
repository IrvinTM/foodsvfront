import html2canvas from "html2canvas";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FoodItem } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import sugarImage from "./images/sugar.png"
import sodioImage from "./images/sodio.png"
import cholesterolImage from "./images/chol.png"
import saturatedFatsImage from "./images/sat.png"
import transImage from "./images/trans.png"
import carbsImage from "./images/carbs.png"
import highCaloriesImage from "./images/cals.png"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/toaster"
import { Download } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from 'lucide-react'

interface CardProps {
  foods: FoodItem[];
}

export default function Cards({ foods }: CardProps) {
  const [image, setImage] = useState<HTMLCanvasElement>();
  const [isDownloading, setIsDownloading] = useState<boolean>(false)
  const [imageloading, setImageLoading] = useState<boolean>(false)
  const {toast} = useToast()

  async function getImage(index:number) {
    setImageLoading(true)
    html2canvas(document.getElementById(index.toString())!, {useCORS:true, backgroundColor:"#ffffff", scale: 3, onclone(document ) {
      const card = document.getElementById(index.toString()) 
      if(card){

        card.style.aspectRatio="10 / 12"
        card.style.objectFit="contain"
      }
    },}).then(canvas =>{
      setImage(canvas)
      setImageLoading(false)
    }).catch((e)=>{
      toast({
        title: "Error",
        description: e
        
      })
    })

  };
  const images = new Map<string, string>([
    ["HIGH_SUGAR", sugarImage],
    ["HIGH_SODIUM", sodioImage],
    ["HIGH_CHOLESTEROL", cholesterolImage],
    ["HIGH_SATURATED_FATS", saturatedFatsImage],
    ["HIGH_TRANS_FATS", transImage],
    ["HIGH_CARBS", carbsImage],
    ["HIGH_CALORIES", highCaloriesImage],
  ]);

  const handleDownload = async () => {
    if (!image) {
      toast({
        title: "No image available",
        description: "There is no canvas image to download.",
        variant: "destructive",
      })
      return
    }

    setIsDownloading(true)
    try {
      // Convert canvas to data URL
      const dataUrl = image.toDataURL('image/png')
      
      // Create download link
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = 'canvas-image.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Imagen Descargada!",
      })
    } catch (err) {
      console.error('Error: ', err)
      toast({
        title: "Error en la Descarga",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="container mx-auto px-2 py-8">
      

      <p className="pb-2 font-sans text-slate-700 text-center">
        Agregados Recientemente
      </p>

      <div className="flex flex-wrap -mx-2 xl:px-80">
        {foods.map((food: FoodItem, index: number) => (
          <div key={index} className="w-full sm:w-1/2 px-2 mb-4 ">
            <Card id={index.toString()} className="h-full text-center relative">
              <CardHeader>
                <CardTitle>{food.name}</CardTitle>
              </CardHeader>
              <div className="absolute right-8 top-4">
                <Dialog data-html2canvas-ignore="true">
                  <DialogTrigger data-html2canvas-ignore="true" onClick={()=> getImage(index)}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant={"ghost"}>

                            <svg
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              height="1.5em"
                              width="1.5em"
                            >
                              <path
                                fillRule="evenodd"
                                d="M13.5 3a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 3a3 3 0 01-5.175 2.066l-3.92 2.179a3.005 3.005 0 010 1.51l3.92 2.179a3 3 0 11-.73 1.31l-3.92-2.178a3 3 0 110-4.133l3.92-2.178A3 3 0 1115 3zm-1.5 10a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-9-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                              />
                      
                            </svg>

                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Compartir Imagen</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                  </DialogTrigger>
                  <DialogContent className="w-80% h-80% object-contain mr-4 flex flex-col justify-center items-center pb-4">
                    <DialogHeader>
                      <DialogTitle>Compartir información del alimento</DialogTitle>
                    </DialogHeader>
                    {imageloading ? (
                      <div className="flex flex-col items-center space-y-2">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        <span className="text-sm text-gray-500">Preparando imagen...</span>
                      </div>
                    ) : image ? (
                      <img 
                        className="object-contain w-[95%] h-[95%]" 
                        src={image.toDataURL()} 
                        alt="Screenshot" 
                      />
                    ) : (
                      <span className="text-sm text-gray-500">No image available</span>
                    )}
                    <Button 
                      onClick={handleDownload} 
                      disabled={isDownloading || !image}
                      className="w-full max-w-xs"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {isDownloading ? 'Descargando...' : 'Descargar Imagen'}
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
              <CardContent className="flex justify-center content-center items-center flex-col">
                <img
                  className="w-96 h-80 object-contain"
                  src={food.image}
                  alt={food.name}
                />
                <p className="text-center text-slate-700">
                  {food.description}
                </p>
                <CardFooter></CardFooter>
                <div className="flex flex-row gap-2 justify-center content-center py-4 border rounded-xl container px-2">
                  {food.warnings.map((warning: string, index: number) => (
                    <div key={index}>
                      <img
                        className="rounded-2xl w-20 h-16 object-contain aspect-[20 / 16]"
                        src={images.get(warning)}
                        alt={warning}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
}
