import React, { createContext, useContext, useState } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.menu': 'Menu',
    'nav.gallery': 'Galeria',
    'nav.reservations': 'Reservas',
    'nav.contact': 'Contato',

    // Hero Section
    'hero.subtitle': 'Restaurante Italiano em Alfama',
    'hero.description': 'Experimente os sabores autênticos da Itália no coração de Lisboa.',
    'hero.cta': 'Reservar uma mesa',

    // Menu Section
    'menu.title': 'Nosso Menu',
    'menu.description': 'Nosso restaurante captura a essência da gastronomia italiana: ingredientes frescos, receitas preciosas transmitidas por gerações e uma profunda paixão pelos sabores autênticos.',
    'menu.discover': 'Descobrir nosso menu',
    'menu.fresh.pasta': 'Massas Frescas',
    'menu.wines': 'Vinhos',
    'menu.desserts': 'Sobremesas',
    'menu.modal.title': 'O Cardápio',

    // Gallery Section
    'gallery.title': 'Nossa Galeria',

    // Our Experience Section
    'room.title': 'Nossa Experiência',
    'room.description': 'Nosso restaurante, localizado no coração de Alfama, oferece uma atmosfera acolhedora e autêntica onde o charme português se mistura com a elegância italiana em um espaço tradicional e refinado.',
    'room.rating': 'no TheFork',
    'room.review.thefork': 'Um ambiente acolhedor, com pratos autênticos e deliciosos.',
    'room.review.tripadvisor': 'Um ambiente tradicional, complementado por um serviço atencioso e personalizado.',

    // Reviews
    'reviews.tripadvisor': '5/5 no TripAdvisor',
    'reviews.thefork': '9.1/10 no TheFork',
    'reviews.tripadvisor.text': 'Um ambiente tradicional, complementado por um serviço atencioso e personalizado.',
    'reviews.thefork.text': 'Um ambiente acolhedor, com pratos autênticos e deliciosos.',

    // Reservations Section
    'reservations.title': 'Reservas',
    'reservations.hours.title': 'Horário de Funcionamento',
    'reservations.hours.weekdays': 'Segunda - Sábado: 12h30 - 23h',
    'reservations.hours.weekend': 'Domingo: 11h - 23h',

    // Contact Section
    'contact.title': 'Contato',
    'contact.how.to.reach': 'Como Chegar',
    'contact.talk.to.us': 'Fale Conosco',

    // Footer
    'footer.experience': 'Uma experiência culinária italiana autêntica no coração de Lisboa.',
    'footer.quickLinks': 'Links Rápidos',
    'footer.contact': 'Contato',
    'footer.followUs': 'Siga-nos',
    'footer.rights': 'Todos os direitos reservados.',

    // Forms
    'form.fullName': 'Nome completo',
    'form.date': 'Data',
    'form.time': 'Hora',
    'form.guests': 'Número de pessoas',
    'form.person': 'pessoa',
    'form.people': 'pessoas',
    'form.reserve': 'Reservar uma mesa',
    'form.subject': 'Assunto',
    'form.message': 'Mensagem',
    'form.send': 'Enviar mensagem',
    'form.reason': 'Motivo do contato',
    'form.select.reason': 'Selecione um motivo',
    'form.reason.general': 'Informações gerais',
    'form.reason.group': 'Reserva para grupo',
    'form.reason.private': 'Evento privado',
    'form.reason.feedback': 'Feedback',
    'form.reason.partnership': 'Parceria',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.gallery': 'Gallery',
    'nav.reservations': 'Reservations',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.subtitle': 'Italian Restaurant in Alfama',
    'hero.description': 'Experience the authentic flavors of Italy in the heart of Lisbon.',
    'hero.cta': 'Book a table',

    // Menu Section
    'menu.title': 'Our Menu',
    'menu.description': 'Our restaurant captures the essence of Italian gastronomy: fresh ingredients, cherished recipes passed down through generations, and a deep passion for authentic flavors.',
    'menu.discover': 'Discover our menu',
    'menu.fresh.pasta': 'Fresh Pasta',
    'menu.wines': 'Wines',
    'menu.desserts': 'Desserts',
    'menu.modal.title': 'The Menu',

    // Gallery Section
    'gallery.title': 'Our Gallery',

    // Our Experience Section
    'room.title': 'Our Experience',
    'room.description': 'Our restaurant, located in the heart of Alfama, offers a warm and authentic atmosphere where Portuguese charm meets Italian elegance in a traditional and refined space.',
    'room.rating': 'on TheFork',
    'room.review.thefork': 'A warm and welcoming atmosphere, with authentic and delicious dishes.',
    'room.review.tripadvisor': 'A traditional setting, complemented by attentive and personalized service.',

    // Reviews
    'reviews.tripadvisor': '5/5 on TripAdvisor',
    'reviews.thefork': '9.1/10 on TheFork',
    'reviews.tripadvisor.text': 'A traditional setting, complemented by attentive and personalized service.',
    'reviews.thefork.text': 'A warm and welcoming atmosphere, with authentic and delicious dishes.',

    // Reservations Section
    'reservations.title': 'Reservations',
    'reservations.hours.title': 'Opening Hours',
    'reservations.hours.weekdays': 'Monday - Saturday: 12:30pm - 11pm',
    'reservations.hours.weekend': 'Sunday: 11am - 11pm',

    // Contact Section
    'contact.title': 'Contact',
    'contact.how.to.reach': 'How to Reach Us',
    'contact.talk.to.us': 'Talk to Us',

    // Footer
    'footer.experience': 'An authentic Italian culinary experience in the heart of Lisbon.',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.followUs': 'Follow Us',
    'footer.rights': 'All rights reserved.',

    // Forms
    'form.fullName': 'Full Name',
    'form.date': 'Date',
    'form.time': 'Time',
    'form.guests': 'Number of guests',
    'form.person': 'person',
    'form.people': 'people',
    'form.reserve': 'Book a table',
    'form.subject': 'Subject',
    'form.message': 'Message',
    'form.send': 'Send message',
    'form.reason': 'Reason for contact',
    'form.select.reason': 'Select a reason',
    'form.reason.general': 'General information',
    'form.reason.group': 'Group booking',
    'form.reason.private': 'Private event',
    'form.reason.feedback': 'Feedback',
    'form.reason.partnership': 'Partnership',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}