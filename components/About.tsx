'use client';

import React from 'react';
import { Award, Eye, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="relative z-10 rounded-[10px] overflow-hidden shadow-2xl shadow-gold/10 border border-white/5 bg-neutral-900">
              <img 
                src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=2070&auto=format&fit=crop" 
                alt="Workshop Joalheria de Luxo" 
                className="w-full h-[500px] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1573408302185-9127fe583ad5?q=80&w=2069&auto=format&fit=crop";
                }}
              />
            </div>
            
            <div className="absolute -bottom-8 -right-8 bg-gold-gradient p-10 rounded-[10px] shadow-[0_20px_50px_rgba(212,175,55,0.4)] animate-fade-in flex flex-col items-center text-center border-4 border-black/10 z-20">
              <div className="bg-black/10 p-3 rounded-full mb-3">
                <Award size={32} className="text-black" />
              </div>
              <p className="text-black font-black text-5xl leading-none">15+</p>
              <p className="text-black text-[10px] font-black uppercase tracking-[0.2em] mt-2 max-w-[100px] leading-tight">
                Anos de Tradição & Excelência
              </p>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="bg-white rounded-[10px] p-8 md:p-12 shadow-2xl">
              <h2 className="text-gold text-sm font-bold tracking-[0.3em] uppercase mb-4">Legado e Confiança</h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight uppercase tracking-tight text-gray-800">Sua Loja Referência em Negócios de Ouro</h3>
              <p className="text-gray-600 text-lg leading-relaxed font-light mb-8">
                A Clinton Gold nasceu da paixão pela alta joalheria e do compromisso com a transparência absoluta. 
                Trabalhamos com avaliação justa e peças selecionadas com rigor. 
                Nosso objetivo é oferecer um atendimento personalizado que garanta a segurança e a valorização máxima dos seus bens preciosos.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="bg-neutral-50 p-6 rounded-[10px] border border-gold/10 shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-black rounded-lg text-white">
                      <Eye size={20} />
                    </div>
                    <p className="text-black font-black text-lg uppercase tracking-wide leading-none">Transparência</p>
                  </div>
                  <p className="text-sm text-gray-800 font-medium leading-relaxed">
                    Avaliações feitas na sua presença com balanças certificadas e total clareza.
                  </p>
                </div>
                
                <div className="bg-neutral-50 p-6 rounded-[10px] border border-gold/10 shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-black rounded-lg text-white">
                      <Users size={20} />
                    </div>
                    <p className="text-black font-black text-lg uppercase tracking-wide leading-none">Especialistas</p>
                  </div>
                  <p className="text-sm text-gray-800 font-medium leading-relaxed">
                    Peritos gemólogos e relojoeiros experientes no mercado internacional de luxo.
                  </p>
                </div>
              </div>

              <button className="flex items-center space-x-3 text-gray-600 font-bold tracking-widest uppercase text-xs group">
                <span className="group-hover:text-gold transition-colors">Conheça nossa história completa</span>
                <div className="w-10 h-[1px] bg-gold group-hover:w-16 transition-all"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
