import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: { id: string; email: string }) => void;
}

interface RegisterData {
  email: string;
  password: string;
  birthdate: string;
  phone: string;
}

interface LoginData {
  email: string;
  password: string;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"register" | "login">("register");
  const [formData, setFormData] = useState<RegisterData>({
    email: "",
    password: "",
    birthdate: "",
    phone: ""
  });
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await apiRequest('/api/register', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return response;
    },
    onSuccess: (data) => {
      toast({
        title: "تم التسجيل بنجاح!",
        description: "مرحباً بك في تشاليح المحاكي"
      });
      onAuthSuccess(data.user);
      onClose();
      queryClient.invalidateQueries({ queryKey: ['/api/user'] });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في التسجيل",
        description: error.message || "حدث خطأ أثناء التسجيل",
        variant: "destructive"
      });
    }
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await apiRequest('/api/login', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return response;
    },
    onSuccess: (data) => {
      toast({
        title: "تم تسجيل الدخول بنجاح!",
        description: "مرحباً بعودتك"
      });
      onAuthSuccess(data.user);
      onClose();
      queryClient.invalidateQueries({ queryKey: ['/api/user'] });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error.message || "بيانات الدخول غير صحيحة",
        variant: "destructive"
      });
    }
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.birthdate || !formData.phone) {
      toast({
        title: "خطأ",
        description: "جميع الحقول مطلوبة",
        variant: "destructive"
      });
      return;
    }
    registerMutation.mutate(formData);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast({
        title: "خطأ",
        description: "جميع الحقول مطلوبة",
        variant: "destructive"
      });
      return;
    }
    loginMutation.mutate(loginData);
  };

  const handleSkipAuth = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" data-testid="modal-auth">
        <DialogHeader>
          <DialogTitle className="text-center text-foreground" data-testid="text-auth-title">
            {mode === "register" ? "إنشاء حساب جديد" : "تسجيل الدخول"}
          </DialogTitle>
        </DialogHeader>
        
        <Card>
          <CardContent className="p-6 space-y-4">
            {mode === "register" ? (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="text-right"
                    placeholder="example@email.com"
                    required
                    data-testid="input-email"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">كلمة المرور</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="text-right"
                    placeholder="كلمة المرور"
                    required
                    data-testid="input-password"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="birthdate" className="text-foreground">تاريخ الميلاد</Label>
                  <Input
                    id="birthdate"
                    type="date"
                    value={formData.birthdate}
                    onChange={(e) => setFormData({...formData, birthdate: e.target.value})}
                    className="text-right"
                    required
                    data-testid="input-birthdate"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">رقم الجوال</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="text-right"
                    placeholder="05xxxxxxxx"
                    required
                    data-testid="input-phone"
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={registerMutation.isPending}
                  data-testid="button-register"
                >
                  <UserPlus className="w-4 h-4 ml-2" />
                  {registerMutation.isPending ? "جاري التسجيل..." : "إنشاء حساب"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-foreground">البريد الإلكتروني</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    className="text-right"
                    placeholder="example@email.com"
                    required
                    data-testid="input-login-email"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-foreground">كلمة المرور</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className="text-right"
                    placeholder="كلمة المرور"
                    required
                    data-testid="input-login-password"
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={loginMutation.isPending}
                  data-testid="button-login"
                >
                  <LogIn className="w-4 h-4 ml-2" />
                  {loginMutation.isPending ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                </Button>
              </form>
            )}
            
            <Separator />
            
            <div className="flex justify-center">
              <Button
                variant="ghost"
                onClick={() => setMode(mode === "register" ? "login" : "register")}
                data-testid="button-switch-mode"
              >
                {mode === "register" ? "لديك حساب؟ سجل الدخول" : "ليس لديك حساب؟ سجل الآن"}
              </Button>
            </div>
            
            <Separator />
            
            <Button
              variant="outline"
              onClick={handleSkipAuth}
              className="w-full"
              data-testid="button-skip-auth"
            >
              الاستمرار دون تسجيل الدخول
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}