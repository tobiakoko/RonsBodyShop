import { GALLERY } from "../../config/data";
import { MdSportsFootball } from "react-icons/md";

export default function Gallery() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden" id="gallery">
      <div className="absolute left-[-50px] top-20 opacity-10 rotate-12 hidden xl:block">
        <div className="w-64 h-80 border-8 border-gold/30 flex items-center justify-center">
          <MdSportsFootball className="text-[150px] text-white" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl text-gold mb-4 tracking-tighter">
            THE SHOWROOM &amp; MEMORABILIA
          </h2>
          <p className="text-2xl text-slate-400">
            Where vintage gas pumps meet classic iron.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {GALLERY.map((g) => (
            <div key={g.alt} className="vintage-border aspect-square overflow-hidden group relative">
              <img
                alt={g.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                src={g.src}
              />
              <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="enamel-button bg-accent text-white px-12 py-4 rounded-sm font-display text-xl tracking-widest hover:brightness-110">
            VIEW FULL GALLERY
          </button>
        </div>
      </div>
    </section>
  );
}
