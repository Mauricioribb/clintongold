'use client';

import React from 'react';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { useSettings } from './SettingsProvider';

const Footer: React.FC = () => {
  const { whatsappUrl, whatsappNumber } = useSettings();
  return (
    <footer id="contato" className="bg-[#050505] pt-12 md:pt-24 pb-6 md:pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 mb-10 md:mb-20">
          <div className="space-y-4 md:space-y-6">
            <img src={CONTACT_INFO.logoUrl} alt="Clinton Gold" className="h-10 w-auto mb-4 md:mb-8" />
            <p className="text-gray-400 font-light leading-relaxed" style={{ color: 'var(--tw-ring-offset-color)' }}>
              Clinton Gold – Sua joalheria de referência para Compra e Venda de Ouro e Joias.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/clintongold_oficial" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-gold/20 hover:text-gold transition-all">
                <Instagram size={20} />
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-gold/20 hover:text-gold transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h4 className="text-lg font-bold text-gold uppercase tracking-widest mb-4 md:mb-8">Institucional</h4>
            <ul className="space-y-2 md:space-y-4">
              <li><a href="/sobre" className="text-white hover:text-gold transition-colors font-light">Sobre Nós</a></li>
              <li><a href="/contato" className="text-white hover:text-gold transition-colors font-light">Fale Conosco</a></li>
              <li><a href="/formas-de-envio" className="text-white hover:text-gold transition-colors font-light">Formas de Envio</a></li>
              <li><a href="/formas-de-pagamento" className="text-white hover:text-gold transition-colors font-light">Formas de Pagamento</a></li>
              <li><a href="/politica-de-privacidade" className="text-white hover:text-gold transition-colors font-light">Política de Privacidade</a></li>
              <li><a href="/politica-de-reembolso-devolucao" className="text-white hover:text-gold transition-colors font-light">Política de Reembolso e Devolução</a></li>
            </ul>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h4 className="text-lg font-bold text-gold uppercase tracking-widest mb-4 md:mb-8">Precisa de Ajuda?</h4>
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start space-x-4 group">
                <div className="p-2 bg-gold/10 rounded-lg text-gold group-hover:bg-gold group-hover:text-black transition-all">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Telefone / WhatsApp</p>
                  <p className="text-sm font-medium">{whatsappNumber}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="p-2 bg-gold/10 rounded-lg text-gold group-hover:bg-gold group-hover:text-black transition-all">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">E-mail Comercial</p>
                  <p className="text-sm font-medium">{CONTACT_INFO.email}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="p-2 bg-gold/10 rounded-lg text-gold group-hover:bg-gold group-hover:text-black transition-all">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Localização</p>
                  <p className="text-sm font-medium">Salvador, Bahia - Brasil</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h4 className="text-lg font-bold text-gold uppercase tracking-widest mb-4 md:mb-8">Horários</h4>
            <div className="p-6 bg-white/5 border border-white/10 rounded-[10px]">
              <p className="text-sm text-gray-300 mb-4">{CONTACT_INFO.hours.week}</p>
              <p className="text-sm text-gray-300">{CONTACT_INFO.hours.saturday}</p>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-gold font-bold tracking-[0.2em] uppercase">Atendimento Personalizado</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
          <p className="text-sm text-gray-500 font-light">
            © {new Date().getFullYear()} Clinton Gold. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-6">
            <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
            <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
            <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="Paypal" className="h-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
          </div>
        </div>

        <div className="pt-4 md:pt-6 border-t border-white/5 text-center">
          <p className="text-sm text-gray-500 font-light">
            Desenvolvido e Monitorado por{' '}
            <a 
              href="https://PageMax.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-400 transition-colors"
            >
              PageMax.com.br
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
