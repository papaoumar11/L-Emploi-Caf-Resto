import React, { useState, useMemo, useEffect } from 'react';
import { MapPin, Search, Filter, Briefcase, Clock, DollarSign, Share2, Check, Bell, ChevronDown, ChevronUp, Store, LayoutGrid, List, Map as MapIcon } from 'lucide-react';
import AlertModal from '../components/AlertModal';
import AdBanner from '../components/AdBanner';
import { useToast } from '../context/ToastContext';
import JobsMap from '../components/JobsMap';

import { motion, animate, useMotionValue, useTransform } from 'framer-motion';

function AnimatedCounter({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, { duration: 0.5 });
    return controls.stop;
  }, [value, count]);

  return <motion.strong>{rounded}</motion.strong>;
}

export default function Jobs() {
  const { addToast } = useToast();
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'map'>('list');
  const [hoveredJobId, setHoveredJobId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('Les plus récentes');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [searchCity, setSearchCity] = useState('');

  const [selectedContracts, setSelectedContracts] = useState<string[]>(() => {
    const saved = localStorage.getItem('jobs_filters_contracts');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>(() => {
    const saved = localStorage.getItem('jobs_filters_experiences');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedSalaries, setSelectedSalaries] = useState<string[]>(() => {
    const saved = localStorage.getItem('jobs_filters_salaries');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('jobs_filters_contracts', JSON.stringify(selectedContracts));
  }, [selectedContracts]);

  useEffect(() => {
    localStorage.setItem('jobs_filters_experiences', JSON.stringify(selectedExperiences));
  }, [selectedExperiences]);

  useEffect(() => {
    localStorage.setItem('jobs_filters_salaries', JSON.stringify(selectedSalaries));
  }, [selectedSalaries]);

  const toggleFilter = (setState: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setState(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  // Fallback coords for some common Moroccan cities if geolocation is disabled
  const cityCoordinates: Record<string, { lat: number, lng: number }> = {
    'rabat': { lat: 34.020882, lng: -6.841650 },
    'casablanca': { lat: 33.5731, lng: -7.5898 },
    'marrakech': { lat: 31.6295, lng: -7.9811 },
    'tanger': { lat: 35.7595, lng: -5.8340 },
    'agadir': { lat: 30.4278, lng: -9.5981 },
  };

  useEffect(() => {
    if (sortBy === 'Distance' && !userLocation) {
      if (searchCity.trim().toLowerCase() && cityCoordinates[searchCity.trim().toLowerCase()]) {
         setUserLocation(cityCoordinates[searchCity.trim().toLowerCase()]);
         return;
      }
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          (error) => {
            console.error("Error getting location: ", error);
            addToast("Impossible d'obtenir position. Renseignez une ville valide dans la recherche.", "error");
          }
        );
      } else {
        addToast("La géolocalisation n'est pas supportée par votre navigateur", "error");
      }
    }
  }, [sortBy, userLocation, addToast, searchCity]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Rayon de la terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance en km
  };

  // Stub data for map locations
  const initialJobLocations = [
    { id: 1, title: 'Manager de Restaurant Expérimenté', position: { lat: 34.020882, lng: -6.841650 }, salary: '45k € - 60k €/an', category: 'Manager', company: 'Palace Hotel', location: 'Rabat, Agdal', type: 'CDI', contract: 'Temps plein' },
    { id: 2, title: 'Chef de Cuisine', position: { lat: 34.018, lng: -6.835 }, salary: '35k € - 45k €/an', category: 'Cuisine', company: 'La Grande Bouffe', location: 'Rabat, Hassan', type: 'CDI', contract: 'Temps plein' },
    { id: 3, title: 'Serveur en Restauration', position: { lat: 34.025, lng: -6.845 }, salary: 'SMIC + Pourboires', category: 'Service', company: 'Brasserie de la Gare', location: 'Rabat, Centre-ville', type: 'CDD', contract: 'Temps partiel' },
    { id: 4, title: 'Assistant Manager', position: { lat: 34.010, lng: -6.850 }, salary: '30k € - 40k €/an', category: 'Manager', company: 'Palace Hotel', location: 'Rabat, Agdal', type: 'CDI', contract: 'Temps plein' },
    { id: 5, title: 'Maître d\'Hôtel', position: { lat: 34.015, lng: -6.840 }, salary: '40k € - 50k €/an', category: 'Service', company: 'Le Petit Molière', location: 'Rabat, Ryad', type: 'CDI', contract: 'Temps plein' },
    { id: 6, title: 'Cuisinier', position: { lat: 34.022, lng: -6.838 }, salary: '25k € - 30k €/an', category: 'Cuisine', company: 'Bistrot du Coin', location: 'Rabat, Ocean', type: 'CDD', contract: 'Temps plein' },
  ];

  const jobLocations = useMemo(() => {
    let result = [...initialJobLocations];

    if (selectedContracts.length > 0) {
      result = result.filter(job => selectedContracts.includes(job.type));
    }

    if (sortBy === 'Distance' && userLocation) {
      result.sort((a, b) => {
        const distA = calculateDistance(userLocation.lat, userLocation.lng, a.position.lat, a.position.lng);
        const distB = calculateDistance(userLocation.lat, userLocation.lng, b.position.lat, b.position.lng);
        return distA - distB;
      });
    }
    return result;
  }, [sortBy, userLocation, selectedContracts]);

  const handleShare = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.origin + '/jobs/' + id);
    setCopiedId(id);
    addToast('Lien de l\'offre copié', 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveJob = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (savedJobs.includes(id)) {
      setSavedJobs(savedJobs.filter(jobId => jobId !== id));
      addToast('Offre retirée de vos favoris', 'info');
    } else {
      setSavedJobs([...savedJobs, id]);
      addToast('Offre sauvegardée avec succès !', 'success');
    }
  };

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
            <div className="flex-1 flex items-center px-4 w-full py-2 md:py-0 border-b md:border-b-0 md:border-r border-dark-100">
              <Store className="w-5 h-5 text-dark-400 shrink-0" />
              <select className="w-full bg-transparent border-none focus:ring-0 text-dark-900 placeholder:text-dark-400 px-4 focus:outline-none appearance-none cursor-pointer">
                <option value="">Type d'établissement</option>
                <option value="restaurant">Restaurant</option>
                <option value="cafe">Café</option>
                <option value="boulangerie">Boulangerie / Pâtisserie</option>
                <option value="hotellerie">Hôtellerie</option>
                <option value="bar">Bar / Brasserie</option>
              </select>
            </div>
            <div className="flex-1 flex items-center px-4 w-full py-2 md:py-0">
              <MapPin className="w-5 h-5 text-dark-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Ville ou région" 
                value={searchCity}
                onChange={(e) => {
                  setSearchCity(e.target.value);
                  setUserLocation(null); // Reset location to trigger re-calculation
                }}
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
        <aside className="w-full lg:w-1/4 bg-white dark:bg-dark-800 rounded-2xl border border-dark-100 dark:border-dark-700 p-4 lg:p-6 sticky top-28 self-start z-10 shadow-sm">
          <button 
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="w-full flex items-center justify-between font-semibold text-lg text-dark-900 dark:text-white lg:mb-6 cursor-pointer lg:cursor-default"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary-500" />
              Filtres
            </div>
            <div className="lg:hidden text-dark-500">
              {isFiltersOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </button>

          <div className={`mt-4 lg:mt-0 space-y-6 overflow-hidden transition-all duration-300 ${isFiltersOpen ? 'block' : 'hidden'} lg:block`}>
            {/* Date de publication */}
            <div>
              <h3 className="font-medium text-dark-900 dark:text-white mb-3">Date de publication</h3>
              <div className="space-y-2">
                {['Dernières 24h', '7 derniers jours', '14 derniers jours', '30 derniers jours'].map(date => (
                  <label key={date} className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="date" defaultChecked={date === '30 derniers jours'} className="w-4 h-4 border-dark-300 text-primary-500 focus:ring-primary-500" />
                    <span className="text-dark-700 dark:text-dark-300 text-sm">{date}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="h-px bg-dark-100 dark:bg-dark-700" />

            {/* Type de contrat */}
            <div>
              <h3 className="font-medium text-dark-900 dark:text-white mb-3">Type de contrat</h3>
              <div className="space-y-2">
                {['CDI', 'CDD', 'Stage', 'Freelance', 'Saisonnier'].map(type => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-dark-300 text-primary-500 focus:ring-primary-500"
                      checked={selectedContracts.includes(type)}
                      onChange={() => toggleFilter(setSelectedContracts, type)}
                    />
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
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-dark-300 text-primary-500 focus:ring-primary-500" 
                      checked={selectedExperiences.includes(exp)}
                      onChange={() => toggleFilter(setSelectedExperiences, exp)}
                    />
                    <span className="text-dark-700 dark:text-dark-300 text-sm">{exp}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="h-px bg-dark-100 dark:bg-dark-700" />

            {/* Salaire */}
            <div>
              <h3 className="font-medium text-dark-900 dark:text-white mb-3">Fourchette salariale</h3>
              <div className="space-y-2">
                {['Moins de 5 000 DH', '5 000 - 8 000 DH', '8 000 - 12 000 DH', '12 000 - 20 000 DH', 'Plus de 20 000 DH'].map(range => (
                  <label key={range} className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-dark-300 text-primary-500 focus:ring-primary-500" 
                      checked={selectedSalaries.includes(range)}
                      onChange={() => toggleFilter(setSelectedSalaries, range)}
                    />
                    <span className="text-dark-700 dark:text-dark-300 text-sm">{range}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Jobs List */}
        <div className="flex-1 w-full space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            <span className="text-dark-600 dark:text-dark-400"><AnimatedCounter value={jobLocations.length} /> offres trouvées</span>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex bg-white dark:bg-dark-800 rounded-md p-1 border border-dark-100 dark:border-dark-700">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-dark-50 dark:bg-dark-700 text-primary-500 shadow-sm' : 'text-dark-400 hover:text-dark-600 dark:hover:text-dark-300'}`}
                  title="Vue liste"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-dark-50 dark:bg-dark-700 text-primary-500 shadow-sm' : 'text-dark-400 hover:text-dark-600 dark:hover:text-dark-300'}`}
                  title="Vue grille"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-1.5 rounded transition-colors ${viewMode === 'map' ? 'bg-dark-50 dark:bg-dark-700 text-primary-500 shadow-sm' : 'text-dark-400 hover:text-dark-600 dark:hover:text-dark-300'}`}
                  title="Vue carte"
                >
                  <MapIcon className="w-4 h-4" />
                </button>
              </div>
              <button 
                onClick={() => setIsAlertModalOpen(true)}
                className="flex items-center gap-2 text-sm font-semibold text-primary-500 hover:text-primary-600 border border-primary-200 dark:border-primary-900/50 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-3 py-1.5 rounded-md transition-colors"
                title="Créer une alerte email"
              >
                <Bell className="w-4 h-4" /> Créer une alerte
              </button>
              <select 
                className="bg-transparent border-none text-dark-900 dark:text-white font-medium focus:ring-0 cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="Les plus récentes">Les plus récentes</option>
                <option value="Pertinence">Pertinence</option>
                <option value="Salaire décroissant">Salaire décroissant</option>
                <option value="Distance">Distance</option>
              </select>
            </div>
          </div>

          <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-4" : viewMode === 'map' ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : "space-y-4"}>
            {viewMode === 'map' ? (
              <>
                <div className="overflow-y-auto space-y-4 pr-2 custom-scrollbar h-[600px] lg:h-[800px]">
                  {jobLocations.map((job) => (
                    <div 
                      key={job.id} 
                      onMouseEnter={() => setHoveredJobId(job.id)}
                      onMouseLeave={() => setHoveredJobId(null)}
                      onClick={() => setHoveredJobId(job.id)}
                      className={`bg-white dark:bg-dark-800 rounded-xl p-5 border transition-colors shadow-sm cursor-pointer group ${hoveredJobId === job.id ? 'border-primary-500' : 'border-dark-100 dark:border-dark-700'}`}
                    >
                      <h3 className="text-lg font-bold text-dark-900 dark:text-white group-hover:text-primary-500 mb-1">{job.title}</h3>
                      <p className="text-sm text-dark-600 dark:text-dark-400 mb-3">{job.company} • {job.location}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-dark-500 dark:text-dark-400">
                          <Briefcase className="w-4 h-4" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-dark-500 dark:text-dark-400">
                          <Clock className="w-4 h-4" />
                          <span>{job.contract}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="h-[600px] lg:h-[800px] sticky top-4">
                  <JobsMap jobs={jobLocations} hoveredJobId={hoveredJobId} />
                </div>
              </>
            ) : (
              jobLocations.map((job, index) => (
                <div key={job.id} className={`flex flex-col gap-4 ${viewMode === 'grid' && index === 2 ? 'md:col-span-2' : ''}`}>
                  <div className={`bg-white dark:bg-dark-800 rounded-xl p-5 border-y border-r border-dark-100 dark:border-dark-700 border-l-4 border-l-primary-500 hover:border-y-primary-500 hover:border-r-primary-500 transition-colors flex ${viewMode === 'grid' ? 'flex-col gap-4 h-full' : 'flex-col md:flex-row gap-6'} shadow-sm hover:shadow-md`}>
                    <div className="w-16 h-16 rounded-xl bg-dark-50 dark:bg-dark-900 border border-dark-100 dark:border-dark-700 shrink-0" />
                    <div className="flex-1 flex flex-col">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-dark-900 dark:text-white hover:text-primary-500 cursor-pointer mb-1">
                          {job.title}
                        </h3>
                        <div className="text-primary-600 dark:text-primary-400 font-medium text-sm">{job.company || 'Le Bistrot Parisien'}</div>
                      </div>
                      <div className="hidden md:flex items-center gap-1 shrink-0">
                      <button 
                        onClick={(e) => handleShare(e, job.id)}
                        title="Copier le lien"
                        className="p-2 text-dark-400 hover:text-primary-500 bg-dark-50 dark:bg-dark-900 rounded-full transition-colors shrink-0 flex items-center justify-center"
                      >
                        {copiedId === job.id ? <Check className="w-5 h-5 text-green-500" /> : <Share2 className="w-5 h-5" />}
                      </button>
                      <button 
                        onClick={(e) => handleSaveJob(e, job.id)}
                        title="Sauvegarder" 
                        className={`p-2 rounded-full transition-colors shrink-0 flex items-center justify-center ${
                          savedJobs.includes(job.id) ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'text-dark-400 hover:text-primary-500 bg-dark-50 dark:bg-dark-900'
                        }`}
                      >
                        <svg className={`w-5 h-5 ${savedJobs.includes(job.id) ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-dark-500 dark:text-dark-400 mb-4">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location || 'Rabat, Agdal'}</span>
                    <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {job.type || 'CDI'}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {job.contract || 'Temps plein'}</span>
                    <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4" /> {job.salary || '8,000 - 12,000 DH'}</span>
                  </div>

                  <p className="text-dark-600 dark:text-dark-300 text-sm line-clamp-2 mb-4">
                    Nous recherchons un collaborateur dynamique pour rejoindre notre équipe. Vous serez en charge des missions afférentes à ce poste et de la satisfaction client au quotidien...
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto pt-4">
                    <span className="px-3 py-1 bg-dark-50 dark:bg-dark-900 text-dark-600 dark:text-dark-300 text-xs rounded-md">{job.category || 'Management'}</span>
                    <span className="px-3 py-1 bg-dark-50 dark:bg-dark-900 text-dark-600 dark:text-dark-300 text-xs rounded-md">Service Client</span>
                  </div>
                </div>
                <div className={`flex flex-col justify-end ${viewMode === 'grid' ? 'mt-4' : ''}`}>
                  <button className="w-full md:w-auto bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400 hover:bg-primary-500 hover:text-white px-5 py-2.5 rounded-md font-semibold transition-colors text-sm">
                    Voir l'offre
                  </button>
                </div>
              </div>
              {index === 2 && <AdBanner dataAdSlot="1234567890" />}
            </div>
          ))
        )}
        </div>

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
      <AlertModal isOpen={isAlertModalOpen} onClose={() => setIsAlertModalOpen(false)} />
    </div>
  );
}
