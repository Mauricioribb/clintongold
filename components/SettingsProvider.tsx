'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getWhatsAppUrl, formatWhatsAppNumber } from '@/lib/settings';

interface SettingsContextType {
  whatsappUrl: string;
  whatsappNumber: string;
  salesDisabled: boolean;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextType>({
  whatsappUrl: 'https://wa.me/5571991369104',
  whatsappNumber: '+55 (71) 99136-9104',
  salesDisabled: false,
  loading: true,
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [whatsappUrl, setWhatsappUrl] = useState('https://wa.me/5571991369104');
  const [whatsappNumber, setWhatsappNumber] = useState('+55 (71) 99136-9104');
  const [salesDisabled, setSalesDisabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await fetch('/api/settings');
        if (response.ok) {
          const settings = await response.json();
          const number = settings.whatsapp_number || '5571991369104';
          setWhatsappUrl(getWhatsAppUrl(number));
          setWhatsappNumber(formatWhatsAppNumber(number));
          // sales_disabled pode ser 'true' (string) ou 'false' (string) ou não existir
          setSalesDisabled(settings.sales_disabled === 'true');
        }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ whatsappUrl, whatsappNumber, salesDisabled, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
