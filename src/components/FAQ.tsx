import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Comment puis-je postuler à une offre d'emploi ?",
    answer: "Pour postuler, vous devez d'abord créer un profil gratuit sur notre plateforme. Une fois connecté, rendez-vous sur l'offre d'emploi qui vous intéresse et cliquez sur le bouton 'Postuler'. Vous pourrez y joindre votre CV et une lettre de motivation."
  },
  {
    question: "L'inscription est-elle gratuite pour les candidats ?",
    answer: "Oui, la création d'un profil, la consultation des offres d'emploi et l'envoi de candidatures sont totalement gratuits pour tous les candidats."
  },
  {
    question: "Combien coûte la publication d'une offre pour un recruteur ?",
    answer: "Nous proposons plusieurs forfaits adaptés à vos besoins. Vous pouvez démarrer avec une première offre gratuite, puis choisir un plan selon le volume de recrutements que vous effectuez."
  },
  {
    question: "Comment l'IA m'aide-t-elle à optimiser mon CV ?",
    answer: "Notre intelligence artificielle analyse votre CV par rapport aux offres d'emploi du marché de la restauration. Elle vous suggère des mots-clés manquants, des reformulations pour mettre en valeur vos compétences, et vous aide à structurer vos expériences pour capter l'attention des recruteurs."
  },
  {
    question: "Puis-je modifier mon CV après l'avoir mis en ligne ?",
    answer: "Absolument. Vous pouvez mettre à jour votre profil, modifier vos expériences ou remplacer votre CV PDF à tout moment depuis votre espace candidat."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white dark:bg-dark-900 border-t border-dark-100 dark:border-dark-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark-900 dark:text-white mb-4">Questions Fréquentes</h2>
          <p className="text-dark-600 dark:text-dark-300">
            Trouvez rapidement les réponses à vos questions sur le fonctionnement de la plateforme.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={false}
              className={`border rounded-xl overflow-hidden transition-colors ${
                openIndex === index 
                  ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/10' 
                  : 'border-dark-200 dark:border-dark-700 bg-white dark:bg-dark-800 hover:border-dark-300 dark:hover:border-dark-600'
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="font-semibold text-dark-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 text-dark-400"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 text-dark-600 dark:text-dark-300 leading-relaxed border-t border-dark-100 dark:border-dark-700/50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
