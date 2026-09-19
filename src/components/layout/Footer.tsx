import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { NAV_LINKS } from "@/constants/site";
import { getPrograms } from "@/services/program.service";
import { getBranches } from "@/services/branches.service";
import { getSiteSettings } from "@/services/settings.service";

export async function Footer() {
  const [programs, branches, settings] = await Promise.all([
    getPrograms(),
    getBranches(),
    getSiteSettings(),
  ]);

  return (
    <footer className="bg-[#080808] border-t border-white/6 mt-auto">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Col 1 — Brand + about */}
          <div className="sm:col-span-2 lg:col-span-2 flex flex-col gap-5">
            <Link href="/" aria-label="Home" className="flex items-center gap-3 w-fit">
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src="/images/gima-logo.jpg"
                  alt="GIMA logo"
                  fill
                  sizes="40px"
                  className="object-contain rounded-sm"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading font-black text-white text-sm tracking-wide">
                  GURUSHETHRA
                </span>
                <span className="text-brand-gold text-[8px] font-semibold tracking-[0.18em] uppercase mt-0.5">
                  Institute of Martial Arts
                </span>
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Chennai&apos;s premier Okinawan Goju-Ryu karate academy — building
              champions and character since 1998. 4 training centres across the city.
            </p>

            {/* Contact info */}
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-center gap-2.5 text-gray-400 hover:text-brand-gold transition-colors"
                >
                  <Phone size={13} className="text-brand-gold shrink-0" aria-hidden />
                  {settings.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-2.5 text-gray-400 hover:text-brand-gold transition-colors"
                >
                  <Mail size={13} className="text-brand-gold shrink-0" aria-hidden />
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-gray-400">
                <Clock size={13} className="text-brand-gold shrink-0 mt-0.5" aria-hidden />
                {settings.hours}
              </li>
              <li className="flex items-start gap-2.5 text-gray-400">
                <MapPin size={13} className="text-brand-gold shrink-0 mt-0.5" aria-hidden />
                <span>{settings.address}</span>
              </li>
            </ul>

            {/* Socials */}
            <div className="flex items-center gap-2 mt-1">
              {[
                {
                  href: settings.social.facebook,
                  label: "Facebook",
                  svg: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  ),
                },
                {
                  href: settings.social.instagram,
                  label: "Instagram",
                  svg: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden>
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  ),
                },
                {
                  href: settings.social.youtube,
                  label: "YouTube",
                  svg: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                      <polygon fill="var(--color-brand-background)" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                    </svg>
                  ),
                },
                {
                  href: settings.social.whatsapp,
                  label: "WhatsApp",
                  svg: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                    </svg>
                  ),
                },
              ].filter(({ href }) => href).map(({ href, label, svg }) => (
                <a
                  key={label}
                  href={href ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-gold/15 hover:text-brand-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick links */}
          <div className="flex flex-col gap-5">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Programs */}
          <div className="flex flex-col gap-5">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase">
              Programs
            </h3>
            <ul className="flex flex-col gap-2.5">
              {programs.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/programs/${p.slug}`}
                    className="text-gray-400 text-sm hover:text-brand-gold transition-colors"
                  >
                    {p.title}
                    <span className="text-gray-600 text-xs ml-1.5">({p.ageRange})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Branches + map */}
          <div className="flex flex-col gap-5">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase">
              Our Branches
            </h3>
            <ul className="flex flex-col gap-3">
              {branches.map((b) => (
                <li key={b.id}>
                  <Link
                    href="/branches"
                    className="text-gray-400 text-sm hover:text-brand-gold transition-colors block"
                  >
                    <span className="text-white font-medium text-xs block">{b.name}</span>
                    <span className="text-[11px] leading-relaxed">{b.address}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Map thumbnail */}
            <div className="mt-2 rounded-xl overflow-hidden border border-white/8 aspect-video w-full">
              <iframe
                src={settings.mapEmbed}
                title="GIMA Head Quarters location"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} Gurushethra Institute of Martial Arts. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy-policy"
              className="text-gray-500 text-xs hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 text-xs hover:text-gray-300 transition-colors"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
