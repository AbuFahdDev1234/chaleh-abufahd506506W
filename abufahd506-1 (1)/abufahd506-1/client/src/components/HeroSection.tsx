import { Button } from "@/components/ui/button";
import { MessageCircle, Zap } from "lucide-react";
import logoImage from "@assets/تشاليح_1758923594452.png";

export default function HeroSection() {
  const handleDiscordClick = () => {
    window.open("https://discord.gg/506w", "_blank");
  };

  const scrollToServices = () => {
    const servicesSection = document.querySelector('[data-testid="section-services"]');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 relative overflow-hidden" data-testid="section-hero">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <img 
              src={logoImage} 
              alt="تشاليح المحاكي" 
              className="w-24 h-24 mx-auto mb-6 object-contain"
              data-testid="img-hero-logo"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-hero-title">
              تشاليح المحاكي
            </h1>
            <p className="text-xl text-muted-foreground mb-8" data-testid="text-hero-subtitle">
              خدمات احترافية لتصميم السيرفرات والبوتات
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={scrollToServices}
              size="lg"
              className="bg-primary hover:bg-primary/90"
              data-testid="button-hero-services"
            >
              <Zap className="w-5 h-5 ml-2" />
              استكشف خدماتنا
            </Button>
            
            <Button 
              onClick={handleDiscordClick}
              variant="outline"
              size="lg"
              data-testid="button-hero-discord"
            >
              <MessageCircle className="w-5 h-5 ml-2" />
              انضم لديسكورد
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2" data-testid="stat-servers">
              <h3 className="text-2xl font-bold text-primary">25 ريال</h3>
              <p className="text-muted-foreground">تصميم السيرفرات</p>
            </div>
            <div className="space-y-2" data-testid="stat-copy">
              <h3 className="text-2xl font-bold text-primary">24 ريال</h3>
              <p className="text-muted-foreground">نسخ السيرفرات</p>
            </div>
            <div className="space-y-2" data-testid="stat-bots">
              <h3 className="text-2xl font-bold text-primary">35 ريال</h3>
              <p className="text-muted-foreground">تصميم البوتات</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}