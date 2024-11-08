import { Card, CardContent,  CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FoodItem } from "@/types/types"
import sugarImage from "./images/sugar.png"
import sodioImage from "./images/sodio.png"
import cholesterolImage from "./images/chol.png"
import saturatedFatsImage from "./images/sat.png"
import transImage from "./images/trans.png"
import carbsImage from "./images/carbs.png"
import highCaloriesImage from "./images/cals.png"

interface CardProps {
  foods: FoodItem[];
}

export default function Cards( {foods}: CardProps ) {
  const images = new Map<string, string>([
    ["HIGH_SUGAR", sugarImage],
    ["HIGH_SODIUM", sodioImage],
    ["HIGH_CHOLESTEROL", cholesterolImage],
    ["HIGH_SATURATED_FATS", saturatedFatsImage],
    ["HIGH_TRANS_FATS", transImage],
    ["HIGH_CARBS", carbsImage],
    ["HIGH_CALORIES", highCaloriesImage],
  ]);
  
  return (
    <div className="container mx-auto px-2 py-8">
      <p className="pb-2 font-sans text-slate-700 text-center">Agregados Recientemente</p>
      <div className="flex flex-wrap -mx-2">
        {foods.map((food:FoodItem, index:number) => (
          <div key={index} className="w-full sm:w-1/2 px-2 mb-4">
            <Card className="h-full text-center">
              <CardHeader>
                <CardTitle>{food.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center content-center items-center flex-col">
                <img className="w-96 h-80 object-contain" src={food.image} alt={food.name} />
                <p className="text-center text-slate-700">{food.description}</p>
                <CardFooter>
                </CardFooter>
                <div className="flex flex-row gap-2 justify-center content-center py-4 border rounded-xl container px-2">
                  {food.warnings.map((warning:string, index:number) => (<div key={index}>
                    <img className=" rounded-2xl w-20 h-20 object-contain" src={images.get(warning)} alt={warning} ></img>
                  </div>))}
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
