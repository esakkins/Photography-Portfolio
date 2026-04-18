import { Aperture, Camera, Mail, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-bg-secondary py-12 border-t border-accent/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Aperture className="w-6 h-6 text-accent" />
            <span className="font-heading text-lg text-text-primary">
              Lens<span className="text-accent">&</span>Light
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-text-secondary hover:text-accent transition-colors duration-200"
              aria-label="Instagram"
            >
              <Camera className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-text-secondary hover:text-accent transition-colors duration-200"
              aria-label="Twitter"
            >
              <Globe className="w-5 h-5" />
            </a>
            <a
              href="mailto:hello@lensandlight.com"
              className="text-text-secondary hover:text-accent transition-colors duration-200"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <p className="text-text-secondary text-sm">
            © {new Date().getFullYear()} Lens & Light. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}