import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white text-sm font-bold">TW</span>
              </div>
              <span className="font-bold text-lg">TicketWala</span>
            </div>
            <p className="text-sm opacity-75">
              Experience the future of ticket booking with smart seat selection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/events" className="opacity-75 hover:opacity-100 transition-opacity">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link to="/" className="opacity-75 hover:opacity-100 transition-opacity">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/admin" className="opacity-75 hover:opacity-100 transition-opacity">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="opacity-75 hover:opacity-100 transition-opacity">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="opacity-75 hover:opacity-100 transition-opacity">
                  Contact
                </a>
              </li>
              <li>
                <a href="#blog" className="opacity-75 hover:opacity-100 transition-opacity">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#terms" className="opacity-75 hover:opacity-100 transition-opacity">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#privacy" className="opacity-75 hover:opacity-100 transition-opacity">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#cookies" className="opacity-75 hover:opacity-100 transition-opacity">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-secondary-foreground/20 pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm opacity-75">
              &copy; {currentYear} TicketWala. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="#facebook" 
                className="opacity-75 hover:opacity-100 transition-opacity"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#twitter" 
                className="opacity-75 hover:opacity-100 transition-opacity"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#instagram" 
                className="opacity-75 hover:opacity-100 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#email" 
                className="opacity-75 hover:opacity-100 transition-opacity"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
