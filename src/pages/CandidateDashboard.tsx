import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, FileText, Bookmark, Bell, Eye, Search, Briefcase, ChevronRight, Building, Star, Trash2, Mail, Loader2, Copy, Check, ChevronDown, ChevronUp, CheckCircle2, Circle, XCircle, BarChart2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import ConfirmModal from '../components/ConfirmModal';
import CompareJobsModal from '../components/CompareJobsModal';

export default function CandidateDashboard() {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Lettre de motivation IA');
  const [jobDescription, setJobDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [copiedLetter, setCopiedLetter] = useState(false);
  const [expandedAppId, setExpandedAppId] = useState<number | null>(null);
  const [alertToDelete, setAlertToDelete] = useState<number | null>(null);
  const [jobToDelete, setJobToDelete] = useState<number | null>(null);

  const [savedJobs, setSavedJobs] = useState([
    { id: 1, title: 'Sous-Chef', company: 'Le Petit Nice', location: 'Marseille, France', salary: '2800€ - 3200€ brut/mois', type: 'CDI', contract: 'Temps plein' },
    { id: 2, title: 'Chef de Partie', company: 'Brasserie Parisienne', location: 'Paris, France', salary: '2200€ - 2500€ brut/mois', type: 'CDD', contract: 'Temps plein' },
    { id: 3, title: 'Manager Restaurant', company: 'La Belle Époque', location: 'Lyon, France', salary: '3000€ - 3500€ brut/mois', type: 'CDI', contract: 'Temps plein' },
    { id: 4, title: 'Pâtissier', company: 'Pâtisserie Dupont', location: 'Bordeaux, France', salary: '2000€ - 2400€ brut/mois', type: 'CDI', contract: 'Temps partiel' },
  ]);

  const [selectedForCompare, setSelectedForCompare] = useState<number[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const handleToggleCompare = (id: number) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter(jobId => jobId !== id));
    } else {
      if (selectedForCompare.length >= 3) {
        addToast('Vous pouvez comparer jusqu\'à 3 offres maximum.', 'info');
        return;
      }
      setSelectedForCompare([...selectedForCompare, id]);
    }
  };

  const selectedJobs = savedJobs.filter(job => selectedForCompare.includes(job.id));

  const handleGenerateLetter = () => {
    if (!jobDescription.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedLetter(`Madame, Monsieur,\n\nActuellement à la recherche de nouveaux défis, je me permets de vous adresser ma candidature pour le poste proposé.\n\nEn lisant votre offre ("${jobDescription.substring(0, 50)}${jobDescription.length > 50 ? '...' : ''}"), j'ai immédiatement été interpellé(e) par la pertinence de vos besoins vis-à-vis de mon parcours.\n\nFort de mon expérience et de ma passion pour la gastronomie, je suis convaincu(e) que mes compétences sauront correspondre à vos attentes et contribuer au succès de votre équipe.\n\nRigoureux(se), organisé(e) et doté(e) d'un excellent sens du relationnel, je suis prêt(e) à m'investir pleinement dans les missions que vous voudrez bien me confier.\n\nDans l'attente de pouvoir échanger avec vous lors d'un entretien, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.`);
      setIsGenerating(false);
      addToast('Lettre de motivation générée avec succès !', 'success');
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopiedLetter(true);
    addToast('Texte copié dans le presse-papiers', 'info');
    setTimeout(() => setCopiedLetter(false), 2000);
  };

  const [alerts, setAlerts] = useState<any[]>(() => {
    const saved = localStorage.getItem('jobAlerts');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: 1, keyword: 'Chef de Partie', location: 'Paris, France', frequency: 'Quotidienne' },
      { id: 2, keyword: 'Manager Restaurant', location: 'Casablanca, Maroc', frequency: 'Hebdomadaire' }
    ];
  });

  const handleDeleteAlert = (id: number) => {
    const newAlerts = alerts.filter(a => a.id !== id);
    setAlerts(newAlerts);
    localStorage.setItem('jobAlerts', JSON.stringify(newAlerts));
    addToast('Alerte supprimée avec succès', 'success');
  };

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900 pt-28 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2">Mon Espace Candidat</h1>
            <p className="text-dark-600 dark:text-dark-300">Bienvenue Youssef, voici un résumé de votre activité.</p>
          </div>
          <div className="bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 rounded-xl p-4 flex items-center gap-4 min-w-[280px] shadow-sm">
             <div className="flex-1">
               <div className="flex justify-between items-center mb-1.5">
                 <span className="text-sm font-semibold text-dark-900 dark:text-white">Profil complété</span>
                 <span className="text-sm font-bold text-primary-500">80%</span>
               </div>
               <div className="w-full bg-dark-100 dark:bg-dark-700 rounded-full h-2">
                 <div className="bg-primary-500 h-2 rounded-full" style={{ width: '80%' }}></div>
               </div>
             </div>
             <button className="text-xs font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 dark:bg-primary-900/20 dark:text-primary-400 dark:hover:bg-primary-900/40 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap">
               Compléter
             </button>
          </div>
        </div>

        {/* Statistiques de recherche */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 border border-dark-100 dark:border-dark-700 flex items-center gap-4 shadow-sm group hover:border-primary-500 transition-colors cursor-pointer" onClick={() => setActiveTab('Mes Candidatures')}>
            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-dark-500 dark:text-dark-400">Candidatures envoyées</p>
              <h3 className="text-2xl font-bold text-dark-900 dark:text-white">3</h3>
            </div>
          </div>
          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 border border-dark-100 dark:border-dark-700 flex items-center gap-4 shadow-sm group hover:border-primary-500 transition-colors cursor-pointer" onClick={() => setActiveTab('Offres Sauvegardées')}>
            <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Bookmark className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-dark-500 dark:text-dark-400">Offres sauvegardées</p>
              <h3 className="text-2xl font-bold text-dark-900 dark:text-white">12</h3>
            </div>
          </div>
          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 border border-dark-100 dark:border-dark-700 flex items-center gap-4 shadow-sm group hover:border-primary-500 transition-colors cursor-pointer" onClick={() => setActiveTab('Alertes Emploi')}>
            <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-dark-500 dark:text-dark-400">Alertes actives</p>
              <h3 className="text-2xl font-bold text-dark-900 dark:text-white">{alerts.length}</h3>
            </div>
          </div>
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
                  { icon: User, label: 'Mon Profil' },
                  { icon: FileText, label: 'Mes Candidatures', badge: '3' },
                  { icon: Bookmark, label: 'Offres Sauvegardées', badge: '12' },
                  { icon: Bell, label: 'Alertes Emploi' },
                  { icon: Search, label: 'Lettre de motivation IA', badge: 'Nouveau', special: true },
                ].map(item => (
                  <button 
                    key={item.label}
                    onClick={() => setActiveTab(item.label)}
                    className={`w-full flex items-center justify-between p-3 rounded-md transition-colors ${
                      activeTab === item.label
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
            {activeTab === 'Mon Profil' && (
              <>
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
                
                {/* Profile Placeholder Info */}
                <div className="bg-white dark:bg-dark-800 rounded-2xl border border-dark-100 dark:border-dark-700 overflow-hidden p-6 mt-6">
                   <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-4">Informations Personnelles</h3>
                   <div className="space-y-4">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-dark-600 dark:text-dark-300 mb-1">Nom complet</label>
                          <div className="p-2 bg-dark-50 dark:bg-dark-900 rounded-md text-dark-900 dark:text-white border border-dark-200 dark:border-dark-700">Youssef Amrani</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-dark-600 dark:text-dark-300 mb-1">Email</label>
                          <div className="p-2 bg-dark-50 dark:bg-dark-900 rounded-md text-dark-900 dark:text-white border border-dark-200 dark:border-dark-700">youssef.amrani@example.com</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-dark-600 dark:text-dark-300 mb-1">Téléphone</label>
                          <div className="p-2 bg-dark-50 dark:bg-dark-900 rounded-md text-dark-900 dark:text-white border border-dark-200 dark:border-dark-700">+212 6 12 34 56 78</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-dark-600 dark:text-dark-300 mb-1">Ville</label>
                          <div className="p-2 bg-dark-50 dark:bg-dark-900 rounded-md text-dark-900 dark:text-white border border-dark-200 dark:border-dark-700">Casablanca</div>
                        </div>
                     </div>
                     <button className="mt-4 bg-primary-500 text-white px-4 py-2 rounded-md font-medium hover:bg-primary-600 transition-colors">Modifier le profil</button>
                   </div>
                </div>
              </>
            )}

            {activeTab === 'Alertes Emploi' && (
              <div className="bg-white dark:bg-dark-800 rounded-2xl border border-dark-100 dark:border-dark-700 overflow-hidden">
                <div className="p-6 border-b border-dark-100 dark:border-dark-700 flex items-center justify-between">
                  <div className="font-bold text-lg text-dark-900 dark:text-white flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary-500" />
                    Mes alertes actives
                  </div>
                </div>
                <div className="divide-y divide-dark-100 dark:divide-dark-700">
                  {alerts.length > 0 ? (
                    alerts.map((alert) => (
                      <div key={alert.id} className="p-6 flex items-center justify-between hover:bg-dark-50 dark:hover:bg-dark-800/50 transition-colors">
                        <div>
                          <h4 className="font-bold text-dark-900 dark:text-white mb-1">{alert.keyword}</h4>
                          <div className="text-sm text-dark-500 dark:text-dark-400">
                            {alert.location} • Fréquence : {alert.frequency}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 dark:bg-primary-900/20 dark:text-primary-400 dark:hover:bg-primary-900/40 rounded-md transition-colors">
                            <Mail className="w-4 h-4" />
                            <span className="hidden sm:inline">Recevoir les alertes par email</span>
                          </button>
                          <button 
                            onClick={() => setAlertToDelete(alert.id)}
                            className="p-2 text-dark-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                            title="Supprimer l'alerte"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-dark-500 dark:text-dark-400 text-sm">
                      Vous n'avez aucune alerte active.
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'Mes Candidatures' && (
              <div className="bg-white dark:bg-dark-800 rounded-2xl border border-dark-100 dark:border-dark-700 overflow-hidden">
                <div className="p-6 border-b border-dark-100 dark:border-dark-700 flex items-center justify-between">
                    <div className="font-bold text-lg text-dark-900 dark:text-white mb-2">Candidatures et Historique</div>
                  <button className="text-sm text-primary-500 hover:text-primary-600 font-medium">Voir toutes</button>
                </div>
                <div className="divide-y divide-dark-100 dark:divide-dark-700">
                  {[
                    { id: 1, title: 'Chef de Partie', company: 'Le Grand Hôtel Parisien', status: 'En cours', statusColor: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400', date: 'Il y a 2 jours', history: [{ step: 'Candidature envoyée', date: '12 Mai 2026', done: true }, { step: 'Profil consulté', date: '14 Mai 2026', done: true }, { step: 'Entretien de motivation', date: 'Bientôt', done: false }] },
                    { id: 2, title: 'Sous-Chef', company: 'Restaurant L\'Océan', status: 'Rejetée', statusColor: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400', date: 'Il y a 1 semaine', history: [{ step: 'Candidature envoyée', date: '02 Mai 2026', done: true }, { step: 'Entretien technique', date: '08 Mai 2026', done: true }, { step: 'Candidature refusée', date: '10 Mai 2026', done: true, isError: true }] },
                    { id: 3, title: 'Cuisinier', company: 'Brasserie Centrale', status: 'Entretien', statusColor: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400', date: 'Il y a 2 semaines', reviewable: true, history: [{ step: 'Candidature envoyée', date: '25 Avril 2026', done: true }, { step: 'Entretien téléphonique', date: '28 Avril 2026', done: true }, { step: 'Entretien sur place', date: '05 Mai 2026', done: true }, { step: 'Finalisation du contrat', date: 'Aujourd\'hui', done: true, isSuccess: true }] }
                  ].map((app) => (
                    <div key={app.id} className="flex flex-col hover:bg-dark-50 dark:hover:bg-dark-800/50 transition-colors">
                      <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer" onClick={() => setExpandedAppId(expandedAppId === app.id ? null : app.id)}>
                        <div className="flex gap-4 items-center">
                          <div className="w-12 h-12 rounded-xl bg-dark-50 dark:bg-dark-900 border border-dark-100 dark:border-dark-700 flex items-center justify-center shrink-0">
                             <Building className="w-6 h-6 text-dark-400" />
                          </div>
                          <div>
                            <h4 className="font-bold text-dark-900 dark:text-white group-hover:text-primary-500 transition-colors flex items-center gap-2">
                              {app.title}
                            </h4>
                            <div className="text-sm text-dark-500 dark:text-dark-400">{app.company} • {app.date}</div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 self-start sm:self-auto">
                          {app.reviewable && (
                            <button className="px-3 py-1 bg-white border border-primary-200 text-primary-600 hover:bg-primary-50 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors"
                              onClick={(e) => { e.stopPropagation(); window.location.href = '/company-profile'; }}>
                              <Star className="w-3 h-3 fill-current" /> Évaluer l'entreprise
                            </button>
                          )}
                          <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${app.statusColor}`}>
                            {app.status}
                          </span>
                          <button className="text-dark-400 p-1 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-full transition-colors hidden sm:block">
                            {expandedAppId === app.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      
                      {/* Timeline */}
                      {expandedAppId === app.id && (
                         <div className="px-6 pb-6 pt-2 bg-dark-50/50 dark:bg-dark-900/20 border-t border-dark-100 dark:border-dark-700">
                            <h5 className="font-semibold text-dark-900 dark:text-white mb-4 text-sm">Historique de la candidature</h5>
                            <div className="relative pl-6 space-y-6">
                              <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-dark-200 dark:bg-dark-700"></div>
                              {app.history.map((step, i) => (
                                <div key={i} className="relative flex items-start gap-4">
                                  <div className="absolute -left-6 bg-dark-50/50 dark:bg-dark-900/20 mt-0.5">
                                    {step.done ? (
                                      step.isError ? (
                                        <XCircle className="w-5 h-5 text-red-500 bg-dark-50 dark:bg-dark-900 rounded-full" />
                                      ) : step.isSuccess ? (
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 bg-dark-50 dark:bg-dark-900 rounded-full" />
                                      ) : (
                                        <CheckCircle2 className="w-5 h-5 text-primary-500 bg-dark-50 dark:bg-dark-900 rounded-full" />
                                      )
                                    ) : (
                                      <Circle className="w-5 h-5 text-dark-300 dark:text-dark-600 bg-dark-50 dark:bg-dark-900 rounded-full" />
                                    )}
                                  </div>
                                  <div>
                                    <div className={`font-medium text-sm ${step.done ? (step.isError ? 'text-red-600 dark:text-red-400' : 'text-dark-900 dark:text-white') : 'text-dark-500 dark:text-dark-400'}`}>
                                      {step.step}
                                    </div>
                                    <div className="text-xs text-dark-500 dark:text-dark-400">{step.date}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                         </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Offres Sauvegardées' && (
              <div className="bg-white dark:bg-dark-800 rounded-2xl border border-dark-100 dark:border-dark-700 overflow-hidden">
                <div className="p-6 border-b border-dark-100 dark:border-dark-700 flex items-center justify-between">
                  <div className="font-bold text-lg text-dark-900 dark:text-white mb-2">Offres sauvegardées</div>
                  {selectedForCompare.length > 0 && (
                     <button
                        onClick={() => setIsCompareModalOpen(true)}
                        className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm"
                     >
                        <BarChart2 className="w-4 h-4" /> Comparer ({selectedForCompare.length}/3)
                     </button>
                  )}
                </div>
                {savedJobs.length === 0 ? (
                   <div className="p-6 text-center text-dark-500 dark:text-dark-400">
                     Vous n'avez pas encore d'offres sauvegardées.
                   </div>
                ) : (
                  <div className="divide-y divide-dark-100 dark:divide-dark-700">
                     {savedJobs.map((job) => (
                        <div key={job.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-dark-50 dark:hover:bg-dark-800/50 transition-colors">
                           <div className="flex gap-4 items-center">
                              <div className="w-12 h-12 rounded-xl bg-dark-50 dark:bg-dark-900 border border-dark-100 dark:border-dark-700 flex items-center justify-center shrink-0 cursor-pointer">
                                 <Building className="w-6 h-6 text-dark-400" />
                              </div>
                              <div>
                                 <h4 className="font-bold text-dark-900 dark:text-white cursor-pointer hover:text-primary-500 transition-colors">{job.title}</h4>
                                 <div className="text-sm text-dark-500 dark:text-dark-400">{job.company} • {job.location}</div>
                              </div>
                           </div>
                           <div className="flex items-center gap-3">
                              <label className="flex items-center gap-2 cursor-pointer group">
                                 <input 
                                    type="checkbox" 
                                    className="w-4 h-4 text-primary-500 border-dark-300 rounded focus:ring-primary-500 dark:border-dark-600 dark:bg-dark-800"
                                    checked={selectedForCompare.includes(job.id)}
                                    onChange={() => handleToggleCompare(job.id)}
                                 />
                                 <span className="text-sm font-medium text-dark-600 dark:text-dark-300 group-hover:text-dark-900 dark:group-hover:text-white transition-colors">Comparer</span>
                              </label>
                              <button 
                                 onClick={() => setJobToDelete(job.id)}
                                 className="p-2 text-dark-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors" 
                                 title="Retirer des favoris"
                              >
                                 <Trash2 className="w-5 h-5" />
                              </button>
                              <button 
                                 onClick={() => navigate('/jobs')}
                                 className="px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-500 hover:text-white rounded-md text-sm font-semibold transition-colors"
                              >
                                 Voir l'offre
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'Lettre de motivation IA' && (
              <div className="bg-white dark:bg-dark-800 rounded-2xl border border-dark-100 dark:border-dark-700 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-dark-100 dark:border-dark-700">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-500 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-dark-900 dark:text-white">Générateur de Lettre de Motivation IA</h3>
                      <p className="text-sm text-dark-500 dark:text-dark-400">Rédigez une lettre percutante et sur-mesure en quelques secondes.</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {!generatedLetter ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">Description de l'offre ou mots-clés</label>
                        <textarea
                          placeholder="Collez ici la description du poste, les compétences recherchées, ou des mots-clés importants..."
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                          className="w-full bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-700 rounded-xl p-4 text-dark-900 dark:text-white h-32 focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
                        />
                      </div>
                      <button
                        onClick={handleGenerateLetter}
                        disabled={isGenerating || !jobDescription.trim()}
                        className="w-full bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Génération en cours...
                          </>
                        ) : (
                          <>
                            <FileText className="w-5 h-5" />
                            Générer la lettre de motivation
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-700 rounded-xl p-6 relative">
                        <div className="whitespace-pre-wrap text-dark-700 dark:text-dark-300 text-sm leading-relaxed">
                          {generatedLetter}
                        </div>
                        <button
                          onClick={handleCopy}
                          className="absolute top-4 right-4 p-2 bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 rounded-md text-dark-600 dark:text-dark-400 hover:text-primary-500 transition-colors shadow-sm"
                          title="Copier le texte"
                        >
                          {copiedLetter ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => { setGeneratedLetter(''); setJobDescription(''); }}
                          className="flex-1 border border-dark-200 dark:border-dark-700 text-dark-700 dark:text-dark-300 px-6 py-3 rounded-xl font-semibold hover:bg-dark-50 dark:hover:bg-dark-700 transition-colors"
                        >
                          Nouvelle lettre
                        </button>
                        <button className="flex-1 bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors">
                          Sauvegarder dans mon profil
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={alertToDelete !== null}
        onClose={() => setAlertToDelete(null)}
        onConfirm={() => {
          if (alertToDelete !== null) {
            handleDeleteAlert(alertToDelete);
          }
        }}
        title="Supprimer l'alerte emploi"
        message="Êtes-vous sûr de vouloir supprimer cette alerte emploi ? Vous ne recevrez plus de notifications pour cette recherche."
        confirmText="Supprimer"
      />

      <ConfirmModal
        isOpen={jobToDelete !== null}
        onClose={() => setJobToDelete(null)}
        onConfirm={() => {
          if (jobToDelete !== null) {
            setSavedJobs(savedJobs.filter(j => j.id !== jobToDelete));
            setSelectedForCompare(selectedForCompare.filter(jobId => jobId !== jobToDelete));
            addToast('Offre retirée des favoris', 'success');
            setJobToDelete(null);
          }
        }}
        title="Retirer des favoris"
        message="Êtes-vous sûr de vouloir retirer cette offre de vos favoris ?"
        confirmText="Retirer"
      />

      <CompareJobsModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        jobs={selectedJobs}
      />
    </div>
  );
}
