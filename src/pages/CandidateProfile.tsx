import { useState } from 'react';
import { MapPin, Star, User, FileText, ChevronRight, Eye, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewForm from '../components/ReviewForm';
import CVPreviewModal from '../components/CVPreviewModal';
import ContactCandidateModal from '../components/ContactCandidateModal';

export default function CandidateProfile() {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [isCVPreviewOpen, setIsCVPreviewOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleReviewSubmit = (rating: number, comment: string) => {
    console.log("Nouvel avis sur le candidat :", { rating, comment });
    setIsReviewFormOpen(false);
  };
  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900 pt-28 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Notification for Recruiter */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4 mb-6 flex items-start gap-3">
          <Star className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Mode Recruteur :</strong> Vous visualisez le profil de Youssef Amrani. Après l'avoir rencontré en entretien, vous pouvez laisser une note et une évaluation pour aider les autres recruteurs, et garder une trace de votre impression.
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white dark:bg-dark-800 rounded-xl border border-dark-100 dark:border-dark-700 p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-500 flex items-center justify-center text-4xl font-bold shrink-0 relative">
                  Y
                </div>
                <div className="text-center sm:text-left flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                    <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Youssef Amrani</h1>
                    <div className="flex items-center gap-1.5 bg-dark-50 dark:bg-dark-900 px-3 py-1.5 rounded-full border border-dark-100 dark:border-dark-700">
                      <Star className="w-4 h-4 text-primary-500 fill-current" />
                      <span className="text-sm font-bold text-dark-900 dark:text-white">4.8</span>
                      <span className="text-xs text-dark-500 dark:text-dark-400">(4 avis)</span>
                    </div>
                  </div>
                  <h2 className="text-lg text-primary-600 dark:text-primary-400 font-semibold mb-4">Chef de Partie Expérimenté</h2>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-dark-500 dark:text-dark-400 font-medium">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Casablanca, Maroc</span>
                    <span className="flex items-center gap-1"><FileText className="w-4 h-4" /> 5 ans d'expérience</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-dark-100 dark:border-dark-700">
                <h3 className="font-bold text-dark-900 dark:text-white mb-3">À propos</h3>
                <p className="text-dark-600 dark:text-dark-300 text-sm leading-relaxed">
                  Passionné par la gastronomie méditerranéenne, je possède une solide expérience dans la gestion d'une équipe en cuisine (jusqu'à 5 personnes). Rigoureux et organisé, j'ai l'habitude des forts volumes d'envoi tout en maintenant une qualité de présentation irréprochable.
                </p>
              </div>
            </div>

            {/* Evaluations from Recruiters */}
            <div className="bg-white dark:bg-dark-800 rounded-xl border border-dark-100 dark:border-dark-700 p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-bold text-dark-900 dark:text-white">Évaluations des Recruteurs</h2>
                {!isReviewFormOpen && (
                  <button onClick={() => setIsReviewFormOpen(true)} className="bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors shadow-sm">
                    Évaluer ce candidat
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
                  <div className="text-5xl font-bold text-dark-900 dark:text-white mb-2">4.8</div>
                  <div className="flex text-primary-500 mb-1 justify-center">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className={`w-5 h-5 ${star <= 4 ? "fill-current" : "fill-current opacity-50"}`} />
                    ))}
                  </div>
                  <div className="text-sm text-dark-500 dark:text-dark-400">4 avis total</div>
                </div>
                <div className="flex-1 space-y-2">
                  {[
                    { label: '5 étoiles', pct: 75, count: 3 },
                    { label: '4 étoiles', pct: 25, count: 1 },
                    { label: '3 étoiles', pct: 0, count: 0 },
                    { label: '2 étoiles', pct: 0, count: 0 },
                    { label: '1 étoile', pct: 0, count: 0 },
                  ].map((bar, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <span className="w-16 text-dark-500 dark:text-dark-400 text-right">{bar.label}</span>
                      <div className="flex-1 h-2 bg-dark-100 dark:bg-dark-700 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full transition-all duration-500" style={{ width: `${bar.pct}%` }} />
                      </div>
                      <span className="w-12 text-dark-500 dark:text-dark-400 text-right font-medium">{bar.count} avis</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { company: 'Le Petit Bistrot', date: 'Il y a 3 mois', rating: 5, text: 'Youssef est extrêmement professionnel. Son essai a été très concluant, il est propre dans son plan de travail, communique bien avec la salle et gère la pression. Nous n\'avons pas pu le retenir pour des raisons de budget, mais je le recommande vivement.' },
                  { company: 'Restaurant L\'Océan', date: 'Il y a 6 mois', rating: 4, text: 'Candidat très motivé et ponctuel lors de l\'entretien. Bonne maîtrise technique des cuissons poisson.' },
                  { company: 'Brasserie Centrale', date: 'Il y a 1 an', rating: 5, text: 'Excellent collaborateur, il a travaillé chez nous pendant 2 ans. Toujours fiable et créatif sur les suggestions du jour.' }
                ].map((review, i) => (
                  <div key={i} className="pb-6 border-b border-dark-100 dark:border-dark-700 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-bold text-dark-900 dark:text-white text-sm">{review.company}</div>
                        <div className="text-xs text-dark-500 dark:text-dark-400">{review.date}</div>
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
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-dark-800 rounded-xl border border-dark-100 dark:border-dark-700 p-6 shadow-sm">
              <h3 className="font-bold text-lg text-dark-900 dark:text-white mb-4">Compétences</h3>
              <div className="flex flex-wrap gap-2">
                {['Cuisine Française', 'Poissons', 'Management', 'HACCP', 'Création de carte'].map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-dark-50 dark:bg-dark-900 border border-dark-100 dark:border-dark-700 text-dark-700 dark:text-dark-300 text-xs font-semibold rounded-md">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-dark-800 rounded-xl border border-dark-100 dark:border-dark-700 p-6 shadow-sm">
              <h3 className="font-bold text-lg text-dark-900 dark:text-white mb-4">Actions</h3>
              <button 
                onClick={() => setIsCVPreviewOpen(true)}
                className="w-full py-2.5 mb-3 bg-dark-900 text-white hover:bg-dark-800 rounded-md font-semibold text-sm transition-colors text-center flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" /> Aperçu du CV
              </button>
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="w-full py-2.5 mb-3 bg-primary-500 text-white hover:bg-primary-600 rounded-md font-semibold text-sm transition-colors text-center flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Contacter le candidat
              </button>
              <button className="w-full py-2.5 mb-3 border border-dark-200 dark:border-dark-700 text-dark-700 dark:text-dark-300 hover:border-primary-500 hover:text-primary-500 rounded-md font-semibold text-sm transition-colors text-center">
                Télécharger le CV
              </button>
              <button className="w-full py-2.5 border border-dark-200 dark:border-dark-700 text-dark-700 dark:text-dark-300 hover:border-primary-500 hover:text-primary-500 rounded-md font-semibold text-sm transition-colors text-center">
                Proposer une offre
              </button>
            </div>
          </div>
        </div>
      </div>
      <CVPreviewModal isOpen={isCVPreviewOpen} onClose={() => setIsCVPreviewOpen(false)} candidateName="Youssef Amrani" />
      <ContactCandidateModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} candidateName="Youssef Amrani" />
    </div>
  );
}
