import React from 'react';
import { Gem, TrendingUp, CreditCard, Shield, Store } from 'lucide-react';

const ITEMS = [
  { text: "AVALIAMOS SUAS JOIAS", icon: Gem },
  { text: "MELHOR COTAÇÃO", icon: TrendingUp },
  { text: "PAGAMENTO IMEDIADO", icon: CreditCard },
  { text: "SIGILO, DISCRIÇÃO E TRANSPARÊNCIA", icon: Shield },
  { text: "VENHA CONHECER A SUA LOJA REFERÊNCIA EM COMPRA DE JOIAS", icon: Store }
];

const Marquee: React.FC = () => {
  return (
    <div className="bg-gold-gradient py-[9.6px] md:py-3 overflow-hidden whitespace-nowrap border-y border-black/10">
      <div className="inline-block animate-marquee">
        {[...ITEMS, ...ITEMS].map((item, idx) => {
          const Icon = item.icon;
          return (
            <span key={idx} className="mx-2 md:mx-8 text-black font-black text-xs tracking-[0.2em] uppercase inline-flex items-center gap-2">
              <Icon size={16} className="flex-shrink-0" />
              {item.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Marquee;
