import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles, Briefcase, MapPin, User, Mail, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function CreateProfile() {
  const navigate = useNavigate();
  const [isDragOver, setIsDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    job: '',
    city: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'firstName':
        if (!value.trim()) error = 'Le prénom est requis';
        break;
      case 'lastName':
        if (!value.trim()) error = 'Le nom est requis';
        break;
      case 'email':
        if (!value) error = 'L\'email est requis';
        else if (!/\S+@\S+\.\S+/.test(value)) error = 'L\'adresse email est invalide';
        break;
      case 'password':
        if (!value) error = 'Le mot de passe est requis';
        else if (value.length < 8) error = 'Le mot de passe doit contenir au moins 8 caractères';
        break;
      case 'job':
        if (!value) error = 'Veuillez sélectionner un métier';
        break;
      case 'city':
        if (!value.trim()) error = 'La ville est requise';
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return error === '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    Object.keys(formData).forEach(key => {
      const fieldValid = validateField(key, formData[key as keyof typeof formData]);
      if (!fieldValid) isValid = false;
    });

    if (!isValid) return;

    // Simulate API call and redirect
    setTimeout(() => {
      navigate('/candidates');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900 pt-24 pb-12 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl overflow-hidden border border-dark-100 dark:border-dark-700 flex flex-col lg:flex-row">
          
          {/* Left Column: Form */}
          <div className="w-full lg:w-3/5 p-8 md:p-12">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2">Créez votre profil</h1>
              <p className="text-dark-600 dark:text-dark-300">Rejoignez des milliers de professionnels de la restauration.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Prénom</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-dark-400" />
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={(e) => validateField('firstName', e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 bg-dark-50 dark:bg-dark-900 border ${errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-dark-200 dark:border-dark-700 focus:border-primary-500'} rounded-md focus:outline-none text-dark-900 dark:text-white`} 
                      placeholder="Youssef" 
                    />
                  </div>
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Nom</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-dark-400" />
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      onBlur={(e) => validateField('lastName', e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 bg-dark-50 dark:bg-dark-900 border ${errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-dark-200 dark:border-dark-700 focus:border-primary-500'} rounded-md focus:outline-none text-dark-900 dark:text-white`} 
                      placeholder="Amrani" 
                    />
                  </div>
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-dark-400" />
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={(e) => validateField('email', e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 bg-dark-50 dark:bg-dark-900 border ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-dark-200 dark:border-dark-700 focus:border-primary-500'} rounded-md focus:outline-none text-dark-900 dark:text-white`} 
                      placeholder="youssef@example.com" 
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Mot de passe</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-dark-400" />
                    <input 
                      type="password" 
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={(e) => validateField('password', e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 bg-dark-50 dark:bg-dark-900 border ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-dark-200 dark:border-dark-700 focus:border-primary-500'} rounded-md focus:outline-none text-dark-900 dark:text-white`} 
                      placeholder="••••••••" 
                    />
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Poste recherché</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 w-5 h-5 text-dark-400" />
                    <select 
                      name="job"
                      value={formData.job}
                      onChange={handleChange}
                      onBlur={(e) => validateField('job', e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 bg-dark-50 dark:bg-dark-900 border ${errors.job ? 'border-red-500 focus:border-red-500' : 'border-dark-200 dark:border-dark-700 focus:border-primary-500'} rounded-md focus:outline-none text-dark-900 dark:text-white appearance-none cursor-pointer`}
                    >
                      <option value="">Sélectionner un métier</option>
                      <option value="serveur">Serveur / Serveuse</option>
                      <option value="chef">Chef Cuisinier</option>
                      <option value="barista">Barista</option>
                      <option value="manager">Manager Restaurant</option>
                      <option value="reception">Réceptionniste</option>
                      <option value="patissier">Pâtissier</option>
                    </select>
                  </div>
                  {errors.job && <p className="text-red-500 text-xs mt-1">{errors.job}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Ville</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-dark-400" />
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      onBlur={(e) => validateField('city', e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 bg-dark-50 dark:bg-dark-900 border ${errors.city ? 'border-red-500 focus:border-red-500' : 'border-dark-200 dark:border-dark-700 focus:border-primary-500'} rounded-md focus:outline-none text-dark-900 dark:text-white`} 
                      placeholder="Ex: Casablanca" 
                    />
                  </div>
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">Votre CV (Optionnel, mais recommandé)</label>
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${
                    isDragOver ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' : 'border-dark-200 dark:border-dark-700 bg-dark-50 dark:bg-dark-900 hover:bg-dark-100 dark:hover:bg-dark-800'
                  }`}
                >
                  {file ? (
                    <div className="flex flex-col items-center gap-2 text-primary-600 dark:text-primary-400">
                      <FileText className="w-10 h-10" />
                      <span className="font-semibold text-sm">{file.name}</span>
                      <button type="button" onClick={() => setFile(null)} className="text-xs text-dark-500 hover:text-dark-900 dark:hover:text-white underline mt-1">Changer de fichier</button>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-white dark:bg-dark-800 rounded-full flex items-center justify-center shadow-sm mb-4">
                        <Upload className="w-6 h-6 text-dark-400" />
                      </div>
                      <p className="text-sm font-medium text-dark-900 dark:text-white mb-1">
                        Glissez votre CV ici ou <span className="text-primary-500">parcourez</span>
                      </p>
                      <p className="text-xs text-dark-500 dark:text-dark-400">PDF, DOC ou DOCX (Max 5MB)</p>
                    </>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-md transition-all shadow-md">
                  Créer mon profil
                </button>
                <p className="text-center text-sm text-dark-500 dark:text-dark-400 mt-4">
                  Vous avez déjà un compte ? <Link to="/login" className="text-primary-500 hover:text-primary-600 font-semibold">Connectez-vous</Link>
                </p>
              </div>
            </form>
          </div>

          {/* Right Column: AI Benefits */}
          <div className="w-full lg:w-2/5 p-8 md:p-12 bg-dark-900 relative overflow-hidden flex flex-col justify-center text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full -ml-10 -mb-10 blur-3xl" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/20 text-primary-400 font-semibold text-xs uppercase tracking-wider mb-8 border border-primary-500/30">
                <Sparkles className="w-4 h-4" /> Mode IA Intégré
              </div>
              
              <h2 className="text-3xl font-bold mb-6">Démarquez-vous avec notre Intelligence Artificielle</h2>
              
              <div className="space-y-6">
                {[
                  { title: "Optimisation de CV", desc: "Notre IA analyse votre fichier et vous suggère des améliorations pour retenir l'attention des chefs d'établissement." },
                  { title: "Lettre de motivation instantanée", desc: "Générez des lettres parfaitement adaptées à chaque offre en un clic." },
                  { title: "Matching intelligent", desc: "Recevez les offres qui correspondent exactement à votre profil, vos horaires et vos prétentions salariales." }
                ].map((feature, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    key={i} 
                    className="flex gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-500/20 border border-primary-500/30 flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle2 className="w-4 h-4 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                      <p className="text-dark-300 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
