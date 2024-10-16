import { Card, CardContent,  CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FoodItem, Warnings } from "@/types/types"
import sugarImage from "./images/sugar.png"
import sodioImage from "./images/sodio.png"
import cholesterolImage from "./images/chol.png"
import saturatedFatsImage from "./images/sat.png"
import transImage from "./images/trans.png"
import carbsImage from "./images/carbs.png"

interface CardProps {
  foods: FoodItem[];
}

export default function Cards( {foods}: CardProps ) {
 
  function getImageSrc(i:Warnings){
    switch(i){
    case Warnings.HIGH_SUGAR:{
      return sugarImage
    }
    case Warnings.HIGH_SODIUM:{
      return sodioImage;
    }
    case Warnings.HIGH_CHOLESTEROL:{
      return cholesterolImage
    }
    case Warnings.HIGH_TRANS_FATS:{
      return transImage
    }
    case Warnings.HIGH_SATURATED_FATS:
      return saturatedFatsImage
    case Warnings.HIGH_CARBS:{
      return carbsImage
    }
    default:{
      return""
    }
    }
  }
  return (
    <div className="container mx-auto px-4 py-8 flex">
      <div className="flex flex-wrap -mx-2">
        {foods.map((food:FoodItem, index:number) => (
          <div key={index} className="w-full sm:w-1/2 px-2 mb-4">
            <Card className="h-full text-center">
              <CardHeader>
                <CardTitle>{food.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center content-center items-center flex-col">
                <img src={food.image} alt={food.name} width={400} height={200} />
                <div>
                  {food.warnings.map((warning:Warnings, index:number) => (
                    <strong className="flex flex-col" key={index}>{warning}</strong>
                  ))}
                </div>
                                
              </CardContent>
              <CardFooter>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
