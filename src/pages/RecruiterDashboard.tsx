import { Users, Briefcase, Eye, TrendingUp, Plus, MapPin, MoreVertical, Edit, Search, Star, ChevronRight, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function RecruiterDashboard() {
  const { addToast } = useToast();

  const handleConfig = () => addToast('Configuration sauvegardée', 'success');
  const handlePublish = () => addToast('Offre d\'emploi publiée avec succès', 'success');
  const handleEdit = () => addToast('Modification de l\'offre en cours', 'info');

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900 pt-28 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2">Espace Recruteur</h1>
            <p className="text-dark-600 dark:text-dark-300">Gérez vos offres et vos candidatures pour Le Grand Hôtel.</p>
          </div>
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button onClick={handleConfig} className="p-3 text-dark-600 dark:text-dark-300 bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 hover:bg-dark-50 dark:hover:bg-dark-700 rounded-md transition-colors" title="Configurer l'espace">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button onClick={handlePublish} className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-md font-semibold shadow-sm transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" /> Publier une offre
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { title: 'Offres actives', count: '4', icon: Briefcase, trend: '+1' },
            { title: 'Nouvelles candidatures', count: '28', icon: Users, trend: '+12' },
            { title: 'Vues totales', count: '1,490', icon: Eye, trend: '+24%' },
            { title: 'Taux de conversion', count: '6.4%', icon: TrendingUp, trend: '+1.2%' }
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-dark-800 rounded-xl border border-dark-100 dark:border-dark-700 p-6 flex flex-col shadow-sm">
               <div className="flex justify-between items-start mb-4">
                 <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-500 flex items-center justify-center">
                   <stat.icon className="w-6 h-6" />
                 </div>
                 <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md">
                   {stat.trend}
                 </span>
               </div>
               <div className="text-dark-500 dark:text-dark-400 text-sm mb-1">{stat.title}</div>
               <div className="text-3xl font-bold text-dark-900 dark:text-white">{stat.count}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Jobs List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-dark-800 rounded-xl border border-dark-100 dark:border-dark-700 overflow-hidden shadow-sm">
               <div className="p-6 border-b border-dark-100 dark:border-dark-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                 <h2 className="font-bold text-lg text-dark-900 dark:text-white">Offres d'emploi (4 actives)</h2>
                 <div className="relative w-full sm:w-auto">
                   <Search className="w-4 h-4 text-dark-400 absolute left-3 top-1/2 -translate-y-1/2" />
                   <input type="text" placeholder="Chercher une offre..." className="w-full bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-700 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-primary-500" />
                 </div>
               </div>

               <div className="divide-y divide-dark-100 dark:divide-dark-700">
                 {[
                   { title: 'Serveur Expérimenté', loc: 'Casablanca', cands: 12, views: 450, posted: 'Il y a 3 jours', status: 'Sponsorisée', isSponsor: true },
                   { title: 'Chef de Cuisine', loc: 'Marrakech', cands: 5, views: 120, posted: 'Il y a 1 sem.', status: 'Active' },
                   { title: 'Réceptionniste Nuit', loc: 'Rabat', cands: 8, views: 320, posted: 'Il y a 2 sem.', status: 'Active' },
                 ].map((job, i) => (
                   <div key={i} className="p-6 hover:bg-dark-50 dark:hover:bg-dark-800/50 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-dark-900 dark:text-white text-lg mb-1">{job.title}</h3>
                          <div className="flex flex-wrap gap-3 text-sm text-dark-500 dark:text-dark-400">
                             <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.loc}</span>
                             <span>•</span>
                             <span>Publié {job.posted}</span>
                          </div>
                        </div>
                        <button className="text-dark-400 hover:text-dark-900 dark:hover:text-white p-1">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-between gap-4">
                         <div className="flex gap-4">
                           <div className="bg-dark-50 dark:bg-dark-900 px-4 py-2 rounded-lg text-sm border border-dark-100 dark:border-dark-700">
                             <strong className="text-dark-900 dark:text-white block">{job.cands}</strong>
                             <span className="text-dark-500 dark:text-dark-400 text-xs">Candidats</span>
                           </div>
                           <div className="bg-dark-50 dark:bg-dark-900 px-4 py-2 rounded-lg text-sm border border-dark-100 dark:border-dark-700">
                             <strong className="text-dark-900 dark:text-white block">{job.views}</strong>
                             <span className="text-dark-500 dark:text-dark-400 text-xs">Vues</span>
                           </div>
                         </div>
                         <div className="flex items-center gap-3">
                           {job.isSponsor && (
                             <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs font-semibold rounded-md border border-primary-200 dark:border-primary-800">Sponsorisée</span>
                           )}
                           <button onClick={handleEdit} className="flex items-center gap-1.5 text-sm font-semibold text-dark-600 dark:text-dark-300 hover:text-primary-500">
                             <Edit className="w-4 h-4" /> Modifier
                           </button>
                         </div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Candidates Needs Review */}
            <div className="bg-white dark:bg-dark-800 rounded-xl border border-dark-100 dark:border-dark-700 overflow-hidden shadow-sm">
               <div className="p-6 border-b border-dark-100 dark:border-dark-700 flex justify-between items-center bg-amber-50/50 dark:bg-amber-900/10">
                 <h2 className="font-bold text-lg text-dark-900 dark:text-white flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500 fill-current" /> Évaluer vos derniers entretiens
                 </h2>
               </div>
               <div className="p-6">
                 <div className="flex items-center justify-between p-4 border border-dark-100 dark:border-dark-700 rounded-xl hover:border-primary-500 transition-colors">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">Y</div>
                     <div>
                       <h4 className="font-bold text-dark-900 dark:text-white cursor-pointer hover:underline" onClick={() => window.location.href = '/candidate-profile'}>Youssef Amrani</h4>
                       <div className="text-xs text-dark-500">Entretien pour Chef de Partie (Hier)</div>
                     </div>
                   </div>
                   <button className="px-4 py-2 bg-primary-500 text-white rounded-md text-sm font-semibold shadow-sm hover:bg-primary-600 transition-colors"
                     onClick={() => window.location.href = '/candidate-profile'}>
                     Noter
                   </button>
                 </div>
               </div>
            </div>
          </div>

          {/* AI Suggestions / Actions */}
          <div className="space-y-6">
            <div className="bg-dark-900 rounded-xl p-6 text-white border border-dark-800 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full -mr-16 -mt-16 blur-2xl" />
               <div className="flex items-center gap-3 mb-4 relative z-10">
                 <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
                   <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                   </svg>
                 </div>
                 <h3 className="font-bold text-lg">Assistant IA</h3>
               </div>
               <p className="text-dark-300 text-sm mb-6 relative z-10">Générez des descriptions d'offres attractives ou analysez instantanément les CV de vos candidats.</p>
               <div className="space-y-3 relative z-10">
                 <button className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 rounded-md text-sm font-semibold transition-colors text-left flex justify-between items-center">
                   Générer une annonce
                   <ChevronRight className="w-4 h-4 opacity-50" />
                 </button>
                 <button className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 rounded-md text-sm font-semibold transition-colors text-left flex justify-between items-center">
                   Recommandations candidats
                   <ChevronRight className="w-4 h-4 opacity-50" />
                 </button>
               </div>
            </div>

            <div className="bg-white dark:bg-dark-800 rounded-xl border border-dark-100 dark:border-dark-700 p-6 shadow-sm">
              <h3 className="font-bold text-dark-900 dark:text-white mb-4">Pack Actuel</h3>
              <div className="bg-primary-50 dark:bg-primary-900/10 border border-primary-200 dark:border-primary-900/50 rounded-md p-4 mb-4">
                <div className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-1">Pack Premium</div>
                <div className="text-dark-600 dark:text-dark-300 text-sm mb-3">Renouvellement le 15 Nov</div>
                <div className="w-full bg-dark-200 dark:bg-dark-700 rounded-full h-2 mb-1">
                  <div className="bg-primary-500 h-2 rounded-full w-4/5"></div>
                </div>
                <div className="text-xs text-dark-500 dark:text-dark-400 text-right">8/10 offres utilisées</div>
              </div>
              <button className="w-full py-2.5 text-center text-sm font-semibold border border-dark-200 dark:border-dark-700 hover:border-primary-500 hover:text-primary-500 rounded-md transition-colors">
                Gérer l'abonnement
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
