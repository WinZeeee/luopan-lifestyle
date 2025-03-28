
import { MapPin, Phone, Mail, Compass } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary/5 py-16 border-t border-secondary/20">
      <div className="container grid gap-8 px-4 md:grid-cols-3">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-primary" />
            <h3 className="font-serif text-2xl font-semibold text-primary">Luopan Crafts</h3>
          </div>
          
          <p className="text-muted-foreground">
            Chuyên cung cấp các sản phẩm la bàn phong thủy chất lượng cao, 
            được chế tác bởi các nghệ nhân bậc thầy với hơn 30 năm kinh nghiệm.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-semibold text-primary border-b border-secondary/20 pb-2">Liên Hệ Với Chúng Tôi</h3>
          
          <div className="flex items-start gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <MapPin className="mt-1 h-4 w-4 text-accent" />
            <p>
              A2/11b ấp 1 xã Vĩnh Lộc B<br />
              Huyện Bình Chánh, TP. Hồ Chí Minh<br />
              Việt Nam
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Phone className="h-4 w-4 text-accent" />
              <p>Phạm Vũ Đăng Khoa: 0796526132</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-4 w-4 text-accent" />
              <p>info@luopancrafts.com</p>
            </div>
          </div>
        </div>
        
        <div className="h-64 overflow-hidden rounded-lg border border-secondary/30 shadow-lg">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.9541599223823!2d106.60431307595505!3d10.740987089407332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752dcdd60efd3d%3A0x8d6b2d79522c7e74!2zVsSpbmggTOG7mWMgQiwgQsOsbmggQ2jDoW5oLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1715592354022!5m2!1svi!2s"
            className="h-full w-full border-0"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Luopan Crafts Store Location"
            aria-label="Google Maps showing Luopan Crafts store location in Vĩnh Lộc B"
          />
        </div>
      </div>
      
      <div className="container mt-16 border-t border-secondary/20 pt-6 text-center text-sm text-muted-foreground">
        <p>© 2024 Luopan Crafts. Đã đăng ký bản quyền.</p>
      </div>
    </footer>
  );
};
