import { Button } from "@/components/ui/button";
import { MessageCircle, LogIn, LogOut, User } from "lucide-react";
import logoImage from "@assets/تشاليح_1758923594452.png";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const { user, isLoggedIn, setShowAuthModal, logout } = useAuth();
  
  const handleDiscordClick = () => {
    window.open("https://discord.gg/506w", "_blank");
  };
  
  const handleAuthClick = () => {
    if (isLoggedIn) {
      logout();
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <header className="bg-card border-b border-card-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={logoImage} 
              alt="تشاليح المحاكي" 
              className="w-12 h-12 object-contain"
              data-testid="img-logo"
            />
            <div>
              <h1 className="text-xl font-bold text-foreground" data-testid="text-title">
                تشاليح المحاكي
              </h1>
              <p className="text-sm text-muted-foreground" data-testid="text-subtitle">
                خدمات تصميم السيرفرات والبوتات
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {isLoggedIn && user && (
              <div className="flex items-center gap-2" data-testid="user-info">
                <User className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground hidden sm:block" data-testid="text-user-email">
                  {user.email}
                </span>
              </div>
            )}
            
            <Button 
              onClick={handleAuthClick}
              variant="outline"
              size="sm"
              data-testid="button-auth"
            >
              {isLoggedIn ? (
                <>
                  <LogOut className="w-4 h-4 ml-2" />
                  <span className="hidden sm:inline">خروج</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 ml-2" />
                  <span className="hidden sm:inline">دخول</span>
                </>
              )}
            </Button>
            
            <Button 
              onClick={handleDiscordClick}
              className="bg-primary hover:bg-primary/90"
              size="sm"
              data-testid="button-discord"
            >
              <MessageCircle className="w-4 h-4 ml-2" />
              <span className="hidden sm:inline">انضم لديسكورد</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}