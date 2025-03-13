
import { MapPin, Phone, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary/5 py-16">
      <div className="container grid gap-8 px-4 md:grid-cols-3">
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-semibold">Visit Our Store</h3>
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-1 h-4 w-4" />
            <p>
              123 Feng Shui Plaza<br />
              San Francisco, CA 94108<br />
              United States
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-semibold">Contact Us</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <p>info@luopancrafts.com</p>
            </div>
          </div>
        </div>
        
        <div className="h-64 overflow-hidden rounded-lg bg-muted">
          {/* Google Maps iframe would go here */}
          <div className="h-full w-full bg-muted text-center text-sm text-muted-foreground">
            Google Maps View
          </div>
        </div>
      </div>
      
      <div className="container mt-16 text-center text-sm text-muted-foreground">
        <p>© 2024 Luopan Crafts. All rights reserved.</p>
      </div>
    </footer>
  );
};
