import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ReservationForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    guests: '2',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique pour envoyer le formulaire
    console.log('Reserva enviada:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#3a6053]">
          {t('form.fullName')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full rounded-md border-[#3a6053]/20 shadow-sm focus:border-[#e3a048] focus:ring-[#e3a048]"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-[#3a6053]">
            {t('form.date')}
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
            className="mt-1 block w-full rounded-md border-[#3a6053]/20 shadow-sm focus:border-[#e3a048] focus:ring-[#e3a048]"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-[#3a6053]">
            {t('form.time')}
          </label>
          <input
            type="time"
            id="time"
            name="time"
            required
            className="mt-1 block w-full rounded-md border-[#3a6053]/20 shadow-sm focus:border-[#e3a048] focus:ring-[#e3a048]"
            value={formData.time}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label htmlFor="guests" className="block text-sm font-medium text-[#3a6053]">
          {t('form.guests')}
        </label>
        <select
          id="guests"
          name="guests"
          className="mt-1 block w-full rounded-md border-[#3a6053]/20 shadow-sm focus:border-[#e3a048] focus:ring-[#e3a048]"
          value={formData.guests}
          onChange={handleChange}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? t('form.person') : t('form.people')}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-[#e3a048] text-white py-2 px-4 rounded-md hover:bg-[#cc8f3f] transition-colors"
      >
        {t('form.reserve')}
      </button>
    </form>
  );
};

export default ReservationForm;