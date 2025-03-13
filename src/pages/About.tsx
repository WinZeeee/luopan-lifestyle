
import { Shield, Award, HeartHandshake } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen animate-fade-in py-16">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl font-bold text-primary">About Luopan Crafts</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            For over three generations, we've been crafting premium quality Luopan instruments,
            combining traditional wisdom with modern precision engineering.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center rounded-lg bg-accent/10 p-8 text-center">
            <Shield className="h-12 w-12 text-primary" />
            <h3 className="mt-4 font-serif text-xl font-semibold">Quality Guarantee</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Every Luopan undergoes rigorous quality testing before delivery
            </p>
          </div>
          
          <div className="flex flex-col items-center rounded-lg bg-accent/10 p-8 text-center">
            <Award className="h-12 w-12 text-primary" />
            <h3 className="mt-4 font-serif text-xl font-semibold">Master Craftsmanship</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Handcrafted by experienced artisans using traditional techniques
            </p>
          </div>
          
          <div className="flex flex-col items-center rounded-lg bg-accent/10 p-8 text-center">
            <HeartHandshake className="h-12 w-12 text-primary" />
            <h3 className="mt-4 font-serif text-xl font-semibold">Customer Service</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Dedicated support and after-sales service for all our products
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
