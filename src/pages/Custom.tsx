
import { Button } from "@/components/ui/button";

const Custom = () => {
  return (
    <div className="min-h-screen animate-fade-in py-16">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl font-bold text-primary animate-fade-up">Custom Luopan Orders</h1>
          <p className="mt-6 text-lg text-muted-foreground animate-fade-up [animation-delay:200ms]">
            Our master craftsmen can create a unique Luopan tailored to your specific needs and preferences.
            Each custom piece is meticulously crafted using traditional techniques and premium materials.
          </p>
          <Button className="mt-8 bg-primary px-8 py-6 text-lg hover:bg-primary/90 animate-fade-up [animation-delay:400ms]">
            Start Your Custom Order
          </Button>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {[
            {
              title: "The Process",
              items: ["Initial Consultation", "Design Approval", "Material Selection", "Crafting Process", "Quality Assurance", "Final Delivery"]
            },
            {
              title: "Customization Options",
              items: ["Size and Dimensions", "Material Selection", "Ring Configurations", "Special Markings", "Handle Design", "Protective Case"]
            }
          ].map((section, sectionIndex) => (
            <div 
              key={section.title}
              className={`rounded-lg ${sectionIndex === 0 ? 'bg-accent/10' : 'bg-secondary/10'} p-8 animate-fade-up`}
              style={{ animationDelay: `${(sectionIndex + 3) * 200}ms` }}
            >
              <h2 className="font-serif text-2xl font-semibold">{section.title}</h2>
              <ul className="mt-4 space-y-4 text-muted-foreground">
                {section.items.map((item, index) => (
                  <li key={item} className="animate-fade-up" style={{ animationDelay: `${(index + 5) * 100}ms` }}>
                    {sectionIndex === 0 ? `${index + 1}. ${item}` : `• ${item}`}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Custom;
