import { SITE_CONFIG, HONORIFICS } from "@/constants/site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_CONFIG.baseUrl}/images/gima-logo.jpg`,
      width: 512,
      height: 512,
    },
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Station Road, Radha Nagar, Chromepet",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      postalCode: "600044",
      addressCountry: "IN",
    },
    sameAs: Object.values(SITE_CONFIG.social),
    sport: "Karate",
    foundingDate: "1998",
  };
}

function geoFromMapEmbed(mapEmbed: string) {
  const match = mapEmbed.match(/!2d([\d.-]+)!3d([\d.-]+)/);
  return match
    ? { latitude: parseFloat(match[2]), longitude: parseFloat(match[1]) }
    : { latitude: 12.9516, longitude: 80.1462 };
}

export function localBusinessSchema(branch?: {
  slug: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  mapEmbed: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: branch ? `${SITE_CONFIG.name} — ${branch.name}` : SITE_CONFIG.name,
    url: branch ? `${SITE_CONFIG.baseUrl}/branches#${branch.slug}` : SITE_CONFIG.baseUrl,
    telephone: branch?.phone ?? SITE_CONFIG.phone,
    email: branch?.email ?? SITE_CONFIG.email,
    ...(branch ? {} : { openingHours: "Mo-Sa 06:00-20:00" }),
    address: {
      "@type": "PostalAddress",
      streetAddress: branch?.address ?? "Station Road, Radha Nagar, Chromepet",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      ...(branch ? {} : { postalCode: "600044" }),
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      ...(branch ? geoFromMapEmbed(branch.mapEmbed) : { latitude: 12.9516, longitude: 80.1462 }),
    },
    ...(branch ? {} : { hasMap: "https://maps.google.com/?q=Gurushethra+Institute+of+Martial+Arts,+Chromepet,+Chennai" }),
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Bank Transfer",
    image: `${SITE_CONFIG.baseUrl}/images/gima-logo.jpg`,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_CONFIG.baseUrl },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: `${SITE_CONFIG.baseUrl}${item.url}`,
      })),
    ],
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

function honorificPrefix(name: string): string | undefined {
  const firstWord = name.split(" ")[0]?.replace(/\.$/, "");
  return firstWord && HONORIFICS.includes(firstWord.toLowerCase()) ? firstWord : undefined;
}

export function personSchema(instructor: {
  name: string;
  title: string;
  dan: string;
  bio: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: instructor.name,
    jobTitle: instructor.title,
    ...(honorificPrefix(instructor.name) ? { honorificPrefix: honorificPrefix(instructor.name) } : {}),
    description: instructor.bio,
    affiliation: {
      "@type": "SportsOrganization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
    },
    worksFor: {
      "@type": "SportsOrganization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
    },
    url: `${SITE_CONFIG.baseUrl}/instructor`,
    image: instructor.image
      ? { "@type": "ImageObject", url: instructor.image }
      : { "@type": "ImageObject", url: `${SITE_CONFIG.baseUrl}/images/gima-logo.jpg` },
  };
}

export function eventSchema(event: {
  title: string;
  description: string;
  date: string;
  endDate: string;
  venue: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.date,
    endDate: event.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
    },
    organizer: {
      "@type": "SportsOrganization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
    },
    image: event.image,
  };
}

export function itemListSchema(
  items: { name: string; url: string; description?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: `${SITE_CONFIG.baseUrl}${item.url}`,
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}
