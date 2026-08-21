
// Immediate Cache & Storage Purge for version 4
(function purgeLegacyStorage() {
  try {
    const raw = localStorage.getItem('pvc_properties') || '';
    if (raw.includes('--grid-row') || raw.includes('50000000') || !localStorage.getItem('pvc_v4_clean')) {
      localStorage.removeItem('pvc_properties');
      localStorage.setItem('pvc_v4_clean', 'true');
      console.log('🔄 Cleared legacy cached properties.');
    }
  } catch(e) {}
})();

/* Phuket VIP Concierge - Pure Vanilla JS Core & i18n System */

// 0. Disable browser auto-translate artifacts
(function disableBrowserTranslation() {
  const html = document.documentElement;
  html.setAttribute('translate', 'no');
  html.classList.add('notranslate');

  function blockAllTranslation() {
    const els = document.querySelectorAll('*');
    for (let i = 0; i < els.length; i++) {
      els[i].setAttribute('translate', 'no');
    }
  }

  function removeTranslateArtifacts() {
    const selectors = [
      '.goog-te-banner-frame', '.skiptranslate', '#goog-gt-tt',
      '.goog-tooltip', '.goog-te-balloon-frame',
      'font[face="Google Sans"]', 'font[face="Google Sans Display"]',
      '.goog-te-menu-frame', '.VIpgJd-yAWNEb-VIpgJd-fmcmS-sn54Q',
      '.VIpgJd-ZVi9od-aZ2wEe-wOHMyf', '.VIpgJd-ZVi9od-aZ2wEe-OiiCO',
      '.goog-te-gadget', '.goog-te-combo'
    ];
    document.querySelectorAll(selectors.join(',')).forEach(el => el.remove());
    document.querySelectorAll('font[class*="goog"], .goog-text-highlight').forEach(el => {
      el.outerHTML = el.innerHTML;
    });
    if (document.body) {
      document.body.style.top = '';
      document.body.style.position = '';
      document.body.classList.remove('translated-ltr', 'translated-rtl');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      blockAllTranslation();
      removeTranslateArtifacts();
    });
  } else {
    blockAllTranslation();
    removeTranslateArtifacts();
  }
})();

// 1. App Configuration
const CONFIG = {
  DEFAULT_LANG: 'fr',
  DEFAULT_CURRENCY: 'THB',
  STORAGE_PREFIX: 'pvc_',
  CURRENCY_RATES: {
    THB: 1,
    EUR: 0.026,
    USD: 0.028
  },
  CURRENCY_SYMBOLS: {
    THB: '฿',
    EUR: '€',
    USD: '$'
  },
  SUPABASE_URL: '',
  SUPABASE_ANON_KEY: ''
};

