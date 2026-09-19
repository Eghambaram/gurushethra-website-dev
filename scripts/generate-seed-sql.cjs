// One-off generator: reads the current static data files and emits
// supabase/migrations/0002_seed.sql. Run with `node scripts/generate-seed-sql.cjs`.
// Safe to delete after the migration is applied once.

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const dataPath = (f) => path.join(ROOT, "src", "data", f);

function str(v) {
  if (v === null || v === undefined) return "NULL";
  return "'" + String(v).replace(/'/g, "''") + "'";
}

function num(v) {
  if (v === null || v === undefined) return "NULL";
  return String(v);
}

function bool(v) {
  return v ? "true" : "false";
}

function textArray(arr) {
  if (!arr || arr.length === 0) return "ARRAY[]::text[]";
  return "ARRAY[" + arr.map(str).join(", ") + "]::text[]";
}

function jsonb(value) {
  return "'" + JSON.stringify(value).replace(/'/g, "''") + "'::jsonb";
}

function dateLit(v) {
  return "'" + v + "'::date";
}

const lines = [];
const say = (s) => lines.push(s);

say("-- GIMA admin CMS — seed data, generated from the current static site content.");
say("-- Run 0001_schema.sql first, then this file.");
say("");

// ── site_settings ──────────────────────────────────────────────────────────
say("insert into site_settings (name, short_name, tagline, phone, phone2, whatsapp, email, address, hours, map_embed, social_facebook, social_instagram, social_youtube, social_whatsapp, default_og_image) values (");
say(`  ${str("Gurushethra Institute of Martial Arts")}, ${str("GIMA")}, ${str("Building Discipline • Confidence • Character")},`);
say(`  ${str("+91 63821 10788")}, ${str("+91 63821 10788")}, ${str("916382110788")}, ${str("gurushethra1991@gmail.com")},`);
say(`  ${str("Sai Dojo, Station Road, Radha Nagar, Chromepet, Chennai – 600044")}, ${str("Classes held Mon – Sun (timings vary by centre)")},`);
say(`  ${str("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5!2d80.1411!3d12.9516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU3JzA1LjgiTiA4MMKwMDgnMjguMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin")},`);
say(`  ${str("https://www.facebook.com/107644411375904/")}, ${str("https://www.instagram.com/gimakarate")}, ${str("https://youtube.com/@gurushethrainstituteofmart7619")}, ${str("https://wa.me/916382110788")},`);
say(`  ${str("/images/og-default.jpg")}`);
say(");");
say("");

// ── hero ────────────────────────────────────────────────────────────────────
const hero = JSON.parse(fs.readFileSync(dataPath("hero.json"), "utf-8"));
const trustBadges = [
  { icon: "ShieldCheck", text: "VII Dan Certified Instructor" },
  { icon: "Trophy", text: "International Champions" },
  { icon: "Users", text: "All Ages Welcome" },
];
say("insert into hero (headline_lines, sub_copy, cta_primary_label, cta_primary_href, cta_secondary_label, cta_secondary_href, stats, trust_badges, background_image) values (");
say(`  ${textArray(hero.headlineLines)}, ${str(hero.subCopy)},`);
say(`  ${str(hero.ctaPrimary.label)}, ${str(hero.ctaPrimary.href)}, ${str(hero.ctaSecondary.label)}, ${str(hero.ctaSecondary.href)},`);
say(`  ${jsonb(hero.stats)}, ${jsonb(trustBadges)}, ${str(hero.backgroundImage)}`);
say(");");
say("");

// ── about_hero (currently hardcoded in AboutHero.tsx) ───────────────────────
say("insert into about_hero (eyebrow, headline, headline_highlight, body, cta_label, cta_href, image, badge_label, badge_value) values (");
say(`  ${str("About Us")}, ${str("Our Journey")}, ${str("Since 1998")},`);
say(`  ${str("Gurushethra Institute of Martial Arts was born from a single conviction — that the ancient art of Okinawan Goju-Ryu karate could transform ordinary lives. What began as a single dojo in Chennai has grown into Tamil Nadu's most respected martial arts academy, with four centres, hundreds of active students, and a proven record of developing champions at every level.")},`);
say(`  ${str("Discover More")}, ${str("/contact")},`);
say(`  ${str("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgsjX9gfwx2THzuT-sOlyfOCViG0mxwWfv5_jWyHejwwh6akPl93WpB20wTIX8Az_ulFC6gpLuOtwegTZjV3-At3-JV5LyxTkmEFC5RGV5VGyBUxI-0OhXuTO_T4wQJxDUhwerEYe6s59KAO613Jbt45Me639ShS37wvatCOCf8kmWxA9-uBAHx5LJHfrI/s4032/IMG_1357.jpeg")},`);
say(`  ${str("EST.")}, ${str("1998")}`);
say(");");
say("");

// ── instructor ───────────────────────────────────────────────────────────
const instructor = JSON.parse(fs.readFileSync(dataPath("instructor.json"), "utf-8"));
say("insert into instructor (name, title, dan, style, short_bio, bio, bio_extended, image, stats, qualifications, achievements) values (");
say(`  ${str(instructor.name)}, ${str(instructor.title)}, ${str(instructor.dan)}, ${str(instructor.style)},`);
say(`  ${str(instructor.shortBio)},`);
say(`  ${str(instructor.bio)},`);
say(`  ${str(instructor.bioExtended)},`);
say(`  ${str(instructor.image)},`);
say(`  ${jsonb(instructor.stats)}, ${textArray(instructor.qualifications)}, ${textArray(instructor.achievements)}`);
say(");");
say("");

// ── achievements_meta + achievement_entries ─────────────────────────────
const achievements = JSON.parse(fs.readFileSync(dataPath("achievements.json"), "utf-8"));
say(`insert into achievements_meta (stats) values (${jsonb(achievements.stats)});`);
say("");
achievements.recent.forEach((a, i) => {
  say("insert into achievement_entries (year, title, result, medals, description, image, order_index) values (");
  say(`  ${str(a.year)}, ${str(a.title)}, ${str(a.result)}, ${jsonb(a.medals)}, ${str(a.description)}, ${str(a.image)}, ${num(i)}`);
  say(");");
});
say("");

// ── programs ─────────────────────────────────────────────────────────────
const programs = JSON.parse(fs.readFileSync(dataPath("programs.json"), "utf-8"));
programs.forEach((p, i) => {
  say("insert into programs (slug, title, age_range, short_description, description, image, features, duration, schedule, featured, order_index) values (");
  say(`  ${str(p.slug)}, ${str(p.title)}, ${str(p.ageRange)}, ${str(p.shortDescription)},`);
  say(`  ${str(p.description)},`);
  say(`  ${str(p.image)}, ${textArray(p.features)}, ${str(p.duration)}, ${str(p.schedule)}, ${bool(p.featured)}, ${num(i)}`);
  say(");");
});
say("");

// ── team_members (inlined — source is TypeScript, not JSON) ───────────────
const teamMembers = [
  { id: "aasan-saravanan-t", slug: "aasan-saravanan-t", name: "Aasan Saravanan T.", title: "Founder & President", category: "leadership", rank: "VII Dan Black Belt",
    bio: "Aasan Saravanan T. has dedicated more than two decades to the art of Okinawan Goju-Ryu Karate. What began as a personal pursuit grew into a lifelong mission — to preserve traditional martial arts and make world-class training accessible to every student in Chennai, regardless of age or background. Under his leadership, GIMA has grown to four centres and continues to produce champions of both character and competition.",
    credentials: [
      { label: "Okinawan Goju-Ryu Karate-Do", value: "VII Dan Black Belt (Malaysia)" },
      { label: "Silambam", value: "Instructor" },
      { label: "Silver Grade", value: "Madurai" },
      { label: "Education", value: "B.A. Graduate" },
      { label: "Yoga", value: "Diploma in Yoga Teaching (D.Y.T.)" },
    ],
    achievements: [
      "Established GIMA in 1998 — one of Chennai's leading traditional karate academies",
      "Awarded VII Dan Black Belt in Malaysia",
      "Certified Silambam Instructor with Silver Grade distinction",
      "More than two decades of continuous martial arts teaching",
      "Developed structured belt curriculum for children, teens, and adults",
      "Led GIMA students to district, state, and national-level competitions",
    ],
    image: "/images/team/SARAVANANT.jpeg", featured: true,
    stats: [
      { value: 20, suffix: "+", label: "Years Teaching" },
      { value: 7, suffix: "th", label: "Dan Black Belt" },
      { value: 4, suffix: "", label: "Training Centres" },
      { value: 6, suffix: "", label: "Class Categories" },
    ] },
  { id: "sensei-ignatius-m", slug: "sensei-ignatius-m", name: "Sensei Ignatius M.", title: "Vice President", category: "leadership", rank: "II Dan Black Belt",
    bio: null, credentials: [], achievements: [], image: "/images/team/IGNATIUSM.jpeg", featured: false, stats: null },
  { id: "shihan-jaisriram-s", slug: "shihan-jaisriram-s", name: "Shihan Jaisriram S.", title: "Technical Director & General Secretary", category: "technical", rank: "VI Dan Black Belt — Malaysia",
    bio: null,
    credentials: [
      { label: "Okinawa Shorin Ryu Shorin Kankarate & Kobudo Association India", value: "II Dan Black Belt" },
      { label: "KAI", value: "I Dan" },
    ],
    achievements: [], image: "/images/team/placeholder-instructor.png", featured: false, stats: null },
  { id: "shihan-surya-r", slug: "shihan-surya-r", name: "Shihan Surya R.", title: "Chief Instructor", category: "technical", rank: "VI Dan Black Belt — Malaysia",
    bio: null, credentials: [], achievements: ["Gold Medalist", "Coach"], image: "/images/team/placeholder-instructor.png", featured: false, stats: null },
  { id: "sensei-sangeetha-l", slug: "sensei-sangeetha-l", name: "Sensei Sangeetha L.", title: "Chief Examiner", category: "technical", rank: "III Dan Black Belt — Malaysia",
    bio: null, credentials: [], achievements: ["Gold Medalist", "Coach"], image: "/images/team/SANGEETHAL.jpeg", featured: false, stats: null },
  { id: "sensei-niranjana-devi-j", slug: "sensei-niranjana-devi-j", name: "Sensei Niranjana Devi J.", title: "Organization Secretary", category: "administration", rank: "I Dan Black Belt",
    bio: null, credentials: [], achievements: [], image: "/images/team/placeholder-instructor.png", featured: false, stats: null },
  { id: "sensei-yashaswini-s", slug: "sensei-yashaswini-s", name: "Sensei Yashaswini S.", title: "Tournament Secretary", category: "administration", rank: "I Dan Black Belt",
    bio: null, credentials: [], achievements: ["Malaysia Silver Medalist", "Coach"], image: "/images/team/YASHASWINIS.jpeg", featured: false, stats: null },
  { id: "renshi-prithish-b", slug: "renshi-prithish-b", name: "Renshi Prithish B.", title: "Joint Secretary", category: "administration", rank: "V Dan Black Belt — Malaysia",
    bio: null, credentials: [], achievements: ["Gold Medalist", "Coach"], image: "/images/team/PRITHISHB.jpeg", featured: false, stats: null },
  { id: "sensei-tamilvanan-m", slug: "sensei-tamilvanan-m", name: "Sensei Tamilvanan M.", title: "Joint Secretary", category: "administration", rank: "IV Dan Black Belt",
    bio: null, credentials: [], achievements: ["Malaysia Gold Medalist", "Coach"], image: "/images/team/TAMILVANANM.jpeg", featured: false, stats: null },
  { id: "aasan-aaditya-j", slug: "aasan-aaditya-j", name: "Aasan Aaditya J.", title: "Treasurer", category: "administration", rank: "Silambam Black Belt",
    bio: null, credentials: [], achievements: [], image: "/images/team/Aaditya.jpeg", featured: false, stats: null },
  { id: "sensei-yokkesh-s", slug: "sensei-yokkesh-s", name: "Sensei Yokkesh S.", title: "Technical Advisory", category: "advisory", rank: "II Dan Black Belt",
    bio: null, credentials: [], achievements: [], image: "/images/team/YOKKESHS.jpeg", featured: false, stats: null },
  { id: "sensei-krishna-priya-m", slug: "sensei-krishna-priya-m", name: "Sensei Krishna Priya M.", title: "Medical Examiner", category: "advisory", rank: "I Dan — Malaysia",
    bio: null, credentials: [], achievements: ["Bronze Medalist", "Coach"], image: "/images/team/KRISHNAPRIYAM.jpeg", featured: false, stats: null },
  { id: "senpai-gopi-lakshman-s", slug: "senpai-gopi-lakshman-s", name: "Senpai Gopi Lakshman S.", title: "Coach & Committee Member", category: "coaches", rank: "I Dan — Malaysia",
    bio: null, credentials: [], achievements: ["Gold Medalist", "Coach"], image: "/images/team/GopiLakshmanS.jpeg", featured: false, stats: null },
  { id: "aasan-manikandan-r", slug: "aasan-manikandan-r", name: "Aasan Manikandan R.", title: "Coach & Committee Member", category: "coaches", rank: "II Dan",
    bio: null, credentials: [{ label: "Silambam", value: "Black Belt" }], achievements: [], image: "/images/team/MANIKANDAN.jpeg", featured: false, stats: null },
  { id: "senpai-shanmugapriyan-v", slug: "senpai-shanmugapriyan-v", name: "Senpai Shanmugapriyan V.", title: "Coach & Committee Member", category: "coaches", rank: "Black Belt",
    bio: null, credentials: [], achievements: [], image: "/images/team/ShanmugapriyanV.jpeg", featured: false, stats: null },
  { id: "senpai-kishore-s", slug: "senpai-kishore-s", name: "Senpai Kishore S.", title: "Coach & Committee Member", category: "coaches", rank: "Black Belt",
    bio: null, credentials: [], achievements: [], image: "/images/team/KISHORE.jpeg", featured: false, stats: null },
];
teamMembers.forEach((m, i) => {
  say("insert into team_members (slug, name, title, category, rank, bio, credentials, achievements, image, featured, stats, order_index) values (");
  say(`  ${str(m.slug)}, ${str(m.name)}, ${str(m.title)}, ${str(m.category)}, ${str(m.rank)}, ${str(m.bio)},`);
  say(`  ${jsonb(m.credentials)}, ${textArray(m.achievements)}, ${str(m.image)}, ${bool(m.featured)}, ${m.stats ? jsonb(m.stats) : "NULL"}, ${num(i)}`);
  say(");");
});
say("");

// ── gallery_items ────────────────────────────────────────────────────────
const gallery = JSON.parse(fs.readFileSync(dataPath("gallery.json"), "utf-8"));
gallery.forEach((g, i) => {
  say("insert into gallery_items (src, alt, category, width, height, order_index) values (");
  say(`  ${str(g.src)}, ${str(g.alt)}, ${str(g.category)}, ${num(g.width)}, ${num(g.height)}, ${num(i)}`);
  say(");");
});
say("");

// ── events ───────────────────────────────────────────────────────────────
const events = JSON.parse(fs.readFileSync(dataPath("events.json"), "utf-8"));
events.forEach((e, i) => {
  say("insert into events (slug, title, type, status, date, end_date, time, venue, description, image, featured, order_index) values (");
  say(`  ${str(e.slug)}, ${str(e.title)}, ${str(e.type)}, ${str(e.status)}, ${dateLit(e.date)}, ${dateLit(e.endDate)},`);
  say(`  ${str(e.time)}, ${str(e.venue)}, ${str(e.description)}, ${str(e.image)}, ${bool(e.featured)}, ${num(i)}`);
  say(");");
});
say("");

// ── branches ─────────────────────────────────────────────────────────────
const branches = JSON.parse(fs.readFileSync(dataPath("branches.json"), "utf-8"));
branches.forEach((b, i) => {
  say("insert into branches (slug, name, type, address, phone, email, hours, map_embed, features, featured, order_index) values (");
  say(`  ${str(b.slug)}, ${str(b.name)}, ${str(b.type)}, ${str(b.address)}, ${str(b.phone)}, ${str(b.email)},`);
  say(`  ${str(b.hours)}, ${str(b.mapEmbed)}, ${textArray(b.features)}, ${bool(b.featured)}, ${num(i)}`);
  say(");");
});
say("");

// ── testimonials ─────────────────────────────────────────────────────────
const testimonials = JSON.parse(fs.readFileSync(dataPath("testimonials.json"), "utf-8"));
testimonials.forEach((t, i) => {
  say("insert into testimonials (name, role, rating, quote, order_index) values (");
  say(`  ${str(t.name)}, ${str(t.role)}, ${num(t.rating)}, ${str(t.quote)}, ${num(i)}`);
  say(");");
});
say("");

// ── faq_items ────────────────────────────────────────────────────────────
const faq = JSON.parse(fs.readFileSync(dataPath("faq.json"), "utf-8"));
faq.forEach((f, i) => {
  say("insert into faq_items (question, answer, order_index) values (");
  say(`  ${str(f.question)}, ${str(f.answer)}, ${num(i)}`);
  say(");");
});
say("");

// ── timeline_items ───────────────────────────────────────────────────────
const timeline = JSON.parse(fs.readFileSync(dataPath("timeline.json"), "utf-8"));
timeline.forEach((t, i) => {
  say("insert into timeline_items (year, title, description, order_index) values (");
  say(`  ${str(t.year)}, ${str(t.title)}, ${str(t.description)}, ${num(i)}`);
  say(");");
});
say("");

// ── core_values ──────────────────────────────────────────────────────────
const values = JSON.parse(fs.readFileSync(dataPath("values.json"), "utf-8"));
values.forEach((v, i) => {
  say("insert into core_values (icon, title, description, order_index) values (");
  say(`  ${str(v.icon)}, ${str(v.title)}, ${str(v.description)}, ${num(i)}`);
  say(");");
});
say("");

// ── why_choose_us_reasons (currently hardcoded in WhyChooseUs.tsx) ────────
const reasons = [
  { icon: "ShieldCheck", title: "VII Dan Black Belt Instructor", description: "Aasan Saravanan T. holds a VII Dan Black Belt awarded in Malaysia — over two decades of authentic Okinawan Goju-Ryu teaching experience." },
  { icon: "Trophy", title: "Proven Competition Results", description: "GIMA students compete at district, state, national, and international levels. Our training methods are tested in real competition, not just theory." },
  { icon: "Users", title: "All Ages, All Levels", description: "Programs from age 4 to adult, complete beginner to black belt. Every student gets a structured curriculum with dedicated instructor time." },
  { icon: "Sword", title: "Traditional Okinawan Karate", description: "We teach the full art — traditional Goju-Ryu kata, kumite, bunkai, self-defence, and Silambam. Discipline and character are central to every class." },
  { icon: "Clock", title: "Regular Belt Examinations", description: "Structured grading schedule conducted by qualified examiners. Every belt at GIMA is genuinely earned through kihon, kata, kumite, and character." },
  { icon: "MapPin", title: "4 Centres Across Chennai", description: "Training at Chromepet, Chitlapakkam (2 locations), and Nemilichery — always close to home, with batches designed around school and work schedules." },
];
reasons.forEach((r, i) => {
  say("insert into why_choose_us_reasons (icon, title, description, order_index) values (");
  say(`  ${str(r.icon)}, ${str(r.title)}, ${str(r.description)}, ${num(i)}`);
  say(");");
});
say("");

const outPath = path.join(ROOT, "supabase", "migrations", "0002_seed.sql");
fs.writeFileSync(outPath, lines.join("\n") + "\n");
console.log(`Wrote ${outPath} (${lines.length} lines)`);
