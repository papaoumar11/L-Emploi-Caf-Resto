import React, { useState, useEffect, useRef, useCallback } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useMap, MapControl, ControlPosition } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import type { Marker } from '@googlemaps/markerclusterer';
import { Plus, Minus, Maximize, Minimize } from 'lucide-react';

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

interface JobLocation {
  id: number;
  position: google.maps.LatLngLiteral;
  title: string;
  salary?: string;
  category?: string;
}

interface JobsMapProps {
  jobs: JobLocation[];
  hoveredJobId?: number | null;
}

const CustomZoomControl = () => {
  const map = useMap();

  const handleZoomIn = () => {
    if (map) {
      map.setZoom((map.getZoom() || 12) + 1);
    }
  };

  const handleZoomOut = () => {
    if (map) {
      map.setZoom((map.getZoom() || 12) - 1);
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-dark-800 rounded-lg shadow-md border border-dark-100 dark:border-dark-700 overflow-hidden ml-4 mt-4 pointer-events-auto">
      <button 
        onClick={handleZoomIn}
        className="p-2 hover:bg-dark-50 dark:hover:bg-dark-700 text-dark-600 dark:text-dark-300 transition-colors border-b border-dark-100 dark:border-dark-700 focus:outline-none"
        aria-label="Zoom in"
      >
        <Plus className="w-5 h-5" />
      </button>
      <button 
        onClick={handleZoomOut}
        className="p-2 hover:bg-dark-50 dark:hover:bg-dark-700 text-dark-600 dark:text-dark-300 transition-colors focus:outline-none"
        aria-label="Zoom out"
      >
        <Minus className="w-5 h-5" />
      </button>
    </div>
  );
};

const ClusteredMarkers = ({ 
  jobs, 
  activeJobId, 
  setSelectedJobId, 
  getMarkerProps 
}: { 
  jobs: JobLocation[], 
  activeJobId: number | null, 
  setSelectedJobId: (id: number | null) => void,
  getMarkerProps: (cat?: string, active?: boolean) => any
}) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{[key: string]: Marker}>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = useCallback((marker: Marker | null, key: string) => {
    setMarkers(prev => {
      if ((marker && prev[key]) || (!marker && !prev[key])) return prev;
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  }, []);

  return (
    <>
      {jobs.map(job => {
        const isActive = activeJobId === job.id;
        const markerProps = getMarkerProps(job.category, isActive);
        return (
          <AdvancedMarker 
            key={job.id} 
            ref={marker => setMarkerRef(marker as unknown as Marker, String(job.id))}
            position={job.position} 
            title={job.title}
            onClick={() => setSelectedJobId(job.id)}
            className={`transition-all duration-300 ${isActive ? 'z-50 scale-125' : 'z-auto scale-100'}`}
          >
            <Pin background={markerProps.background} glyphColor="#fff" borderColor={markerProps.borderColor} scale={markerProps.scale} />
          </AdvancedMarker>
        );
      })}
    </>
  );
};

const FullscreenControl = ({ isFullscreen, toggleFullscreen }: { isFullscreen: boolean, toggleFullscreen: () => void }) => {
  return (
    <div className="flex bg-white dark:bg-dark-800 rounded-lg shadow-md border border-dark-100 dark:border-dark-700 overflow-hidden mr-4 mt-4 pointer-events-auto">
      <button 
        onClick={toggleFullscreen}
        className="p-2 hover:bg-dark-50 dark:hover:bg-dark-700 text-dark-600 dark:text-dark-300 transition-colors focus:outline-none"
        aria-label="Toggle Fullscreen"
      >
        {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default function JobsMap({ jobs, hoveredJobId }: JobsMapProps) {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const activeJobId = hoveredJobId || selectedJobId;

  const getMarkerProps = (category?: string, isActive?: boolean) => {
    const scale = isActive ? 1.2 : 1;
    switch (category) {
      case 'Cuisine':
        return { background: '#22c55e', borderColor: '#16a34a', scale }; // Green
      case 'Service':
        return { background: '#3b82f6', borderColor: '#2563eb', scale }; // Blue
      case 'Manager':
        return { background: '#f97316', borderColor: '#ea580c', scale }; // Orange
      default:
        return { background: '#6b7280', borderColor: '#4b5563', scale }; // Gray
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
       containerRef.current?.requestFullscreen().catch(err => {
         console.error(`Error attempting to enable fullscreen: ${err.message}`);
       });
    } else {
       if (document.exitFullscreen) {
         document.exitFullscreen();
       }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

  if (!hasValidKey) {
    return (
      <div className="bg-dark-50 dark:bg-dark-900 rounded-xl border border-dark-100 dark:border-dark-700 w-full h-[400px] flex items-center justify-center text-center p-6">
        <div className="max-w-md">
          <h2 className="text-lg font-bold text-dark-900 dark:text-white mb-2">Google Maps API Key Required</h2>
          <p className="text-dark-600 dark:text-dark-400 text-sm mb-4">
            Pour afficher la carte, veuillez fournir une clé API Google Maps Platform.
          </p>
          <p className="text-sm text-dark-500 dark:text-dark-500">
            <strong>Étape 1:</strong> Obtenez une clé API sur la <a href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" target="_blank" rel="noopener" className="text-primary-500 hover:underline">Google Cloud Console</a>.<br/>
            <strong>Étape 2:</strong> Ajoutez-la en tant que secret: Paramètres ⚙️ &gt; Secrets &gt; <code>GOOGLE_MAPS_PLATFORM_KEY</code>
          </p>
        </div>
      </div>
    );
  }

  // Default center (e.g. Rabat)
  const defaultCenter = { lat: 34.020882, lng: -6.841650 };

  return (
    <div ref={containerRef} className={`w-full ${isFullscreen ? 'h-screen rounded-none' : 'h-[600px] rounded-xl'} overflow-hidden border border-dark-100 dark:border-dark-700 shadow-sm relative bg-white dark:bg-dark-900`}>
      <APIProvider apiKey={API_KEY} version="weekly">
        <Map
          defaultCenter={defaultCenter}
          defaultZoom={12}
          mapId="JOBS_MAP_ID"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          style={{ width: '100%', height: '100%' }}
          disableDefaultUI={true}
        >
          <MapControl position={ControlPosition.LEFT_CENTER}>
            <CustomZoomControl />
          </MapControl>

          <MapControl position={ControlPosition.TOP_RIGHT}>
            <FullscreenControl isFullscreen={isFullscreen} toggleFullscreen={toggleFullscreen} />
          </MapControl>

          <ClusteredMarkers 
            jobs={jobs} 
            activeJobId={activeJobId} 
            setSelectedJobId={setSelectedJobId} 
            getMarkerProps={getMarkerProps} 
          />

          {activeJobId !== null && (() => {
            const selectedJob = jobs.find(j => j.id === activeJobId);
            if (!selectedJob) return null;
            return (
              <InfoWindow
                position={selectedJob.position}
                onCloseClick={() => setSelectedJobId(null)}
              >
                <div className="p-1 max-w-[200px]">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{selectedJob.title}</h3>
                  {selectedJob.salary && (
                     <p className="text-primary-600 font-medium text-xs">{selectedJob.salary}</p>
                  )}
                  {selectedJob.category && (
                     <p className="text-gray-500 text-xs mt-1">{selectedJob.category}</p>
                  )}
                </div>
              </InfoWindow>
            );
          })()}
          <MapControl position={ControlPosition.RIGHT_BOTTOM}>
            <div className="bg-white dark:bg-dark-800 p-3 rounded-lg shadow-md border border-dark-100 dark:border-dark-700 z-10 pointer-events-auto mr-4 mb-6">
              <h4 className="text-xs font-bold text-dark-900 dark:text-white mb-2 uppercase tracking-wider">Catégories</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#f97316] border border-[#ea580c]" />
                  <span className="text-dark-600 dark:text-dark-300">Manager</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#22c55e] border border-[#16a34a]" />
                  <span className="text-dark-600 dark:text-dark-300">Cuisine</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#3b82f6] border border-[#2563eb]" />
                  <span className="text-dark-600 dark:text-dark-300">Service</span>
                </div>
              </div>
            </div>
          </MapControl>
        </Map>
      </APIProvider>
    </div>
  );
}
