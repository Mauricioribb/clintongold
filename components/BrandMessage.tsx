
import React from 'react';

const JEWELRY_THUMBS = [
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=200&h=200&auto=format&fit=crop"
];

const BrandMessage: React.FC = () => {
  return (
    <section className="py-10 md:py-20 bg-black relative overflow-hidden">
      {/* Elementos decorativos sutis */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10">
        <div className="bg-white rounded-[10px] px-5 md:px-20 py-5 shadow-2xl">
          <div className="inline-block mb-8">
            <div className="w-12 h-[1px] bg-gold/50 mx-auto"></div>
            <div className="mt-2 text-gold text-[10px] tracking-[0.5em] uppercase font-bold">Exclusividade & Tradição</div>
          </div>
          
          <p className="text-[14px] md:text-2xl lg:text-3xl font-bold leading-[20px] md:leading-snug text-gray-600">
            Somos especializados na <span className="text-gold">compra e venda de ouro</span>, joias exclusivas e relógios de luxo. 
            Trabalhamos com transparência, avaliação justa e peças selecionadas com rigor. 
            Oferecemos um <span className="text-gold">atendimento personalizado</span>, garantindo segurança, confiança e valorização máxima dos seus bens preciosos.
          </p>

          {/* Grupo de Imagens Redondas Sobrepostas */}
          <div className="mt-12 flex items-center justify-center -space-x-4">
            {JEWELRY_THUMBS.map((src, index) => (
              <div 
                key={index} 
                className="relative group transition-transform duration-500 hover:z-30 hover:-translate-y-2"
                style={{ zIndex: 5 - index }}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-gray-200 overflow-hidden shadow-2xl bg-neutral-100">
                  <img 
                    src={src} 
                    alt={`Joia em destaque ${index + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
                  />
                </div>
                {/* Efeito de brilho na borda */}
                <div className="absolute inset-0 rounded-full border border-gold/20 pointer-events-none"></div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <div className="w-1 h-1 rounded-full bg-gold mx-1"></div>
            <div className="w-1 h-1 rounded-full bg-gold/50 mx-1"></div>
            <div className="w-1 h-1 rounded-full bg-gold/20 mx-1"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandMessage;
