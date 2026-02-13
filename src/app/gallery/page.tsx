import { getSiteData } from '@/lib/data-loader';

export default function GalleryPage() {
  const data = getSiteData();

  return (
    <div className="pt-8 md:pt-24 pb-20 px-6 md:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="mb-4">{data.gallery.title}</h1>
          <p className="subtitle max-w-2xl mx-auto">
            Ogni angolo dell'appartamento è stato curato per offrire il massimo dello stile e del comfort.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.gallery.images.map((image, idx) => (
            <div 
              key={idx} 
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-lg cursor-pointer"
            >
              <img 
                src={image.url} 
                alt={image.caption} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-white font-bold text-xl">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
