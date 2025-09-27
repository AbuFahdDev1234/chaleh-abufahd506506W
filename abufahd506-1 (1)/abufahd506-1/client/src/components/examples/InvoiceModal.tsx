import InvoiceModal from '../InvoiceModal';
import { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function InvoiceModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>
        عرض الفاتورة
      </Button>
      
      <InvoiceModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        serviceTitle="تصميم السيرفرات"
        servicePrice={25}
        invoiceNumber="INV-2025-001"
      />
    </div>
  );
}