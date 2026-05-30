import { Link } from 'react-router-dom';
import { Coffee, Facebook, Twitter, Instagram, Linkedin, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-dark-300 pt-20 pb-10 border-t border-dark-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center text-white">
                <Coffee className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                L'Emploi <span className="text-primary-500">Café & Resto</span>
              </span>
            </Link>
            <p className="mb-6 leading-relaxed">
              La plateforme numéro 1 pour l'emploi dans la restauration, l'hôtellerie, les cafés et boulangeries.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Candidats</h3>
            <ul className="space-y-4">
              <li><Link to="/jobs" className="hover:text-primary-500 transition-colors">Rechercher une offre</Link></li>
              <li><Link to="/candidates" className="hover:text-primary-500 transition-colors">Créer mon CV</Link></li>
              <li><Link to="/blog" className="hover:text-primary-500 transition-colors">Conseils emploi</Link></li>
              <li><Link to="/alerts" className="hover:text-primary-500 transition-colors">Alertes emploi</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Recruteurs</h3>
            <ul className="space-y-4">
              <li><Link to="/post-job" className="hover:text-primary-500 transition-colors">Publier une offre</Link></li>
              <li><Link to="/pricing" className="hover:text-primary-500 transition-colors">Tarifs & Packs</Link></li>
              <li><Link to="/cv-database" className="hover:text-primary-500 transition-colors">CVthèque</Link></li>
              <li><Link to="/companies" className="hover:text-primary-500 transition-colors">Espace Entreprise</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                <span>123 Avenue Hassan II, Casablanca, Maroc</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-500 shrink-0" />
                <span>+212 5 22 00 00 00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-500 shrink-0" />
                <span>contact@emploicaferesto.ma</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-dark-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} L'Emploi Café & Resto. Tous droits réservés.</p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/privacy" className="hover:text-white transition-colors">Politique de confidentialité</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
