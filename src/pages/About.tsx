
import { Shield, Award, HeartHandshake } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen animate-fade-in py-16">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl font-bold text-primary animate-fade-up">About Luopan Crafts</h1>
          <p className="mt-6 text-lg text-muted-foreground animate-fade-up [animation-delay:200ms]">
            For over three generations, we've been crafting premium quality Luopan instruments,
            combining traditional wisdom with modern precision engineering.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            {
              Icon: Shield,
              title: "Quality Guarantee",
              description: "Every Luopan undergoes rigorous quality testing before delivery"
            },
            {
              Icon: Award,
              title: "Master Craftsmanship",
              description: "Handcrafted by experienced artisans using traditional techniques"
            },
            {
              Icon: HeartHandshake,
              title: "Customer Service",
              description: "Dedicated support and after-sales service for all our products"
            }
          ].map((item, index) => (
            <div 
              key={item.title}
              className="flex flex-col items-center rounded-lg bg-accent/10 p-8 text-center animate-fade-up"
              style={{ animationDelay: `${(index + 1) * 200}ms` }}
            >
              <item.Icon className="h-12 w-12 text-primary" />
              <h3 className="mt-4 font-serif text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
