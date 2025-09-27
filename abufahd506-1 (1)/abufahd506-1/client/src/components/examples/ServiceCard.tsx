import ServiceCard from '../ServiceCard';
import { Server } from "lucide-react";

export default function ServiceCardExample() {
  const handlePurchase = () => {
    console.log('Purchase triggered');
  };

  return (
    <div className="max-w-sm">
      <ServiceCard
        title="تصميم السيرفرات"
        price={25}
        currency="ريال"
        features={[
          "تصميم احترافي للسيرفر",
          "إعداد الرولز والصلاحيات", 
          "تخصيص الرومات والكاتقوريز",
          "تطبيق الثيم المطلوب"
        ]}
        icon={<Server className="w-8 h-8" />}
        onPurchase={handlePurchase}
      />
    </div>
  );
}