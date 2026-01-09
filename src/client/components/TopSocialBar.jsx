import React, { useEffect, useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube, Loader2 } from 'lucide-react';
import { fetchSettings } from '../../utils/api';

const TopSocialBar = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLinks = async () => {
      try {
        const res = await fetchSettings();
        setSettings(res.data);
      } catch (err) {
        console.error("Social links fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    getLinks();
  }, []);

  // Agar loading ho ya links na milein toh empty div ya skeleton dikhayein
  if (loading || !settings) return <div className="hidden md:flex w-24 h-4 bg-slate-800 animate-pulse rounded"></div>;

  return (
    <div className="hidden md:flex items-center gap-4 border-r border-slate-700 pr-6">
      {/* Facebook */}
      {settings.facebook && (
        <a 
          href={settings.facebook} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-slate-300 hover:text-blue-500 transition-all hover:-translate-y-0.5"
        >
          <Facebook size={15} strokeWidth={2.5} />
        </a>
      )}

      {/* Instagram */}
      {settings.instagram && (
        <a 
          href={settings.instagram} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-slate-300 hover:text-pink-500 transition-all hover:-translate-y-0.5"
        >
          <Instagram size={15} strokeWidth={2.5} />
        </a>
      )}

      {/* Twitter */}
      {settings.twitter && (
        <a 
          href={settings.twitter} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-slate-300 hover:text-sky-400 transition-all hover:-translate-y-0.5"
        >
          <Twitter size={15} strokeWidth={2.5} />
        </a>
      )}

      {/* Youtube */}
      {settings.youtube && (
        <a 
          href={settings.youtube} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-slate-300 hover:text-red-500 transition-all hover:-translate-y-0.5"
        >
          <Youtube size={15} strokeWidth={2.5} />
        </a>
      )}
    </div>
  );
};

export default TopSocialBar;