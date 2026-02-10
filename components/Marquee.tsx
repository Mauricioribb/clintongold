import React from 'react';

const ITEMS = [
  "MELHOR COTAÇÃO DO MERCADO",
  "PAGAMENTO IMEDIATO",
  "SIGILO E DISCREÇÃO",
  "AVALIAMOS SUAS JOIAS",
  "COMPRA E VENDA DE OURO",
  "RELÓGIOS DE LUXO"
];

const Marquee: React.FC = () => {
  return (
    <div className="bg-gold-gradient py-[9.6px] md:py-3 overflow-hidden whitespace-nowrap border-y border-black/10">
      <div className="inline-block animate-marquee">
        {[...ITEMS, ...ITEMS].map((item, idx) => (
          <span key={idx} className="mx-2 md:mx-8 text-black font-black text-xs tracking-[0.2em] uppercase">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
