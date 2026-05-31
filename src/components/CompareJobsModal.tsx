import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building, MapPin, DollarSign, Briefcase, Clock } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  contract: string;
}

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: Job[];
}

export default function CompareJobsModal({ isOpen, onClose, jobs }: CompareModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-dark-900/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl bg-white dark:bg-dark-800 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-6 border-b border-dark-100 dark:border-dark-700 flex items-center justify-between shrink-0">
              <h2 className="text-xl font-bold text-dark-900 dark:text-white">Comparaison d'offres</h2>
              <button
                onClick={onClose}
                className="p-2 text-dark-400 hover:text-dark-600 dark:hover:text-dark-300 rounded-full hover:bg-dark-50 dark:hover:bg-dark-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="overflow-x-auto p-6 flex-1 custom-scrollbar">
               <div className="flex gap-6 min-w-max">
                  {jobs.map((job) => (
                     <div key={job.id} className="w-80 bg-dark-50 dark:bg-dark-900 rounded-xl p-6 border border-dark-100 dark:border-dark-700 flex flex-col gap-6">
                        <div className="flex gap-4 items-center">
                           <div className="w-12 h-12 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 flex items-center justify-center shrink-0">
                             <Building className="w-6 h-6 text-dark-400" />
                           </div>
                           <div>
                              <h3 className="font-bold text-dark-900 dark:text-white line-clamp-2">{job.title}</h3>
                              <p className="text-sm text-dark-500 dark:text-dark-400">{job.company}</p>
                           </div>
                        </div>

                        <div className="space-y-4 flex-1">
                           <div>
                              <div className="text-xs font-semibold text-dark-500 dark:text-dark-400 mb-1 uppercase tracking-wider">Localisation</div>
                              <div className="flex items-center gap-2 text-sm text-dark-900 dark:text-white font-medium">
                                 <MapPin className="w-4 h-4 text-primary-500 shrink-0" /> {job.location}
                              </div>
                           </div>
                           <div>
                              <div className="text-xs font-semibold text-dark-500 dark:text-dark-400 mb-1 uppercase tracking-wider">Salaire</div>
                              <div className="flex items-center gap-2 text-sm text-dark-900 dark:text-white font-medium">
                                 <DollarSign className="w-4 h-4 text-emerald-500 shrink-0" /> {job.salary}
                              </div>
                           </div>
                           <div>
                              <div className="text-xs font-semibold text-dark-500 dark:text-dark-400 mb-1 uppercase tracking-wider">Type de contrat</div>
                              <div className="flex items-center gap-2 text-sm text-dark-900 dark:text-white font-medium">
                                 <Briefcase className="w-4 h-4 text-blue-500 shrink-0" /> {job.type}
                              </div>
                           </div>
                           <div>
                              <div className="text-xs font-semibold text-dark-500 dark:text-dark-400 mb-1 uppercase tracking-wider">Temps de travail</div>
                              <div className="flex items-center gap-2 text-sm text-dark-900 dark:text-white font-medium">
                                 <Clock className="w-4 h-4 text-amber-500 shrink-0" /> {job.contract}
                              </div>
                           </div>
                        </div>

                        <button className="w-full py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-md font-semibold text-sm transition-colors cursor-pointer text-center">
                           Postuler
                        </button>
                     </div>
                  ))}
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
