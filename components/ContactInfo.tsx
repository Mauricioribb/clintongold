'use client';

import { CONTACT_INFO } from '../constants';
import { useSettings } from './SettingsProvider';
import { Phone, Mail, MapPin, Instagram, Clock } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function ContactInfo() {
  const { whatsappUrl } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Formatar mensagem com todos os campos
    const message = `*Contato via Site - Clinton Gold*

*Nome:* ${formData.name}
*E-mail:* ${formData.email}
*Telefone/WhatsApp:* ${formData.phone}

*Mensagem:*
${formData.message}`;

    // Codificar a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Criar URL do WhatsApp com a mensagem
    const whatsappMessageUrl = `${whatsappUrl}&text=${encodedMessage}`;
    
    // Abrir WhatsApp em nova aba
    window.open(whatsappMessageUrl, '_blank');
    
    // Limpar formulário
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      {/* Informações de Contato */}
      <section className="py-12 md:py-[50px] px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-gray-200 rounded-[10px] p-6 text-center hover:border-gold transition-all group shadow-sm"
            >
              <div className="w-14 h-14 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Phone size={24} className="text-black" />
              </div>
              <h3 className="text-lg font-bold mb-2 uppercase text-black">WhatsApp</h3>
              <p className="text-gray-600 mb-3 text-sm">{CONTACT_INFO.phone}</p>
              <span className="text-gold text-xs font-bold uppercase tracking-wide">Falar Agora</span>
            </a>

            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="bg-white border border-gray-200 rounded-[10px] p-6 text-center hover:border-gold transition-all group shadow-sm"
            >
              <div className="w-14 h-14 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Mail size={24} className="text-black" />
              </div>
              <h3 className="text-lg font-bold mb-2 uppercase text-black">E-mail</h3>
              <p className="text-gray-600 mb-3 text-xs break-all">{CONTACT_INFO.email}</p>
              <span className="text-gold text-xs font-bold uppercase tracking-wide">Enviar E-mail</span>
            </a>

            <div className="bg-white border border-gray-200 rounded-[10px] p-6 text-center shadow-sm">
              <div className="w-14 h-14 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} className="text-black" />
              </div>
              <h3 className="text-lg font-bold mb-2 uppercase text-black">Localização</h3>
              <p className="text-gray-600 mb-3 text-sm">Salvador, Bahia</p>
              <span className="text-gold text-xs font-bold uppercase tracking-wide">Brasil</span>
            </div>

            <div className="bg-white border border-gray-200 rounded-[10px] p-6 text-center shadow-sm">
              <div className="w-14 h-14 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={24} className="text-black" />
              </div>
              <h3 className="text-lg font-bold mb-2 uppercase text-black">Horários</h3>
              <p className="text-gray-600 mb-1 text-xs">{CONTACT_INFO.hours.week}</p>
              <p className="text-gray-600 text-xs">{CONTACT_INFO.hours.saturday}</p>
            </div>
          </div>

          {/* Formulário e Mapa em duas colunas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Formulário de Contato */}
            <div className="bg-white border border-gray-200 rounded-[10px] p-6 md:p-8 shadow-sm">
              <h2 className="text-base md:text-xl font-bold mb-4 text-center uppercase text-black">Envie Sua Mensagem</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wide mb-1 text-black">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-[8px] px-3 py-2 text-black text-sm focus:border-gold focus:outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wide mb-1 text-black">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-[8px] px-3 py-2 text-black text-sm focus:border-gold focus:outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wide mb-1 text-black">
                    Telefone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-[8px] px-3 py-2 text-black text-sm focus:border-gold focus:outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wide mb-1 text-black">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-[8px] px-3 py-2 text-black text-sm focus:border-gold focus:outline-none transition-all resize-none"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gold-gradient text-black py-3 rounded-[8px] font-black uppercase tracking-widest text-sm hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
                >
                  Enviar para WhatsApp
                </button>
              </form>
            </div>

            {/* Mapa de Salvador */}
            <div className="bg-white border border-gray-200 rounded-[10px] p-6 md:p-8 shadow-sm">
              <h2 className="text-base md:text-xl font-bold mb-4 text-center uppercase text-black">Nossa Localização</h2>
              <div className="w-full rounded-[8px] overflow-hidden" style={{ height: '400px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15554.5!2d-38.5108!3d-12.9714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x716112050422ebd%3A0xf71c2482754da63!2sSalvador%2C%20BA!5e0!3m2!1spt-BR!2sbr!4v1698765432109!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                  title="Mapa de Salvador, Bahia"
                ></iframe>
              </div>
              <p className="text-gray-600 text-sm mt-4 text-center">Salvador, Bahia - Brasil</p>
            </div>
          </div>
        </div>
      </section>

      {/* Redes Sociais */}
      <section className="py-12 md:py-[50px] px-4 md:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-base md:text-2xl font-bold mb-4 md:mb-6 uppercase">Siga-nos nas Redes Sociais</h2>
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
    </>
  );
}
