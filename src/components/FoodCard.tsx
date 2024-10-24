
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
    <Card className="h-full">
      <CardHeader >
        <img
          src={imageSrc}
          alt={altText}
          width={400}
          height={200}
        />
      </CardHeader>
      <CardContent >
        <CardTitle >{title}</CardTitle>
        <div >
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
