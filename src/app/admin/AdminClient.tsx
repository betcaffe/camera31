'use client';

import { useState } from 'react';
import { getSiteData, SiteData } from '@/lib/data-loader';
import { Save, Download, Home, Settings, Image as ImageIcon, Mail, Layout, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminClient() {
  const [data, setData] = useState<SiteData>(getSiteData());
  const [activeTab, setActiveTab] = useState('settings');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleInputChange = (path: string, value: any) => {
    const newData = { ...data };
    const keys = path.split('.');
    let current: any = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setData(newData);
  };

  const downloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleLinkChange = (idx: number, field: 'label' | 'url', value: string) => {
    const newLinks = [...(data.footer.usefulLinks || [])];
    newLinks[idx] = { ...newLinks[idx], [field]: value };
    handleInputChange('footer.usefulLinks', newLinks);
  };

  const addLink = () => {
    const newLinks = [...(data.footer.usefulLinks || []), { label: 'Nuovo Link', url: '#' }];
    handleInputChange('footer.usefulLinks', newLinks);
  };

  const removeLink = (idx: number) => {
    const newLinks = (data.footer.usefulLinks || []).filter((_, i) => i !== idx);
    handleInputChange('footer.usefulLinks', newLinks);
  };

  const handleAmenityChange = (idx: number, field: 'label' | 'icon', value: string) => {
    const newAmenities = [...(data.homepage.amenities?.items || [])];
    newAmenities[idx] = { ...newAmenities[idx], [field]: value };
    handleInputChange('homepage.amenities.items', newAmenities);
  };

  const addAmenity = () => {
    const newAmenities = [...(data.homepage.amenities?.items || []), { label: 'Nuovo Servizio', icon: 'Wifi' }];
    handleInputChange('homepage.amenities.items', newAmenities);
  };

  const removeAmenity = (idx: number) => {
    const newAmenities = (data.homepage.amenities?.items || []).filter((_, i) => i !== idx);
    handleInputChange('homepage.amenities.items', newAmenities);
  };

  const handleReviewChange = (idx: number, field: string, value: any) => {
    const newReviews = [...(data.homepage.reviews?.items || [])];
    newReviews[idx] = { ...newReviews[idx], [field]: value };
    handleInputChange('homepage.reviews.items', newReviews);
  };

  const addReview = () => {
    const newReviews = [...(data.homepage.reviews?.items || []), { name: 'Nuovo Ospite', text: 'Recensione...', rating: 5 }];
    handleInputChange('homepage.reviews.items', newReviews);
  };

  const removeReview = (idx: number) => {
    const newReviews = (data.homepage.reviews?.items || []).filter((_, i) => i !== idx);
    handleInputChange('homepage.reviews.items', newReviews);
  };

  const tabs = [
    { id: 'settings', label: 'Impostazioni', icon: Settings },
    { id: 'homepage', label: 'Homepage', icon: Home },
    { id: 'gallery', label: 'Galleria', icon: ImageIcon },
    { id: 'contact', label: 'Contatti', icon: Mail },
    { id: 'footer', label: 'Footer', icon: Layout },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 pt-0 md:pt-0">
      {/* Mobile Toggle */}
      <button 
        className="md:hidden fixed top-6 left-4 z-[60] bg-white p-2 rounded-lg shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-50 transition-transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6">
          <h2 className="text-xl font-bold text-secondary mb-8">Admin Panel</h2>
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all
                  ${activeTab === tab.id ? 'bg-primary text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'}
                `}
              >
                <tab.icon size={20} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="absolute bottom-8 left-0 w-full px-6">
          <Button 
            onClick={downloadJson}
            className="w-full space-x-2"
            variant="secondary"
          >
            <Download size={20} />
            <span>Scarica JSON</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'settings' && (
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-3xl font-bold text-secondary">Impostazioni Generali</h1>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome Sito</label>
                  <input 
                    type="text" 
                    value={data.settings.siteName}
                    onChange={(e) => handleInputChange('settings.siteName', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Colore Primario</label>
                    <div className="flex space-x-2">
                      <input 
                        type="color" 
                        value={data.settings.primaryColor}
                        onChange={(e) => handleInputChange('settings.primaryColor', e.target.value)}
                        className="h-12 w-12 rounded-lg cursor-pointer"
                      />
                      <input 
                        type="text" 
                        value={data.settings.primaryColor}
                        onChange={(e) => handleInputChange('settings.primaryColor', e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Colore Secondario</label>
                    <div className="flex space-x-2">
                      <input 
                        type="color" 
                        value={data.settings.secondaryColor}
                        onChange={(e) => handleInputChange('settings.secondaryColor', e.target.value)}
                        className="h-12 w-12 rounded-lg cursor-pointer"
                      />
                      <input 
                        type="text" 
                        value={data.settings.secondaryColor}
                        onChange={(e) => handleInputChange('settings.secondaryColor', e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Colore Accento</label>
                    <div className="flex space-x-2">
                      <input 
                        type="color" 
                        value={data.settings.accentColor}
                        onChange={(e) => handleInputChange('settings.accentColor', e.target.value)}
                        className="h-12 w-12 rounded-lg cursor-pointer"
                      />
                      <input 
                        type="text" 
                        value={data.settings.accentColor}
                        onChange={(e) => handleInputChange('settings.accentColor', e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="text-lg font-bold text-secondary mb-4">Configurazione Email</h3>
                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <p className="text-sm text-blue-800 mb-4">
                      Per ricevere le email dal form di contatto, devi configurare una API Key di <strong>Resend</strong> nel tuo ambiente di hosting (file .env).
                    </p>
                    <code className="block bg-white p-3 rounded-lg text-xs text-gray-600 border border-blue-200">
                      RESEND_API_KEY=re_your_api_key
                    </code>
                    <p className="text-xs text-blue-600 mt-4">
                      L'email verrà inviata a: <strong>{data.contact.email}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'homepage' && (
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-3xl font-bold text-secondary">Homepage</h1>
              
              {/* Hero */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <h3 className="text-xl font-bold text-secondary">Hero Section</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titolo</label>
                  <input 
                    type="text" 
                    value={data.homepage.hero.title}
                    onChange={(e) => handleInputChange('homepage.hero.title', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sottotitolo</label>
                  <textarea 
                    value={data.homepage.hero.subtitle}
                    onChange={(e) => handleInputChange('homepage.hero.subtitle', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none h-24"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Immagine Sfondo (URL)</label>
                  <input 
                    type="text" 
                    value={data.homepage.hero.backgroundImage}
                    onChange={(e) => handleInputChange('homepage.hero.backgroundImage', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <h3 className="text-xl font-bold text-secondary">Descrizione Appartamento</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titolo</label>
                  <input 
                    type="text" 
                    value={data.homepage.description.title}
                    onChange={(e) => handleInputChange('homepage.description.title', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Testo</label>
                  <textarea 
                    value={data.homepage.description.text}
                    onChange={(e) => handleInputChange('homepage.description.text', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none h-40"
                  />
                </div>
              </div>

              {/* Amenities */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-secondary">Servizi e Comfort</h3>
                  <Button size="sm" onClick={addAmenity}>Aggiungi Servizio</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.homepage.amenities?.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-3 items-end p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="flex-1 space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Icona (Lucide)</label>
                        <input 
                          type="text" 
                          value={item.icon}
                          onChange={(e) => handleAmenityChange(idx, 'icon', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                        />
                      </div>
                      <div className="flex-[2] space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Etichetta</label>
                        <input 
                          type="text" 
                          value={item.label}
                          onChange={(e) => handleAmenityChange(idx, 'label', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                        />
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeAmenity(idx)} className="text-red-500"><X size={16} /></Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-secondary">Recensioni</h3>
                  <Button size="sm" onClick={addReview}>Aggiungi Recensione</Button>
                </div>
                <div className="space-y-4">
                  {data.homepage.reviews?.items.map((review: any, idx: number) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase">Nome</label>
                          <input 
                            type="text" 
                            value={review.name}
                            onChange={(e) => handleReviewChange(idx, 'name', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                          />
                        </div>
                        <div className="w-24">
                          <label className="text-[10px] font-bold text-gray-400 uppercase">Rating (1-5)</label>
                          <input 
                            type="number" 
                            min="1" max="5"
                            value={review.rating}
                            onChange={(e) => handleReviewChange(idx, 'rating', parseInt(e.target.value))}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Testo</label>
                        <textarea 
                          value={review.text}
                          onChange={(e) => handleReviewChange(idx, 'text', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs h-20"
                        />
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeReview(idx)} className="text-red-500 w-full">Rimuovi Recensione</Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-3xl font-bold text-secondary">Galleria</h1>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.gallery.images.map((img, idx) => (
                    <div key={idx} className="p-4 border border-gray-100 rounded-2xl bg-gray-50">
                      <img src={img.url} alt="" className="w-full h-32 object-cover rounded-lg mb-4" />
                      <div className="space-y-4">
                        <input 
                          type="text" 
                          value={img.url}
                          onChange={(e) => {
                            const newImages = [...data.gallery.images];
                            newImages[idx].url = e.target.value;
                            handleInputChange('gallery.images', newImages);
                          }}
                          placeholder="URL Immagine"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200"
                        />
                        <input 
                          type="text" 
                          value={img.caption}
                          onChange={(e) => {
                            const newImages = [...data.gallery.images];
                            newImages[idx].caption = e.target.value;
                            handleInputChange('gallery.images', newImages);
                          }}
                          placeholder="Didascalia"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-3xl font-bold text-secondary">Contatti</h1>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    value={data.contact.email}
                    onChange={(e) => handleInputChange('contact.email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefono</label>
                  <input 
                    type="text" 
                    value={data.contact.phone}
                    onChange={(e) => handleInputChange('contact.phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Indirizzo</label>
                  <input 
                    type="text" 
                    value={data.contact.address}
                    onChange={(e) => handleInputChange('contact.address', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'footer' && (
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-3xl font-bold text-secondary">Footer</h1>
              
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <h3 className="text-xl font-bold text-secondary">Informazioni Generali</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Testo Copyright</label>
                  <input 
                    type="text" 
                    value={data.footer.text}
                    onChange={(e) => handleInputChange('footer.text', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none"
                  />
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-secondary">Link Utili</h3>
                  <Button size="sm" onClick={addLink}>Aggiungi Link</Button>
                </div>
                
                <div className="space-y-4">
                  {data.footer.usefulLinks?.map((link: any, idx: number) => (
                    <div key={idx} className="flex gap-4 items-end p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="flex-1 space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase">Etichetta</label>
                        <input 
                          type="text" 
                          value={link.label}
                          onChange={(e) => handleLinkChange(idx, 'label', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                        />
                      </div>
                      <div className="flex-[2] space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase">URL</label>
                        <input 
                          type="text" 
                          value={link.url}
                          onChange={(e) => handleLinkChange(idx, 'url', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                        />
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeLink(idx)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X size={18} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
