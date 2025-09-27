import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, Check } from "lucide-react";

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
  servicePrice: number;
  invoiceNumber: string;
}

export default function InvoiceModal({ 
  isOpen, 
  onClose, 
  serviceTitle, 
  servicePrice, 
  invoiceNumber 
}: InvoiceModalProps) {
  const currentDate = new Date().toLocaleDateString('ar-SA');

  const handleDownload = () => {
    console.log('Download invoice triggered');
    // TODO: Implement actual PDF generation
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" data-testid="modal-invoice">
        <DialogHeader>
          <DialogTitle className="text-center text-foreground" data-testid="text-invoice-title">
            فاتورة الطلب
          </DialogTitle>
        </DialogHeader>
        
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground" data-testid="text-success-message">
                تم استلام طلبك بنجاح
              </h3>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">رقم الفاتورة:</span>
                <span className="font-mono text-foreground" data-testid="text-invoice-number">
                  {invoiceNumber}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">التاريخ:</span>
                <span className="text-foreground" data-testid="text-invoice-date">
                  {currentDate}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">الخدمة:</span>
                <span className="text-foreground" data-testid="text-invoice-service">
                  {serviceTitle}
                </span>
              </div>
              
              <div className="flex justify-between font-semibold">
                <span className="text-foreground">المبلغ الإجمالي:</span>
                <span className="text-primary" data-testid="text-invoice-total">
                  {servicePrice} ريال
                </span>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <div className="bg-muted/20 p-4 rounded-md space-y-2" data-testid="payment-instructions">
                <h4 className="font-semibold text-foreground text-center mb-3">
                  خطوات إتمام الطلب:
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>1. قم بتحويل المبلغ المطلوب</p>
                  <p>2. أرسل إيصال التحويل</p>
                  <p>3. تواصل مع <span className="font-semibold text-primary">abufahd506</span> في ديسكورد</p>
                </div>
              </div>
              
              <Button 
                onClick={handleDownload}
                variant="outline" 
                className="w-full"
                data-testid="button-download"
              >
                <Download className="w-4 h-4 ml-2" />
                تحميل الفاتورة
              </Button>
              
              <Button 
                onClick={onClose}
                className="w-full"
                data-testid="button-close"
              >
                إغلاق
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}