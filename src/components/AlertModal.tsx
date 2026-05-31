import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Mail } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery?: string;
  locationQuery?: string;
}

export default function AlertModal({ isOpen, onClose, searchQuery = 'Tous les emplois', locationQuery = 'Toutes les villes' }: AlertModalProps) {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState('Quotidienne');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Enregistrer l'alerte dans le localStorage
    const newAlert = {
      id: Date.now(),
      keyword: searchQuery || 'Nouvelle Recherche',
      location: locationQuery || 'Toutes les villes',
      frequency,
      email
    };
    
    const existingAlerts = JSON.parse(localStorage.getItem('jobAlerts') || '[]');
    localStorage.setItem('jobAlerts', JSON.stringify([...existingAlerts, newAlert]));

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
      onClose();
      addToast('Alerte créée avec succès !', 'success');
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-dark-800 rounded-xl shadow-xl w-full max-w-md relative z-10 overflow-hidden"
        >
          {isSubmitted ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">Alerte créée !</h3>
              <p className="text-dark-600 dark:text-dark-300">
                Vous recevrez désormais des notifications pour les nouvelles offres correspondant à votre recherche.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between p-6 border-b border-dark-100 dark:border-dark-700">
                <h3 className="text-lg font-bold text-dark-900 dark:text-white flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary-500" />
                  Créer une alerte
                </h3>
                <button
                  onClick={onClose}
                  className="text-dark-400 hover:text-dark-600 dark:hover:text-dark-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-dark-600 dark:text-dark-300 mb-4">
                    Recevez par email les nouvelles offres qui correspondent à vos critères actuels.
                  </p>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">
                    Adresse email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-5 h-5 text-dark-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full pl-10 pr-4 py-2 bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-700 rounded-md text-sm focus:outline-none focus:border-primary-500 text-dark-900 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">
                    Fréquence
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full px-3 py-2 bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-700 rounded-md text-sm focus:outline-none focus:border-primary-500 text-dark-900 dark:text-white cursor-pointer"
                  >
                    <option value="Quotidienne">Quotidienne</option>
                    <option value="Hebdomadaire">Hebdomadaire</option>
                    <option value="Immédiate">Immédiate</option>
                  </select>
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-semibold text-dark-600 hover:text-dark-900 dark:text-dark-300 dark:hover:text-white transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md text-sm font-semibold transition-colors shadow-sm"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
