"use client";

export default function LogoImage({ url, alt }: { url: string, alt: string }) {
  return (
    <div className="flex justify-center -mt-8 mb-12">
      <div className="w-16 h-16 flex items-center justify-center bg-white p-2 rounded-xl shadow-sm border border-slate-100">
        <img 
          src={url} 
          alt={`${alt} logo`} 
          className="max-h-full max-w-full object-contain"
          onError={(e) => (e.currentTarget.parentElement!.parentElement!.style.display = 'none')}
        />
      </div>
    </div>
  );
}