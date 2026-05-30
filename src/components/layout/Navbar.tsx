import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Coffee, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Offres d\'emploi', path: '/jobs' },
    { name: 'Candidats', path: '/candidates' },
    { name: 'Entreprises', path: '/companies' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-dark-900/95 backdrop-blur-md text-white h-[70px] flex items-center shadow-md dark:border-b dark:border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center text-white group-hover:bg-primary-600 transition-colors">
              <Coffee className="w-6 h-6" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              L'EMPLOI <span className="text-primary-500">CAFÉ & RESTO</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary-500 ${
                  location.pathname === link.path ? 'text-primary-500' : 'text-white/90'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link
              to="/candidates"
              className="text-sm font-semibold border border-white/20 hover:bg-white/10 text-white px-5 py-2 rounded-md transition-all"
            >
              Connexion
            </Link>
            <Link
              to="/companies"
              className="text-sm font-semibold bg-primary-500 text-white px-5 py-2 rounded-md hover:bg-primary-600 transition-all"
            >
              Publier une offre
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-dark-900 border-t border-dark-100 dark:border-dark-800"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-base font-medium text-dark-900 dark:text-white py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-dark-100 dark:bg-dark-800 my-2" />
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium text-dark-600 dark:text-dark-300">Thème sombre</span>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-full bg-dark-50 dark:bg-dark-800"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Link
                  to="/candidates"
                  className="w-full py-3 text-center rounded-xl border border-dark-200 dark:border-dark-700 text-sm font-medium dark:text-white"
                >
                  Connexion
                </Link>
                <Link
                  to="/companies"
                  className="w-full py-3 text-center rounded-xl bg-primary-500 text-white text-sm font-medium shadow-lg shadow-primary-500/20"
                >
                  Publier
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
