import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReviewFormProps {
  onCancel: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

export default function ReviewForm({ onCancel, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Veuillez sélectionner une note entre 1 et 5 étoiles.');
      return;
    }
    if (comment.trim().length < 10) {
      setError('Votre commentaire doit contenir au moins 10 caractères.');
      return;
    }
    setError('');
    onSubmit(rating, comment.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-dark-50 dark:bg-dark-900/50 rounded-xl p-6 border border-dark-100 dark:border-dark-700 mb-8 overflow-hidden"
    >
      <h3 className="font-bold text-dark-900 dark:text-white mb-4">Laisser un avis</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Note globale</label>
          <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                className="focus:outline-none p-1 -m-1"
              >
                <Star className={`w-8 h-8 transition-colors ${star <= (hoverRating || rating) ? 'text-primary-500 fill-current' : 'text-dark-300 dark:text-dark-700'}`} />
              </button>
            ))}
          </div>
        </div>

        <div>
           <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Commentaire</label>
           <textarea
             value={comment}
             onChange={(e) => setComment(e.target.value)}
             className={`w-full h-24 bg-white dark:bg-dark-800 border ${error && comment.trim().length < 10 ? 'border-primary-500' : 'border-dark-200 dark:border-dark-700'} rounded-md p-3 text-sm focus:outline-none focus:border-primary-500 text-dark-900 dark:text-white`}
             placeholder="Partagez votre expérience détaillée..."
           />
           <div className="text-xs text-dark-500 mt-1 flex justify-between">
             <span>Minimum 10 caractères</span>
             <span className={comment.trim().length > 0 && comment.trim().length < 10 ? 'text-primary-500 font-semibold' : ''}>{comment.trim().length}/500</span>
           </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="text-primary-500 text-sm font-semibold p-3 bg-primary-50 dark:bg-primary-900/10 rounded-md border border-primary-200 dark:border-primary-800/50"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-end gap-3 pt-2">
           <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-semibold text-dark-600 hover:text-dark-900 dark:text-dark-300 dark:hover:text-white transition-colors">Annuler</button>
           <button type="submit" className="px-5 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md text-sm font-semibold transition-colors shadow-sm">Publier l'avis</button>
        </div>
      </form>
    </motion.div>
  );
}
