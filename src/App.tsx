import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ImageCarousel from "./components/ImageCarousel";
import Gallery from "./components/Gallery";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  ChefHat,
  X,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "./contexts/LanguageContext";
import client, { urlFor } from "./Lib/sanityClient.js";

function App() {
  const [banner, setBanner] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [carouselData, setCarouselData] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);
  const [openingHours, setOpeningHours] = useState(null);
  const [menuPdf, setMenuPdf] = useState(null);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();
  const { language } = useLanguage();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleScrollToMenu = () => {
    const menuSection = document.querySelector("#menu");
    if (menuSection) {
      const navbarHeight = 96;
      const elementPosition = menuSection.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    client
      .fetch(`*[_type == "banner"][0]`)
      .then((data) => setBanner(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    client
      .fetch(`*[_type == "gallery"][0]`)
      .then((data) => setGallery(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    client
      .fetch(
        `*[_type == "carousel"][0]{
        title, 
        images[]{
          asset->{url}, 
          altText
        }, 
        autoplay, 
        interval
      }`
      )
      .then((data) => {
        setCarouselData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Sanity fetch error:", error);
        setLoading(false);
      });
  }, []);

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

  useEffect(() => {
    client
      .fetch(`*[_type == "openingHours"][0]`)
      .then((data) => {
        setOpeningHours(data);
      })
      .catch((error) => {
        console.error("Sanity fetch error:", error);
      });
  }, []);

  useEffect(() => {
    setLoadingMenu(true);
    client
      .fetch(
        `*[_type == "menuPdf"][0]{
        title, 
        pdfFile{
          asset->{url}
        },
        translations{
          en{
            asset->{url}
          },
          pt{
            asset->{url}
          }
        }
      }`
      )
      .then((data) => {
        setMenuPdf(data);
        setLoadingMenu(false);
      })
      .catch((error) => {
        console.error("Sanity fetch error:", error);
        setLoadingMenu(false);
      });
  }, []);

  return (
    <div className="font-sans">
      <Navbar />

      <main id="main-content">
        <section
          id="inicio"
          className="min-h-screen bg-cover bg-center relative"
          style={{
            backgroundImage: banner
              ? `url(${urlFor(banner.image).url()})`
              : "none",
          }}
        >
          <div className="min-h-screen bg-gradient-to-b from-black/50 to-black/30 backdrop-brightness-75 flex items-center justify-center text-white">
            <div className="max-w-3xl text-center px-4">
              <h1 className="text-5xl md:text-6xl font-serif italic mb-6">
                Osteria Bellosguardo
              </h1>
              <p className="text-2xl font-serif italic mb-4">
                {t("hero.subtitle")}
              </p>
              <p className="text-xl mb-8">{t("hero.description")}</p>
              <a
                href="https://widget.thefork.com/en/da7ca922-58dd-4ab3-94b6-1bb5548434d7"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#e3a048] text-white px-8 py-3 rounded-md hover:bg-[#cc8f3f] transition-colors"
              >
                {t("hero.cta")}
              </a>
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-12">
            <img
              src="https://lh3.googleusercontent.com/pw/AP1GczPQigVNSoQuw_CC7-vVavMxYfEpi5Dy_bR5fKK0ODk7OrvDCg65p8LOwnNAko8-7613shURGlj9jA-ruEEgG_aYdJuV53aoQVyJ1-e0wK6UsdMkX1tY-6NtfEVmtGhWZd94WCzQTAc4QKTiqZOkRXgp=w200-h220-s-no-gm?authuser=0"
              alt="Osteria Bellosguardo Logo"
              className="w-40 h-auto"
            />
          </div>

          <div
            onClick={handleScrollToMenu}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          >
            <div className="relative">
              <ChevronDown
                size={32}
                className="text-[#e3a048] animate-bounce-delayed-1"
              />
              <ChevronDown
                size={32}
                className="text-[#e3a048] absolute top-[-8px] animate-bounce-delayed-2"
              />
            </div>
          </div>
        </section>

        <section id="menu" className="py-20 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-serif italic text-center mb-8 text-[#a4b39d] reveal">
              {t("menu.title")}
            </h2>
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-lg text-gray-600 mb-8 reveal">
                {t("menu.description")}
              </p>
              <div className="flex justify-center reveal">
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="inline-flex items-center gap-2 bg-[#e3a048] text-white px-8 py-3 rounded-md hover:bg-[#cc8f3f] transition-colors"
                >
                  <ChefHat size={20} />
                  {t("menu.discover")}
                </button>
              </div>
            </div>
          </div>

          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="menu-title"
            >
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
                <div className="sticky top-0 right-0 p-4 flex justify-end bg-white z-10">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-500 hover:text-[#e3a048] p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="p-8 pt-0">
                  <h3
                    id="menu-title"
                    className="text-3xl font-serif italic text-center mb-8 text-[#a4b39d]"
                  >
                    {t("menu.modal.title")}
                  </h3>

                  {loadingMenu ? (
                    <p className="text-gray-500 text-center">Loading menu...</p>
                  ) : menuPdf ? (
                    <div className="flex justify-center">
                      <iframe
                        src={
                          language === "en"
                            ? menuPdf?.translations?.en?.asset?.url
                            : menuPdf?.translations?.pt?.asset?.url
                        }
                        width="100%"
                        height="600px"
                        className="border rounded-md"
                      ></iframe>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center">
                      No menu available.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        <section id="galeria" className="py-20 bg-[#1a472a]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-serif italic text-center mb-16 text-[#a4b39d] reveal">
              {t("gallery.title")}
            </h2>
            {gallery && (
              <Gallery
                images={gallery.images.map((image) => ({
                  url: urlFor(image).url(),
                  alt: image.altText || "Gallery image",
                }))}
              />
            )}
          </div>
        </section>

        <section id="sala" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-serif italic text-center mb-16 text-[#a4b39d] reveal">
              {t("room.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="reveal">
                <p className="text-lg mb-8">{t("room.description")}</p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <a
                    href="https://www.tripadvisor.com/Restaurant_Review-g189158-d25175771-Reviews-Osteria_Bellosguardo-Lisbon_Lisbon_District_Central_Portugal.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1a472a]/5 p-6 rounded-lg flex-1 hover:bg-[#1a472a]/10 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="text-[#e3a048]" />
                      <span className="font-semibold">
                        {t("reviews.tripadvisor")}
                      </span>
                    </div>
                    <p className="italic">{t("reviews.tripadvisor.text")}</p>
                  </a>
                  <a
                    href="https://www.thefork.com/restaurant/osteria-bellosguardo-r750229"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1a472a]/5 p-6 rounded-lg flex-1 hover:bg-[#1a472a]/10 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="text-[#e3a048]" />
                      <span className="font-semibold">
                        {t("reviews.thefork")}
                      </span>
                    </div>
                    <p className="italic">{t("reviews.thefork.text")}</p>
                  </a>
                </div>
              </div>
              <div
                className="reveal"
                style={{ "--delay": "200ms" } as React.CSSProperties}
              >
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500">Loading carousel...</p>
                  </div>
                ) : (
                  carouselData && (
                    <ImageCarousel
                      images={carouselData.images.map((image) => ({
                        url: image.asset.url,
                        alt: image.altText || "Carousel image",
                      }))}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="reservas" className="py-20 bg-[#1a472a]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-serif italic text-center mb-8 text-[#a4b39d] reveal">
              {t("reservations.title")}
            </h2>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-lg reveal">
                <div className="mb-8">
                  <h3 className="text-2xl font-serif italic mb-4 text-[#a4b39d]">
                    {t("reservations.hours.title")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="text-[#e3a048]" />
                      <span>
                        <strong>
                          {language === "en"
                            ? openingHours?.days[0]?.translations?.en
                            : openingHours?.days[0]?.translations?.pt}
                          :
                        </strong>{" "}
                        {openingHours?.days[0]?.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="text-[#e3a048]" />
                      <span>
                        <strong>
                          {language === "en"
                            ? openingHours?.days[1]?.translations?.en
                            : openingHours?.days[1]?.translations?.pt}
                          :
                        </strong>{" "}
                        {openingHours?.days[1]?.time}
                      </span>
                    </div>
                  </div>
                </div>
                <a
                  href="https://widget.thefork.com/en/da7ca922-58dd-4ab3-94b6-1bb5548434d7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#e3a048] text-white text-center py-3 px-4 rounded-md hover:bg-[#cc8f3f] transition-colors"
                >
                  {t("hero.cta")}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-serif italic text-center mb-16 text-[#a4b39d] reveal">
              {t("contact.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="h-[300px] rounded-lg overflow-hidden shadow-lg reveal">
                <img
                  src="https://lh3.googleusercontent.com/pw/AP1GczMLMwhCeA2gj1qWlim-NFHjZS4JfxvPormv8rDcCwNQaK3iU8sBbrNRrcvaeiyfAVDKQZTTQDFnBXu96n0sMH8WYwtUhh-LEQ4V8-2jx4T_VblWyDJ0S6jolT0mZX5KgXAhaKf35xc2jXmZ6z-LrzZA=w2132-h1402-s-no-gm?authuser=0"
                  alt="Interior of Osteria Bellosguardo"
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className="reveal"
                style={{ "--delay": "200ms" } as React.CSSProperties}
              >
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-serif italic mb-4 text-[#a4b39d]">
                      {t("contact.how.to.reach")}
                    </h3>
                    <div className="flex items-start gap-3">
                      <MapPin className="text-[#e3a048] flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">Osteria Bellosguardo</p>
                        <p>{contactInfo?.address}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-serif italic mb-4 text-[#a4b39d]">
                      {t("contact.talk.to.us")}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone className="text-[#e3a048]" />
                        <a
                          href={`tel:${contactInfo?.phone}`}
                          className="hover:text-[#e3a048]"
                        >
                          {contactInfo?.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-[#e3a048]" />
                        <div>
                          {openingHours?.days?.map((item, index) => (
                            <p key={index}>
                              <strong>
                                {language === "en"
                                  ? item?.translations?.en
                                  : item?.translations?.pt}
                                :
                              </strong>{" "}
                              {item.time}{" "}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 reveal">
              <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.5661010543584!2d-9.133752923848611!3d38.71147997176917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1934825d70e049%3A0x48b97da9a1bdb616!2sR.%20do%20Castelo%20Pica%C3%B5%2011%2013%2C%201100-125%20Lisboa%2C%20Portugal!5e0!3m2!1sen!2spt!4v1710845655447!5m2!1sen!2spt"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Restaurant location map"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <a
        href="https://wa.me/351915316420"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#128C7E] w-[60px] h-[60px] rounded-full shadow-lg transition-all duration-300 flex items-center justify-center z-50"
        aria-label="Contact us on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}

export default App;
