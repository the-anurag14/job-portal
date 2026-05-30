import { Briefcase } from "lucide-react";

const Footer = () => {
  return (
    <footer className="hero-gradient py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-secondary-foreground" />
              </div>
              <span className="text-lg font-bold text-primary-foreground">JobPortal</span>
            </div>
            <p className="text-sm text-primary-foreground/50 leading-relaxed">
              AI-powered recruitment platform connecting talent with opportunity.
            </p>
          </div>

          {[
            { title: "Job Seekers", links: ["Browse Jobs", "Career Advice", "Resume Builder", "Salary Guide"] },
            { title: "Recruiters", links: ["Post a Job", "Pricing", "Talent Search", "Screening Tools"] },
            { title: "Company", links: ["About Us", "Blog", "Contact", "Privacy Policy"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-primary-foreground mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-primary-foreground/50 hover:text-secondary transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 text-center">
          <p className="text-sm text-primary-foreground/40">© 2026 JobPortal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
