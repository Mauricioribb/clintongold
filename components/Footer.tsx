
import React from 'react';
import { Instagram, Mail, Phone, MapPin, Send } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="contato" className="bg-[#050505] pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <img src={CONTACT_INFO.logoUrl} alt="Clinton Gold" className="h-10 w-auto mb-8" />
            <p className="text-gray-400 font-light leading-relaxed">
              Sua joalheria de referência para Compra e Venda de Ouro e Joias. Especializada em proporcionar a melhor experiência e valorização para suas peças exclusivas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-gold/20 hover:text-gold transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-gold/20 hover:text-gold transition-all">
                <Send size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gold uppercase tracking-widest mb-8">Institucional</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-gold transition-colors font-light">Sobre Nós</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold transition-colors font-light">Como Funciona a Venda</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold transition-colors font-light">Política de Privacidade</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold transition-colors font-light">Termos de Uso</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold transition-colors font-light">Trabalhe Conosco</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gold uppercase tracking-widest mb-8">Precisa de Ajuda?</h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <div className="p-2 bg-gold/10 rounded-lg text-gold group-hover:bg-gold group-hover:text-black transition-all">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Telefone / WhatsApp</p>
                  <p className="text-sm font-medium">{CONTACT_INFO.phone}</p>
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

          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gold uppercase tracking-widest mb-8">Horários</h4>
            <div className="p-6 bg-white/5 border border-white/10 rounded-[10px]">
              <p className="text-sm text-gray-300 mb-4">{CONTACT_INFO.hours.week}</p>
              <p className="text-sm text-gray-300">{CONTACT_INFO.hours.saturday}</p>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-gold font-bold tracking-[0.2em] uppercase">Atendimento Personalizado</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-center md:text-left">
          <p className="text-sm text-gray-500 font-light">
            © {new Date().getFullYear()} Clinton Gold. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-6">
            <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
            <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
            <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="Paypal" className="h-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
