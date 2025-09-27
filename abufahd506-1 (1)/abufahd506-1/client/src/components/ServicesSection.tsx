import { useState } from "react";
import ServiceCard from "./ServiceCard";
import InvoiceModal from "./InvoiceModal";
import { Server, Copy, Bot } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string;
  title: string;
  price: number;
  currency: string;
  features: string[];
  icon: React.ReactNode;
}

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const { isLoggedIn, setShowAuthModal } = useAuth();
  const { toast } = useToast();

  const services: Service[] = [
    {
      id: "server-design",
      title: "تصميم السيرفرات",
      price: 25,
      currency: "ريال",
      features: [
        "تصميم احترافي للسيرفر",
        "إعداد الرولز والصلاحيات",
        "وجميع الرومات",
        "تصميم فاخر"
      ],
      icon: <Server className="w-8 h-8" />
    },
    {
      id: "server-copy",
      title: "نسخ السيرفرات",
      price: 24,
      currency: "ريال",
      features: [
        "نسخ السيرفر بالكامل",
        "نقل جميع الإعدادات",
        "نسخ الرتب والصلاحيات",
        "ضمان سلامة البيانات"
      ],
      icon: <Copy className="w-8 h-8" />
    },
    {
      id: "bot-design",
      title: "تصميم البوتات",
      price: 35,
      currency: "ريال",
      features: [
        "تصميم بوت احترافي",
        "برمجة المميزات المطلوبة",
        "إعداد الأوامر والردود"
      ],
      icon: <Bot className="w-8 h-8" />
    }
  ];

  const createOrderMutation = useMutation({
    mutationFn: async (service: Service) => {
      const response = await apiRequest('/api/orders', {
        method: 'POST',
        body: JSON.stringify({
          serviceTitle: service.title,
          servicePrice: service.price
        })
      });
      return response;
    },
    onSuccess: (data, service) => {
      setSelectedService(service);
      setInvoiceNumber(data.order.invoiceNumber);
      setShowInvoice(true);
      toast({
        title: "تم إنشاء الطلب بنجاح!",
        description: `رقم الفاتورة: ${data.order.invoiceNumber}`
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في إنشاء الطلب",
        description: error.message || "حدث خطأ أثناء إنشاء الطلب",
        variant: "destructive"
      });
    }
  });

  const handlePurchase = (service: Service) => {
    if (!isLoggedIn) {
      toast({
        title: "تسجيل الدخول مطلوب",
        description: "يجب تسجيل الدخول أولاً للشراء",
        variant: "destructive"
      });
      setShowAuthModal(true);
      return;
    }
    
    createOrderMutation.mutate(service);
  };

  return (
    <section className="py-16" data-testid="section-services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-services-title">
            خدماتنا
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-services-description">
            نقدم خدمات تصميم وتطوير السيرفرات والبوتات بأعلى جودة واحترافية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              price={service.price}
              currency={service.currency}
              features={service.features}
              icon={service.icon}
              onPurchase={() => handlePurchase(service)}
            />
          ))}
        </div>
      </div>

      {selectedService && (
        <InvoiceModal
          isOpen={showInvoice}
          onClose={() => setShowInvoice(false)}
          serviceTitle={selectedService.title}
          servicePrice={selectedService.price}
          invoiceNumber={invoiceNumber}
        />
      )}
    </section>
  );
}