import { User, FileText, Bookmark, Bell, Eye, Search, Briefcase, ChevronRight } from 'lucide-react';

export default function CandidateDashboard() {
  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900 pt-28 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2">Mon Espace Candidat</h1>
          <p className="text-dark-600 dark:text-dark-300">Bienvenue Youssef, voici un résumé de votre activité.</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 flex-col-reverse lg:flex-row">
          {/* Sidebar */}
          <aside className="w-full lg:col-span-1 space-y-4">
            <div className="bg-white dark:bg-dark-800 rounded-2xl border border-dark-100 dark:border-dark-700 overflow-hidden">
              <div className="p-6 flex flex-col items-center border-b border-dark-100 dark:border-dark-700">
                <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-500 flex items-center justify-center text-3xl font-bold mb-4 relative">
                  Y
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white dark:bg-dark-800 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full" />
                  </div>
                </div>
                <h2 className="font-bold text-lg text-dark-900 dark:text-white">Youssef Amrani</h2>
                <span className="text-sm text-dark-500 dark:text-dark-400">Chef de Partie</span>
              </div>
              <nav className="p-4 space-y-1">
                {[
                  { icon: User, label: 'Mon Profil', active: true },
                  { icon: FileText, label: 'Mes Candidatures', badge: '3' },
                  { icon: Bookmark, label: 'Offres Sauvegardées', badge: '12' },
                  { icon: Bell, label: 'Alertes Emploi' },
                  { icon: Search, label: 'Lettre de motivation IA', badge: 'Nouveau', special: true },
                ].map(item => (
                  <button 
                    key={item.label}
                    className={`w-full flex items-center justify-between p-3 rounded-md transition-colors ${
                      item.active 
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium' 
                        : 'text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 shrink-0" />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        item.special ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-dark-300'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
            
            {/* AI Assistant Banner */}
            <div className="bg-dark-900 rounded-xl p-6 text-white relative overflow-hidden border border-dark-800 shadow-sm">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full -mr-16 -mt-16 blur-2xl" />
               <h3 className="font-bold text-lg mb-2 relative z-10">Optimisez votre CV</h3>
               <p className="text-dark-300 text-sm mb-4 relative z-10">Notre IA analyse votre CV et vous donne des conseils personnalisés pour décrocher plus d'entretiens.</p>
               <button className="w-full py-2.5 bg-white text-dark-900 rounded-md font-semibold text-sm transition-colors hover:bg-dark-50">
                 Lancer l'analyse IA
               </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="w-full lg:col-span-3 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Candidatures envoyées', value: '18', icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                { label: 'Vues du profil', value: '42', icon: Eye, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
                { label: 'Entretiens', value: '2', icon: FileText, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' }
              ].map(stat => (
                <div key={stat.label} className="bg-white dark:bg-dark-800 rounded-xl border border-dark-100 dark:border-dark-700 p-6 flex items-center gap-4 shadow-sm">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-dark-900 dark:text-white">{stat.value}</div>
                    <div className="text-sm text-dark-500 dark:text-dark-400">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Applications */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl border border-dark-100 dark:border-dark-700 overflow-hidden">
              <div className="p-6 border-b border-dark-100 dark:border-dark-700 flex items-center justify-between">
                <h2 className="font-bold text-lg text-dark-900 dark:text-white">Candidatures récentes</h2>
                <button className="text-sm text-primary-500 hover:text-primary-600 font-medium">Voir toutes</button>
              </div>
              <div className="divide-y divide-dark-100 dark:divide-dark-700">
                {[
                  { title: 'Chef de Partie', company: 'Le Grand Café', status: 'En cours', statusColor: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400', date: 'Il y a 2 jours' },
                  { title: 'Sous-Chef', company: 'Restaurant L\'Océan', status: 'Rejetée', statusColor: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400', date: 'Il y a 1 semaine' },
                  { title: 'Cuisinier', company: 'Brasserie Centrale', status: 'Entretien', statusColor: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400', date: 'Il y a 2 semaines' }
                ].map((app, i) => (
                  <div key={i} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-dark-50 dark:hover:bg-dark-800/50 transition-colors cursor-pointer">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-dark-100 dark:bg-dark-700 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-dark-900 dark:text-white">{app.title}</h4>
                        <div className="text-sm text-dark-500 dark:text-dark-400">{app.company} • {app.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 self-start sm:self-auto">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${app.statusColor}`}>
                        {app.status}
                      </span>
                      <ChevronRight className="w-5 h-5 text-dark-400 hidden sm:block" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
