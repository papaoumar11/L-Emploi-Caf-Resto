import { MapPin, Search, Filter, Briefcase, Clock, DollarSign } from 'lucide-react';

export default function Jobs() {
  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900 pt-24 pb-20">
      <div className="bg-primary-500 text-white py-12 md:py-16 mb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Trouvez le job parfait</h1>
          <p className="text-white/80 max-w-2xl mb-8">Découvrez plus de 2,400 offres d'emploi dans la restauration. Utilisez les filtres pour affiner votre recherche.</p>
          
          <div className="bg-white p-2 rounded-2xl shadow-lg flex flex-col md:flex-row gap-2 max-w-5xl">
            <div className="flex-1 flex items-center px-4 w-full py-2 md:py-0 border-b md:border-b-0 md:border-r border-dark-100">
              <Search className="w-5 h-5 text-dark-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Quel métier recherchez-vous ?" 
                className="w-full bg-transparent border-none focus:ring-0 text-dark-900 placeholder:text-dark-400 px-4 focus:outline-none"
              />
            </div>
            <div className="flex-1 flex items-center px-4 w-full py-2 md:py-0">
              <MapPin className="w-5 h-5 text-dark-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Ville ou région" 
                className="w-full bg-transparent border-none focus:ring-0 text-dark-900 placeholder:text-dark-400 px-4 focus:outline-none"
              />
            </div>
            <button className="w-full md:w-auto bg-dark-900 hover:bg-dark-800 text-white font-semibold px-8 py-3 rounded-md transition-all shrink-0">
              Rechercher
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-start gap-8 flex-col lg:flex-row">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-1/4 bg-white dark:bg-dark-800 rounded-2xl border border-dark-100 dark:border-dark-700 p-6 sticky top-28 self-start">
          <div className="flex items-center gap-2 font-semibold text-lg text-dark-900 dark:text-white mb-6">
            <Filter className="w-5 h-5 text-primary-500" />
            Filtres
          </div>

          <div className="space-y-6">
            {/* Type de contrat */}
            <div>
              <h3 className="font-medium text-dark-900 dark:text-white mb-3">Type de contrat</h3>
              <div className="space-y-2">
                {['CDI', 'CDD', 'Stage', 'Freelance', 'Saisonnier'].map(type => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-dark-300 text-primary-500 focus:ring-primary-500" />
                    <span className="text-dark-700 dark:text-dark-300 text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="h-px bg-dark-100 dark:bg-dark-700" />

            {/* Expérience */}
            <div>
              <h3 className="font-medium text-dark-900 dark:text-white mb-3">Niveau d'expérience</h3>
              <div className="space-y-2">
                {['Débutant', '1 à 3 ans', '3 à 5 ans', '+5 ans'].map(exp => (
                  <label key={exp} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-dark-300 text-primary-500 focus:ring-primary-500" />
                    <span className="text-dark-700 dark:text-dark-300 text-sm">{exp}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="h-px bg-dark-100 dark:bg-dark-700" />

            {/* Salaire */}
            <div>
              <h3 className="font-medium text-dark-900 dark:text-white mb-3">Salaire minimum</h3>
              <input type="range" className="w-full accent-primary-500" min="3000" max="20000" step="500" />
              <div className="flex justify-between text-xs text-dark-500 dark:text-dark-400 mt-2">
                <span>3,000 DH</span>
                <span>20,000+ DH</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Jobs List */}
        <div className="flex-1 w-full space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-dark-600 dark:text-dark-400"><strong>482</strong> offres trouvées</span>
            <select className="bg-transparent border-none text-dark-900 dark:text-white font-medium focus:ring-0 cursor-pointer">
              <option>Les plus récentes</option>
              <option>Pertinence</option>
              <option>Salaire décroissant</option>
            </select>
          </div>

          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white dark:bg-dark-800 rounded-xl p-5 border-y border-r border-dark-100 dark:border-dark-700 border-l-4 border-l-primary-500 hover:border-y-primary-500 hover:border-r-primary-500 transition-colors flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-md">
              <div className="w-16 h-16 rounded-xl bg-dark-50 dark:bg-dark-900 border border-dark-100 dark:border-dark-700 shrink-0" />
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-dark-900 dark:text-white hover:text-primary-500 cursor-pointer mb-1">
                      Manager de Restaurant Expérimenté
                    </h3>
                    <div className="text-primary-600 dark:text-primary-400 font-medium text-sm">Le Bistrot Parisien</div>
                  </div>
                  <button className="hidden md:block p-2 text-dark-400 hover:text-primary-500 bg-dark-50 dark:bg-dark-900 rounded-full transition-colors shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                  </button>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-dark-500 dark:text-dark-400 mb-4">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Rabat, Agdal</span>
                  <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> CDI</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Temps plein</span>
                  <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4" /> 8,000 - 12,000 DH</span>
                </div>

                <p className="text-dark-600 dark:text-dark-300 text-sm line-clamp-2 mb-4">
                  Nous recherchons un Manager dynamique pour diriger notre équipe. Vous serez en charge de la gestion opérationnelle, du recrutement, de l'élaboration des plannings et de la satisfaction client au quotidien...
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-dark-50 dark:bg-dark-900 text-dark-600 dark:text-dark-300 text-xs rounded-md">Management</span>
                  <span className="px-3 py-1 bg-dark-50 dark:bg-dark-900 text-dark-600 dark:text-dark-300 text-xs rounded-md">Service Client</span>
                  <span className="px-3 py-1 bg-dark-50 dark:bg-dark-900 text-dark-600 dark:text-dark-300 text-xs rounded-md">Gestion des stocks</span>
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <button className="w-full md:w-auto bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400 hover:bg-primary-500 hover:text-white px-5 py-2.5 rounded-md font-semibold transition-colors text-sm">
                  Voir l'offre
                </button>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-8">
            {[1, 2, 3, 4].map((page) => (
              <button 
                key={page}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  page === 1 
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20' 
                    : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-700 border border-dark-100 dark:border-dark-700'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-white dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-700 border border-dark-100 dark:border-dark-700 transition-colors">
              &raquo;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
