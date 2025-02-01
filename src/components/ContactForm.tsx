import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ContactForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    reason: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique pour envoyer le formulaire
    console.log('Message sent:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-[#a4b39d]">
            {t('form.fullName')}
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            required
            className="mt-1 block w-full rounded-md border-[#a4b39d]/20 shadow-sm focus:border-[#e3a048] focus:ring-[#e3a048]"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-[#a4b39d]">
            Email
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border-[#a4b39d]/20 shadow-sm focus:border-[#e3a048] focus:ring-[#e3a048]"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-reason" className="block text-sm font-medium text-[#a4b39d]">
          {t('form.reason')}
        </label>
        <select
          id="contact-reason"
          name="reason"
          required
          className="mt-1 block w-full rounded-md border-[#a4b39d]/20 shadow-sm focus:border-[#e3a048] focus:ring-[#e3a048]"
          value={formData.reason}
          onChange={handleChange}
        >
          <option value="">{t('form.select.reason')}</option>
          <option value="general">{t('form.reason.general')}</option>
          <option value="group">{t('form.reason.group')}</option>
          <option value="private">{t('form.reason.private')}</option>
          <option value="feedback">{t('form.reason.feedback')}</option>
          <option value="partnership">{t('form.reason.partnership')}</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-[#a4b39d]">
          {t('form.subject')}
        </label>
        <input
          type="text"
          id="contact-subject"
          name="subject"
          required
          className="mt-1 block w-full rounded-md border-[#a4b39d]/20 shadow-sm focus:border-[#e3a048] focus:ring-[#e3a048]"
          value={formData.subject}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-[#a4b39d]">
          {t('form.message')}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          className="mt-1 block w-full rounded-md border-[#a4b39d]/20 shadow-sm focus:border-[#e3a048] focus:ring-[#e3a048]"
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#e3a048] text-white py-2 px-4 rounded-md hover:bg-[#cc8f3f] transition-colors"
      >
        {t('form.send')}
      </button>
    </form>
  );
};

export default ContactForm;