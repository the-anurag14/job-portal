import { UserPlus, Search, FileText, CheckCircle } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Create Profile", desc: "Sign up and build your professional profile in minutes" },
  { icon: Search, title: "Discover Jobs", desc: "Browse AI-matched jobs tailored to your skills and goals" },
  { icon: FileText, title: "Apply Easily", desc: "Submit applications with one click using your saved resume" },
  { icon: CheckCircle, title: "Get Hired", desc: "Track your applications and land your dream role" },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Four simple steps to your next career opportunity</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="text-center group">
              <div className="relative mx-auto mb-6">
                <div className="w-16 h-16 rounded-2xl bg-card border border-border card-shadow flex items-center justify-center mx-auto group-hover:border-secondary group-hover:amber-glow transition-all duration-300">
                  <step.icon className="w-7 h-7 text-secondary" />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
