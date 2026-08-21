
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
    inquiry_msg_template: "Bonjour, je souhaite obtenir le dossier complet et convenir d'une visite pour le bien : {title} (Réf: {id}).",
    lbl_price_month: " / mois",
    lbl_garden_view: "Jardin Tropical & Calme",
    lbl_sea_view: "Vue Mer Panoramique",
    lbl_pool_common: "Non / Commune",
    lbl_pool_private: "Piscine Privée",
    btn_send_inquiry: "Envoyer la Demande Privée",
    form_inquiry_subtitle: "Réponse confidentielle sous 24h par notre concierge dédié.",
    form_inquiry_title: "Demande d'Information Privée",
    btn_schedule_visit: "Organiser une visite",
    box_visit_desc: "Notre conseiller dédié organise votre visite exclusive en toute discrétion.",
    box_visit_title: "Visite Privée & Conciergerie VIP",
    sec_location_map: "Localisation & Quartier",
    sec_prop_desc: "Description du Bien",
    sec_key_specs: "Caractéristiques Principales",
    btn_back_catalog: "Retour au catalogue",
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
    inquiry_msg_template: "Hello, I would like to receive the full brochure and schedule a private viewing for the property: {title} (Ref: {id}).",
    lbl_price_month: " / month",
    lbl_garden_view: "Tropical & Peaceful Garden",
    lbl_sea_view: "Panoramic Sea View",
    lbl_pool_common: "None / Shared Pool",
    lbl_pool_private: "Private Pool",
    btn_send_inquiry: "Send Private Inquiry",
    form_inquiry_subtitle: "Confidential response within 24h by our local VIP concierge.",
    form_inquiry_title: "Private Information Request",
    btn_schedule_visit: "Schedule a Viewing",
    box_visit_desc: "Our dedicated advisor will arrange your exclusive private viewing with utmost discretion.",
    box_visit_title: "Private Viewing & VIP Concierge",
    sec_location_map: "Location & Neighborhood",
    sec_prop_desc: "Property Description",
    sec_key_specs: "Key Specifications",
    btn_back_catalog: "Back to Properties",
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
    inquiry_msg_template: "Guten Tag, ich möchte das vollständige Exposé erhalten und eine Besichtigung für die Immobilie vereinbaren: {title} (Ref: {id}).",
    lbl_price_month: " / Monat",
    lbl_garden_view: "Tropischer & ruhiger Garten",
    lbl_sea_view: "Panoramablick auf das Meer",
    lbl_pool_common: "Kein / Gemeinschaftspool",
    lbl_pool_private: "Privater Pool",
    btn_send_inquiry: "Private Anfrage senden",
    form_inquiry_subtitle: "Vertrauliche Antwort innerhalb von 24 Std. durch unseren lokalen VIP-Concierge.",
    form_inquiry_title: "Private Informationsanfrage",
    btn_schedule_visit: "Besichtigung vereinbaren",
    box_visit_desc: "Unser engagierter Berater organisiert Ihre exklusive Privatbesichtigung mit größter Diskretion.",
    box_visit_title: "Privatbesichtigung & VIP-Concierge",
    sec_location_map: "Lage & Umgebung",
    sec_prop_desc: "Objektbeschreibung",
    sec_key_specs: "Wichtigste Eckdaten",
    btn_back_catalog: "Zurück zu den Angeboten",
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
    inquiry_msg_template: "Buongiorno, desidero ricevere il dossier completo e fissare una visita per l'immobile: {title} (Rif: {id}).",
    lbl_price_month: " / mese",
    lbl_garden_view: "Giardino Tropicale & Silenzioso",
    lbl_sea_view: "Vista Mare Panoramica",
    lbl_pool_common: "Nessuna / Piscina Condominiale",
    lbl_pool_private: "Piscina Privata",
    btn_send_inquiry: "Invia Richiesta Privata",
    form_inquiry_subtitle: "Risposta riservata entro 24 ore dal nostro concierge VIP locale.",
    form_inquiry_title: "Richiesta di Informazioni Private",
    btn_schedule_visit: "Organizza una Visita",
    box_visit_desc: "Il nostro consulente dedicato organizza la vostra visita privata esclusiva con la massima discrezione.",
    box_visit_title: "Visita Privata & Concierge VIP",
    sec_location_map: "Posizione & Quartiere",
    sec_prop_desc: "Descrizione dell'Immobile",
    sec_key_specs: "Caratteristiche Principali",
    btn_back_catalog: "Torna al catalogo",
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
    inquiry_msg_template: "Hola, deseo recibir el dossier completo y programar una visita para la propiedad: {title} (Ref: {id}).",
    lbl_price_month: " / mes",
    lbl_garden_view: "Jardín Tropical y Tranquilo",
    lbl_sea_view: "Vista Panorámica al Mar",
    lbl_pool_common: "No / Piscina Comunitaria",
    lbl_pool_private: "Piscina Privada",
    btn_send_inquiry: "Enviar Consulta Privada",
    form_inquiry_subtitle: "Respuesta confidencial en menos de 24h por nuestro concierge VIP local.",
    form_inquiry_title: "Solicitud de Información Privada",
    btn_schedule_visit: "Agendar una Visita",
    box_visit_desc: "Nuestro asesor exclusivo organiza su visita privada con la máxima discreción.",
    box_visit_title: "Visita Privada y Concierge VIP",
    sec_location_map: "Ubicación y Barrio",
    sec_prop_desc: "Descripción de la Propiedad",
    sec_key_specs: "Características Principales",
    btn_back_catalog: "Volver a las ofertas",
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
    inquiry_msg_template: "Olá, gostaria de receber o dossiê completo e agendar uma visita para o imóvel: {title} (Ref: {id}).",
    lbl_price_month: " / mês",
    lbl_garden_view: "Jardim Tropical e Tranquilo",
    lbl_sea_view: "Vista Mar Panorâmica",
    lbl_pool_common: "Não / Piscina Comum",
    lbl_pool_private: "Piscina Privada",
    btn_send_inquiry: "Enviar Pedido Privado",
    form_inquiry_subtitle: "Resposta confidencial em 24h pelo nosso concierge VIP local.",
    form_inquiry_title: "Pedido de Informações Privadas",
    btn_schedule_visit: "Agendar Visita",
    box_visit_desc: "Nosso consultor dedicado organiza sua visita privada exclusiva com total discrição.",
    box_visit_title: "Visita Privada & Concierge VIP",
    sec_location_map: "Localização & Bairro",
    sec_prop_desc: "Descrição do Imóvel",
    sec_key_specs: "Especificações Principais",
    btn_back_catalog: "Voltar às ofertas",
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
    inquiry_msg_template: "สวัสดีครับ/ค่ะ ฉันต้องการรับเอกสารรายละเอียดและนัดหมายเข้าชมโครงการ: {title} (รหัส: {id})",
    lbl_price_month: " / เดือน",
    lbl_garden_view: "วิวสวนทรอปิคอล เงียบสงบ",
    lbl_sea_view: "วิวทะเลแบบพาโนรามา",
    lbl_pool_common: "ไม่มี / สระว่ายน้ำส่วนกลาง",
    lbl_pool_private: "สระว่ายน้ำส่วนตัว",
    btn_send_inquiry: "ส่งคำขอข้อมูลส่วนตัว",
    form_inquiry_subtitle: "ทีมงาน VIP Concierge ประจำพื้นที่ตอบกลับเป็นความลับภายใน 24 ชั่วโมง",
    form_inquiry_title: "ขอข้อมูลและนัดหมายพิเศษ",
    btn_schedule_visit: "นัดหมายเข้าชมโครงการ",
    box_visit_desc: "ที่ปรึกษาส่วนตัวพร้อมจัดรอบเข้าชมแบบเอ็กซ์คลูซีฟและเป็นส่วนตัวสูงสุด",
    box_visit_title: "บริการนัดชมส่วนตัวและ VIP Concierge",
    sec_location_map: "ทำเลที่ตั้งและบริเวณใกล้เคียง",
    sec_prop_desc: "รายละเอียดอสังหาริมทรัพย์",
    sec_key_specs: "ข้อมูลจำเพาะหลัก",
    btn_back_catalog: "กลับสู่รายการทั้งหมด",
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
    inquiry_msg_template: "Здравствуйте, я хочу получить полную презентацию и согласовать частный просмотр объекта: {title} (Ref: {id}).",
    lbl_price_month: " / месяц",
    lbl_garden_view: "Тропический и тихий сад",
    lbl_sea_view: "Панорамный вид на море",
    lbl_pool_common: "Нет / Общий бассейн",
    lbl_pool_private: "Частный бассейн",
    btn_send_inquiry: "Отправить закрытый запрос",
    form_inquiry_subtitle: "Конфиденциальный ответ в течение 24 часов от нашей команды VIP-консьержей.",
    form_inquiry_title: "Запрос информации и деталей",
    btn_schedule_visit: "Назначить просмотр",
    box_visit_desc: "Персональный консультант организует приватный показ с соблюдением полной конфиденциальности.",
    box_visit_title: "Приватный просмотр и VIP-консьерж",
    sec_location_map: "Расположение и район",
    sec_prop_desc: "Описание объекта",
    sec_key_specs: "Основные характеристики",
    btn_back_catalog: "Вернуться в каталог",
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
    inquiry_msg_template: "مرحبًا، أود الحصول على الملف الكامل وتحديد موعد لزيارة العقار: {title} (المرجع: {id}).",
    lbl_price_month: " / شهريًا",
    lbl_garden_view: "حديقة استوائية وهادئة",
    lbl_sea_view: "إطلالة بانورامية على البحر",
    lbl_pool_common: "لا يوجد / مسبح مشترك",
    lbl_pool_private: "مسبح خاص",
    btn_send_inquiry: "إرسال طلب خاص",
    form_inquiry_subtitle: "رد سري خلال 24 ساعة من فريق الكونسيرج المحلي لدينا.",
    form_inquiry_title: "طلب معلومات خاصة",
    btn_schedule_visit: "تحديد موعد للزيارة",
    box_visit_desc: "ينظم مستشارنا الخاص زيارتكم الحصرية بأقصى درجات السرية والخصوصية.",
    box_visit_title: "زيارة خاصة وخدمات كونسيرج VIP",
    sec_location_map: "الموقع والحي",
    sec_prop_desc: "وصف العقار",
    sec_key_specs: "المواصفات الرئيسية",
    btn_back_catalog: "العودة إلى العروض",
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
    inquiry_msg_template: "您好，我想索取该房源的完整资料并预约私人看房：{title}（房源编号：{id}）。",
    lbl_price_month: " / 月",
    lbl_garden_view: "热带静谧花园",
    lbl_sea_view: "全景壮丽海景",
    lbl_pool_common: "无 / 公共泳池",
    lbl_pool_private: "私人泳池",
    btn_send_inquiry: "提交私人咨询",
    form_inquiry_subtitle: "当地专属VIP礼宾顾问24小时内为您提供保密回复。",
    form_inquiry_title: "索取私人房源资料",
    btn_schedule_visit: "预约尊享看房",
    box_visit_desc: "您的专属顾问将以最高保密标准为您安排尊贵私人看房行程。",
    box_visit_title: "私人看房与VIP礼宾服务",
    sec_location_map: "地理位置与周边配套",
    sec_prop_desc: "房源详情介绍",
    sec_key_specs: "核心规格参数",
    btn_back_catalog: "返回房源列表",
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
  "airbnb_id": "1579594420361094986",
  "id": "PVC-V101",
  "slug": "pvc-villa-suthida-luxury-pool-rawai-4br",
  "title": "Villa Suthida Private Pool Residence Rawai",
  "type": "Villa",
  "purpose": "rent",
  "district": "Rawai",
  "bedrooms": 4,
  "bathrooms": 4.5,
  "guests": 8,
  "beds": 4,
  "price_thb": 145000,
  "price": 145000,
  "building_area": 360,
  "land_area": 450,
  "private_pool": true,
  "common_pool": false,
  "private_parking": true,
  "sea_view": false,
  "rating": 4.71,
  "review_count": 24,
  "description": "Spectaculaire villa privée de 4 chambres située dans le quartier résidentiel paisible de Rawai. Dotée d'une vaste piscine privée de 10m, d'un salon ouvert baigné de lumière naturelle, d'une cuisine américaine entièrement équipée et de 4 suites parentales climatisées avec salles de bains attenantes. Service de conciergerie VIP et entretien inclus.",
  "amenities": [
    "Piscine Privée",
    "Wi-Fi Fibre 500 Mbps",
    "Climatisation Intégrale",
    "Cuisine Équipée",
    "Parking Privé Couvert",
    "Smart TV 65\"",
    "Terrasse Tropicale",
    "Ménage Régulier",
    "Conciergerie 24/7"
  ],
  "images": [
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/f0be65cb-d201-46dd-8c45-80f1f1931d5c.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/50aeb69a-85c1-4c69-9734-e37a493e9c7b.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/572164ba-d942-4ae9-b859-6e8f45623968.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/09ee2cb0-d83e-488d-9916-d1b869a529eb.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/73d42ce5-f0df-412b-9cbf-8a27dc9296e4.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/7c4e806f-52e5-44ae-b01c-31946500f3d8.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/5517d937-e84b-42bd-8a62-dddec456dec2.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/8141b192-3f07-4a93-95fc-1e0adac4e278.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/da900233-c405-4dd8-9067-645f1f03e8e3.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/0fa30e12-70d6-4e26-ae27-7ae15a79db90.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/feea2324-1ef6-4edc-9dca-7cfe0f223ee6.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/524fbf52-fe6d-496d-97f7-8971051cb54e.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/f3df7aa8-3fa6-4bf1-a48d-3775317cb8f5.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/9b7bfd96-3a67-4ef8-a03a-878350354679.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/66f8b14b-4a83-46a2-9dab-974e14bcb95c.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/fe3dab73-51da-46c5-bafa-34fbaa5e513a.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/7d9426c4-e225-4914-845f-849851e304fa.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/1ba362df-fa18-4ac1-8c41-1d3480749343.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/a4985b0e-12a5-4f19-8aaa-30c1712759e4.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/04c3f761-3fdf-4385-a5a0-1a4c20787587.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/7cd74b7b-7aef-49bc-8945-c86382cc5ee5.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/20923623-79e4-4fa4-a8c1-e0c558d9fe3e.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/e1421619-0969-4b69-a5a0-eeaac211319d.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/a545e186-e487-470f-9738-a45730d7f4be.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/cd9be6c4-d021-4e86-ad07-340529241dbc.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/ce398acc-ea26-450c-87a8-3695b85141b0.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/64a4589e-84d5-4ea5-ba4b-64506ef75f8a.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/26a896c7-3291-428e-8a56-d324eaee12bf.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/1f902f70-0eb4-4c61-ab1b-978c9e80fcbf.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/1087dcad-72b8-4bda-a8c6-740ecd300d24.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/6ccd8d83-06f0-4409-b8b9-7b12d3ae8990.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/f7bb6d0a-785a-4be7-9f9d-cf202e395d2e.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/307e0307-4fe5-4334-99a9-a1c2e5e5ba71.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/345c8a41-a9d0-4420-b32a-d7879fb8b33c.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/8f6df5fd-a27f-40ad-a52d-cf282eb7cc44.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/685c989e-1ae3-4885-b0e0-f4c3cb86eb5f.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/8cbf60e0-ec24-45bc-a58d-f716fd349551.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/71979f67-fd1f-40c1-9707-4af60e08fbc0.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/82820099-14fe-40e8-9970-4d673570e07d.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/dc7744e8-2ce1-4564-8906-8edfe82fe7b3.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/8813f135-3d9f-458b-af1f-b559f62967f3.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/f1a5f8a9-92d8-4634-864d-93d3cb0850c1.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/3770256c-5487-412a-8d8f-0193d5c0224b.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/03b6d02f-e965-4899-b604-358fb4e5a613.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/61b46399-472d-49a1-aeb0-9dd4513bc3fa.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/12d2d391-e446-4255-8b34-5b655f5fc428.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/7718c2cb-527f-4054-93bc-45d27bb08060.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/f217cd28-7eb9-4d4f-9d5a-13c8e98bd3e3.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/f1b7fd69-05e7-414e-91b7-baa5f0ffeb09.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/002fac00-726d-4aee-b912-00defdba8c56.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/5f96616e-4cb1-42dc-83cf-a05698326bea.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/d78505ee-bc0b-401b-855e-3eb8f32a0207.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/a87c0506-57a7-4b38-981d-4689eebfb8d2.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/ebe0c8dc-8cb7-46c2-a5e7-0df8c65bc7be.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/dd073153-3255-403c-9644-7ee51310542b.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/530fb00e-3fda-4381-b1cb-d1e655f66d46.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/2c202cf8-78f5-4729-9d16-950ad5d07c3b.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/43d75dff-759d-4026-879d-c383dc01760a.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/0c5c0bc3-b9b4-4f12-8a63-a128fa6d20e7.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/646c49da-46d0-403e-9ca5-d7a1e390ae16.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/ba9e026a-6708-4db7-9c18-7528743beae0.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/372e8f94-aa12-46d2-8baf-9fb391a31975.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/af107039-6d3a-4ba8-b975-de439bce1728.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/68075248-c261-430c-8117-e01a28e9cb13.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/f496820d-09bc-4c19-bc21-49b2c512bdda.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/02d32d97-c9f3-403a-8b61-557fe569b772.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/f3619796-92c8-4638-a858-c6061680a5aa.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/5ec96426-a4b3-4e8b-a7ba-81b47180593a.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/c71dfd49-a45f-4dbc-b049-cd37adc95055.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/5f50aa83-b510-4568-bafa-807eb2671b17.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/e170d57f-8f99-40f5-b564-4a0d0c3bcbf0.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/bc47dfb9-85cc-481f-b4e0-7e6a13249a66.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/b8d739e9-b839-4be8-90cc-994af242a8ce.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/352e4d0d-a05a-44ae-bf95-511b52e407d2.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/adab9a3b-6d97-43bd-884f-402885323bcf.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/55486162-1d2a-4166-9336-4ca571d2d60f.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/4702b461-4253-4584-999b-00a8fb2119fc.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/21d42244-ed8d-449a-a28c-c24480f4eb48.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/f1b78d07-cc63-482f-bf62-903c1cc6803c.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/011e8e0b-c90e-4e2f-af71-f140a68ce9d7.jpeg"
  ],
  "image": "https://a0.muscache.com/im/pictures/hosting/Hosting-1579594420361094986/original/f0be65cb-d201-46dd-8c45-80f1f1931d5c.jpeg",
  "reviews": []
},
{
  "airbnb_id": "913284177871748196",
  "id": "PVC-V102",
  "slug": "pvc-villa-nikita-grand-estate-rawai-7br",
  "title": "Villa Nikita Grand Estate & Private Pool Rawai",
  "type": "Villa",
  "purpose": "rent",
  "district": "Rawai",
  "bedrooms": 7,
  "bathrooms": 7.5,
  "guests": 14,
  "beds": 7,
  "price_thb": 280000,
  "price": 280000,
  "building_area": 650,
  "land_area": 900,
  "private_pool": true,
  "common_pool": false,
  "private_parking": true,
  "sea_view": false,
  "rating": 4.6,
  "review_count": 18,
  "description": "Propriété d'exception de 7 chambres privées idéale pour les grands groupes, familles et séjours haut de gamme à Phuket. Immense terrasse avec piscine privée centrale, espace barbecue lounge, salons intérieurs et extérieurs spacieux, et 7 suites luxueuses indépendantes offrant un confort absolu.",
  "amenities": [
    "Grande Piscine Privée",
    "Wi-Fi Haut Débit",
    "Climatisation dans chaque pièce",
    "Espace Barbecue Lounge",
    "Parking Multi-Véhicules",
    "Cuisine Chef Équipée",
    "Jardin Tropical Privatif",
    "Conciergerie Dédiée"
  ],
  "images": [
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/d8ab3bc7-f8b6-48e9-b3ed-a1302567a48d.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/a292e291-bbb0-42ed-ac14-4a1614f9db77.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/81d1a7f0-ae4f-4b81-9228-dbfb75f59518.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/e0e55c7b-c21f-416f-bc85-66d220c6eb09.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/15e4d6b5-7fd7-4d8a-a74f-459c5b7cc802.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284177871748196/original/9abab8e5-549c-4420-97ee-951c3348020e.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/1b6f2a1d-1d39-4cd1-8653-5afa1bfb0ab1.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/34f0c508-cc58-4720-ba9d-b2b0aa607902.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/e2e2081f-7194-4e97-b09d-1f4989a18e56.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/5fd9cdea-f7cc-40a2-98be-213c8a89dbff.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/6ef576e0-3f70-41fc-8978-e8cd8ff260ea.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/2a8b082a-0324-4229-a738-ef9ffba2b41a.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/935d4b61-030c-4fa4-9fed-7da4f1ee51cc.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/2d112124-864a-48c9-9fe5-2fb119cbc607.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/0c780771-5577-4ef7-92fb-0f79615ab4e2.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/b4e3625d-38a2-48cd-8cb6-00122d856bfb.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284177871748196/original/b05c1467-b30d-41ef-8314-7e446ce7cde7.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284177871748196/original/43b1aaf5-2e0b-4a77-8b7c-b3e2ef51d9b0.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284177871748196/original/ac50e0e6-f8e8-4db9-ac00-42dee8f0aa64.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284177871748196/original/1cfe7af0-b0a5-433a-b886-fc2e698de9a1.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284177871748196/original/484020d7-d6ad-45c1-803c-227129742438.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284177871748196/original/07e30735-d70b-4d61-a2b2-577823163a9d.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/1aac478f-a50e-4be5-a498-7d94e2c7d990.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/0ee2a711-f9ca-4600-a635-287aa9f46a2f.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/3e5f35ce-1254-4da2-80a4-cf5254503aa4.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/5dd38b34-c708-41f5-ae02-17d99053f506.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/edece7b4-60af-43f2-bb7d-d920827d8e3c.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/cfabfc59-4264-40aa-ac20-acd31fc0e069.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284177871748196/original/2ae1fc7b-9b3b-4fb3-9065-cfedbe06ac53.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284177871748196/original/9d2d7c6a-f4c4-43bd-b662-3bc9946a521c.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284177871748196/original/d49200f0-7979-4c69-911a-6156b928ef41.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284177871748196/original/4f8f949d-76cd-4a35-8659-9f8f65e3cca6.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284177871748196/original/4559811f-d2e9-4354-bd79-e6b897b66417.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284177871748196/original/0d8d3f4a-48a7-417c-8436-be74799badeb.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284177871748196/original/98f4e1ef-6b6a-4022-8a94-1f9f4b00a409.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284177871748196/original/5c2e8db7-f298-4072-a421-1274c62e13de.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284177871748196/original/2c11ff49-7d49-486f-8c02-4fcb3c12ffe7.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/60743929-f4ec-432c-8dfb-cd4109f80eb0.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/394969c6-9fb8-4e6e-9905-2311c64ef632.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/31023602-24ac-4e52-8041-abd3a97da3da.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284177871748196/original/da3a8b4b-4882-422e-b42d-f70133cc39c2.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284177871748196/original/5b1975c4-524a-4c02-b87e-0df5ea573302.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284177871748196/original/c7c445fd-e8d1-4052-a0b7-7bb8e6a9173b.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/0b637e07-c514-4cd6-8a53-edddf73a815a.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/1659b284-ff93-42c7-8856-49f08e1253dc.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/7c4d22f9-df74-4a8d-8d55-9363bed60376.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/27fc2926-633f-45d5-ba73-2c9ca197a000.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/d0b8238b-d256-47a8-b2dc-f624aab535c6.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/3c4d83b2-6ae3-4680-94aa-7e2397e82520.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/2de99a66-59a6-46a7-b8b2-67db0b486970.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284177871748196/original/70c325fb-aa30-45ac-a23a-1b22e3035690.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/b2acf837-8a2f-4dbb-916c-6195598d53c2.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/c7e0e3bf-844d-4d06-b75f-1e174a5270d4.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/25d68303-869e-433b-99bf-c26be8775c70.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/17111a1c-19d4-477f-80eb-2ff6e95ef36d.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/2e4ecf42-6ea4-4900-bbc0-92b205371353.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/afff9ada-8d35-4d9b-802c-b06ff93bb00a.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284177871748196/original/038b43e3-6da4-4e84-b4d1-595c49b67ccc.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/3abe2b53-8dc2-47f9-b97e-0a264e158616.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/2fb0096b-f89f-4cc8-a0d2-6019f63b0e01.jpeg"
  ],
  "image": "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTc3ODcxNzQ4MTk2/original/d8ab3bc7-f8b6-48e9-b3ed-a1302567a48d.jpeg",
  "reviews": []
},
{
  "airbnb_id": "913284172858139897",
  "id": "PVC-V103",
  "slug": "pvc-villa-axel-contemporary-pool-rawai-2br",
  "title": "Villa Axel Contemporary 2-Bedroom Pool Villa",
  "type": "Villa",
  "purpose": "rent",
  "district": "Rawai",
  "bedrooms": 2,
  "bathrooms": 2,
  "guests": 4,
  "beds": 2,
  "price_thb": 85000,
  "price": 85000,
  "building_area": 180,
  "land_area": 250,
  "private_pool": true,
  "common_pool": false,
  "private_parking": true,
  "sea_view": false,
  "rating": 5,
  "review_count": 12,
  "description": "Élégante villa contemporaine de 2 chambres avec piscine privée sans vis-à-vis. Finitions soignées, mobilier design en bois massif, cuisine moderne tout confort, literie premium king-size et proximité immédiate des plages de Nai Harn et Rawai.",
  "amenities": [
    "Piscine Privée",
    "Wi-Fi Haut Débit",
    "Cuisine Américaine",
    "Climatisation Silencieuse",
    "Parking Privé",
    "Terrasse Bain de Soleil",
    "Service de Ménage"
  ],
  "images": [
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTcyODU4MTM5ODk3/original/78ba4f6d-9c56-44af-9253-4ea50115bb2f.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284172858139897/original/98f0c80e-1873-444b-824f-9e32fc97a534.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTcyODU4MTM5ODk3/original/daba6185-741e-4475-bd6d-4fce16af3741.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTcyODU4MTM5ODk3/original/4743f6f1-7f37-499a-97da-db116faff525.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTcyODU4MTM5ODk3/original/de96d819-32d8-4023-88c8-5cd567d5f8aa.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTcyODU4MTM5ODk3/original/902e6eb1-b844-471d-ae95-453a9ff2e79f.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTcyODU4MTM5ODk3/original/a13fcd4a-5d4b-427a-9eab-7f6728acc6ff.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTcyODU4MTM5ODk3/original/28361b73-2de5-407a-8077-10398a883456.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284172858139897/original/b411e529-af94-4d3b-bf7c-7d710fcef318.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTcyODU4MTM5ODk3/original/29070d72-9177-446e-8d4d-6e0ab562772f.jpeg"
  ],
  "image": "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTcyODU4MTM5ODk3/original/78ba4f6d-9c56-44af-9253-4ea50115bb2f.jpeg",
  "reviews": []
},
{
  "airbnb_id": "1241619941876650166",
  "id": "PVC-V104",
  "slug": "pvc-villa-nils-tropical-pool-rawai-2br",
  "title": "Villa Nils Tropical Oasis 2-Bedroom Pool Villa",
  "type": "Villa",
  "purpose": "rent",
  "district": "Rawai",
  "bedrooms": 2,
  "bathrooms": 2,
  "guests": 4,
  "beds": 2,
  "price_thb": 80000,
  "price": 80000,
  "building_area": 170,
  "land_area": 240,
  "private_pool": true,
  "common_pool": false,
  "private_parking": true,
  "sea_view": false,
  "rating": 4.8,
  "review_count": 15,
  "description": "Charmante villa tropicale de 2 chambres avec piscine privée entourée de végétation luxuriante. Atmosphère sereine, espace de vie ouvert sur l'extérieur, chambres climatisées et accès rapide aux commerces et restaurants réputés de Rawai.",
  "amenities": [
    "Piscine Privée",
    "Jardin Tropical",
    "Wi-Fi Fibre",
    "Cuisine Équipée",
    "Smart TV",
    "Parking Privé",
    "Assistance Concierge"
  ],
  "images": [
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1241619941876650166/original/4db46a88-5ae6-496d-b90c-9707ae61925c.png",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTI0MTYxOTk0MTg3NjY1MDE2Ng%3D%3D/original/f4fcd58d-a237-4336-9c59-8b2a4caefc77.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTI0MTYxOTk0MTg3NjY1MDE2Ng%3D%3D/original/44a76da4-0c10-469a-be3b-61cc5fd8c029.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1241619941876650166/original/9d2e3d19-804c-426e-9ca9-203849a77dcd.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTI0MTYxOTk0MTg3NjY1MDE2Ng%3D%3D/original/b0eedb30-e9a4-4554-a5c1-e9269cd71d17.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1241619941876650166/original/6cb67414-f6b5-439d-bdc4-d0c1293873b3.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1241619941876650166/original/e85ef34f-9307-4244-8df7-f12b285750c4.png"
  ],
  "image": "https://a0.muscache.com/im/pictures/hosting/Hosting-1241619941876650166/original/4db46a88-5ae6-496d-b90c-9707ae61925c.png",
  "reviews": []
},
{
  "airbnb_id": "1269151014884064259",
  "id": "PVC-A105",
  "slug": "pvc-suthida-boutique-resort-suite-rawai",
  "title": "Suthida Boutique Suite & Tropical Pool Resort",
  "type": "Appartement",
  "purpose": "rent",
  "district": "Rawai",
  "bedrooms": 1,
  "bathrooms": 1,
  "guests": 2,
  "beds": 1,
  "price_thb": 38000,
  "price": 38000,
  "building_area": 55,
  "land_area": 0,
  "private_pool": false,
  "common_pool": true,
  "private_parking": true,
  "sea_view": false,
  "rating": 5,
  "review_count": 32,
  "description": "Suite hôtelière haut de gamme au sein d'un resort intimiste à quelques minutes du front de mer de Rawai. Grande piscine lagon commune, chambre spacieuse avec literie de luxe, balcon privé avec vue jardin et service de conciergerie.",
  "amenities": [
    "Piscine Lagon",
    "Wi-Fi Inclus",
    "Climatisation",
    "Balcon Privatif",
    "Réfrigérateur & Bouilloire",
    "Service Hôtelier",
    "Parking Résidence"
  ],
  "images": [
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTI2OTE1MTAxNDg4NDA2NDI1OQ%3D%3D/original/c51f55c3-0ff8-454b-aa8e-3a98785e3a88.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTI2OTE1MTAxNDg4NDA2NDI1OQ%3D%3D/original/0c5e6bc4-ad4f-44e5-9b4f-d22c657fc820.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTI2OTE1MTAxNDg4NDA2NDI1OQ%3D%3D/original/627add14-506b-4eab-b667-397c826fa1f6.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTI2OTE1MTAxNDg4NDA2NDI1OQ%3D%3D/original/513f5eb8-88cd-44f6-bda1-77b5fb30f891.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTI2OTE1MTAxNDg4NDA2NDI1OQ%3D%3D/original/fc516f23-6557-46f4-959a-33c96c1019fc.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1269151014884064259/original/d4fd2594-a791-400d-bb1c-dd2b83713a00.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1269151014884064259/original/284cf4cc-ae57-432a-8a36-e819ae04506f.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1269151014884064259/original/70b01e58-69e7-49d9-a84b-cf63d6276a10.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTI2OTE1MTAxNDg4NDA2NDI1OQ%3D%3D/original/d306ba35-918d-4b06-b48f-0eaf4db2d971.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1269151014884064259/original/42e78612-fab9-48d6-9966-65302c25b837.png",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1269151014884064259/original/965a5827-5541-4473-8642-89b1292270d7.png",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1269151014884064259/original/b3bda343-fe93-4448-aa2a-11cf50f7e059.png",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1269151014884064259/original/dd97b7a5-43d5-4ddd-a275-c66ec33e3a2f.png",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1269151014884064259/original/c45bbc6c-904b-48f2-ba0a-c4e7a6cee39d.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1269151014884064259/original/4611eca2-50af-4d06-a6cf-5ec74fd8e6ec.png",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1269151014884064259/original/a85df31e-a594-42ee-b654-9dd344f6a64c.png",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1269151014884064259/original/f33cb04e-9eb7-4579-bb5f-36aa3d43f212.png",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1269151014884064259/original/a132059d-947e-40fe-b754-bdc23bdd3657.png",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1269151014884064259/original/4b6fb1a4-bb87-4967-9d3c-15c6b2855cc1.png",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1269151014884064259/original/8faf6f03-7145-455e-b32d-5beb9184ade8.png",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1269151014884064259/original/c997bba6-4e35-4028-b258-8734a0826e9e.png",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1269151014884064259/original/f26c4a97-5a8c-4136-a081-05d318e4f922.png",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1269151014884064259/original/83871de0-5d27-4c2c-947e-2f759a369808.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1269151014884064259/original/ded89998-724d-4cd0-87b8-4978d4371513.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1269151014884064259/original/c55bbe20-40f7-487f-8de7-eb7d0b8d67cc.png"
  ],
  "image": "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTI2OTE1MTAxNDg4NDA2NDI1OQ%3D%3D/original/c51f55c3-0ff8-454b-aa8e-3a98785e3a88.jpeg",
  "reviews": []
},
{
  "airbnb_id": "913284184104701231",
  "id": "PVC-A106",
  "slug": "pvc-rawai-suthida-deluxe-apartment-1br",
  "title": "Rawai Suthida Deluxe 1-Bedroom Apartment",
  "type": "Appartement",
  "purpose": "rent",
  "district": "Rawai",
  "bedrooms": 1,
  "bathrooms": 1,
  "guests": 2,
  "beds": 1,
  "price_thb": 32000,
  "price": 32000,
  "building_area": 50,
  "land_area": 0,
  "private_pool": false,
  "common_pool": true,
  "private_parking": true,
  "sea_view": false,
  "rating": 4.85,
  "review_count": 19,
  "description": "Appartement contemporain tout confort idéal pour les séjours mensuels ou longue durée à Rawai. Cuisine aménagée, coin salon chaleureux, chambre séparée et accès direct aux espaces extérieurs de détente.",
  "amenities": [
    "Piscine Commune",
    "Wi-Fi Rapide",
    "Cuisine Équipée",
    "Climatisation",
    "Lave-Linge",
    "Terrasse",
    "Parking"
  ],
  "images": [
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTg0MTA0NzAxMjMx/original/112e667b-8ee9-4223-a415-80879d678686.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTg0MTA0NzAxMjMx/original/3e86e9bb-c242-416c-9064-655c3da19605.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284184104701231/original/fa79a41b-f155-43f4-92a1-30b0cdd892fa.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTg0MTA0NzAxMjMx/original/0bcf1ea8-4b1a-4550-8d41-c9ea44e2a96f.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTg0MTA0NzAxMjMx/original/bfda403d-1bfe-4829-b051-5640de7b3947.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284184104701231/original/e9dfd877-38fa-4874-aae0-16c5c796f819.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTg0MTA0NzAxMjMx/original/dab55d55-fbbb-4b5c-bc53-15f5211205f0.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284184104701231/original/f1674861-d544-441e-ba11-6186d8bdd1a8.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTg0MTA0NzAxMjMx/original/270a7031-fb09-4c45-805d-883c1467cf3b.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284184104701231/original/78deba1a-85e2-4308-b497-64c4a75146d6.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTg0MTA0NzAxMjMx/original/0a47111c-99bf-49fb-90ae-a2d2f357a483.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284184104701231/original/09573326-92d4-49c7-a9b9-08e257af5b97.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTg0MTA0NzAxMjMx/original/295174f1-4235-4bb8-897f-c12673da1f48.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTg0MTA0NzAxMjMx/original/c0782d78-0bf5-4bf9-81f7-dcbb61afbfa4.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284184104701231/original/14bb64e3-899f-4e5e-b0da-43eb54f5f0eb.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTg0MTA0NzAxMjMx/original/dbeeb221-af85-4749-a9e8-303f06a7d160.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284184104701231/original/c9948729-c7b3-4075-a497-3540603dd9dd.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTg0MTA0NzAxMjMx/original/75a32644-b483-4562-b79b-eb4005f91015.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284184104701231/original/b41a6f4a-c86a-4a55-89e1-ce125e539918.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTg0MTA0NzAxMjMx/original/108024c4-286b-4320-a37e-5d4433e62b7c.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284184104701231/original/24faebdd-ef6c-40c1-a95b-084cd387e0ed.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284184104701231/original/decc3927-5c81-401b-a2ec-59f0ee441c10.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-913284184104701231/original/f554fad7-8b2f-4551-b91c-1d708c787719.jpeg"
  ],
  "image": "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMjg0MTg0MTA0NzAxMjMx/original/112e667b-8ee9-4223-a415-80879d678686.jpeg",
  "reviews": []
},
{
  "airbnb_id": "1464916760037970834",
  "id": "PVC-A107",
  "slug": "pvc-grape-modern-residence-apartment-rawai",
  "title": "The Grape Residence Modern Apartment Rawai",
  "type": "Appartement",
  "purpose": "rent",
  "district": "Rawai",
  "bedrooms": 1,
  "bathrooms": 1,
  "guests": 2,
  "beds": 1,
  "price_thb": 30000,
  "price": 30000,
  "building_area": 48,
  "land_area": 0,
  "private_pool": false,
  "common_pool": true,
  "private_parking": true,
  "sea_view": false,
  "rating": 4.9,
  "review_count": 8,
  "description": "Appartement moderne et épuré offrant un cadre de vie calme et agréable au cœur de Rawai. Équipements récents, propreté irréprochable, connexion internet haut débit et proximité des commodités.",
  "amenities": [
    "Piscine",
    "Wi-Fi Haut Débit",
    "Climatisation",
    "Cuisine Compacte",
    "Balcon",
    "Parking"
  ],
  "images": [
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQ2NDkxNjc2MDAzNzk3MDgzNA==/original/51ebce22-a12a-44de-84bc-8f476371f72e.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQ2NDkxNjc2MDAzNzk3MDgzNA==/original/3a4a1aec-38c9-487d-a0b1-31a145810efc.png",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1464916760037970834/original/c48d2a58-51bb-4740-8042-0774e391c69d.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQ2NDkxNjc2MDAzNzk3MDgzNA==/original/8604c927-1b80-46b9-8177-fa569a0f34e8.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1464916760037970834/original/658a5e7f-0675-41e4-a18a-a9c60c6e1349.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1464916760037970834/original/70dad541-bbee-43cb-be18-0f4ac4574df3.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1464916760037970834/original/ce8b0942-f599-4cde-9735-e013c2e7ebe1.jpeg"
  ],
  "image": "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQ2NDkxNjc2MDAzNzk3MDgzNA==/original/51ebce22-a12a-44de-84bc-8f476371f72e.jpeg",
  "reviews": []
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
      "/public/images/properties/pvc-1025_photo_0.webp",
      "/public/images/properties/pvc-1025_photo_1.webp",
      "/public/images/properties/pvc-1025_photo_2.webp",
      "/public/images/properties/pvc-1025_photo_3.webp"
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
      "/public/images/properties/pvc-1026_photo_0.webp",
      "/public/images/properties/pvc-1026_photo_1.webp",
      "/public/images/properties/pvc-1026_photo_2.webp",
      "/public/images/properties/pvc-1026_photo_3.webp"
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
      "/public/images/properties/pvc-1027_photo_0.webp",
      "/public/images/properties/pvc-1027_photo_1.webp",
      "/public/images/properties/pvc-1027_photo_2.webp",
      "/public/images/properties/pvc-1027_photo_3.webp"
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
      "/public/images/properties/pvc-1028_photo_0.webp",
      "/public/images/properties/pvc-1028_photo_1.webp",
      "/public/images/properties/pvc-1028_photo_2.webp",
      "/public/images/properties/pvc-1028_photo_3.webp"
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
      "/public/images/properties/pvc-1029_photo_0.webp",
      "/public/images/properties/pvc-1029_photo_1.webp",
      "/public/images/properties/pvc-1029_photo_2.webp",
      "/public/images/properties/pvc-1029_photo_3.webp"
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
      "/public/images/properties/pvc-1030_photo_0.webp",
      "/public/images/properties/pvc-1030_photo_1.webp",
      "/public/images/properties/pvc-1030_photo_2.webp",
      "/public/images/properties/pvc-1030_photo_3.webp"
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
      "/public/images/properties/pvc-1031_photo_0.webp",
      "/public/images/properties/pvc-1031_photo_1.webp",
      "/public/images/properties/pvc-1031_photo_2.webp",
      "/public/images/properties/pvc-1031_photo_3.webp"
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
      "/public/images/properties/pvc-1032_photo_0.webp",
      "/public/images/properties/pvc-1032_photo_1.webp",
      "/public/images/properties/pvc-1032_photo_2.webp",
      "/public/images/properties/pvc-1032_photo_3.webp"
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
      "/public/images/properties/pvc-1033_photo_0.webp",
      "/public/images/properties/pvc-1033_photo_1.webp",
      "/public/images/properties/pvc-1033_photo_2.webp",
      "/public/images/properties/pvc-1033_photo_3.webp"
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
      "/public/images/properties/pvc-1034_photo_0.webp",
      "/public/images/properties/pvc-1034_photo_1.webp",
      "/public/images/properties/pvc-1034_photo_2.webp",
      "/public/images/properties/pvc-1034_photo_3.webp"
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
      "/public/images/properties/pvc-1035_photo_0.webp",
      "/public/images/properties/pvc-1035_photo_1.webp",
      "/public/images/properties/pvc-1035_photo_2.webp",
      "/public/images/properties/pvc-1035_photo_3.webp"
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
      "/public/images/properties/pvc-1036_photo_0.webp",
      "/public/images/properties/pvc-1036_photo_1.webp",
      "/public/images/properties/pvc-1036_photo_2.webp",
      "/public/images/properties/pvc-1036_photo_3.webp"
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
      "/public/images/properties/pvc-1037_photo_0.webp",
      "/public/images/properties/pvc-1037_photo_1.webp",
      "/public/images/properties/pvc-1037_photo_2.webp",
      "/public/images/properties/pvc-1037_photo_3.webp"
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
    guests: Number(p.guests) || (Number(p.bedrooms) ? Number(p.bedrooms) * 2 : 2),
    beds: Number(p.beds) || Number(p.bedrooms) || 1,
    rating: Number(p.rating) || 4.9,
    review_count: Number(p.review_count) || (Array.isArray(p.reviews) ? p.reviews.length : 12),
    reviews: Array.isArray(p.reviews) ? p.reviews : [],
    amenities: Array.isArray(p.amenities) ? p.amenities : [],
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

const PVC_DATA_VERSION = '20260822_v24_strict_airbnb_controls';

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

// Dynamic translation cache to avoid duplicate API calls
const DYNAMIC_TRANSLATION_CACHE = {};

async function translateDynamicText(text, targetLang = currentLang) {
  if (!text || typeof text !== 'string') return text;
  const clean = text.trim();
  if (!clean || targetLang === 'en') return clean;

  const cacheKey = `${targetLang}:${clean}`;
  if (DYNAMIC_TRANSLATION_CACHE[cacheKey]) {
    return DYNAMIC_TRANSLATION_CACHE[cacheKey];
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${encodeURIComponent(targetLang)}&dt=t&q=${encodeURIComponent(clean)}`;
    const res = await fetch(url);
    if (!res.ok) return clean;
    const json = await res.json();
    if (json && Array.isArray(json[0])) {
      const translated = json[0].map(item => item[0]).join('');
      if (translated && translated.trim()) {
        DYNAMIC_TRANSLATION_CACHE[cacheKey] = translated.trim();
        return translated.trim();
      }
    }
    return clean;
  } catch (e) {
    return clean;
  }
}

/**
 * Translates on-the-fly all rendered property cards on the page (index, catalog)
 */
function translateOnTheFlyProperties(targetLang = currentLang) {
  if (targetLang === 'en') return;

  const titles = document.querySelectorAll('.prop-card-title');
  titles.forEach(el => {
    const original = el.getAttribute('data-original-title') || el.textContent.trim();
    if (!el.getAttribute('data-original-title')) el.setAttribute('data-original-title', original);
    translateDynamicText(original, targetLang).then(translated => {
      if (translated && el) el.textContent = translated;
    });
  });

  const descs = document.querySelectorAll('.prop-card-desc');
  descs.forEach(el => {
    const original = el.getAttribute('data-original-desc') || el.textContent.trim();
    if (!el.getAttribute('data-original-desc')) el.setAttribute('data-original-desc', original);
    translateDynamicText(original, targetLang).then(translated => {
      if (translated && el) el.textContent = translated;
    });
  });
}

function renderPropertyCard(p) {
  if (!p) return '';
  const dict = getI18n();
  const coverImage = (Array.isArray(p.images) && p.images[0]) ? p.images[0] : (p.image || '/public/images/villa_1.png');
  const formattedPrice = formatPrice(p.price_thb || p.price);
  const isRent = (p.purpose === 'rent');
  const purposeBadge = isRent ? (dict.lbl_purpose_rent || 'Rent') : (dict.lbl_purpose_buy || 'Buy');

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
          <h3 class="prop-card-title font-bold text-lg text-[#110D09] group-hover:text-[#DF921B] transition-colors line-clamp-1 mb-2" data-original-title="${p.title}">
            ${p.title}
          </h3>
          <p class="prop-card-desc text-xs text-zinc-500 line-clamp-2 mb-4 leading-relaxed" data-original-desc="${p.description || ''}">
            ${p.description || 'Prestige property with luxury amenities.'}
          </p>
        </div>

        <div>
          <div class="grid grid-cols-3 gap-2 py-3 border-t border-b border-zinc-100 mb-4 text-center text-xs text-zinc-600">
            ${p.bedrooms ? `<div class="flex flex-col"><span class="font-bold text-[#110D09]">${p.bedrooms}</span><span class="text-[10px] text-zinc-400 uppercase">${dict.lbl_beds || 'Beds'}</span></div>` : ''}
            ${p.bathrooms ? `<div class="flex flex-col"><span class="font-bold text-[#110D09]">${p.bathrooms}</span><span class="text-[10px] text-zinc-400 uppercase">${dict.lbl_baths || 'Baths'}</span></div>` : ''}
            ${p.building_area ? `<div class="flex flex-col"><span class="font-bold text-[#110D09]">${p.building_area} m²</span><span class="text-[10px] text-zinc-400 uppercase">${dict.lbl_area || 'Area'}</span></div>` : ''}
          </div>

          <div class="flex items-center justify-between pt-1">
            <div>
              <span class="text-[11px] uppercase font-bold text-zinc-400 block tracking-wider">${dict.lbl_price || 'Price'}</span>
              <span class="text-base font-extrabold text-[#DF921B]">${formattedPrice}</span>
            </div>
            <a href="/property-detail.html?id=${p.id}" class="btn-outline-gold text-xs py-2 px-4 rounded-xl font-bold">
              ${dict.lbl_details || 'Details'} →
            </a>
          </div>
        </div>
      </div>
    </article>
  `;
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
