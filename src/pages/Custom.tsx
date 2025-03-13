
import { Button } from "@/components/ui/button";

const Custom = () => {
  return (
    <div className="min-h-screen animate-fade-in py-16">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl font-bold text-primary">Custom Luopan Orders</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Our master craftsmen can create a unique Luopan tailored to your specific needs and preferences.
            Each custom piece is meticulously crafted using traditional techniques and premium materials.
          </p>
          <Button className="mt-8 bg-primary px-8 py-6 text-lg hover:bg-primary/90">
            Start Your Custom Order
          </Button>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-accent/10 p-8">
            <h2 className="font-serif text-2xl font-semibold">The Process</h2>
            <ul className="mt-4 space-y-4 text-muted-foreground">
              <li>1. Initial Consultation</li>
              <li>2. Design Approval</li>
              <li>3. Material Selection</li>
              <li>4. Crafting Process</li>
              <li>5. Quality Assurance</li>
              <li>6. Final Delivery</li>
            </ul>
          </div>
          
          <div className="rounded-lg bg-secondary/10 p-8">
            <h2 className="font-serif text-2xl font-semibold">Customization Options</h2>
            <ul className="mt-4 space-y-4 text-muted-foreground">
              <li>• Size and Dimensions</li>
              <li>• Material Selection</li>
              <li>• Ring Configurations</li>
              <li>• Special Markings</li>
              <li>• Handle Design</li>
              <li>• Protective Case</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom;