// 2. Multilingual Dictionary (10 Languages: FR, EN, DE, IT, ES, PT, TH, RU, AR, ZH)
const SITE_I18N = {
  fr: {
    brand_name: "Phuket VIP Concierge",
    nav_home: "Accueil",
    nav_buy: "Acheter",
    nav_rent: "Louer",
    nav_sell: "Vendre",
    nav_services: "Conciergerie",
    nav_estimate: "Estimation Gratuite",
    nav_admin: "Admin",
    hero_tag: "Agence Immobilière de Prestige & Conciergerie Privée",
    hero_title: "L'Excellence Immobilière & Conciergerie VIP à Phuket",
    hero_desc: "Villas de prestige, penthouses d'exception et accompagnement sur-mesure pour votre acquisition ou séjour d'exception à Phuket.",
    search_placeholder: "Rechercher par quartier (ex: Bang Tao, Surin, Kamala, Rawai...)",
    btn_search: "Rechercher",
    btn_extended_search: "Critères avancés",
    opt_private_pool: "Piscine privée",
    opt_private_parking: "Parking privé",
    opt_common_pool: "Piscine commune",
    opt_common_parking: "Parking commun",
    opt_sea_view: "Vue Mer",
    catalog_title: "Nos Propriétés d'Exception",
    catalog_subtitle: "Découvrez notre sélection exclusive de villas et appartements de haut standing",
    filter_all_types: "Tous les types",
    filter_villa: "Villa",
    filter_condo: "Appartement / Condo",
    filter_penthouse: "Penthouse",
    filter_all_purposes: "Toutes les offres",
    filter_buy: "À Vendre",
    filter_rent: "À Louer",
    filter_district_placeholder: "Tous les quartiers (cliquez pour choisir)",
    districts_summary_prefix: "quartiers",
    selected_count_suffix: "sélectionnés",
    btn_reset: "Réinitialiser",
    empty_catalog_title: "Aucune propriété ne correspond à votre recherche",
    empty_catalog_desc: "Contactez notre équipe de conciergerie privée pour une recherche sur-mesure.",
    empty_catalog_no_listings: "Notre catalogue exclusif est en cours d'actualisation. Confiez-nous votre recherche sur-mesure dès maintenant.",
    btn_contact_agent: "Contacter un conseiller VIP",
    lbl_beds: "Chambres",
    lbl_baths: "Salles de bain",
    lbl_area: "Surface bâtie",
    lbl_land: "Surface terrain",
    lbl_purpose_buy: "Vente",
    lbl_purpose_rent: "Location",
    lbl_exclusive: "Exclusivité",
    lbl_price_on_request: "Prix sur demande",
    lbl_details: "Voir le bien",
    services_title: "Nos Services de Conciergerie & Immobilier",
    services_subtitle: "Un accompagnement haut de gamme à 360° à chaque étape de votre projet à Phuket",
    service_1_title: "Vente & Acquisition Prestige",
    service_1_desc: "Sélection rigoureuse des plus belles villas et penthouses de l'île avec audit juridique et fiscal complet.",
    service_2_title: "Location Saisonnière & Longue Durée",
    service_2_desc: "Mise à disposition de résidences d'exception avec services hôteliers haut de gamme et conciergerie 24/7.",
    service_3_title: "Conciergerie Privée & VIP Management",
    service_3_desc: "Chauffeur privé, location de yachts, réservations exclusives et gestion de propriété clé en main.",
    service_4_title: "Estimation & Valorisation",
    service_4_desc: "Expertise locale pointue pour estimer au juste prix votre bien et le commercialiser auprès d'une clientèle ciblée.",
    cta_banner_title: "Vous souhaitez vendre ou louer votre propriété d'exception ?",
    cta_banner_desc: "Bénéficiez de la force de notre réseau international d'acquéreurs et de locataires VIP.",
    btn_estimate_now: "Demander une estimation",
    btn_contact_us: "Nous contacter",
    footer_rights: "© 2026 Phuket VIP Concierge. Tous droits réservés.",
    footer_desc: "Votre partenaire de confiance pour l'immobilier de prestige et la conciergerie privée à Phuket, Thaïlande.",
    modal_districts_title: "Sélectionnez les quartiers à Phuket",
    modal_districts_subtitle: "Cochez un ou plusieurs quartiers pour filtrer",
    modal_districts_select_all: "Tout sélectionner",
    modal_districts_deselect_all: "Tout désélectionner",
    modal_districts_search_placeholder: "Filtrer les quartiers...",
    modal_districts_reset: "Réinitialiser",
    modal_districts_apply: "Appliquer",
    modal_districts_apply_count: "Appliquer ({count} quartiers)",
    contact_title: "Prendre Contact",
    contact_name: "Nom complet",
    contact_email: "Adresse email",
    contact_phone: "Téléphone / WhatsApp",
    contact_message: "Votre message ou critères de recherche",
    btn_send_message: "Envoyer ma demande",
    msg_sent_success: "Votre message a été envoyé avec succès. Notre équipe vous recontactera sous 24h."
  },
  en: {
    brand_name: "Phuket VIP Concierge",
    nav_home: "Home",
    nav_buy: "Buy",
    nav_rent: "Rent",
    nav_sell: "Sell",
    nav_services: "Concierge",
    nav_estimate: "Free Valuation",
    nav_admin: "Admin",
    hero_tag: "Luxury Real Estate & Private VIP Concierge",
    hero_title: "Luxury Real Estate & VIP Concierge in Phuket",
    hero_desc: "Architect-designed luxury villas, elite penthouses and bespoke concierge services for your dream stay or acquisition in Phuket.",
    search_placeholder: "Search by district (e.g. Bang Tao, Surin, Kamala, Rawai...)",
    btn_search: "Search",
    btn_extended_search: "Advanced Filters",
    opt_private_pool: "Private pool",
    opt_private_parking: "Private parking",
    opt_common_pool: "Common pool",
    opt_common_parking: "Common parking",
    opt_sea_view: "Sea View",
    catalog_title: "Our Exclusive Properties",
    catalog_subtitle: "Explore our curated collection of luxury villas and premium residences",
    filter_all_types: "All Types",
    filter_villa: "Villa",
    filter_condo: "Apartment / Condo",
    filter_penthouse: "Penthouse",
    filter_all_purposes: "All Listings",
    filter_buy: "For Sale",
    filter_rent: "For Rent",
    filter_district_placeholder: "All districts (click to select)",
    districts_summary_prefix: "districts",
    selected_count_suffix: "selected",
    btn_reset: "Reset",
    empty_catalog_title: "No properties match your current criteria",
    empty_catalog_desc: "Contact our VIP Concierge team for a tailor-made property search.",
    empty_catalog_no_listings: "Our exclusive property collection is currently being updated. Contact us today for bespoke requests.",
    btn_contact_agent: "Contact a VIP Advisor",
    lbl_beds: "Bedrooms",
    lbl_baths: "Bathrooms",
    lbl_area: "Built area",
    lbl_land: "Land area",
    lbl_purpose_buy: "For Sale",
    lbl_purpose_rent: "For Rent",
    lbl_exclusive: "Exclusive",
    lbl_price_on_request: "Price on request",
    lbl_details: "View Property",
    services_title: "Our Real Estate & VIP Concierge Services",
    services_subtitle: "A seamless, 360-degree luxury service throughout your property journey in Phuket",
    service_1_title: "Prestige Sales & Acquisition",
    service_1_desc: "Rigorous selection of the island's finest villas and penthouses with comprehensive legal and tax due diligence.",
    service_2_title: "Luxury Short & Long-Term Rentals",
    service_2_desc: "Exceptional private residences backed by premium hotel-grade amenities and 24/7 dedicated concierge assistance.",
    service_3_title: "Private VIP Concierge Management",
    service_3_desc: "Private chauffeurs, luxury yacht charters, VIP reservations, and turnkey estate management services.",
    service_4_title: "Property Valuation & Marketing",
    service_4_desc: "In-depth market intelligence to accurately price and market your prime property to vetted international high-net-worth buyers.",
    cta_banner_title: "Looking to sell or rent your prime Phuket property?",
    cta_banner_desc: "Leverage our prestigious international network of VIP buyers and discerning tenants.",
    btn_estimate_now: "Request a Valuation",
    btn_contact_us: "Contact Us",
    footer_rights: "© 2026 Phuket VIP Concierge. All rights reserved.",
    footer_desc: "Your premier partner for luxury real estate and private concierge services in Phuket, Thailand.",
    modal_districts_title: "Select Districts in Phuket",
    modal_districts_subtitle: "Check one or more districts to filter your search",
    modal_districts_select_all: "Select All",
    modal_districts_deselect_all: "Deselect All",
    modal_districts_search_placeholder: "Filter districts...",
    modal_districts_reset: "Reset",
    modal_districts_apply: "Apply",
    modal_districts_apply_count: "Apply ({count} districts)",
    contact_title: "Get in Touch",
    contact_name: "Full Name",
    contact_email: "Email Address",
    contact_phone: "Phone / WhatsApp",
    contact_message: "Your message or property requirements",
    btn_send_message: "Send Inquiry",
    msg_sent_success: "Your inquiry has been submitted successfully. Our VIP team will contact you within 24 hours."
  },
  de: {
    brand_name: "Phuket VIP Concierge",
    nav_home: "Startseite",
    nav_buy: "Kaufen",
    nav_rent: "Mieten",
    nav_sell: "Verkaufen",
    nav_services: "Concierge",
    nav_estimate: "Kostenlose Bewertung",
    nav_admin: "Admin",
    hero_tag: "Luxusimmobilien & Privater VIP-Concierge",
    hero_title: "Erstklassige Immobilien & VIP-Concierge auf Phuket",
    hero_desc: "Exklusive Villen, Penthäuser und maßgeschneiderte Betreuung für Ihren Traumaufenthalt oder Immobilienerwerb in Phuket.",
    search_placeholder: "Nach Bezirk suchen (z. B. Bang Tao, Surin, Kamala...)",
    btn_search: "Suchen",
    btn_extended_search: "Erweiterte Filter",
    opt_private_pool: "Privater Pool",
    opt_private_parking: "Privater Parkplatz",
    opt_common_pool: "Gemeinschaftspool",
    opt_common_parking: "Gemeinschaftsparkplatz",
    opt_sea_view: "Meerblick",
    catalog_title: "Unsere exklusiven Immobilien",
    catalog_subtitle: "Entdecken Sie unsere kuratierte Kollektion an Luxusresidenzen",
    filter_all_types: "Alle Typen",
    filter_villa: "Villa",
    filter_condo: "Wohnung / Condo",
    filter_penthouse: "Penthouse",
    filter_all_purposes: "Alle Angebote",
    filter_buy: "Kauf",
    filter_rent: "Miete",
    filter_district_placeholder: "Alle Bezirke (Klicken zum Auswählen)",
    districts_summary_prefix: "Bezirke",
    selected_count_suffix: "ausgewählt",
    btn_reset: "Zurücksetzen",
    empty_catalog_title: "Keine Immobilien gefunden",
    empty_catalog_desc: "Kontaktieren Sie unser Concierge-Team für eine individuelle Suche.",
    empty_catalog_no_listings: "Unser Katalog wird derzeit aktualisiert. Kontaktieren Sie uns für maßgeschneiderte Anfragen.",
    btn_contact_agent: "VIP-Berater kontaktieren",
    lbl_beds: "Schlafzimmer",
    lbl_baths: "Badezimmer",
    lbl_area: "Wohnfläche",
    lbl_land: "Grundstück",
    lbl_purpose_buy: "Verkauf",
    lbl_purpose_rent: "Vermietung",
    lbl_exclusive: "Exklusiv",
    lbl_price_on_request: "Preis auf Anfrage",
    lbl_details: "Details ansehen",
    services_title: "Unsere Dienstleistungen",
    services_subtitle: "Ganzheitlicher Premium-Service für Ihre Immobilienprojekte",
    service_1_title: "Prestige-Kauf & Verkauf",
    service_1_desc: "Sorgfältige Auswahl der feinsten Luxusvillen mit rechtlicher Prüfung.",
    service_2_title: "Exklusive Ferien- & Langzeitmiete",
    service_2_desc: "Hochwertige Residenzen mit 24/7 Concierge-Betreuung.",
    service_3_title: "Privater VIP-Concierge",
    service_3_desc: "Privatchauffeur, Yachtcharter und weltklasse Service.",
    service_4_title: "Wertermittlung & Vermarktung",
    service_4_desc: "Präzise Marktanalysen für anspruchsvolle Eigentümer.",
    cta_banner_title: "Möchten Sie Ihre Luxusimmobilie verkaufen oder vermieten?",
    cta_banner_desc: "Profitieren Sie von unserem internationalen VIP-Netzwerk.",
    btn_estimate_now: "Bewertung anfordern",
    btn_contact_us: "Kontakt aufnehmen",
    footer_rights: "© 2026 Phuket VIP Concierge. Alle Rechte vorbehalten.",
    footer_desc: "Ihr Premium-Partner für Luxusimmobilien und Concierge-Service in Phuket.",
    modal_districts_title: "Bezirke in Phuket auswählen",
    modal_districts_subtitle: "Wählen Sie Bezirke zur Filterung aus",
    modal_districts_select_all: "Alle auswählen",
    modal_districts_deselect_all: "Alle abwählen",
    modal_districts_search_placeholder: "Bezirke filtern...",
    modal_districts_reset: "Zurücksetzen",
    modal_districts_apply: "Anwenden",
    modal_districts_apply_count: "Anwenden ({count} Bezirke)",
    contact_title: "Kontakt",
    contact_name: "Vollständiger Name",
    contact_email: "E-Mail-Adresse",
    contact_phone: "Telefon / WhatsApp",
    contact_message: "Ihre Nachricht oder Suchkriterien",
    btn_send_message: "Anfrage senden",
    msg_sent_success: "Ihre Anfrage wurde erfolgreich gesendet."
  },
  it: {
    brand_name: "Phuket VIP Concierge",
    nav_home: "Home",
    nav_buy: "Acquistare",
    nav_rent: "Affittare",
    nav_sell: "Vendere",
    nav_services: "Concierge",
    nav_estimate: "Valutazione Gratuita",
    nav_admin: "Admin",
    hero_tag: "Immobili di Prestigio & Concierge VIP",
    hero_title: "Eccellenza Immobiliare & Concierge VIP a Phuket",
    hero_desc: "Ville prestigiose, attici esclusivi e assistenza su misura per il vostro soggiorno o acquisto a Phuket.",
    search_placeholder: "Cerca per quartiere (es. Bang Tao, Surin, Kamala...)",
    btn_search: "Cerca",
    btn_extended_search: "Filtri Avanzati",
    opt_private_pool: "Piscina privata",
    opt_private_parking: "Parcheggio privato",
    opt_common_pool: "Piscina comune",
    opt_common_parking: "Parcheggio comune",
    opt_sea_view: "Vista mare",
    catalog_title: "Le Nostre Proprietà Esclusive",
    catalog_subtitle: "Scoprite la nostra selezione curata di proprietà di lusso",
    filter_all_types: "Tutti i tipi",
    filter_villa: "Villa",
    filter_condo: "Appartamento / Condo",
    filter_penthouse: "Attico",
    filter_all_purposes: "Tutte le offerte",
    filter_buy: "In Vendita",
    filter_rent: "In Affitto",
    filter_district_placeholder: "Tutti i quartieri (clicca per selezionare)",
    districts_summary_prefix: "quartieri",
    selected_count_suffix: "selezionati",
    btn_reset: "Reimposta",
    empty_catalog_title: "Nessuna proprietà corrisponde alla ricerca",
    empty_catalog_desc: "Contattate il nostro concierge per una ricerca personalizzata.",
    empty_catalog_no_listings: "Catalogo in aggiornamento. Contattateci per richieste personalizzate.",
    btn_contact_agent: "Contatta un consulente VIP",
    lbl_beds: "Camere",
    lbl_baths: "Bagni",
    lbl_area: "Superficie",
    lbl_land: "Terreno",
    lbl_purpose_buy: "Vendita",
    lbl_purpose_rent: "Affitto",
    lbl_exclusive: "Esclusivo",
    lbl_price_on_request: "Prezzo su richiesta",
    lbl_details: "Vedi dettagli",
    services_title: "I Nostri Servizi VIP",
    services_subtitle: "Esperienza di lusso a 360° a Phuket",
    service_1_title: "Vendita & Acquisizione",
    service_1_desc: "Selezione delle migliori proprietà con perizia completa.",
    service_2_title: "Affitti Esclusivi",
    service_2_desc: "Residenze di lusso con assistenza concierge 24/7.",
    service_3_title: "Concierge Privato",
    service_3_desc: "Chauffeur, yacht e prenotazioni VIP su misura.",
    service_4_title: "Valutazione Immobiliare",
    service_4_desc: "Stima accurata e promozione internazionale mirata.",
    cta_banner_title: "Desiderate vendere o affittare la vostra proprietà?",
    cta_banner_desc: "Accedete alla nostra rete internazionale di clienti VIP.",
    btn_estimate_now: "Richiedi Valutazione",
    btn_contact_us: "Contattaci",
    footer_rights: "© 2026 Phuket VIP Concierge. Tutti i diritti riservati.",
    footer_desc: "Il vostro partner di fiducia per immobili di prestigio a Phuket.",
    modal_districts_title: "Seleziona quartieri a Phuket",
    modal_districts_subtitle: "Seleziona i quartieri desiderati",
    modal_districts_select_all: "Seleziona tutti",
    modal_districts_deselect_all: "Deseleziona tutti",
    modal_districts_search_placeholder: "Filtra quartieri...",
    modal_districts_reset: "Reimposta",
    modal_districts_apply: "Applica",
    modal_districts_apply_count: "Applica ({count} quartieri)",
    contact_title: "Contatto",
    contact_name: "Nome e Cognome",
    contact_email: "Email",
    contact_phone: "Telefono / WhatsApp",
    contact_message: "Il vostro messaggio",
    btn_send_message: "Invia richiesta",
    msg_sent_success: "Messaggio inviato con successo."
  },
  es: {
    brand_name: "Phuket VIP Concierge",
    nav_home: "Inicio",
    nav_buy: "Comprar",
    nav_rent: "Alquilar",
    nav_sell: "Vender",
    nav_services: "Conserjería",
    nav_estimate: "Valoración Gratuita",
    nav_admin: "Admin",
    hero_tag: "Inmobiliaria de Prestigio & Conserjería VIP",
    hero_title: "Inmobiliaria de Alto Nivel & Conserjería VIP en Phuket",
    hero_desc: "Villas de lujo, áticos exclusivos y atención personalizada para su estancia o compra en Phuket.",
    search_placeholder: "Buscar por distrito (ej: Bang Tao, Surin, Rawai...)",
    btn_search: "Buscar",
    btn_extended_search: "Filtros avanzados",
    opt_private_pool: "Piscina privada",
    opt_private_parking: "Parking privado",
    opt_common_pool: "Piscina común",
    opt_common_parking: "Parking común",
    opt_sea_view: "Vistas al mar",
    catalog_title: "Propiedades Exclusivas",
    catalog_subtitle: "Descubra nuestra selecta cartera de propiedades de lujo",
    filter_all_types: "Todos los tipos",
    filter_villa: "Villa",
    filter_condo: "Apartamento / Condominio",
    filter_penthouse: "Ático",
    filter_all_purposes: "Todas las ofertas",
    filter_buy: "En Venta",
    filter_rent: "En Alquiler",
    filter_district_placeholder: "Todos los distritos (clic para seleccionar)",
    districts_summary_prefix: "distritos",
    selected_count_suffix: "seleccionados",
    btn_reset: "Restablecer",
    empty_catalog_title: "No se encontraron propiedades",
    empty_catalog_desc: "Contáctenos para una búsqueda personalizada.",
    empty_catalog_no_listings: "Catálogo en actualización. Contáctenos para solicitudes a medida.",
    btn_contact_agent: "Contactar a un asesor VIP",
    lbl_beds: "Habitaciones",
    lbl_baths: "Baños",
    lbl_area: "Superficie construida",
    lbl_land: "Superficie de terreno",
    lbl_purpose_buy: "Venta",
    lbl_purpose_rent: "Alquiler",
    lbl_exclusive: "Exclusivo",
    lbl_price_on_request: "Precio a consultar",
    lbl_details: "Ver propiedad",
    services_title: "Nuestros Servicios VIP",
    services_subtitle: "Servicio integral 360° para su proyecto en Phuket",
    service_1_title: "Venta & Compra de Prestigio",
    service_1_desc: "Selección rigurosa de las mejores propiedades con asesoramiento legal.",
    service_2_title: "Alquileres de Lujo",
    service_2_desc: "Residencias exclusivas con servicio de conserjería 24/7.",
    service_3_title: "Conserjería VIP Privada",
    service_3_desc: "Chófer privado, yates y reservas exclusivas.",
    service_4_title: "Valoración & Comercialización",
    service_4_desc: "Valoración experta y difusión ante clientes internacionales selectos.",
    cta_banner_title: "¿Desea vender o alquilar su propiedad exclusiva?",
    cta_banner_desc: "Conecte con nuestra red internacional de compradores y clientes VIP.",
    btn_estimate_now: "Solicitar Valoración",
    btn_contact_us: "Contáctenos",
    footer_rights: "© 2026 Phuket VIP Concierge. Todos los derechos reservados.",
    footer_desc: "Su socio de confianza para el sector inmobiliario de lujo en Phuket.",
    modal_districts_title: "Seleccionar distritos en Phuket",
    modal_districts_subtitle: "Seleccione uno o más distritos",
    modal_districts_select_all: "Seleccionar todo",
    modal_districts_deselect_all: "Deseleccionar todo",
    modal_districts_search_placeholder: "Filtrar distritos...",
    modal_districts_reset: "Restablecer",
    modal_districts_apply: "Aplicar",
    modal_districts_apply_count: "Aplicar ({count} distritos)",
    contact_title: "Contacto",
    contact_name: "Nombre completo",
    contact_email: "Correo electrónico",
    contact_phone: "Teléfono / WhatsApp",
    contact_message: "Su mensaje",
    btn_send_message: "Enviar consulta",
    msg_sent_success: "Mensaje enviado con éxito."
  },
  pt: {
    brand_name: "Phuket VIP Concierge",
    nav_home: "Início",
    nav_buy: "Comprar",
    nav_rent: "Alugar",
    nav_sell: "Vender",
    nav_services: "Concierge",
    nav_estimate: "Avaliação Gratuita",
    nav_admin: "Admin",
    hero_tag: "Imobiliária de Prestígio & Concierge VIP",
    hero_title: "Imobiliária de Alto Padrão & Concierge VIP em Phuket",
    hero_desc: "Villas de prestígio, coberturas de luxo e suporte sob medida para sua estadia ou compra em Phuket.",
    search_placeholder: "Buscar por distrito (ex: Bang Tao, Surin, Rawai...)",
    btn_search: "Buscar",
    btn_extended_search: "Filtros avançados",
    opt_private_pool: "Piscina privativa",
    opt_private_parking: "Estacionamento privativo",
    opt_common_pool: "Piscina comum",
    opt_common_parking: "Estacionamento comum",
    opt_sea_view: "Vista para o mar",
    catalog_title: "Propriedades Exclusivas",
    catalog_subtitle: "Conheça nossa seleção de residências de alto padrão",
    filter_all_types: "Todos os tipos",
    filter_villa: "Villa",
    filter_condo: "Apartamento / Condomínio",
    filter_penthouse: "Cobertura",
    filter_all_purposes: "Todas as ofertas",
    filter_buy: "Venda",
    filter_rent: "Locação",
    filter_district_placeholder: "Todos os distritos (clique para escolher)",
    districts_summary_prefix: "distritos",
    selected_count_suffix: "selecionados",
    btn_reset: "Redefinir",
    empty_catalog_title: "Nenhuma propriedade encontrada",
    empty_catalog_desc: "Entre em contato para uma busca personalizada.",
    empty_catalog_no_listings: "Catálogo em atualização. Fale conosco para pedidos sob medida.",
    btn_contact_agent: "Falar com consultor VIP",
    lbl_beds: "Quartos",
    lbl_baths: "Banheiros",
    lbl_area: "Área construída",
    lbl_land: "Área do terreno",
    lbl_purpose_buy: "Venda",
    lbl_purpose_rent: "Locação",
    lbl_exclusive: "Exclusivo",
    lbl_price_on_request: "Preço sob consulta",
    lbl_details: "Ver detalhes",
    services_title: "Nossos Serviços VIP",
    services_subtitle: "Assistência completa de luxo em Phuket",
    service_1_title: "Venda & Aquisição",
    service_1_desc: "Seleção rigorosa de imóveis de luxo com assessoria jurídica.",
    service_2_title: "Locação de Alto Padrão",
    service_2_desc: "Residências exclusivas com atendimento 24/7.",
    service_3_title: "Concierge VIP Privado",
    service_3_desc: "Motorista particular, iates e reservas VIP.",
    service_4_title: "Avaliação Imobiliária",
    service_4_desc: "Avaliação precisa e divulgação para clientes VIP globais.",
    cta_banner_title: "Deseja vender ou alugar seu imóvel em Phuket?",
    cta_banner_desc: "Conecte-se com nossa rede internacional de clientes qualificados.",
    btn_estimate_now: "Pedir Avaliação",
    btn_contact_us: "Fale Conosco",
    footer_rights: "© 2026 Phuket VIP Concierge. Todos os direitos reservados.",
    footer_desc: "Seu parceiro de confiança para imóveis de luxo em Phuket.",
    modal_districts_title: "Selecionar distritos em Phuket",
    modal_districts_subtitle: "Escolha os distritos desejados",
    modal_districts_select_all: "Selecionar tudo",
    modal_districts_deselect_all: "Desmarcar tudo",
    modal_districts_search_placeholder: "Filtrar distritos...",
    modal_districts_reset: "Redefinir",
    modal_districts_apply: "Aplicar",
    modal_districts_apply_count: "Aplicar ({count} distritos)",
    contact_title: "Contato",
    contact_name: "Nome completo",
    contact_email: "E-mail",
    contact_phone: "Telefone / WhatsApp",
    contact_message: "Sua mensagem",
    btn_send_message: "Enviar mensagem",
    msg_sent_success: "Mensagem enviada com sucesso."
  },
  th: {
    brand_name: "Phuket VIP Concierge",
    nav_home: "หน้าแรก",
    nav_buy: "ซื้อ",
    nav_rent: "เช่า",
    nav_sell: "ขาย",
    nav_services: "บริการคอนเซียร์จ",
    nav_estimate: "ประเมินราคาฟรี",
    nav_admin: "แอดมิน",
    hero_tag: "อสังหาริมทรัพย์ระดับลักชัวรี & บริการวีไอพีคอนเซียร์จ",
    hero_title: "ความหรูหราและบริการวีไอพีระดับพรีเมียมในภูเก็ต",
    hero_desc: "วิลล่าหรูระดับพรีเมียม เพนต์เฮาส์ และบริการผู้ช่วยส่วนตัวระดับวีไอพีสำหรับการอยู่อาศัยและการลงทุนในภูเก็ต",
    search_placeholder: "ค้นหาตามทำเล (เช่น บางเทา, สุรินทร์, กมลา, ราไวย์...)",
    btn_search: "ค้นหา",
    btn_extended_search: "ตัวกรองขั้นสูง",
    opt_private_pool: "สระว่ายน้ำส่วนตัว",
    opt_private_parking: "ที่จอดรถส่วนตัว",
    opt_common_pool: "สระว่ายน้ำส่วนกลาง",
    opt_common_parking: "ที่จอดรถส่วนกลาง",
    opt_sea_view: "วิวทะเล",
    catalog_title: "อสังหาริมทรัพย์แนะนำ",
    catalog_subtitle: "ค้นพบวิลล่าและคอนโดหรูที่คัดสรรมาเป็นพิเศษ",
    filter_all_types: "ทุกประเภท",
    filter_villa: "วิลล่า",
    filter_condo: "คอนโดมิเนียม",
    filter_penthouse: "เพนต์เฮาส์",
    filter_all_purposes: "ทุกรายการ",
    filter_buy: "สำหรับขาย",
    filter_rent: "สำหรับเช่า",
    filter_district_placeholder: "ทุกทำเล (คลิกเพื่อเลือก)",
    districts_summary_prefix: "ทำเล",
    selected_count_suffix: "ที่เลือก",
    btn_reset: "รีเซ็ต",
    empty_catalog_title: "ไม่พบรายการตามเงื่อนไข",
    empty_catalog_desc: "ติดต่อทีมงานวีไอพีคอนเซียร์จของเราเพื่อรับบริการค้นหาเฉพาะบุคคล",
    empty_catalog_no_listings: "กำลังอัปเดตรายการอสังหาริมทรัพย์ ติดต่อเราเพื่อรับข้อเสนอพิเศษ",
    btn_contact_agent: "ติดต่อที่ปรึกษาวีไอพี",
    lbl_beds: "ห้องนอน",
    lbl_baths: "ห้องน้ำ",
    lbl_area: "พื้นที่ใช้สอย",
    lbl_land: "ขนาดที่ดิน",
    lbl_purpose_buy: "ขาย",
    lbl_purpose_rent: "เช่า",
    lbl_exclusive: "เอ็กซ์คลูซีฟ",
    lbl_price_on_request: "ติดต่อสอบถามราคา",
    lbl_details: "ดูรายละเอียด",
    services_title: "บริการด้านอสังหาริมทรัพย์และคอนเซียร์จ",
    services_subtitle: "บริการระดับพรีเมียมครบวงจรในภูเก็ต",
    service_1_title: "ซื้อและขายอสังหาริมทรัพย์ระดับพรีเมียม",
    service_1_desc: "คัดสรรวิลล่าและเพนต์เฮาส์ที่ดีที่สุดพร้อมบริการตรวจสอบทางกฎหมาย",
    service_2_title: "บริการเช่าระยะสั้นและระยะยาว",
    service_2_desc: "ที่พักหรูพร้อมการดูแลระดับโรงแรมและผู้ช่วยส่วนตัว 24 ชั่วโมง",
    service_3_title: "บริการวีไอพีคอนเซียร์จส่วนตัว",
    service_3_desc: "คนขับรถส่วนตัว เรือยอทช์ และการจองระดับวีไอพี",
    service_4_title: "ประเมินราคาและการตลาด",
    service_4_desc: "วิเคราะห์ราคาที่แม่นยำและการตลาดเข้าถึงกลุ่มลูกค้าระดับสูง",
    cta_banner_title: "ต้องการขายหรือปล่อยเช่าอสังหาริมทรัพย์ของคุณในภูเก็ต?",
    cta_banner_desc: "เข้าถึงเครือข่ายผู้ซื้อและผู้เช่าระดับวีไอพีจากทั่วโลก",
    btn_estimate_now: "ขอรับการประเมินราคา",
    btn_contact_us: "ติดต่อเรา",
    footer_rights: "© 2026 Phuket VIP Concierge. สงวนลิขสิทธิ์ทั้งหมด",
    footer_desc: "พันธมิตรที่คุณไว้วางใจสำหรับอสังหาริมทรัพย์ระดับลักชัวรีในภูเก็ต",
    modal_districts_title: "เลือกทำเลในภูเก็ต",
    modal_districts_subtitle: "เลือกทำเลที่คุณสนใจ",
    modal_districts_select_all: "เลือกทั้งหมด",
    modal_districts_deselect_all: "ยกเลิกทั้งหมด",
    modal_districts_search_placeholder: "ค้นหาทำเล...",
    modal_districts_reset: "รีเซ็ต",
    modal_districts_apply: "ยืนยัน",
    modal_districts_apply_count: "ยืนยัน ({count} ทำเล)",
    contact_title: "ติดต่อเรา",
    contact_name: "ชื่อ-นามสกุล",
    contact_email: "อีเมล",
    contact_phone: "เบอร์โทรศัพท์ / WhatsApp",
    contact_message: "ข้อความหรือความต้องการของคุณ",
    btn_send_message: "ส่งข้อความ",
    msg_sent_success: "ส่งข้อความเรียบร้อยแล้ว ทีมงานจะติดต่อกลับโดยเร็ว"
  },
  ru: {
    brand_name: "Phuket VIP Concierge",
    nav_home: "Главная",
    nav_buy: "Купить",
    nav_rent: "Арендовать",
    nav_sell: "Продать",
    nav_services: "Консьерж",
    nav_estimate: "Бесплатная оценка",
    nav_admin: "Админ",
    hero_tag: "Элитная недвижимость и VIP-консьерж",
    hero_title: "Элитная недвижимость и VIP-сервис на Пхукете",
    hero_desc: "Эксклюзивные виллы, пентхаусы и индивидуальное сопровождение для покупки и отдыха на Пхукете.",
    search_placeholder: "Поиск по району (напр. Банг Тао, Сурин, Камала...)",
    btn_search: "Искать",
    btn_extended_search: "Фильтры",
    opt_private_pool: "Частный бассейн",
    opt_private_parking: "Частная парковка",
    opt_common_pool: "Общий бассейн",
    opt_common_parking: "Общая парковка",
    opt_sea_view: "Вид на море",
    catalog_title: "Эксклюзивные объекты",
    catalog_subtitle: "Коллекция лучших вилл и апартаментов на Пхукете",
    filter_all_types: "Все типы",
    filter_villa: "Вилла",
    filter_condo: "Апартаменты / Кондо",
    filter_penthouse: "Пентхаус",
    filter_all_purposes: "Все предложения",
    filter_buy: "Продажа",
    filter_rent: "Аренда",
    filter_district_placeholder: "Все районы (нажмите для выбора)",
    districts_summary_prefix: "районов",
    selected_count_suffix: "выбрано",
    btn_reset: "Сбросить",
    empty_catalog_title: "Объекты не найдены",
    empty_catalog_desc: "Свяжитесь с нашей службой консьержа для индивидуального подбора.",
    empty_catalog_no_listings: "Каталог обновляется. Свяжитесь с нами для индивидуального запроса.",
    btn_contact_agent: "Связаться с VIP-консультантом",
    lbl_beds: "Спальни",
    lbl_baths: "Ванные",
    lbl_area: "Площадь",
    lbl_land: "Участок",
    lbl_purpose_buy: "Продажа",
    lbl_purpose_rent: "Аренда",
    lbl_exclusive: "Эксклюзив",
    lbl_price_on_request: "Цена по запросу",
    lbl_details: "Подробнее",
    services_title: "Наши услуги",
    services_subtitle: "Полный спектр премиум-услуг на Пхукете",
    service_1_title: "Продажа и покупка элитной недвижимости",
    service_1_desc: "Тщательный отбор лучших вилл и юридическая проверка.",
    service_2_title: "Аренда вилл и апартаментов",
    service_2_desc: "Люксовые резиденции с консьерж-сервисом 24/7.",
    service_3_title: "Частный VIP-консьерж",
    service_3_desc: "Персональные водители, аренда яхт и бронирование.",
    service_4_title: "Оценка и продвижение",
    service_4_desc: "Профессиональная оценка и доступ к международным покупателям.",
    cta_banner_title: "Хотите продать или сдать вашу недвижимость?",
    cta_banner_desc: "Воспользуйтесь нашей международной базой состоятельных клиентов.",
    btn_estimate_now: "Заказать оценку",
    btn_contact_us: "Связаться с нами",
    footer_rights: "© 2026 Phuket VIP Concierge. Все права защищены.",
    footer_desc: "Ваш надежный партнер в сфере элитной недвижимости на Пхукете.",
    modal_districts_title: "Выберите районы на Пхукете",
    modal_districts_subtitle: "Отметьте нужные районы",
    modal_districts_select_all: "Выбрать все",
    modal_districts_deselect_all: "Снять все",
    modal_districts_search_placeholder: "Фильтр районов...",
    modal_districts_reset: "Сбросить",
    modal_districts_apply: "Применить",
    modal_districts_apply_count: "Применить ({count} районов)",
    contact_title: "Контакты",
    contact_name: "Полное имя",
    contact_email: "Электронная почта",
    contact_phone: "Телефон / WhatsApp",
    contact_message: "Ваше сообщение",
    btn_send_message: "Отправить запрос",
    msg_sent_success: "Ваш запрос успешно отправлен."
  },
  ar: {
    brand_name: "Phuket VIP Concierge",
    nav_home: "الرئيسية",
    nav_buy: "شراء",
    nav_rent: "إيجار",
    nav_sell: "بيع",
    nav_services: "خدمات الكونسيرج",
    nav_estimate: "تقييم مجاني",
    nav_admin: "الإدارة",
    hero_tag: "عقارات فاخرة وخدمات كونسيرج خاصة",
    hero_title: "التميز العقاري وخدمات الكونسيرج الفاخرة في بوكيت",
    hero_desc: "فلل فخمة وبنتهاوس متميزة مع مرافقة مخصصة لإقامتكم أو استثماركم في بوكيت.",
    search_placeholder: "البحث حسب المنطقة (مثل بانغ تاو، سورين، كمالا...)",
    btn_search: "بحث",
    btn_extended_search: "خيارات متقدمة",
    opt_private_pool: "مسبح خاص",
    opt_private_parking: "موقف خاص",
    opt_common_pool: "مسبح مشترك",
    opt_common_parking: "موقف مشترك",
    opt_sea_view: "إطلالة على البحر",
    catalog_title: "عقاراتنا الحصرية",
    catalog_subtitle: "اكتشف مجموعتنا المختارة من الفلل والشقق الفاخرة",
    filter_all_types: "جميع الأنواع",
    filter_villa: "فيلا",
    filter_condo: "شقة / كوندو",
    filter_penthouse: "بنتهاوس",
    filter_all_purposes: "جميع العروض",
    filter_buy: "للبيع",
    filter_rent: "للإيجار",
    filter_district_placeholder: "جميع المناطق (انقر للاختيار)",
    districts_summary_prefix: "مناطق",
    selected_count_suffix: "تم اختيارها",
    btn_reset: "إعادة ضبط",
    empty_catalog_title: "لا توجد عقارات مطابقة للبحث",
    empty_catalog_desc: "تواصل مع فريق الكونسيرج الخاص بنا لطلب بحث مخصص.",
    empty_catalog_no_listings: "يتم حالياً تحديث كتالوج العقارات. تواصل معنا للحصول على عروض مخصصة.",
    btn_contact_agent: "تواصل مع مستشار VIP",
    lbl_beds: "غرف النوم",
    lbl_baths: "الحمامات",
    lbl_area: "المساحة المبنية",
    lbl_land: "مساحة الأرض",
    lbl_purpose_buy: "للبيع",
    lbl_purpose_rent: "للإيجار",
    lbl_exclusive: "حصري",
    lbl_price_on_request: "السعر عند الطلب",
    lbl_details: "عرض العقار",
    services_title: "خدماتنا العقارية والكونسيرج",
    services_subtitle: "خدمات راقية متكاملة في بوكيت",
    service_1_title: "بيع وشراء العقارات الفاخرة",
    service_1_desc: "اختيار دقيق لأرقى الفلل مع استشارات قانونية متكاملة.",
    service_2_title: "إيجارات فاخرة",
    service_2_desc: "إقامات راقية مع خدمات كونسيرج على مدار الساعة.",
    service_3_title: "خدمات كونسيرج خاصة",
    service_3_desc: "سائق خاص، يخوت فاخرة، وحجوزات حصرية.",
    service_4_title: "تقييم وتسويق العقارات",
    service_4_desc: "تقييم دقيق وتسويق للعملاء البارزين دولياً.",
    cta_banner_title: "هل ترغب في بيع أو تأجير عقارك في بوكيت؟",
    cta_banner_desc: "استفد من شبكتنا العالمية للعملاء المميزين.",
    btn_estimate_now: "طلب تقييم",
    btn_contact_us: "تواصل معنا",
    footer_rights: "© 2026 Phuket VIP Concierge. جميع الحقوق محفوظة.",
    footer_desc: "شريككم الموثوق للعقارات الفاخرة وخدمات الكونسيرج في بوكيت.",
    modal_districts_title: "اختر المناطق في بوكيت",
    modal_districts_subtitle: "حدد المناطق المطلوبة",
    modal_districts_select_all: "تحديد الكل",
    modal_districts_deselect_all: "إلغاء تحديد الكل",
    modal_districts_search_placeholder: "تصفية المناطق...",
    modal_districts_reset: "إعادة ضبط",
    modal_districts_apply: "تطبيق",
    modal_districts_apply_count: "تطبيق ({count} مناطق)",
    contact_title: "اتصل بنا",
    contact_name: "الاسم الكامل",
    contact_email: "البريد الإلكتروني",
    contact_phone: "الهاتف / واتساب",
    contact_message: "رسالتكم",
    btn_send_message: "إرسال الطلب",
    msg_sent_success: "تم إرسال رسالتكم بنجاح."
  },
  zh: {
    brand_name: "Phuket VIP Concierge",
    nav_home: "首页",
    nav_buy: "购买",
    nav_rent: "租赁",
    nav_sell: "出售",
    nav_services: "贵宾礼宾",
    nav_estimate: "免费估价",
    nav_admin: "管理后台",
    hero_tag: "尊贵地产与私人VIP礼宾服务",
    hero_title: "普吉岛尊贵地产与顶级VIP礼宾服务",
    hero_desc: "顶级建筑师独栋别墅、尊贵顶层豪宅及全程专属管家陪同服务。",
    search_placeholder: "按区域搜索（例如：邦涛、苏林、卡马拉、拉威...）",
    btn_search: "搜索房源",
    btn_extended_search: "高级筛选",
    opt_private_pool: "私人泳池",
    opt_private_parking: "私人车位",
    opt_common_pool: "公共泳池",
    opt_common_parking: "公共车位",
    opt_sea_view: "海景",
    catalog_title: "独家臻选房源",
    catalog_subtitle: "探索我们精心甄选的普吉岛豪华别墅与高端公寓",
    filter_all_types: "所有类型",
    filter_villa: "独栋别墅",
    filter_condo: "豪华公寓",
    filter_penthouse: "顶层豪宅",
    filter_all_purposes: "所有房源",
    filter_buy: "在售房源",
    filter_rent: "在租房源",
    filter_district_placeholder: "所有区域（点击选择）",
    districts_summary_prefix: "个区域",
    selected_count_suffix: "已选",
    btn_reset: "重置筛选",
    empty_catalog_title: "暂无符合条件的房源",
    empty_catalog_desc: "请联系我们的私人礼宾顾问，为您量身定制房源方案。",
    empty_catalog_no_listings: "专属房源目录正在更新中。欢迎随时联系我们获取专属推荐。",
    btn_contact_agent: "联系VIP顾问",
    lbl_beds: "卧室",
    lbl_baths: "浴室",
    lbl_area: "建筑面积",
    lbl_land: "占地面积",
    lbl_purpose_buy: "出售",
    lbl_purpose_rent: "出租",
    lbl_exclusive: "独家专享",
    lbl_price_on_request: "价格面议",
    lbl_details: "查看详情",
    services_title: "全方位地产与私人礼宾服务",
    services_subtitle: "为您在普吉岛的置业与度假提供全流程360°管家级服务",
    service_1_title: "高端置业与买卖",
    service_1_desc: "严选岛上最优质的顶级豪宅与公寓，提供完善的法律尽调与税务咨询。",
    service_2_title: "奢华短租与长租",
    service_2_desc: "提供高品质豪华居所与24/7全天候管家级礼宾配套服务。",
    service_3_title: "私人VIP礼宾管理",
    service_3_desc: "私人司机、豪华游艇租赁、高端餐厅预订及房产全权托管。",
    service_4_title: "房产估价与全球推广",
    service_4_desc: "基于深度市场洞察进行精准定价，直达全球高净值精准买家。",
    cta_banner_title: "想出售或出租您在普吉岛的优质物业？",
    cta_banner_desc: "依托我们全球化的高端买家与优质租客网络，实现资产价值最大化。",
    btn_estimate_now: "申请免费估价",
    btn_contact_us: "立即咨询",
    footer_rights: "© 2026 Phuket VIP Concierge. 版权所有。",
    footer_desc: "您在泰国普吉岛最值得信赖的顶级房地产与私人礼宾服务伙伴。",
    modal_districts_title: "选择普吉岛区域",
    modal_districts_subtitle: "勾选一个或多个区域以筛选房源",
    modal_districts_select_all: "全选",
    modal_districts_deselect_all: "取消全选",
    modal_districts_search_placeholder: "搜索区域...",
    modal_districts_reset: "重置",
    modal_districts_apply: "应用筛选",
    modal_districts_apply_count: "应用 ({count} 个区域)",
    contact_title: "联系我们",
    contact_name: "您的姓名",
    contact_email: "电子邮箱",
    contact_phone: "电话 / WhatsApp / 微信",
    contact_message: "您的需求或留言",
    btn_send_message: "提交咨询",
    msg_sent_success: "您的留言已成功提交，我们的VIP团队将在24小时内与您联系。"
  }
};

