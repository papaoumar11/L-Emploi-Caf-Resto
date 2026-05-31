import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, ChevronRight, Star, ChefHat, Utensils, Coffee, Bell, Share2, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import FAQ from '../components/FAQ';
import { useToast } from '../context/ToastContext';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl dark:bg-primary-500/5" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE3E5] text-primary-600 font-bold text-xs uppercase tracking-wider mb-6"
            >
              Plateforme n°1 au Maroc
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-dark-900 dark:text-white mb-6 leading-tight"
            >
              Trouvez votre emploi ou recrutez les{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600">
                meilleurs talents
              </span>{' '}
              de la restauration
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-dark-600 dark:text-dark-300 mb-10 max-w-2xl mx-auto"
            >
              Des milliers d'offres d'emploi dans les cafés, restaurants, hôtels et établissements de restauration partout au Maroc et à l'international.
            </motion.p>
            
            {/* Search Bar Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-dark-800 p-2 md:p-3 rounded-xl border border-dark-100 dark:border-dark-700 shadow-sm flex flex-col md:flex-row items-center gap-2 md:gap-0 max-w-4xl mx-auto"
            >
              <div className="flex-1 flex items-center md:pl-6 w-full py-2">
                <Search className="w-5 h-5 text-dark-400 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Métier, mot-clé, entreprise..." 
                  className="w-full bg-transparent border-none focus:ring-0 text-dark-900 dark:text-white placeholder:text-dark-400 px-4 md:text-lg focus:outline-none"
                />
              </div>
              <div className="hidden md:block w-px h-8 bg-dark-200 dark:bg-dark-700 mx-4" />
              <div className="flex-1 flex items-center px-4 md:px-0 md:pr-4 w-full border-t border-dark-100 dark:border-dark-700 md:border-none pt-2 md:pt-0 pb-2 md:pb-0">
                <MapPin className="w-5 h-5 text-dark-400 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Ville, code postal, région" 
                  className="w-full bg-transparent border-none focus:ring-0 text-dark-900 dark:text-white placeholder:text-dark-400 px-4 md:text-lg focus:outline-none"
                />
              </div>
              <button className="w-full md:w-auto bg-primary-500 hover:bg-primary-600 text-white font-semibold md:text-lg px-8 py-3 rounded-md transition-all shrink-0">
                Rechercher
              </button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-dark-500 dark:text-dark-400"
            >
              <span>Recherches populaires :</span>
              <div className="flex flex-wrap justify-center gap-2">
                {['Serveur', 'Chef Cuisinier', 'Barista', 'Manager'].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-md bg-dark-50 dark:bg-dark-800 border border-dark-100 dark:border-dark-700 hover:border-primary-500 cursor-pointer transition-colors text-xs font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-dark-50 dark:bg-dark-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-dark-900 dark:text-white tracking-tight">Découvrez nos métiers</h2>
              <p className="text-lg text-dark-600 dark:text-dark-300">Explorez les offres d'emploi par catégorie dans le secteur de la restauration et de l'hôtellerie au Maroc.</p>
            </div>
            <Link to="/categories" className="inline-flex items-center gap-2 text-primary-500 font-semibold hover:text-primary-600 transition-colors bg-primary-50 dark:bg-primary-900/20 px-5 py-2.5 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/40 w-fit">
              Toutes les catégories <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {[
              { icon: ChefHat, name: 'Cuisine', count: '1,240' },
              { icon: Utensils, name: 'Salle', count: '2,890' },
              { icon: Coffee, name: 'Bar & Café', count: '850' },
              { icon: Briefcase, name: 'Management', count: '430' },
              { icon: MapPin, name: 'Réception', count: '620' },
              { icon: Star, name: 'Pâtisserie', count: '310' },
            ].map((cat, i) => (
              <motion.div 
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-dark-900 p-6 sm:p-8 rounded-3xl border border-dark-100 dark:border-dark-800 flex flex-col items-center justify-center text-center hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/5 group-hover:to-primary-500/0 transition-colors duration-300" />
                <div className="w-16 h-16 rounded-2xl bg-dark-50 dark:bg-dark-900 border border-dark-100 dark:border-dark-800 group-hover:bg-primary-500 group-hover:border-primary-500 flex items-center justify-center text-dark-500 dark:text-dark-400 group-hover:text-white mb-5 transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:rotate-3">
                  <cat.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-dark-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors">{cat.name}</h3>
                <span className="inline-block px-3 py-1 bg-dark-50 dark:bg-dark-800 text-dark-500 dark:text-dark-400 text-xs font-semibold rounded-full group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{cat.count} offres</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Jobs */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-3 text-dark-900 dark:text-white">Dernières Opportunités</h2>
              <p className="text-dark-600 dark:text-dark-300">Des emplois qui correspondent à votre profil, mis à jour chaque jour.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 rounded-md border border-primary-500 text-primary-500 font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all">
                Voir tout
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <JobCard key={i} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Split */}
      <section className="py-10 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-dark-900 rounded-3xl p-10 lg:p-14 relative overflow-hidden flex flex-col justify-center transform hover:-translate-y-1 transition-transform">
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium mb-6">Pour les Candidats</span>
                <h3 className="text-3xl font-bold text-white mb-4">Créez votre profil en quelques clics</h3>
                <p className="text-dark-300 mb-8 max-w-sm">Démarquez-vous grâce à notre IA qui optimise votre CV et génère votre lettre de motivation.</p>
                <Link to="/create-profile" className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-md font-semibold transition-colors w-fit">
                  S'inscrire gratuitement
                </Link>
              </div>
            </div>
            
            <div className="bg-primary-500 rounded-3xl p-10 lg:p-14 relative overflow-hidden flex flex-col justify-center transform hover:-translate-y-1 transition-transform">
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <span className="inline-block px-4 py-1.5 rounded-full bg-black/10 text-white text-sm font-medium mb-6">Pour les Recruteurs</span>
                <h3 className="text-3xl font-bold text-white mb-4">Trouvez le personnel idéal</h3>
                <p className="text-white/80 mb-8 max-w-sm">Accédez à des milliers de profils qualifiés et gérez vos recrutements depuis un tableau de bord intelligent.</p>
                <button className="bg-white hover:bg-dark-50 text-primary-600 px-8 py-3 rounded-md font-semibold transition-colors w-fit">
                  Publier une offre
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
}

