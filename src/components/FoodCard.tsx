
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Warnings } from "@/types/types";
import { Badge } from "@/components/ui/badge"
interface FoodCardProps {
    imageSrc: string;
    altText: string;
    title: string;
    seals: Warnings[];
}

export default function FoodCard({ imageSrc, altText, title, seals }: FoodCardProps) {
  return (
    <Card className="flex flex-col items-center text-center w-60 h-[400px] mt-10 hover:scale-105 transform z-50">
      <CardHeader className="p-0">
        <img
          src={imageSrc}
          alt={altText}
          width={400}
          height={200}
          className="object-cover w-full h-48 pt-4"
        />
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle >{title}</CardTitle>
        <div className="text-center">
          {seals.map((seal:Warnings, index:number) => (
            <Badge
              key={index}
              color="red"
            >{seal}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
