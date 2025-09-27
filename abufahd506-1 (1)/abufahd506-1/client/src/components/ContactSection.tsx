import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, User } from "lucide-react";

export default function ContactSection() {
  const handleDiscordContact = () => {
    window.open("https://discord.gg/506w", "_blank");
  };

  return (
    <section className="py-12" data-testid="section-contact">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="text-contact-title">
            تواصل معنا
          </h2>
          
          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-foreground" data-testid="text-discord-title">
                <MessageCircle className="w-5 h-5 text-primary" />
                تواصل في ديسكورد
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <User className="w-4 h-4" />
                <span data-testid="text-discord-username">abufahd506</span>
              </div>
              
              <Button 
                onClick={handleDiscordContact}
                className="bg-primary hover:bg-primary/90"
                data-testid="button-discord-contact"
              >
                <MessageCircle className="w-4 h-4 ml-2" />
                انضم للديسكورد
              </Button>
              
              <p className="text-sm text-muted-foreground" data-testid="text-contact-description">
                للاستفسارات والطلبات الخاصة، تواصل معنا مباشرة عبر ديسكورد
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}