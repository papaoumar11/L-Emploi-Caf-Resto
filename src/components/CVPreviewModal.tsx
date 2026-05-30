import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText } from 'lucide-react';

interface CVPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
}

export default function CVPreviewModal({ isOpen, onClose, candidateName }: CVPreviewModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-dark-900 rounded-xl shadow-2xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col relative z-10 overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 border-b border-dark-100 dark:border-dark-800 bg-dark-50 dark:bg-dark-900">
            <h3 className="font-bold text-dark-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-500" />
              CV - {candidateName}
            </h3>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold bg-dark-900 text-white hover:bg-dark-800 dark:bg-white dark:text-dark-900 dark:hover:bg-dark-50 rounded-md transition-colors">
                <Download className="w-4 h-4" /> Télécharger
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-dark-400 hover:text-dark-900 dark:hover:text-white transition-colors rounded-md hover:bg-dark-100 dark:hover:bg-dark-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto bg-dark-100 dark:bg-dark-950 p-4 md:p-8 flex justify-center">
            {/* Mock PDF Viewer */}
            <div className="bg-white w-full max-w-[210mm] min-h-[297mm] shadow-lg rounded-sm p-8 md:p-12">
               <div className="border-b-2 border-dark-900 pb-6 mb-6">
                 <h1 className="text-3xl font-bold text-dark-900 uppercase tracking-wider">{candidateName}</h1>
                 <h2 className="text-xl text-primary-600 font-medium mt-1">Chef de Partie Expérimenté</h2>
                 <div className="flex gap-4 mt-4 text-sm text-dark-600 flex-wrap">
                   <span>📍 Casablanca, Maroc</span>
                   <span>✉️ contact@email.com</span>
                   <span>📱 +212 6 00 00 00 00</span>
                 </div>
               </div>

               <div className="space-y-8 text-dark-900">
                 <section>
                   <h3 className="text-lg font-bold uppercase tracking-wider mb-3 border-b border-dark-200 pb-1">Profil</h3>
                   <p className="text-sm leading-relaxed">
                    Passionné par la gastronomie méditerranéenne, je possède une solide expérience dans la gestion d'une équipe en cuisine. Maintien d'une qualité de présentation irréprochable lors des forts volumes d'envoi.
                   </p>
                 </section>

                 <section>
                   <h3 className="text-lg font-bold uppercase tracking-wider mb-3 border-b border-dark-200 pb-1">Expérience Professionnelle</h3>
                   <div className="space-y-4">
                     <div>
                       <div className="flex justify-between font-bold mb-1">
                         <span>Chef de Partie</span>
                         <span className="text-sm font-medium text-dark-600">2021 - Présent</span>
                       </div>
                       <div className="text-sm text-primary-600 font-medium mb-2">Le Grand Café, Casablanca</div>
                       <ul className="list-disc list-inside text-sm space-y-1">
                         <li>Gestion de la station viandes et poissons.</li>
                         <li>Supervision de 2 commis de cuisine.</li>
                         <li>Gestion des stocks et commandes de la partie.</li>
                       </ul>
                     </div>
                     <div>
                       <div className="flex justify-between font-bold mb-1">
                         <span>Demi-Chef de Partie</span>
                         <span className="text-sm font-medium text-dark-600">2018 - 2021</span>
                       </div>
                       <div className="text-sm text-primary-600 font-medium mb-2">Brasserie Centrale, Rabat</div>
                       <ul className="list-disc list-inside text-sm space-y-1">
                         <li>Préparation des entrées chaudes et froides.</li>
                         <li>Application stricte des normes HACCP.</li>
                       </ul>
                     </div>
                   </div>
                 </section>

                 <section>
                   <h3 className="text-lg font-bold uppercase tracking-wider mb-3 border-b border-dark-200 pb-1">Formation</h3>
                   <div>
                     <div className="flex justify-between font-bold mb-1">
                       <span>Diplôme de Technicien Spécialisé en Art Culinaire</span>
                       <span className="text-sm font-medium text-dark-600">2018</span>
                     </div>
                     <div className="text-sm text-dark-600">Institut des Métiers de l'Hôtellerie</div>
                   </div>
                 </section>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