const JobCard: React.FC<{ index: number }> = ({ index }) => {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.origin + '/jobs/' + index);
    setCopied(true);
    addToast('Lien de l\'offre copié', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      setSaved(false);
      addToast('Offre retirée de vos favoris', 'info');
    } else {
      setSaved(true);
      addToast('Offre sauvegardée avec succès !', 'success');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-dark-900 rounded-xl p-5 border-y border-r border-dark-100 dark:border-dark-800 border-l-4 border-l-primary-500 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4">
          <div className="w-14 h-14 rounded-xl bg-dark-50 dark:bg-dark-800 border border-dark-100 dark:border-dark-700 flex items-center justify-center shrink-0">
            <Coffee className="w-7 h-7 text-dark-400" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-dark-900 dark:text-white leading-tight group-hover:text-primary-500 transition-colors">Chef de Partie (H/F)</h3>
            <span className="text-dark-500 dark:text-dark-400 text-sm">Le Petit Bistrot</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={handleShare}
            title="Copier le lien"
            className="p-2 text-dark-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-full transition-colors flex items-center justify-center"
          >
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Share2 className="w-5 h-5" />}
          </button>
          <button 
            onClick={handleSave}
            title="Sauvegarder" 
            className={`p-2 rounded-full transition-colors flex items-center justify-center ${saved ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'text-dark-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'}`}
          >
            <svg className={`w-5 h-5 ${saved ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="px-3 py-1 bg-dark-50 dark:bg-dark-800 text-dark-600 dark:text-dark-300 text-xs font-medium rounded-md">CDI</span>
        <span className="px-3 py-1 bg-dark-50 dark:bg-dark-800 text-dark-600 dark:text-dark-300 text-xs font-medium rounded-md">Temps plein</span>
        <span className="px-3 py-1 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-xs font-medium rounded-md">Urgente</span>
      </div>

      <div className="mt-auto pt-5 border-t border-dark-100 dark:border-dark-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-dark-500 dark:text-dark-400">
          <MapPin className="w-4 h-4" />
          <span>Casablanca</span>
        </div>
        <div className="font-semibold text-dark-900 dark:text-white">
          5,000 DH<span className="font-normal text-sm text-dark-500 dark:text-dark-400">/mois</span>
        </div>
      </div>
    </motion.div>
  );
}