// 3. Phuket Districts Master List
const PHUKET_DISTRICTS = [
  "Bang Tao", "Cherng Talay", "Pasak", "Layan", "Surin", "Kamala",
  "Rawai", "Nai Harn", "Kata", "Karon", "Patong", "Nai Thon",
  "Nai Yang", "Mai Khao", "Chalong", "Koh Kaew", "Pa Khlok",
  "Cape Yamu", "Ao Po", "Phuket Town", "Wichit", "Si Sunthon",
  "Thep Krasattri", "Panwa", "Kathu", "Banana Beach", "Ao Sane",
  "Kalim", "Laem Singh", "Tri Trang", "Ya Nui"
];

// 4. Initial Fallback Properties (Empty array for Phuket VIP Concierge, no hardcoded PFS demo listings)
const fallbackProperties = [
  {
    "id": "PVC-1001",
    "slug": "pvc-la-palmyra-villa-rawai-1",
    "title": "La Palmyra Villa Rawai",
    "purpose": "buy",
    "type": "Villa",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.782,
    "lng": 98.321,
    "price": 5900000,
    "price_thb": 5900000,
    "bedrooms": 1,
    "bathrooms": 1,
    "building_area": 50,
    "land_area": 95,
    "private_pool": true,
    "sea_view": false,
    "description": "New construction pool villa offering 50 m² living space and 45 m² outdoor area with a private 15 m² swimming pool, intimate tropical garden and covered terrace. Minimal maintenance, simplified management and maximum comfort. Sold with Chanote title deed and Thai company included.",
    "images": [
      "/public/images/properties/pvc-la-palmyra-rawai-phuket_0.webp",
      "/public/images/properties/pvc-la-palmyra-rawai-phuket_1.webp",
      "/public/images/properties/pvc-la-palmyra-rawai-phuket_2.webp",
      "/public/images/properties/pvc-la-palmyra-rawai-phuket_3.webp",
      "/public/images/properties/pvc-la-palmyra-rawai-phuket_4.webp",
      "/public/images/properties/pvc-la-palmyra-rawai-phuket_5.webp"
    ],
    "featured": true,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1002",
    "slug": "pvc-the-ark-condominium-karon-beach-2",
    "title": "The Ark Condominium (Karon Beach)",
    "purpose": "buy",
    "type": "Condo",
    "district": "Karon",
    "location": "Karon, Phuket",
    "lat": 7.845,
    "lng": 98.295,
    "price": 4990000,
    "price_thb": 4990000,
    "bedrooms": 1,
    "bathrooms": 1,
    "building_area": 57,
    "land_area": 0,
    "private_pool": false,
    "sea_view": true,
    "description": "Spacious renovated 57 m² studio condo by Veloche Group, fully furnished and ready to move in. Located just 600m (7-min walk) to Karon Beach and 1.5 km to Kata Beach. Private balcony with magical jungle, sea and swimming pool views. Luxury residence with large outdoor pool, gym and kids playground.",
    "images": [
      "/public/images/properties/pvc-veloche-group-the-ark-condominium-karon-beach_0.webp",
      "/public/images/properties/pvc-veloche-group-the-ark-condominium-karon-beach_1.webp",
      "/public/images/properties/pvc-veloche-group-the-ark-condominium-karon-beach_2.webp",
      "/public/images/properties/pvc-veloche-group-the-ark-condominium-karon-beach_3.webp",
      "/public/images/properties/pvc-veloche-group-the-ark-condominium-karon-beach_4.webp",
      "/public/images/properties/pvc-veloche-group-the-ark-condominium-karon-beach_5.webp"
    ],
    "featured": true,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1003",
    "slug": "pvc-apartment-horizon-luxury-rawai-3",
    "title": "Apartment Horizon Luxury Rawai",
    "purpose": "buy",
    "type": "Condo",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.781,
    "lng": 98.324,
    "price": 13870000,
    "price_thb": 13870000,
    "bedrooms": 3,
    "bathrooms": 2,
    "building_area": 167,
    "land_area": 0,
    "private_pool": false,
    "sea_view": true,
    "description": "Exceptional 167 m² luxury corner apartment featuring 3 bedrooms and 2 modern bathrooms with panoramic views. Large wrap-around terrace, open-concept luxury living space, fully fitted European kitchen and premium contemporary finishes.",
    "images": [
      "/public/images/properties/pvc-apartment-no-01_0.webp",
      "/public/images/properties/pvc-apartment-no-01_1.webp",
      "/public/images/properties/pvc-apartment-no-01_2.webp",
      "/public/images/properties/pvc-apartment-no-01_3.webp",
      "/public/images/properties/pvc-apartment-no-01_4.webp"
    ],
    "featured": true,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1004",
    "slug": "pvc-3-bedroom-pool-villa-big-land-rawai-4",
    "title": "Superb 3-Bedroom Pool Villa on Big Land",
    "purpose": "buy",
    "type": "Villa",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.779,
    "lng": 98.326,
    "price": 23000000,
    "price_thb": 23000000,
    "bedrooms": 3,
    "bathrooms": 3,
    "building_area": 320,
    "land_area": 800,
    "private_pool": true,
    "sea_view": false,
    "description": "Superb luxury 3-bedroom private pool villa built on a large landscaped land plot in Rawai. Generous outdoor entertaining areas, large private swimming pool, tropical garden, master suite with en-suite bath and double carport.",
    "images": [
      "/public/images/properties/pvc-for-sale-23-mb-super-3-bedrooms-pool-villa-wi_0.webp",
      "/public/images/properties/pvc-for-sale-23-mb-super-3-bedrooms-pool-villa-wi_1.webp",
      "/public/images/properties/pvc-for-sale-23-mb-super-3-bedrooms-pool-villa-wi_2.webp",
      "/public/images/properties/pvc-for-sale-23-mb-super-3-bedrooms-pool-villa-wi_3.webp",
      "/public/images/properties/pvc-for-sale-23-mb-super-3-bedrooms-pool-villa-wi_4.webp",
      "/public/images/properties/pvc-for-sale-23-mb-super-3-bedrooms-pool-villa-wi_5.webp"
    ],
    "featured": true,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1005",
    "slug": "pvc-2-bedroom-sea-view-villa-rawai-5",
    "title": "2-Bedroom Sea View Villa Rawai",
    "purpose": "buy",
    "type": "Villa",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.775,
    "lng": 98.318,
    "price": 16500000,
    "price_thb": 16500000,
    "bedrooms": 2,
    "bathrooms": 2,
    "building_area": 210,
    "land_area": 350,
    "private_pool": true,
    "sea_view": true,
    "description": "Step into the charm of coastal living with this carefully crafted 2-bedroom villa in Rawai Phuket offering stunning sea views from the upper floors. Features private swimming pool, sun deck, indoor parking and stylish kitchen with granite countertops.",
    "images": [
      "/public/images/properties/pvc-2-bedroom-villa-in-rawai-phuket-offering-stun_0.webp",
      "/public/images/properties/pvc-2-bedroom-villa-in-rawai-phuket-offering-stun_1.webp",
      "/public/images/properties/pvc-2-bedroom-villa-in-rawai-phuket-offering-stun_2.webp",
      "/public/images/properties/pvc-2-bedroom-villa-in-rawai-phuket-offering-stun_3.webp",
      "/public/images/properties/pvc-2-bedroom-villa-in-rawai-phuket-offering-stun_4.webp",
      "/public/images/properties/pvc-2-bedroom-villa-in-rawai-phuket-offering-stun_5.webp"
    ],
    "featured": true,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1006",
    "slug": "pvc-modern-3-bedroom-pool-villa-rawai-6",
    "title": "Modern 3-Bedroom Pool Villa Rawai",
    "purpose": "buy",
    "type": "Villa",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.784,
    "lng": 98.322,
    "price": 12000000,
    "price_thb": 12000000,
    "bedrooms": 3,
    "bathrooms": 3,
    "building_area": 240,
    "land_area": 380,
    "private_pool": true,
    "sea_view": false,
    "description": "Modern 3-bedroom private pool villa located in a quiet residential enclave in Rawai. Single-storey layout with direct pool terrace access from all bedrooms, European kitchen, air conditioning throughout and covered parking.",
    "images": [
      "/public/images/properties/pvc-12-mb-3-bedrooms-pool-villa-in-rawai_0.webp",
      "/public/images/properties/pvc-12-mb-3-bedrooms-pool-villa-in-rawai_1.webp",
      "/public/images/properties/pvc-12-mb-3-bedrooms-pool-villa-in-rawai_2.webp",
      "/public/images/properties/pvc-12-mb-3-bedrooms-pool-villa-in-rawai_3.webp",
      "/public/images/properties/pvc-12-mb-3-bedrooms-pool-villa-in-rawai_4.webp",
      "/public/images/properties/pvc-12-mb-3-bedrooms-pool-villa-in-rawai_5.webp"
    ],
    "featured": true,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1007",
    "slug": "pvc-turnkey-modern-2-story-pool-villa-duplex-7",
    "title": "Turnkey Modern 2-Story Pool Villa Duplex",
    "purpose": "buy",
    "type": "Villa",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.783,
    "lng": 98.327,
    "price": 12800000,
    "price_thb": 12800000,
    "bedrooms": 2,
    "bathrooms": 2,
    "building_area": 190,
    "land_area": 260,
    "private_pool": true,
    "sea_view": false,
    "description": "Turnkey modern private 2-storey duplex pool villa in Rawai. Modern architectural design, private swimming pool, open-plan lounge, high ceilings and complete furniture package included.",
    "images": [
      "/public/images/properties/pvc-12-8-mb-turnkey-modern-private-2-story-pool-v_0.webp",
      "/public/images/properties/pvc-12-8-mb-turnkey-modern-private-2-story-pool-v_1.webp",
      "/public/images/properties/pvc-12-8-mb-turnkey-modern-private-2-story-pool-v_2.webp",
      "/public/images/properties/pvc-12-8-mb-turnkey-modern-private-2-story-pool-v_3.webp",
      "/public/images/properties/pvc-12-8-mb-turnkey-modern-private-2-story-pool-v_4.webp",
      "/public/images/properties/pvc-12-8-mb-turnkey-modern-private-2-story-pool-v_5.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1008",
    "slug": "pvc-tropical-2-bedroom-pool-villa-rawai-8",
    "title": "Tropical 2-Bedroom Pool Villa Rawai",
    "purpose": "buy",
    "type": "Villa",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.7815,
    "lng": 98.319,
    "price": 13900000,
    "price_thb": 13900000,
    "bedrooms": 2,
    "bathrooms": 2,
    "building_area": 180,
    "land_area": 300,
    "private_pool": true,
    "sea_view": false,
    "description": "Charming 2-bedroom pool villa for sale in Rawai with Thai company included in the transaction. Available for outright purchase or long-term lease. Fully furnished and ready to move in.",
    "images": [
      "/public/images/properties/pvc-2-bedroom-pool-villa-for-sale-in-rawai_0.webp",
      "/public/images/properties/pvc-2-bedroom-pool-villa-for-sale-in-rawai_1.webp",
      "/public/images/properties/pvc-2-bedroom-pool-villa-for-sale-in-rawai_2.webp",
      "/public/images/properties/pvc-2-bedroom-pool-villa-for-sale-in-rawai_3.webp",
      "/public/images/properties/pvc-2-bedroom-pool-villa-for-sale-in-rawai_4.webp",
      "/public/images/properties/pvc-2-bedroom-pool-villa-for-sale-in-rawai_5.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1009",
    "slug": "pvc-residential-house-with-garden-rawai-9",
    "title": "Residential House with Garden Rawai",
    "purpose": "buy",
    "type": "Villa",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.786,
    "lng": 98.33,
    "price": 7000000,
    "price_thb": 7000000,
    "bedrooms": 3,
    "bathrooms": 2,
    "building_area": 160,
    "land_area": 280,
    "private_pool": false,
    "sea_view": false,
    "description": "Spacious 3-bedroom family house for sale in Rawai Phuket. Private fenced garden, paved terrace, comfortable living room and peaceful neighborhood close to all shops and international schools.",
    "images": [
      "/public/images/properties/pvc-house-for-sale-rawai-phuket_0.webp",
      "/public/images/properties/pvc-house-for-sale-rawai-phuket_1.webp",
      "/public/images/properties/pvc-house-for-sale-rawai-phuket_2.webp",
      "/public/images/properties/pvc-house-for-sale-rawai-phuket_3.webp",
      "/public/images/properties/pvc-house-for-sale-rawai-phuket_4.webp",
      "/public/images/properties/pvc-house-for-sale-rawai-phuket_5.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1010",
    "slug": "pvc-superb-modern-4-bedroom-pool-villa-rawai-10",
    "title": "Superb Modern 4-Bedroom Pool Villa Rawai",
    "purpose": "buy",
    "type": "Villa",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.7845,
    "lng": 98.316,
    "price": 18000000,
    "price_thb": 18000000,
    "bedrooms": 4,
    "bathrooms": 4,
    "building_area": 350,
    "land_area": 480,
    "private_pool": true,
    "sea_view": false,
    "description": "Superb modern 4-bedroom pool villa in Rawai Phuket. Large private swimming pool with jacuzzi, designer interior, ensuite bathrooms for every bedroom and high-end outdoor lounge area.",
    "images": [
      "/public/images/properties/pvc-superb-modern-4-bedroom-pool-villa-for-sale-i_0.webp",
      "/public/images/properties/pvc-superb-modern-4-bedroom-pool-villa-for-sale-i_1.webp",
      "/public/images/properties/pvc-superb-modern-4-bedroom-pool-villa-for-sale-i_2.webp",
      "/public/images/properties/pvc-superb-modern-4-bedroom-pool-villa-for-sale-i_3.webp",
      "/public/images/properties/pvc-superb-modern-4-bedroom-pool-villa-for-sale-i_4.webp",
      "/public/images/properties/pvc-superb-modern-4-bedroom-pool-villa-for-sale-i_5.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1011",
    "slug": "pvc-contemporary-3-bedroom-house-rawai-11",
    "title": "Contemporary 3-Bedroom House Rawai",
    "purpose": "buy",
    "type": "Villa",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.787,
    "lng": 98.325,
    "price": 14500000,
    "price_thb": 14500000,
    "bedrooms": 3,
    "bathrooms": 3,
    "building_area": 260,
    "land_area": 400,
    "private_pool": true,
    "sea_view": false,
    "description": "Large contemporary style 3-bedroom home in Rawai Phuket. Modern open living area, private swimming pool, landscaped tropical surroundings and covered parking for two vehicles.",
    "images": [
      "/public/images/properties/pvc-big-superb-contemporary-style-3-bedrooms-hous_0.webp",
      "/public/images/properties/pvc-big-superb-contemporary-style-3-bedrooms-hous_1.webp",
      "/public/images/properties/pvc-big-superb-contemporary-style-3-bedrooms-hous_2.webp",
      "/public/images/properties/pvc-big-superb-contemporary-style-3-bedrooms-hous_3.webp",
      "/public/images/properties/pvc-big-superb-contemporary-style-3-bedrooms-hous_4.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1012",
    "slug": "pvc-1-bedroom-modern-apartment-for-rent-12",
    "title": "1-Bedroom Modern Apartment for Rent",
    "purpose": "rent",
    "type": "Condo",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.781,
    "lng": 98.323,
    "price": 18000,
    "price_thb": 18000,
    "bedrooms": 1,
    "bathrooms": 1,
    "building_area": 45,
    "land_area": 0,
    "private_pool": false,
    "sea_view": false,
    "description": "Cozy 1-bedroom apartment available for rent in Rawai. Annual rental at 18,000 Baht/month (or monthly rental from 22,000 Baht/month). Fully equipped kitchen, air conditioning and high-speed internet.",
    "images": [
      "/public/images/properties/pvc-appartment-one-bedroom_0.webp",
      "/public/images/properties/pvc-appartment-one-bedroom_1.webp",
      "/public/images/properties/pvc-appartment-one-bedroom_2.webp",
      "/public/images/properties/pvc-appartment-one-bedroom_3.webp",
      "/public/images/properties/pvc-appartment-one-bedroom_4.webp",
      "/public/images/properties/pvc-appartment-one-bedroom_5.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1013",
    "slug": "pvc-bungalow-with-shared-pool-in-rawai-13",
    "title": "Bungalow with Shared Pool in Rawai",
    "purpose": "rent",
    "type": "Condo",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.7835,
    "lng": 98.318,
    "price": 22000,
    "price_thb": 22000,
    "bedrooms": 1,
    "bathrooms": 1,
    "building_area": 50,
    "land_area": 0,
    "private_pool": false,
    "sea_view": false,
    "description": "Charming tropical bungalow for rent in Rawai with access to a shared swimming pool. Fully furnished, air-conditioned, fast Wi-Fi and quiet residential environment near Nai Harn Beach.",
    "images": [
      "/public/images/properties/pvc-bungalow-with-share-pool-for-rent-in-rawai_0.webp",
      "/public/images/properties/pvc-bungalow-with-share-pool-for-rent-in-rawai_1.webp",
      "/public/images/properties/pvc-bungalow-with-share-pool-for-rent-in-rawai_2.webp",
      "/public/images/properties/pvc-bungalow-with-share-pool-for-rent-in-rawai_3.webp",
      "/public/images/properties/pvc-bungalow-with-share-pool-for-rent-in-rawai_4.webp",
      "/public/images/properties/pvc-bungalow-with-share-pool-for-rent-in-rawai_5.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1014",
    "slug": "pvc-2-bedroom-pool-villa-long-term-rental-14",
    "title": "2-Bedroom Pool Villa Long Term Rental",
    "purpose": "rent",
    "type": "Villa",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.78,
    "lng": 98.321,
    "price": 120000,
    "price_thb": 120000,
    "bedrooms": 2,
    "bathrooms": 2,
    "building_area": 180,
    "land_area": 280,
    "private_pool": true,
    "sea_view": false,
    "description": "Fully furnished 2-bedroom pool villa in Rawai available for long term contract at 120,000 THB/month. Private swimming pool, garden, maintenance included, ready to move in.",
    "images": [
      "/public/images/properties/pvc-2-bedroom-pool-villa-for-sale-rent-in-rawai_0.webp",
      "/public/images/properties/pvc-2-bedroom-pool-villa-for-sale-rent-in-rawai_1.webp",
      "/public/images/properties/pvc-2-bedroom-pool-villa-for-sale-rent-in-rawai_2.webp",
      "/public/images/properties/pvc-2-bedroom-pool-villa-for-sale-rent-in-rawai_3.webp",
      "/public/images/properties/pvc-2-bedroom-pool-villa-for-sale-rent-in-rawai_4.webp",
      "/public/images/properties/pvc-2-bedroom-pool-villa-for-sale-rent-in-rawai_5.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1015",
    "slug": "pvc-luxury-3-bedroom-pool-villa-annual-rental-15",
    "title": "Luxury 3-Bedroom Pool Villa Annual Rental",
    "purpose": "rent",
    "type": "Villa",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.7825,
    "lng": 98.326,
    "price": 95000,
    "price_thb": 95000,
    "bedrooms": 3,
    "bathrooms": 3,
    "building_area": 220,
    "land_area": 350,
    "private_pool": true,
    "sea_view": false,
    "description": "Superb 3-bedroom pool villa in Rawai Phuket for rent on yearly contract at 95,000 Baht/month. Includes pool and garden maintenance, and cleaning twice a week.",
    "images": [
      "/public/images/properties/pvc-2-bedroom-pool-villa-for-rent-in-rawai_0.webp",
      "/public/images/properties/pvc-2-bedroom-pool-villa-for-rent-in-rawai_1.webp",
      "/public/images/properties/pvc-2-bedroom-pool-villa-for-rent-in-rawai_2.webp",
      "/public/images/properties/pvc-2-bedroom-pool-villa-for-rent-in-rawai_3.webp",
      "/public/images/properties/pvc-2-bedroom-pool-villa-for-rent-in-rawai_4.webp",
      "/public/images/properties/pvc-2-bedroom-pool-villa-for-rent-in-rawai_5.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1016",
    "slug": "pvc-1-bedroom-monthly-rental-bungalow-16",
    "title": "1-Bedroom Monthly Rental Bungalow",
    "purpose": "rent",
    "type": "Condo",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.784,
    "lng": 98.3195,
    "price": 22000,
    "price_thb": 22000,
    "bedrooms": 1,
    "bathrooms": 1,
    "building_area": 45,
    "land_area": 0,
    "private_pool": false,
    "sea_view": false,
    "description": "1 and 2-bedroom bungalows in Rawai with shared pool from 22,000 Baht/month. Wi-Fi, electricity and water included in the monthly rate. Peaceful tropical garden.",
    "images": [
      "/public/images/properties/pvc-one-bedroom-bungalow-for-rent-monthly_0.webp",
      "/public/images/properties/pvc-one-bedroom-bungalow-for-rent-monthly_1.webp",
      "/public/images/properties/pvc-one-bedroom-bungalow-for-rent-monthly_2.webp",
      "/public/images/properties/pvc-one-bedroom-bungalow-for-rent-monthly_3.webp",
      "/public/images/properties/pvc-one-bedroom-bungalow-for-rent-monthly_4.webp",
      "/public/images/properties/pvc-one-bedroom-bungalow-for-rent-monthly_5.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1017",
    "slug": "pvc-magnificent-2-bedroom-pool-villa-central-rawai-17",
    "title": "Magnificent 2-Bedroom Pool Villa Central Rawai",
    "purpose": "rent",
    "type": "Villa",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.781,
    "lng": 98.3175,
    "price": 85000,
    "price_thb": 85000,
    "bedrooms": 2,
    "bathrooms": 2,
    "building_area": 175,
    "land_area": 290,
    "private_pool": true,
    "sea_view": false,
    "description": "Magnificent 2-bedroom pool villa in the heart of Rawai, only 5 minutes drive to Nai Harn Beach and Rawai Beach. Smart TV in all bedrooms, washing machine, pool & garden maintenance included.",
    "images": [
      "/public/images/properties/pvc-magnificent-2-bedroom-pool-villa-in-the-heart_0.webp",
      "/public/images/properties/pvc-magnificent-2-bedroom-pool-villa-in-the-heart_1.webp",
      "/public/images/properties/pvc-magnificent-2-bedroom-pool-villa-in-the-heart_2.webp",
      "/public/images/properties/pvc-magnificent-2-bedroom-pool-villa-in-the-heart_3.webp",
      "/public/images/properties/pvc-magnificent-2-bedroom-pool-villa-in-the-heart_4.webp",
      "/public/images/properties/pvc-magnificent-2-bedroom-pool-villa-in-the-heart_5.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1018",
    "slug": "pvc-villa-paradise-7-bedroom-luxury-estate-18",
    "title": "Villa Paradise 7-Bedroom Luxury Estate",
    "purpose": "rent",
    "type": "Villa",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.778,
    "lng": 98.314,
    "price": 190000,
    "price_thb": 190000,
    "bedrooms": 7,
    "bathrooms": 7,
    "building_area": 550,
    "land_area": 900,
    "private_pool": true,
    "sea_view": false,
    "description": "Villa Paradise Rawai: magnificent 7-bedroom luxury pool villa estate in the heart of Rawai. 5 minutes drive to Nai Harn Beach. Smart TV in all bedrooms, large swimming pool, high-speed Wi-Fi, full maintenance included. 190,000 THB/month on annual lease.",
    "images": [
      "/public/images/properties/pvc-magnificent-7-bedroom-pool-villa-in-the-heart_0.webp",
      "/public/images/properties/pvc-magnificent-7-bedroom-pool-villa-in-the-heart_1.webp",
      "/public/images/properties/pvc-magnificent-7-bedroom-pool-villa-in-the-heart_2.webp",
      "/public/images/properties/pvc-magnificent-7-bedroom-pool-villa-in-the-heart_3.webp",
      "/public/images/properties/pvc-magnificent-7-bedroom-pool-villa-in-the-heart_4.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1019",
    "slug": "pvc-prime-land-plot-rawai-beachside-19",
    "title": "Prime Land Plot Rawai Beachside",
    "purpose": "buy",
    "type": "Land",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.781,
    "lng": 98.328,
    "price": 15000000,
    "price_thb": 15000000,
    "bedrooms": 0,
    "bathrooms": 0,
    "building_area": 0,
    "land_area": 800,
    "private_pool": false,
    "sea_view": false,
    "description": "Prime land plot for sale in Rawai Phuket. Ideal for building private luxury villas or residential rental compounds. Chanote land title deed with easy road and utility access.",
    "images": [
      "/public/images/properties/pvc-land-for-sale-in-rawai-phuket_0.webp",
      "/public/images/properties/pvc-land-for-sale-in-rawai-phuket_1.webp",
      "/public/images/properties/pvc-land-for-sale-in-rawai-phuket_2.webp",
      "/public/images/properties/pvc-land-for-sale-in-rawai-phuket_3.webp",
      "/public/images/properties/pvc-land-for-sale-in-rawai-phuket_4.webp",
      "/public/images/properties/pvc-land-for-sale-in-rawai-phuket_5.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1020",
    "slug": "pvc-land-plot-soi-saiyuan-11-12-1280-m2-20",
    "title": "Land Plot Soi Saiyuan 11-12 (1,280 m²)",
    "purpose": "buy",
    "type": "Land",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.785,
    "lng": 98.32,
    "price": 20000000,
    "price_thb": 20000000,
    "bedrooms": 0,
    "bathrooms": 0,
    "building_area": 0,
    "land_area": 1280,
    "private_pool": false,
    "sea_view": false,
    "description": "Land for sale in Phuket Rawai District, Soi Saiyuan 11-12. Total land area: 1,280 square meters (approx 0.8 Rai). Price: 20 million Baht. Ideal for multi-villa development.",
    "images": [
      "/public/images/properties/pvc-land-for-sale-in-phuket-rawai-district-soi-s_0.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1021",
    "slug": "pvc-commercial-main-street-land-soi-saiyuan-5-21",
    "title": "Commercial Main Street Land Soi Saiyuan 5",
    "purpose": "buy",
    "type": "Land",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.7865,
    "lng": 98.3215,
    "price": 7000000,
    "price_thb": 7000000,
    "bedrooms": 0,
    "bathrooms": 0,
    "building_area": 0,
    "land_area": 228,
    "private_pool": false,
    "sea_view": false,
    "description": "Land for sale in Phuket Rawai District, Soi Saiyuan 5 directly on the main street. 228 square meters. Perfect commercial location for building a retail shop, restaurant or office.",
    "images": [
      "/public/images/properties/pvc-land-for-sale-in-phuket-rawai-district-soi-s_0.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1022",
    "slug": "pvc-10-rai-development-land-wiset-road-rawai-22",
    "title": "10 Rai Development Land Wiset Road Rawai",
    "purpose": "buy",
    "type": "Land",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.789,
    "lng": 98.328,
    "price": 35000000,
    "price_thb": 35000000,
    "bedrooms": 0,
    "bathrooms": 0,
    "building_area": 0,
    "land_area": 16000,
    "private_pool": false,
    "sea_view": false,
    "description": "10 Rai development land on Wiset Road, Rawai Phuket. Can be sold separately from 35 million to 40 million Baht per Rai. Premier frontage for major resort or commercial development.",
    "images": [
      "/public/images/properties/pvc-10-rai-for-sell-wiset-road-rawai-phuket-can-b_0.webp",
      "/public/images/properties/pvc-10-rai-for-sell-wiset-road-rawai-phuket-can-b_1.webp",
      "/public/images/properties/pvc-10-rai-for-sell-wiset-road-rawai-phuket-can-b_2.webp",
      "/public/images/properties/pvc-10-rai-for-sell-wiset-road-rawai-phuket-can-b_3.webp",
      "/public/images/properties/pvc-10-rai-for-sell-wiset-road-rawai-phuket-can-b_4.webp",
      "/public/images/properties/pvc-10-rai-for-sell-wiset-road-rawai-phuket-can-b_5.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1023",
    "slug": "pvc-land-with-residential-house-chalong-23",
    "title": "Land with Residential House Chalong",
    "purpose": "buy",
    "type": "Land",
    "district": "Chalong",
    "location": "Chalong, Phuket",
    "lat": 7.848,
    "lng": 98.341,
    "price": 6500000,
    "price_thb": 6500000,
    "bedrooms": 2,
    "bathrooms": 1,
    "building_area": 110,
    "land_area": 450,
    "private_pool": false,
    "sea_view": false,
    "description": "Land in Chalong Phuket with existing residential house. Total price: 6.5 million Baht. Convenient location close to Chalong Pier, shopping malls and international hospitals.",
    "images": [
      "/public/images/properties/pvc-land-in-chalong-phuket-with-house-6-5-millio_0.webp",
      "/public/images/properties/pvc-land-in-chalong-phuket-with-house-6-5-millio_1.webp",
      "/public/images/properties/pvc-land-in-chalong-phuket-with-house-6-5-millio_2.webp",
      "/public/images/properties/pvc-land-in-chalong-phuket-with-house-6-5-millio_3.webp",
      "/public/images/properties/pvc-land-in-chalong-phuket-with-house-6-5-millio_4.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1024",
    "slug": "pvc-rawai-hillside-residential-plot-24",
    "title": "Rawai Hillside Residential Plot",
    "purpose": "buy",
    "type": "Land",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.781,
    "lng": 98.315,
    "price": 9500000,
    "price_thb": 9500000,
    "bedrooms": 0,
    "bathrooms": 0,
    "building_area": 0,
    "land_area": 600,
    "private_pool": false,
    "sea_view": true,
    "description": "Gentle hillside residential land plot in Rawai with partial sea views and green mountain breeze. Chanote title, concrete access road, water and electricity connected.",
    "images": [
      "/public/images/properties/pvc-land-for-sale-in-rawai-phuket_0.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1025",
    "slug": "pvc-3-story-building-wine-shop-rawai-25",
    "title": "3-Story Building & Wine Shop Rawai",
    "purpose": "buy",
    "type": "Business",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.783,
    "lng": 98.324,
    "price": 5400000,
    "price_thb": 5400000,
    "bedrooms": 1,
    "bathrooms": 2,
    "building_area": 180,
    "land_area": 80,
    "private_pool": false,
    "sea_view": false,
    "description": "Freehold 3-story commercial building and operational wine boutique for sale in Rawai Phuket. 1st floor: retail shop, toilet, backroom and kitchen. 2nd floor: living bedroom with en-suite bathroom and balcony. Total price 5.4 million Baht.",
    "images": [
      "/public/images/properties/pvc-wine-shop-and-building-for-sale-in-rawai-phuk_0.webp",
      "/public/images/properties/pvc-wine-shop-and-building-for-sale-in-rawai-phuk_1.webp",
      "/public/images/properties/pvc-wine-shop-and-building-for-sale-in-rawai-phuk_2.webp",
      "/public/images/properties/pvc-wine-shop-and-building-for-sale-in-rawai-phuk_3.webp",
      "/public/images/properties/pvc-wine-shop-and-building-for-sale-in-rawai-phuk_4.webp",
      "/public/images/properties/pvc-wine-shop-and-building-for-sale-in-rawai-phuk_5.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1026",
    "slug": "pvc-italian-restaurant-business-rawai-26",
    "title": "Italian Restaurant Business Rawai",
    "purpose": "buy",
    "type": "Business",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.7815,
    "lng": 98.3225,
    "price": 500000,
    "price_thb": 500000,
    "bedrooms": 0,
    "bathrooms": 1,
    "building_area": 90,
    "land_area": 0,
    "private_pool": false,
    "sea_view": false,
    "description": "Turnkey Italian restaurant for sale in Rawai, currently in operation. Price: 500,000 THB. Thai registered company available for takeover if required (100,000 THB).",
    "images": [
      "/public/images/properties/pvc-sold_0.webp",
      "/public/images/properties/pvc-sold_1.webp",
      "/public/images/properties/pvc-sold_2.webp",
      "/public/images/properties/pvc-sold_3.webp",
      "/public/images/properties/pvc-sold_4.webp",
      "/public/images/properties/pvc-sold_5.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1027",
    "slug": "pvc-designer-coffee-shop-kids-playroom-rawai-27",
    "title": "Designer Coffee Shop with Kids Playroom Rawai",
    "purpose": "buy",
    "type": "Business",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.7845,
    "lng": 98.321,
    "price": 2500000,
    "price_thb": 2500000,
    "bedrooms": 0,
    "bathrooms": 2,
    "building_area": 140,
    "land_area": 0,
    "private_pool": false,
    "sea_view": false,
    "description": "Well-established coffee shop business in a high-traffic Rawai / Nai Harn avenue. High capacity 45-50 guests with dedicated kids playroom and event zone. Buyout price: 2.5 million Baht, rent 17,000 THB/month.",
    "images": [
      "/public/images/properties/pvc-for-sale-coffee-shop-in-rawaisold_0.webp",
      "/public/images/properties/pvc-for-sale-coffee-shop-in-rawaisold_1.webp",
      "/public/images/properties/pvc-for-sale-coffee-shop-in-rawaisold_2.webp",
      "/public/images/properties/pvc-for-sale-coffee-shop-in-rawaisold_3.webp",
      "/public/images/properties/pvc-for-sale-coffee-shop-in-rawaisold_4.webp",
      "/public/images/properties/pvc-for-sale-coffee-shop-in-rawaisold_5.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1028",
    "slug": "pvc-19-room-resort-restaurant-bar-rawai-28",
    "title": "19-Room Resort with Restaurant & Bar Rawai",
    "purpose": "buy",
    "type": "Business",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.7795,
    "lng": 98.3185,
    "price": 4500000,
    "price_thb": 4500000,
    "bedrooms": 19,
    "bathrooms": 19,
    "building_area": 750,
    "land_area": 1200,
    "private_pool": true,
    "sea_view": false,
    "description": "19-room boutique resort with restaurant and bar for lease/buyout in Rawai Phuket. Buyout price: 4.5 million Baht, monthly rent 100,000 Baht. Swimming pool, reception and full operating licenses.",
    "images": [
      "/public/images/properties/pvc-resort-for-sale-4-5-million-baht_0.webp",
      "/public/images/properties/pvc-resort-for-sale-4-5-million-baht_1.webp",
      "/public/images/properties/pvc-resort-for-sale-4-5-million-baht_2.webp",
      "/public/images/properties/pvc-resort-for-sale-4-5-million-baht_3.webp",
      "/public/images/properties/pvc-resort-for-sale-4-5-million-baht_4.webp",
      "/public/images/properties/pvc-resort-for-sale-4-5-million-baht_5.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1029",
    "slug": "pvc-superb-restaurant-business-nai-harn-road-29",
    "title": "Superb Restaurant Business Nai Harn Road",
    "purpose": "buy",
    "type": "Business",
    "district": "Nai Harn",
    "location": "Nai Harn, Phuket",
    "lat": 7.776,
    "lng": 98.308,
    "price": 950000,
    "price_thb": 950000,
    "bedrooms": 0,
    "bathrooms": 2,
    "building_area": 120,
    "land_area": 0,
    "private_pool": false,
    "sea_view": false,
    "description": "Superb restaurant business for sale on a busy road near Nai Harn Beach. Takeover price: 950,000 Baht, low rent at 18,000 Baht/month. Fully fitted kitchen, furniture and loyal customer base.",
    "images": [
      "/public/images/properties/pvc-superb-restaurant-for-sale-in-rawai-phuket_0.webp",
      "/public/images/properties/pvc-superb-restaurant-for-sale-in-rawai-phuket_1.webp",
      "/public/images/properties/pvc-superb-restaurant-for-sale-in-rawai-phuket_2.webp",
      "/public/images/properties/pvc-superb-restaurant-for-sale-in-rawai-phuket_3.webp",
      "/public/images/properties/pvc-superb-restaurant-for-sale-in-rawai-phuket_4.webp",
      "/public/images/properties/pvc-superb-restaurant-for-sale-in-rawai-phuket_5.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1030",
    "slug": "pvc-modern-beachside-restaurant-rawai-30",
    "title": "Modern Beachside Restaurant Rawai",
    "purpose": "buy",
    "type": "Business",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.781,
    "lng": 98.329,
    "price": 1100000,
    "price_thb": 1100000,
    "bedrooms": 0,
    "bathrooms": 1,
    "building_area": 100,
    "land_area": 0,
    "private_pool": false,
    "sea_view": false,
    "description": "Recently built restaurant for sale near Rawai Beach. Built with new equipment, outdoor covered dining and bar. Ready for immediate handover.",
    "images": [
      "/public/images/properties/pvc-sold_0.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1031",
    "slug": "pvc-100-seat-restaurant-bar-staff-rooms-rawai-31",
    "title": "100-Seat Restaurant & Bar with Staff Rooms Rawai",
    "purpose": "buy",
    "type": "Business",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.782,
    "lng": 98.3235,
    "price": 900000,
    "price_thb": 900000,
    "bedrooms": 3,
    "bathrooms": 3,
    "building_area": 250,
    "land_area": 0,
    "private_pool": false,
    "sea_view": false,
    "description": "Large 100-seat restaurant and bar for sale in Rawai. Comes with all equipment, inventory, commercial kitchen, 3 staff bedrooms and private management apartment. Monthly rent: 70,000 THB with option for 9-year lease.",
    "images": [
      "/public/images/properties/pvc-italian-restaurant-and-bar-for-sale-in-phuket_0.webp",
      "/public/images/properties/pvc-italian-restaurant-and-bar-for-sale-in-phuket_1.webp",
      "/public/images/properties/pvc-italian-restaurant-and-bar-for-sale-in-phuket_2.webp",
      "/public/images/properties/pvc-italian-restaurant-and-bar-for-sale-in-phuket_3.webp",
      "/public/images/properties/pvc-italian-restaurant-and-bar-for-sale-in-phuket_4.webp",
      "/public/images/properties/pvc-italian-restaurant-and-bar-for-sale-in-phuket_5.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1032",
    "slug": "pvc-commercial-premises-50m2-near-nai-harn-32",
    "title": "Commercial Premises 50 m² near Nai Harn",
    "purpose": "buy",
    "type": "Business",
    "district": "Nai Harn",
    "location": "Nai Harn, Phuket",
    "lat": 7.777,
    "lng": 98.309,
    "price": 90000,
    "price_thb": 90000,
    "bedrooms": 1,
    "bathrooms": 1,
    "building_area": 50,
    "land_area": 0,
    "private_pool": false,
    "sea_view": false,
    "description": "Commercial premises for rent near Nai Harn Beach at 15,000 THB/month. Takeover fee: 90,000 Baht. Includes 50 m² floor space, private bedroom and bathroom. Ideal for salon, office or boutique.",
    "images": [
      "/public/images/properties/pvc-sold_0.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1033",
    "slug": "pvc-top-fast-food-restaurant-corner-rawai-33",
    "title": "Top Fast Food Restaurant Corner Location Rawai",
    "purpose": "buy",
    "type": "Business",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.785,
    "lng": 98.326,
    "price": 1200000,
    "price_thb": 1200000,
    "bedrooms": 0,
    "bathrooms": 1,
    "building_area": 85,
    "land_area": 0,
    "private_pool": false,
    "sea_view": false,
    "description": "High-revenue fast food restaurant in prime corner location in Rawai Phuket. Gross sales over 4 million THB/year, low monthly rent of 15,000 THB. Sale includes brand, social media, recipes and all kitchen equipment.",
    "images": [
      "/public/images/properties/pvc-sold_0.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1034",
    "slug": "pvc-15-bedroom-resort-complex-rawai-1188m2-34",
    "title": "15-Bedroom Resort Complex Rawai (1,188 m² Land)",
    "purpose": "buy",
    "type": "Business",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.78,
    "lng": 98.319,
    "price": 28000000,
    "price_thb": 28000000,
    "bedrooms": 15,
    "bathrooms": 15,
    "building_area": 850,
    "land_area": 1188,
    "private_pool": true,
    "sea_view": false,
    "description": "Resort complex for sale in Rawai on 1,188 m² land plot (297 sq.wa). Includes 3 buildings: Building 1 (5 x 1-bedroom bungalows), Building 2 (2 x 1-bedroom bungalows), Building 3 (townhouse 2-bed duplex) plus Main house with 4 bedrooms. Foundation designed to add additional floors.",
    "images": [
      "/public/images/properties/pvc-resort-for-sale-in-rawai-15-bedrooms_0.webp",
      "/public/images/properties/pvc-resort-for-sale-in-rawai-15-bedrooms_2.webp",
      "/public/images/properties/pvc-resort-for-sale-in-rawai-15-bedrooms_3.webp",
      "/public/images/properties/pvc-resort-for-sale-in-rawai-15-bedrooms_4.webp",
      "/public/images/properties/pvc-resort-for-sale-in-rawai-15-bedrooms_5.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1035",
    "slug": "pvc-lounge-bar-billiards-club-rawai-35",
    "title": "Lounge Bar & Billiards Club Rawai",
    "purpose": "buy",
    "type": "Business",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.784,
    "lng": 98.3245,
    "price": 199000,
    "price_thb": 199000,
    "bedrooms": 0,
    "bathrooms": 1,
    "building_area": 70,
    "land_area": 0,
    "private_pool": false,
    "sea_view": false,
    "description": "Turnkey bar for sale in Rawai for only 199,000 Baht. Includes brand new pool table, large flat screen TVs, sound system and full bar setup. Located at busy 3-street junction with low rent of 13,000 THB/month.",
    "images": [
      "/public/images/properties/pvc-small-bar-for-sale-in-rawai_0.webp",
      "/public/images/properties/pvc-small-bar-for-sale-in-rawai_1.webp",
      "/public/images/properties/pvc-small-bar-for-sale-in-rawai_2.webp",
      "/public/images/properties/pvc-small-bar-for-sale-in-rawai_3.webp",
      "/public/images/properties/pvc-small-bar-for-sale-in-rawai_4.webp",
      "/public/images/properties/pvc-small-bar-for-sale-in-rawai_5.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1036",
    "slug": "pvc-500m2-commercial-building-for-rent-rawai-36",
    "title": "500 m² Commercial Building for Rent Rawai",
    "purpose": "rent",
    "type": "Business",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.786,
    "lng": 98.327,
    "price": 60000,
    "price_thb": 60000,
    "bedrooms": 0,
    "bathrooms": 4,
    "building_area": 500,
    "land_area": 300,
    "private_pool": false,
    "sea_view": false,
    "description": "Brand new 500 m² commercial building for rent in Rawai at 60,000 Baht/month per floor (250 m² per floor). Dedicated car and motorbike parking, excellent visibility for restaurant, supermarket or fitness center.",
    "images": [
      "/public/images/properties/pvc-rented500-square-meter-commercial-premises-fo_0.webp",
      "/public/images/properties/pvc-rented500-square-meter-commercial-premises-fo_1.webp",
      "/public/images/properties/pvc-rented500-square-meter-commercial-premises-fo_2.webp",
      "/public/images/properties/pvc-rented500-square-meter-commercial-premises-fo_3.webp",
      "/public/images/properties/pvc-rented500-square-meter-commercial-premises-fo_4.webp",
      "/public/images/properties/pvc-rented500-square-meter-commercial-premises-fo_5.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  },
  {
    "id": "PVC-1037",
    "slug": "pvc-71-seat-restaurant-business-rawai-37",
    "title": "71-Seat Restaurant Business Rawai",
    "purpose": "buy",
    "type": "Business",
    "district": "Rawai",
    "location": "Rawai, Phuket",
    "lat": 7.782,
    "lng": 98.321,
    "price": 750000,
    "price_thb": 750000,
    "bedrooms": 0,
    "bathrooms": 2,
    "building_area": 110,
    "land_area": 0,
    "private_pool": false,
    "sea_view": false,
    "description": "Established 71-seat restaurant for sale in Rawai. Fully equipped kitchen, inventory and commercial lease in place with 5 years remaining. Company takeover available.",
    "images": [
      "/public/images/properties/pvc-restaurant-for-sale-in-phuket-rawai-superb-lo_0.webp",
      "/public/images/properties/pvc-restaurant-for-sale-in-phuket-rawai-superb-lo_1.webp",
      "/public/images/properties/pvc-restaurant-for-sale-in-phuket-rawai-superb-lo_2.webp",
      "/public/images/properties/pvc-restaurant-for-sale-in-phuket-rawai-superb-lo_3.webp",
      "/public/images/properties/pvc-restaurant-for-sale-in-phuket-rawai-superb-lo_4.webp",
      "/public/images/properties/pvc-restaurant-for-sale-in-phuket-rawai-superb-lo_5.webp"
    ],
    "featured": false,
    "created_at": "2026-08-21T07:00:00.000Z"
  }
];

// 5. Unpack and sanitize property object
function unpackProperty(p) {
  if (!p) return null;
  let metadata = {};
  let cleanDesc = p.description || '';

  // Extract purpose if tagged
  let purpose = p.purpose || 'buy';
  const purposeMatch = cleanDesc.match(/\[listing_type:(buy|rent)\]/i);
  if (purposeMatch) {
    purpose = purposeMatch[1].toLowerCase();
    cleanDesc = cleanDesc.replace(/\[listing_type:(buy|rent)\]/i, '').trim();
  }

  // Extract metadata json if tagged
  const metaMatch = cleanDesc.match(/\[metadata:(\{.*?\})\]/s);
  if (metaMatch) {
    try {
      metadata = JSON.parse(metaMatch[1]);
      cleanDesc = cleanDesc.replace(/\[metadata:(\{.*?\})\]/s, '').trim();
    } catch (e) {}
  }

  const id = p.id || ('PVC-' + Math.floor(1000 + Math.random() * 9000));
  const slug = p.slug || ('pvc-' + (p.title ? p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : id));

  return {
    ...metadata,
    ...p,
    id: id,
    slug: slug,
    purpose: metadata.purpose || purpose,
    description: cleanDesc,
    title: p.title || 'Propriété de Prestige',
    type: p.type || metadata.type || 'Villa',
    district: p.district || metadata.district || 'Bang Tao',
    price: Number(p.price) || 0,
    price_thb: Number(p.price_thb || p.price) || 0,
    bedrooms: Number(p.bedrooms) || 0,
    bathrooms: Number(p.bathrooms) || 0,
    building_area: Number(p.building_area || p.size || metadata.building_area || 0),
    land_area: Number(p.land_area || metadata.land_area || 0),
    private_pool: p.private_pool ?? metadata.private_pool ?? true,
    common_pool: p.common_pool ?? metadata.common_pool ?? false,
    private_parking: p.private_parking ?? metadata.private_parking ?? true,
    common_parking: p.common_parking ?? metadata.common_parking ?? false,
    sea_view: p.sea_view ?? metadata.sea_view ?? false,
    images: Array.isArray(p.images) && p.images.length > 0 ? p.images : (p.image ? [p.image] : ['/public/images/villa_1.png'])
  };
}

// 6. State Management
let currentLang = localStorage.getItem('pvc_lang') || CONFIG.DEFAULT_LANG;
let currentCurrency = localStorage.getItem('pvc_currency') || CONFIG.DEFAULT_CURRENCY;

function updateHtmlLangAttributes() {
  document.documentElement.lang = currentLang;
  if (currentLang === 'ar') {
    document.documentElement.dir = 'rtl';
  } else {
    document.documentElement.dir = 'ltr';
  }
}
updateHtmlLangAttributes();

function getI18n() {
  return SITE_I18N[currentLang] || SITE_I18N.fr;
}

function formatPrice(amountTHB, targetCurr = currentCurrency) {
  if (!amountTHB || amountTHB <= 0) {
    const dict = getI18n();
    return dict.lbl_price_on_request || 'Prix sur demande';
  }
  const rate = CONFIG.CURRENCY_RATES[targetCurr] || 1;
  const converted = amountTHB * rate;
  const symbol = CONFIG.CURRENCY_SYMBOLS[targetCurr] || '฿';

  if (targetCurr === 'THB') {
    return symbol + ' ' + Math.round(converted).toLocaleString('fr-FR');
  } else {
    return symbol + ' ' + Math.round(converted).toLocaleString('en-US');
  }
}

function applyI18nToDOM() {
  const dict = getI18n();
  updateHtmlLangAttributes();

  document.querySelectorAll('[i18n]').forEach(el => {
    const key = el.getAttribute('i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  document.querySelectorAll('[i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('i18n-placeholder');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  const langSelect = document.getElementById('ctrl-lang');
  if (langSelect) langSelect.value = currentLang;

  const currSelect = document.getElementById('ctrl-curr');
  if (currSelect) currSelect.value = currentCurrency;
}

function getDeletedPropertyKeys() {
  try {
    const stored = localStorage.getItem('pvc_deleted_properties');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch (e) {
    return new Set();
  }
}

const PVC_DATA_VERSION = '20260821_v5_strict_clean';

function getAllProperties() {
  let list = [];
  try {
    const currentVersion = localStorage.getItem('pvc_data_version');
    if (currentVersion !== PVC_DATA_VERSION) {
      localStorage.setItem('pvc_data_version', PVC_DATA_VERSION);
      localStorage.removeItem('pvc_properties');
      localStorage.removeItem('pvc_v4_clean');
      list = [...fallbackProperties].map(unpackProperty).filter(Boolean);
      localStorage.setItem('pvc_properties', JSON.stringify(list));
      return list;
    }
    const stored = localStorage.getItem('pvc_properties');
    if (stored) {
      list = JSON.parse(stored).map(unpackProperty).filter(Boolean);
    } else {
      list = [...fallbackProperties].map(unpackProperty).filter(Boolean);
    }
  } catch (e) {
    list = [...fallbackProperties].map(unpackProperty).filter(Boolean);
  }

  const deletedKeys = getDeletedPropertyKeys();
  return list.filter(p => p && !deletedKeys.has(p.slug) && !deletedKeys.has(p.id));
}

function saveProperties(list) {
  try {
    localStorage.setItem('pvc_properties', JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save properties to localStorage', e);
  }
}

function renderPropertyCard(p) {
  if (!p) return '';
  const dict = getI18n();
  const coverImage = (Array.isArray(p.images) && p.images[0]) ? p.images[0] : (p.image || '/public/images/villa_1.png');
  const formattedPrice = formatPrice(p.price_thb || p.price);
  const isRent = (p.purpose === 'rent');
  const purposeBadge = isRent ? (dict.lbl_purpose_rent || 'Location') : (dict.lbl_purpose_buy || 'Vente');

  return `
    <article class="property-card flex flex-col group h-full">
      <div class="relative aspect-[16/10] overflow-hidden bg-zinc-900 prop-card-media">
        <img src="${coverImage}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" onerror="this.src='/public/images/villa_1.png'">
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>
        
        <div class="absolute top-3 left-3 flex items-center gap-2">
          <span class="bg-[#110D09]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 uppercase tracking-wider">
            ${purposeBadge}
          </span>
          <span class="bg-[#DF921B] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
            ${p.type || 'Villa'}
          </span>
        </div>

        <div class="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/95 text-xs font-semibold drop-shadow-md">
          <svg class="w-3.5 h-3.5 text-[#DF921B]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>${p.district || 'Phuket'}, Thailand</span>
        </div>
      </div>

      <div class="p-5 flex flex-col flex-grow justify-between bg-white">
        <div>
          <h3 class="font-bold text-lg text-[#110D09] group-hover:text-[#DF921B] transition-colors line-clamp-1 mb-2">
            ${p.title}
          </h3>
          <p class="text-xs text-zinc-500 line-clamp-2 mb-4 leading-relaxed">
            ${p.description || 'Propriété de haut standing avec prestations exclusives.'}
          </p>
        </div>

        <div>
          <div class="grid grid-cols-3 gap-2 py-3 border-t border-b border-zinc-100 mb-4 text-center text-xs text-zinc-600">
            ${p.bedrooms ? `<div class="flex flex-col"><span class="font-bold text-[#110D09]">${p.bedrooms}</span><span class="text-[10px] text-zinc-400 uppercase">${dict.lbl_beds || 'Chambres'}</span></div>` : ''}
            ${p.bathrooms ? `<div class="flex flex-col"><span class="font-bold text-[#110D09]">${p.bathrooms}</span><span class="text-[10px] text-zinc-400 uppercase">${dict.lbl_baths || 'Bains'}</span></div>` : ''}
            ${p.building_area ? `<div class="flex flex-col"><span class="font-bold text-[#110D09]">${p.building_area} m²</span><span class="text-[10px] text-zinc-400 uppercase">${dict.lbl_area || 'Surface'}</span></div>` : ''}
          </div>

          <div class="flex items-center justify-between pt-1">
            <div>
              <span class="text-[11px] uppercase font-bold text-zinc-400 block tracking-wider">Prix</span>
              <span class="text-base font-extrabold text-[#DF921B]">${formattedPrice}</span>
            </div>
            <a href="/property-detail.html?id=${p.id}" class="btn-outline-gold text-xs py-2 px-4 rounded-xl font-bold">
              ${dict.lbl_details || 'Détails'} →
            </a>
          </div>
        </div>
      </div>
    </article>
  `;
}

async function translateDynamicText(text, targetLang) {
  if (!text || targetLang === 'en') return text;
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${encodeURIComponent(targetLang)}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) return text;
    const json = await res.json();
    if (json && json[0]) {
      return json[0].map(item => item[0]).join('');
    }
    return text;
  } catch (e) {
    return text;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  applyI18nToDOM();

  const langSelect = document.getElementById('ctrl-lang');
  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      currentLang = e.target.value;
      localStorage.setItem('pvc_lang', currentLang);
      applyI18nToDOM();
      window.dispatchEvent(new CustomEvent('pvc:languageChanged', { detail: { lang: currentLang } }));
    });
  }

  const currSelect = document.getElementById('ctrl-curr');
  if (currSelect) {
    currSelect.addEventListener('change', (e) => {
      currentCurrency = e.target.value;
      localStorage.setItem('pvc_currency', currentCurrency);
      window.dispatchEvent(new CustomEvent('pvc:currencyChanged', { detail: { currency: currentCurrency } }));
    });
  }

  const btnMobile = document.getElementById('btn-mobile-menu');
  const mobilePanel = document.getElementById('mobile-nav-panel');
  const iconOpen = document.getElementById('icon-menu-open');
  const iconClose = document.getElementById('icon-menu-close');

  if (btnMobile && mobilePanel) {
    btnMobile.addEventListener('click', () => {
      const isOpen = !mobilePanel.classList.contains('hidden');
      if (isOpen) {
        mobilePanel.classList.add('hidden');
        if (iconOpen) iconOpen.classList.remove('hidden');
        if (iconClose) iconClose.classList.add('hidden');
      } else {
        mobilePanel.classList.remove('hidden');
        if (iconOpen) iconOpen.classList.add('hidden');
        if (iconClose) iconClose.classList.remove('hidden');
      }
    });
  }

  const btnExtendedSearch = document.getElementById('btn-extended-search');
  const extendedPanel = document.getElementById('extended-search-panel');
  if (btnExtendedSearch && extendedPanel) {
    btnExtendedSearch.addEventListener('click', () => {
      extendedPanel.classList.toggle('hidden');
    });
  }
});
