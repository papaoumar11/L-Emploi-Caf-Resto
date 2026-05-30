import { useState } from 'react';
import { MapPin, Star, Building, Users, Link as LinkIcon, Briefcase, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewForm from '../components/ReviewForm';
import { useToast } from '../context/ToastContext';

export default function CompanyProfile() {
  const { addToast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setIsFollowing(false);
      addToast('Vous ne suivez plus cette entreprise.', 'info');
    } else {
      setIsFollowing(true);
      addToast('Entreprise suivie avec succès !', 'success');
    }
  };

  const handleReviewSubmit = (rating: number, comment: string) => {
    // Dans une vraie application, cela appellerait une API
    console.log("Nouvel avis :", { rating, comment });
    setIsReviewFormOpen(false);
    // On pourrait ajouter l'avis à la liste ici
  };
  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900 pt-28 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Header */}
        <div className="bg-white dark:bg-dark-800 rounded-2xl border border-dark-100 dark:border-dark-700 overflow-hidden mb-8 shadow-sm">
          <div className="h-48 bg-gradient-to-r from-dark-900 to-dark-800 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
          </div>
          <div className="px-8 pb-8 relative">
            <div className="flex flex-col md:flex-row gap-6 items-start -mt-12">
              <div className="w-24 h-24 rounded-2xl bg-white dark:bg-dark-900 border-4 border-white dark:border-dark-800 shadow-md flex items-center justify-center shrink-0">
                <Building className="w-10 h-10 text-primary-500" />
              </div>
              <div className="flex-1 w-full pt-14 md:pt-4 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2">Le Grand Hôtel Parisien</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-dark-500 dark:text-dark-400 font-medium">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Paris, France</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 50-200 employés</span>
                    <span className="flex items-center gap-1 text-primary-600 dark:text-primary-400">
                      <Star className="w-4 h-4 fill-current" /> 4.6/5 (128 avis)
                    </span>
                  </div>
                </div>
                <button 
                  onClick={handleFollowToggle}
                  className={`px-6 py-2.5 rounded-md font-semibold transition-all flex items-center justify-center gap-2 ${
                    isFollowing 
                      ? 'bg-dark-100 text-dark-900 border border-dark-200 hover:bg-dark-200 dark:bg-dark-800 dark:text-white dark:border-dark-700 dark:hover:bg-dark-700' 
                      : 'bg-primary-500 hover:bg-primary-600 shadow-sm text-white'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <Check className="w-5 h-5 text-primary-500" /> Abonné(e)
                    </>
                  ) : (
                    "Suivre l'entreprise"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white dark:bg-dark-800 rounded-xl border border-dark-100 dark:border-dark-700 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-dark-900 dark:text-white mb-4">À propos</h2>
              <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-6">
                Le Grand Hôtel Parisien est un établissement 5 étoiles situé au cœur de la capitale. Depuis sa création en 1920, il incarne l'excellence de l'hospitalité française. Nous recherchons des talents passionnés par le service pour rejoindre nos équipes en salle, en cuisine et à la réception.
              </p>
              <div className="flex items-center gap-2 text-primary-500 font-medium hover:text-primary-600 cursor-pointer">
                <LinkIcon className="w-4 h-4" /> Visiter le site web
              </div>
            </div>

            {/* Ratings & Reviews */}
            <div className="bg-white dark:bg-dark-800 rounded-xl border border-dark-100 dark:border-dark-700 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-dark-900 dark:text-white">Avis des candidats & employés</h2>
                {!isReviewFormOpen && (
                  <button onClick={() => setIsReviewFormOpen(true)} className="text-sm font-semibold text-primary-500 hover:text-primary-600 border border-primary-200 dark:border-primary-900/50 px-4 py-2 rounded-md">
                    Laisser un avis
                  </button>
                )}
              </div>

              <AnimatePresence>
                {isReviewFormOpen && (
                  <ReviewForm onCancel={() => setIsReviewFormOpen(false)} onSubmit={handleReviewSubmit} />
                )}
              </AnimatePresence>

              <div className="flex items-center gap-8 mb-8 pb-8 border-b border-dark-100 dark:border-dark-700">
                <div className="text-center">
                  <div className="text-5xl font-bold text-dark-900 dark:text-white mb-2">4.6</div>
                  <div className="flex text-primary-500 mb-1 justify-center">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className={`w-5 h-5 ${star <= 4 ? "fill-current" : "fill-current opacity-50"}`} />
                    ))}
                  </div>
                  <div className="text-sm text-dark-500 dark:text-dark-400">128 avis</div>
                </div>
                <div className="flex-1 space-y-2">
                  {[
                    { label: '5 étoiles', pct: 70, count: 90 },
                    { label: '4 étoiles', pct: 20, count: 26 },
                    { label: '3 étoiles', pct: 7, count: 9 },
                    { label: '2 étoiles', pct: 2, count: 2 },
                    { label: '1 étoile', pct: 1, count: 1 },
                  ].map((bar, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <span className="w-16 text-dark-500 dark:text-dark-400 text-right">{bar.label}</span>
                      <div className="flex-1 h-2 bg-dark-100 dark:bg-dark-700 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full" style={{ width: `${bar.pct}%` }} />
                      </div>
                      <span className="w-12 text-dark-500 dark:text-dark-400 text-right font-medium">{bar.count} avis</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { name: 'Candidat Anonyme', role: 'Entretien pour Chef de Rang', date: 'Il y a 2 semaines', rating: 5, text: 'Processus de recrutement très professionnel. Les managers sont à l\'écoute et l\'établissement est magnifique. J\'ai eu un retour rapide sur ma candidature.' },
                  { name: 'Sarah L.', role: 'Ancienne Employée (Réception)', date: 'Il y a 1 mois', rating: 4, text: 'Excellente école pour apprendre la rigueur de l\'hôtellerie de luxe. L\'équipe est soudée. Le rythme est intense mais gratifiant.' }
                ].map((review, i) => (
                  <div key={i} className="pb-6 border-b border-dark-100 dark:border-dark-700 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-bold text-dark-900 dark:text-white">{review.name}</div>
                        <div className="text-xs text-dark-500 dark:text-dark-400">{review.role} • {review.date}</div>
                      </div>
                      <div className="flex text-primary-500">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} className={`w-4 h-4 ${star <= review.rating ? "fill-current" : "opacity-20"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-dark-600 dark:text-dark-300 mt-2">{review.text}</p>
                  </div>
                ))}
                <button className="w-full py-3 text-center text-sm font-semibold text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-700 rounded-md transition-colors">
                  Voir tous les avis
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-dark-800 rounded-xl border border-dark-100 dark:border-dark-700 p-6 shadow-sm">
              <h3 className="font-bold text-lg text-dark-900 dark:text-white mb-4">Offres disponibles (3)</h3>
              <div className="space-y-4">
                {[
                  { title: 'Chef de Rang', type: 'CDI' },
                  { title: 'Sommelier Junior', type: 'CDI' },
                  { title: 'Réceptionniste de nuit', type: 'CDD' }
                ].map((job, i) => (
                  <div key={i} className="flex gap-3 items-start group cursor-pointer">
                    <div className="w-10 h-10 rounded-md bg-dark-50 dark:bg-dark-900 flex items-center justify-center shrink-0 border border-dark-100 dark:border-dark-700 group-hover:border-primary-500 transition-colors">
                      <Briefcase className="w-5 h-5 text-dark-500" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-dark-900 dark:text-white group-hover:text-primary-500 transition-colors">{job.title}</div>
                      <div className="text-xs text-dark-500 dark:text-dark-400">{job.type} • Paris</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-2.5 text-center text-sm font-semibold border border-dark-200 dark:border-dark-700 hover:border-primary-500 hover:text-primary-500 rounded-md transition-colors">
                Voir toutes les offres
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
