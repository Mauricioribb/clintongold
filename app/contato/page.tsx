'use client';

import { useEffect } from 'react';
import Layout from '../../components/Layout';
import { CONTACT_INFO } from '../../constants';
import { useSettings } from '../../components/SettingsProvider';
import { Phone, Mail, MapPin, Instagram, Clock } from 'lucide-react';

export default function ContatoPage() {
  const { whatsappUrl } = useSettings();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6 leading-none">
            Entre em <span className="text-gold">Contato</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Estamos prontos para atender você. Fale conosco através dos nossos canais de atendimento.
          </p>
        </div>
      </section>

      {/* Informações de Contato */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/10 rounded-[10px] p-8 text-center hover:border-gold transition-all group"
            >
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Phone size={28} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase">WhatsApp</h3>
              <p className="text-gray-400 mb-4">{CONTACT_INFO.phone}</p>
              <span className="text-gold text-sm font-bold uppercase tracking-wide">Falar Agora</span>
            </a>

            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="bg-white/5 border border-white/10 rounded-[10px] p-8 text-center hover:border-gold transition-all group"
            >
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Mail size={28} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase">E-mail</h3>
              <p className="text-gray-400 mb-4 text-sm break-all">{CONTACT_INFO.email}</p>
              <span className="text-gold text-sm font-bold uppercase tracking-wide">Enviar E-mail</span>
            </a>

            <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 text-center">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin size={28} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase">Localização</h3>
              <p className="text-gray-400 mb-4">Salvador, Bahia</p>
              <span className="text-gold text-sm font-bold uppercase tracking-wide">Brasil</span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 text-center">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock size={28} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase">Horários</h3>
              <p className="text-gray-400 mb-2 text-sm">{CONTACT_INFO.hours.week}</p>
              <p className="text-gray-400 text-sm">{CONTACT_INFO.hours.saturday}</p>
            </div>
          </div>

          {/* Formulário de Contato */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-[10px] p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-8 text-center uppercase">Envie Sua Mensagem</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold uppercase tracking-wide mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-black border border-white/10 rounded-[10px] px-4 py-3 text-white focus:border-gold focus:outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wide mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-black border border-white/10 rounded-[10px] px-4 py-3 text-white focus:border-gold focus:outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold uppercase tracking-wide mb-2">
                    Telefone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full bg-black border border-white/10 rounded-[10px] px-4 py-3 text-white focus:border-gold focus:outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold uppercase tracking-wide mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full bg-black border border-white/10 rounded-[10px] px-4 py-3 text-white focus:border-gold focus:outline-none transition-all resize-none"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gold-gradient text-black py-4 rounded-[10px] font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Redes Sociais */}
      <section className="py-24 px-4 md:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 uppercase">Siga-nos nas Redes Sociais</h2>
          <div className="flex justify-center space-x-6">
            <a
              href={`https://instagram.com/${CONTACT_INFO.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Instagram size={28} className="text-black" />
            </a>
          </div>
          <p className="text-gray-400 mt-6">{CONTACT_INFO.instagram}</p>
        </div>
      </section>
    </Layout>
  );
}
