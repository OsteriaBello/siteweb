import React, { useEffect, useState } from "react";
import { Facebook, Instagram, Phone, MapPin, Mail } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import client from "../Lib/sanityClient.js";

const Footer = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    client
      .fetch(`*[_type == "contactInfo"][0]`)
      .then((data) => {
        setContactInfo(data);
      })
      .catch((error) => {
        console.error("Sanity fetch error:", error);
      });
  }, []);

  return (
    <footer className="bg-[#a4b39d] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-serif italic mb-4">
              Osteria Bellosguardo
            </h3>
            <p className="text-sm">{t("footer.experience")}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="hover:text-[#e3a048]">
                  {t("nav.home")}
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#e3a048]">
                  {t("nav.menu")}
                </a>
              </li>
              <li>
                <a href="#reservas" className="hover:text-[#e3a048]">
                  {t("nav.reservations")}
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-[#e3a048]">
                  {t("nav.contact")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <p>{contactInfo?.address}</p>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a
                  href={`tel:${contactInfo?.phone}`}
                  className="hover:text-[#e3a048]"
                >
                  {contactInfo?.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a
                  href={`tel:${contactInfo?.email}`}
                  className="hover:text-[#e3a048]"
                >
                  {contactInfo?.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t("footer.followUs")}
            </h4>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.facebook.com/p/Osteria-Bellosguardo-100086469573106/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#e3a048]"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://www.instagram.com/osteria.bellosguardo/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#e3a048]"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.tripadvisor.fr/Restaurant_Review-g187895-d15694704-Reviews-Osteria_Belguardo-Florence_Tuscany.html"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#e3a048]"
                aria-label="TripAdvisor"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 8.5c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5zm0 5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm0-9.5c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm8.3-10.3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-16.6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </a>
              <a
                href="https://www.thefork.com/restaurant/osteria-bellosguardo-r750229"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#e3a048]"
                aria-label="TheFork"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.34 4.576c0-.747-.747-1.37-1.618-1.37-.87 0-1.617.623-1.617 1.37 0 .748.747 1.37 1.617 1.37.871 0 1.618-.622 1.618-1.37zm-5.834 0c0-.747-.747-1.37-1.617-1.37-.871 0-1.618.623-1.618 1.37 0 .748.747 1.37 1.618 1.37.87 0 1.617-.622 1.617-1.37zm-5.834 0c0-.747-.747-1.37-1.617-1.37-.871 0-1.618.623-1.618 1.37 0 .748.747 1.37 1.618 1.37.87 0 1.617-.622 1.617-1.37zm13.91 3.113v9.311c0 1.743-1.494 3.113-3.24 3.113-1.37 0-2.489-.747-2.988-1.866-.498 1.119-1.618 1.866-2.988 1.866-1.37 0-2.489-.747-2.988-1.866-.499 1.119-1.618 1.866-2.988 1.866-1.746 0-3.24-1.37-3.24-3.113V7.689h2.491v9.311c0 .374.25.623.623.623.374 0 .623-.25.623-.623V7.689h2.49v9.311c0 .374.25.623.623.623.374 0 .623-.25.623-.623V7.689h2.491v9.311c0 .374.25.623.623.623.374 0 .623-.25.623-.623V7.689h2.49v9.311c0 .374.25.623.623.623.374 0 .623-.25.623-.623V7.689h2.491zM12.001 21.794v1.866h-1.246v-1.866h1.246z" />
                </svg>
              </a>
              <a
                href="https://pt.restaurantguru.com/Osteria-Bellosguardo-Lisbon"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#e3a048]"
                aria-label="Restaurant Guru"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20">
          <div className="flex flex-col items-center gap-2">
            <p className="text-center text-sm">
              © {new Date().getFullYear()} Osteria Bellosguardo.{" "}
              {t("footer.rights")}
            </p>
            <p className="text-sm text-white/80">
              Designed with Passion by{" "}
              <a
                href="https://gosite-web.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#e3a048]"
              >
                GOSITE-WEB
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
