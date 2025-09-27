import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface ServiceCardProps {
  title: string;
  price: number;
  currency: string;
  features: string[];
  icon: React.ReactNode;
  onPurchase: () => void;
}

export default function ServiceCard({ 
  title, 
  price, 
  currency, 
  features, 
  icon, 
  onPurchase 
}: ServiceCardProps) {
  return (
    <Card className="hover-elevate transition-all duration-200" data-testid={`card-service-${title.replace(/\s+/g, '-')}`}>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4 text-primary">
          {icon}
        </div>
        <CardTitle className="text-xl font-bold text-foreground" data-testid="text-service-title">
          {title}
        </CardTitle>
        <div className="mt-4">
          <Badge variant="secondary" className="text-lg px-4 py-2" data-testid="text-service-price">
            {price} {currency}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2" data-testid={`text-feature-${index}`}>
              <Check className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          onClick={onPurchase}
          className="w-full bg-primary hover:bg-primary/90"
          data-testid="button-purchase"
        >
          اطلب الخدمة
        </Button>
      </CardContent>
    </Card>
  );
}