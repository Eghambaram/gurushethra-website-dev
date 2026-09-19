-- GIMA admin CMS — seed data, generated from the current static site content.
-- Run 0001_schema.sql first, then this file.

insert into site_settings (name, short_name, tagline, phone, phone2, whatsapp, email, address, hours, map_embed, social_facebook, social_instagram, social_youtube, social_whatsapp, default_og_image) values (
  'Gurushethra Institute of Martial Arts', 'GIMA', 'Building Discipline • Confidence • Character',
  '+91 63821 10788', '+91 63821 10788', '916382110788', 'gurushethra1991@gmail.com',
  'Sai Dojo, Station Road, Radha Nagar, Chromepet, Chennai – 600044', 'Classes held Mon – Sun (timings vary by centre)',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5!2d80.1411!3d12.9516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU3JzA1LjgiTiA4MMKwMDgnMjguMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  'https://www.facebook.com/107644411375904/', 'https://www.instagram.com/gimakarate', 'https://youtube.com/@gurushethrainstituteofmart7619', 'https://wa.me/916382110788',
  '/images/og-default.jpg'
);

insert into hero (headline_lines, sub_copy, cta_primary_label, cta_primary_href, cta_secondary_label, cta_secondary_href, stats, trust_badges, background_image) values (
  ARRAY['Forge Your', 'Strength.', 'Master Your', 'Discipline.']::text[], 'Premier Okinawan Goju-Ryu Karate training in Chennai — building champions on the mat and leaders in life since 1998.',
  'Book Free Trial', '/contact', 'Explore Programs', '/programs',
  '[{"value":26,"suffix":"+","label":"Years of Excellence"},{"value":4,"suffix":"","label":"Training Centres"},{"value":7,"suffix":"th","label":"Dan Black Belt Instructor"},{"value":6,"suffix":"","label":"Class Categories"}]'::jsonb, '[{"icon":"ShieldCheck","text":"VII Dan Certified Instructor"},{"icon":"Trophy","text":"International Champions"},{"icon":"Users","text":"All Ages Welcome"}]'::jsonb, 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhKyLxf_xVfqZvOwjT00qOU0GfdckkwUEVEdTE1ayiBzifSOOx0cccsfomzX-OtDpb_SoOxBq7dYvkkqQgd4v44QZ1lnu6EgOQKXtysOC5TERco6y5CRT9cM7NWzPo7ya28vBXWN1IU1YiCD8ksgAqHUvWCGPPsIR7FmR3PRiq4zD4NyVvqo2rHRzLGYWU/s3048/IMG_3407.jpeg'
);

insert into about_hero (eyebrow, headline, headline_highlight, body, cta_label, cta_href, image, badge_label, badge_value) values (
  'About Us', 'Our Journey', 'Since 1998',
  'Gurushethra Institute of Martial Arts was born from a single conviction — that the ancient art of Okinawan Goju-Ryu karate could transform ordinary lives. What began as a single dojo in Chennai has grown into Tamil Nadu''s most respected martial arts academy, with four centres, hundreds of active students, and a proven record of developing champions at every level.',
  'Discover More', '/contact',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgsjX9gfwx2THzuT-sOlyfOCViG0mxwWfv5_jWyHejwwh6akPl93WpB20wTIX8Az_ulFC6gpLuOtwegTZjV3-At3-JV5LyxTkmEFC5RGV5VGyBUxI-0OhXuTO_T4wQJxDUhwerEYe6s59KAO613Jbt45Me639ShS37wvatCOCf8kmWxA9-uBAHx5LJHfrI/s4032/IMG_1357.jpeg',
  'EST.', '1998'
);

insert into instructor (name, title, dan, style, short_bio, bio, bio_extended, image, stats, qualifications, achievements) values (
  'Aasan Saravanan T.', 'Founder & President', 'VII Dan Black Belt', 'Okinawan Goju-Ryu Karate-Do',
  'A VII Dan Black Belt with over two decades of teaching experience, Aasan Saravanan T. founded GIMA in 1998 and still trains alongside students at every one of its four centres.',
  'Aasan Saravanan T. has dedicated more than two decades to the art of Okinawan Goju-Ryu Karate. What began as a personal pursuit grew into a lifelong mission — to preserve traditional martial arts and make world-class training accessible to every student in Chennai, regardless of age or background. Under his leadership, GIMA has grown to four centres and continues to produce champions of both character and competition.',
  'A VII Dan Black Belt awarded in Malaysia, Aasan Saravanan is also a qualified Silambam instructor and holds a Silver Grade from Madurai — a testament to his breadth of martial arts mastery. With a B.A. and Diploma in Yoga Teaching (D.Y.T.), he brings a holistic approach to training: physical conditioning, mental discipline, breathing, and meditation are as central to his classes as kata and kumite. His philosophy is simple — karate is not just a sport, it is a way of life.',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhvmr_yolnCL0EO3Z3iUduL4VdcD_az3os00Dnx5HOBpbQcrEZTrBWvEWhScx6YSvU7nQFAeU0Cu_Uu2_ZCiYjc56rM_i8OsvxMzZ8Citz_dW3gdeaF4dY2lRmbmU-32FGu6YnXf9vzsZWnkM5gJslIv98bl_dpOIRBr6uV9eR5gmz3A22zCa7jBQBcRC8/w300-h400/IMG_6727.jpeg',
  '[{"value":20,"suffix":"+","label":"Years Teaching"},{"value":7,"suffix":"th","label":"Dan Black Belt"},{"value":4,"suffix":"","label":"Training Centres"},{"value":6,"suffix":"","label":"Class Categories"}]'::jsonb, ARRAY['VII Dan Black Belt — Okinawan Goju-Ryu Karate-Do (Malaysia)', 'Silambam Instructor', 'Silver Grade — Madurai', 'B.A. Graduate', 'Diploma in Yoga Teaching (D.Y.T.)', 'Founder, Gurushethra Institute of Martial Arts (Est. 1998)']::text[], ARRAY['Established GIMA in 1998 — one of Chennai''s leading traditional karate academies', 'Awarded VII Dan Black Belt in Malaysia', 'Certified Silambam Instructor with Silver Grade distinction', 'More than two decades of continuous martial arts teaching', 'Developed structured belt curriculum for children, teens, and adults', 'Led GIMA students to district, state, and national-level competitions']::text[]
);

insert into achievements_meta (stats) values ('[{"value":26,"suffix":"+","label":"Years of Excellence"},{"value":3,"suffix":"","label":"International Events"},{"value":2,"suffix":"","label":"Countries Represented"},{"value":6,"suffix":"+","label":"Major Tournaments"}]'::jsonb);

insert into achievement_entries (year, title, result, medals, description, image, order_index) values (
  '2024', 'Ipoh City International Open — Malaysia', 'India Representation', '{"gold":0,"silver":1,"bronze":1}'::jsonb, 'Represented India at the International Open Goju Ryu tournament in Ipoh City, Malaysia — competing against athletes from across Asia.', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrwW0WUYC4i12ymH2hTSid3hXuU2-2v8qR7cGBJu3BASf3f1h-GPlxwetxxRF_Or-vpkvKwJPR9lea1zdeBZZpHOUNbZ_hrHj-Xto1LuWahM1jhrnXhJLm9mFn0cthcYYjNTW0oG7MaQ8/s640/IMG_20181104_191623.jpg', 0
);
insert into achievement_entries (year, title, result, medals, description, image, order_index) values (
  '2024', 'Open Asian Championship — Kazakhstan', 'International Representation', '{"gold":0,"silver":1,"bronze":0}'::jsonb, 'GIMA athletes competed at the Open Asian Championship in Kazakhstan, marking the institute''s second consecutive international appearance.', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhGZWNKq_db2VlTNo1K-Gq3sO6LE3oNgv_ykj5i7FfF_zkzQB-zD7cdw_bAiLwnBJ0aP2MXqtVPQKBCE2nXrk1DqfcI-Fsm86ee9O8okaAhLCwlYXrIILBwtyEF9XBb8BkqWSYi_FqYnnos_y5qJwNaSCDLngIVFP-3XetotT1RCWEvxojGfoFu0QBHwnw/w399-h299/IMG_9252.jpeg', 1
);
insert into achievement_entries (year, title, result, medals, description, image, order_index) values (
  '2023', 'Goju Ryu International Tournament — Malaysia', 'Gold & Silver Medals', '{"gold":1,"silver":1,"bronze":0}'::jsonb, 'Gold and silver medals at the Goju Ryu International Tournament in Malaysia, establishing GIMA''s reputation on the international circuit.', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiSU4VYKu6fFAYjIvjimFvExP1VHCK3M618fHqOO7SdxtWr6qFrR7CriyyElZLzYzEH9rUJhr43Jht6TpuoATy7G9_nceHw-gS4gCxJmBa4Vq3c-OKjdyBWAv8gpNC9KLv6QetN4QL34QKH2ygD_8rgkRh-k8ZBVo6R19IagIewkSpJR2hSRsYIMu8roB8/w584-h328/IMG_2351.jpg', 2
);
insert into achievement_entries (year, title, result, medals, description, image, order_index) values (
  '2021', 'National Referee Camp', 'National Recognition', '{"gold":0,"silver":0,"bronze":0}'::jsonb, 'GIMA instructors participated in the National Referee Camp, contributing to the development of officiating standards across India.', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjsa_Uha0NDvvOcEdyb9HzymD7Mp4EMdJhOpfV9-xcLob1T-cAFr_mhiFqqdZhyphenhyphenB6W-RFX2BF7xMZNwGZ3RSGaYCBSJrn6Ry-WukbuS6gN886tAttXG5Qot-DOpER_TZABxo8xwCVnWj3wi3Ib0onrogGpHFPfer_ro4P7Rz-ig2Xn6PmmlIMggvL4k58c/w591-h333/IMG_9011%20Large%20Medium.jpeg', 3
);
insert into achievement_entries (year, title, result, medals, description, image, order_index) values (
  '2021', 'Udumalaipetai National Tournament', 'Podium Finishes', '{"gold":1,"silver":2,"bronze":2}'::jsonb, 'Strong podium performance at the national tournament, with multiple students placing in Karate and Silambam categories.', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrwW0WUYC4i12ymH2hTSid3hXuU2-2v8qR7cGBJu3BASf3f1h-GPlxwetxxRF_Or-vpkvKwJPR9lea1zdeBZZpHOUNbZ_hrHj-Xto1LuWahM1jhrnXhJLm9mFn0cthcYYjNTW0oG7MaQ8/s640/IMG_20181104_191623.jpg', 4
);
insert into achievement_entries (year, title, result, medals, description, image, order_index) values (
  '2018', 'National Tournament', 'National Recognition', '{"gold":0,"silver":1,"bronze":2}'::jsonb, 'Early national-level recognition for GIMA students, laying the foundation for the international campaigns that followed.', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhGZWNKq_db2VlTNo1K-Gq3sO6LE3oNgv_ykj5i7FfF_zkzQB-zD7cdw_bAiLwnBJ0aP2MXqtVPQKBCE2nXrk1DqfcI-Fsm86ee9O8okaAhLCwlYXrIILBwtyEF9XBb8BkqWSYi_FqYnnos_y5qJwNaSCDLngIVFP-3XetotT1RCWEvxojGfoFu0QBHwnw/w399-h299/IMG_9252.jpeg', 5
);

insert into programs (slug, title, age_range, short_description, description, image, features, duration, schedule, featured, order_index) values (
  'tiny-tigers', 'Tiny Tigers', '4–6 Years', 'Fun karate activities that build coordination, balance, discipline, and early confidence through movement and play.',
  'Our Tiny Tigers program is designed specifically for young children aged 4–6. Through age-appropriate games, basic techniques, and structured routines, children develop gross motor skills, focus, and the foundational values of martial arts — all in a safe, encouraging environment.',
  '/images/littleTiger.jpg', ARRAY['Basic coordination & balance', 'Discipline & focus', 'Fun karate activities', 'Bully awareness']::text[], '60-minute classes', 'Sat & Sun: 4:00 PM – 5:30 PM (Chitlapakkam)', true, 0
);
insert into programs (slug, title, age_range, short_description, description, image, features, duration, schedule, featured, order_index) values (
  'kids-karate', 'Kids Karate', '7–12 Years', 'Traditional karate, fitness, confidence, discipline, and self-defence in a structured belt curriculum.',
  'The Kids Karate program takes children aged 7–12 through the full Goju-Ryu curriculum. Students learn stances, strikes, blocks, kicks, kata (forms), and basic kumite (sparring) as they progress through the belt system from white to brown.',
  '/images/juniorkids.jpg', ARRAY['Full belt curriculum', 'Kata & kumite', 'Self-defence fundamentals', 'Character building']::text[], '90-minute classes', 'Fri – Sun: 6:00 PM – 7:30 PM (Sai Dojo)', true, 1
);
insert into programs (slug, title, age_range, short_description, description, image, features, duration, schedule, featured, order_index) values (
  'junior-karate', 'Junior Karate', '13–17 Years', 'Advanced techniques, sparring, strength training, and competition coaching for serious young practitioners.',
  'Junior Karate is a high-energy program for teenagers who want to push beyond the basics. Students build on foundational skills with advanced kata, sport kumite strategy, strength conditioning, and mental preparation — ready for district, state, and national competitions.',
  '/images/teenwarriors.jpg', ARRAY['Advanced kata & bunkai', 'Sport kumite strategy', 'Competition coaching', 'Mental resilience']::text[], '90-minute classes', 'Tue & Thu: 6:00 PM – 7:30 PM (Loyola School)', false, 2
);
insert into programs (slug, title, age_range, short_description, description, image, features, duration, schedule, featured, order_index) values (
  'adult-karate', 'Adult Karate', '18+ Years', 'Fitness, self-defence, flexibility, stress relief, and traditional Okinawan Goju-Ryu for adults of all levels.',
  'Never too late to start. Our Adult Karate program offers a full traditional Goju-Ryu curriculum tailored to adult learning. Whether you are a complete beginner or returning to the mat, you will train in a respectful, no-judgment environment — building fitness, flexibility, and black-belt discipline.',
  '/images/adults.jpg', ARRAY['Full Goju-Ryu syllabus', 'Fitness & stress relief', 'Flexibility training', 'White to black belt path']::text[], '90-minute classes', 'Mon & Wed: 5:30 PM – 6:30 PM (Nemilichery)', true, 3
);
insert into programs (slug, title, age_range, short_description, description, image, features, duration, schedule, featured, order_index) values (
  'silambam', 'Silambam', 'All Ages', 'Ancient Tamil stick martial art — combining agility, coordination, rhythm, and traditional weaponry under a certified Silambam instructor.',
  'Silambam is one of the oldest martial arts in the world, originating in Tamil Nadu. At GIMA, Silambam is taught by Aasan Saravanan T., a certified Silambam instructor with Silver Grade distinction from Madurai. Students learn the art of bamboo staff techniques, footwork patterns, attack and defence sequences, and the cultural heritage behind this uniquely Tamil tradition.',
  '/images/silambam.jpg', ARRAY['Bamboo staff techniques', 'Footwork & agility', 'Traditional Tamil art form', 'Certified Silambam instructor']::text[], '90-minute classes', 'Enquire for available batches', true, 4
);
insert into programs (slug, title, age_range, short_description, description, image, features, duration, schedule, featured, order_index) values (
  'womens-self-defence', 'Women''s Self Defence', '16+ Years', 'Practical self-defence techniques and confidence-building in a safe, empowering environment.',
  'Designed specifically for women, this program focuses on real-world self-defence using Goju-Ryu principles. Participants learn situational awareness, escape techniques, and confidence in a safe, supportive space. No prior experience is needed — only the willingness to learn.',
  '/images/selfdefense.jpg', ARRAY['Practical scenario training', 'Escape & defence techniques', 'Situational awareness', 'Confidence building']::text[], '90-minute classes', 'Enquire for available batches', false, 5
);

insert into team_members (slug, name, title, category, rank, bio, credentials, achievements, image, featured, stats, order_index) values (
  'aasan-saravanan-t', 'Aasan Saravanan T.', 'Founder & President', 'leadership', 'VII Dan Black Belt', 'Aasan Saravanan T. has dedicated more than two decades to the art of Okinawan Goju-Ryu Karate. What began as a personal pursuit grew into a lifelong mission — to preserve traditional martial arts and make world-class training accessible to every student in Chennai, regardless of age or background. Under his leadership, GIMA has grown to four centres and continues to produce champions of both character and competition.',
  '[{"label":"Okinawan Goju-Ryu Karate-Do","value":"VII Dan Black Belt (Malaysia)"},{"label":"Silambam","value":"Instructor"},{"label":"Silver Grade","value":"Madurai"},{"label":"Education","value":"B.A. Graduate"},{"label":"Yoga","value":"Diploma in Yoga Teaching (D.Y.T.)"}]'::jsonb, ARRAY['Established GIMA in 1998 — one of Chennai''s leading traditional karate academies', 'Awarded VII Dan Black Belt in Malaysia', 'Certified Silambam Instructor with Silver Grade distinction', 'More than two decades of continuous martial arts teaching', 'Developed structured belt curriculum for children, teens, and adults', 'Led GIMA students to district, state, and national-level competitions']::text[], '/images/team/SARAVANANT.jpeg', true, '[{"value":20,"suffix":"+","label":"Years Teaching"},{"value":7,"suffix":"th","label":"Dan Black Belt"},{"value":4,"suffix":"","label":"Training Centres"},{"value":6,"suffix":"","label":"Class Categories"}]'::jsonb, 0
);
insert into team_members (slug, name, title, category, rank, bio, credentials, achievements, image, featured, stats, order_index) values (
  'sensei-ignatius-m', 'Sensei Ignatius M.', 'Vice President', 'leadership', 'II Dan Black Belt', NULL,
  '[]'::jsonb, ARRAY[]::text[], '/images/team/IGNATIUSM.jpeg', false, NULL, 1
);
insert into team_members (slug, name, title, category, rank, bio, credentials, achievements, image, featured, stats, order_index) values (
  'shihan-jaisriram-s', 'Shihan Jaisriram S.', 'Technical Director & General Secretary', 'technical', 'VI Dan Black Belt — Malaysia', NULL,
  '[{"label":"Okinawa Shorin Ryu Shorin Kankarate & Kobudo Association India","value":"II Dan Black Belt"},{"label":"KAI","value":"I Dan"}]'::jsonb, ARRAY[]::text[], '/images/team/placeholder-instructor.png', false, NULL, 2
);
insert into team_members (slug, name, title, category, rank, bio, credentials, achievements, image, featured, stats, order_index) values (
  'shihan-surya-r', 'Shihan Surya R.', 'Chief Instructor', 'technical', 'VI Dan Black Belt — Malaysia', NULL,
  '[]'::jsonb, ARRAY['Gold Medalist', 'Coach']::text[], '/images/team/placeholder-instructor.png', false, NULL, 3
);
insert into team_members (slug, name, title, category, rank, bio, credentials, achievements, image, featured, stats, order_index) values (
  'sensei-sangeetha-l', 'Sensei Sangeetha L.', 'Chief Examiner', 'technical', 'III Dan Black Belt — Malaysia', NULL,
  '[]'::jsonb, ARRAY['Gold Medalist', 'Coach']::text[], '/images/team/SANGEETHAL.jpeg', false, NULL, 4
);
insert into team_members (slug, name, title, category, rank, bio, credentials, achievements, image, featured, stats, order_index) values (
  'sensei-niranjana-devi-j', 'Sensei Niranjana Devi J.', 'Organization Secretary', 'administration', 'I Dan Black Belt', NULL,
  '[]'::jsonb, ARRAY[]::text[], '/images/team/placeholder-instructor.png', false, NULL, 5
);
insert into team_members (slug, name, title, category, rank, bio, credentials, achievements, image, featured, stats, order_index) values (
  'sensei-yashaswini-s', 'Sensei Yashaswini S.', 'Tournament Secretary', 'administration', 'I Dan Black Belt', NULL,
  '[]'::jsonb, ARRAY['Malaysia Silver Medalist', 'Coach']::text[], '/images/team/YASHASWINIS.jpeg', false, NULL, 6
);
insert into team_members (slug, name, title, category, rank, bio, credentials, achievements, image, featured, stats, order_index) values (
  'renshi-prithish-b', 'Renshi Prithish B.', 'Joint Secretary', 'administration', 'V Dan Black Belt — Malaysia', NULL,
  '[]'::jsonb, ARRAY['Gold Medalist', 'Coach']::text[], '/images/team/PRITHISHB.jpeg', false, NULL, 7
);
insert into team_members (slug, name, title, category, rank, bio, credentials, achievements, image, featured, stats, order_index) values (
  'sensei-tamilvanan-m', 'Sensei Tamilvanan M.', 'Joint Secretary', 'administration', 'IV Dan Black Belt', NULL,
  '[]'::jsonb, ARRAY['Malaysia Gold Medalist', 'Coach']::text[], '/images/team/TAMILVANANM.jpeg', false, NULL, 8
);
insert into team_members (slug, name, title, category, rank, bio, credentials, achievements, image, featured, stats, order_index) values (
  'aasan-aaditya-j', 'Aasan Aaditya J.', 'Treasurer', 'administration', 'Silambam Black Belt', NULL,
  '[]'::jsonb, ARRAY[]::text[], '/images/team/Aaditya.jpeg', false, NULL, 9
);
insert into team_members (slug, name, title, category, rank, bio, credentials, achievements, image, featured, stats, order_index) values (
  'sensei-yokkesh-s', 'Sensei Yokkesh S.', 'Technical Advisory', 'advisory', 'II Dan Black Belt', NULL,
  '[]'::jsonb, ARRAY[]::text[], '/images/team/YOKKESHS.jpeg', false, NULL, 10
);
insert into team_members (slug, name, title, category, rank, bio, credentials, achievements, image, featured, stats, order_index) values (
  'sensei-krishna-priya-m', 'Sensei Krishna Priya M.', 'Medical Examiner', 'advisory', 'I Dan — Malaysia', NULL,
  '[]'::jsonb, ARRAY['Bronze Medalist', 'Coach']::text[], '/images/team/KRISHNAPRIYAM.jpeg', false, NULL, 11
);
insert into team_members (slug, name, title, category, rank, bio, credentials, achievements, image, featured, stats, order_index) values (
  'senpai-gopi-lakshman-s', 'Senpai Gopi Lakshman S.', 'Coach & Committee Member', 'coaches', 'I Dan — Malaysia', NULL,
  '[]'::jsonb, ARRAY['Gold Medalist', 'Coach']::text[], '/images/team/GopiLakshmanS.jpeg', false, NULL, 12
);
insert into team_members (slug, name, title, category, rank, bio, credentials, achievements, image, featured, stats, order_index) values (
  'aasan-manikandan-r', 'Aasan Manikandan R.', 'Coach & Committee Member', 'coaches', 'II Dan', NULL,
  '[{"label":"Silambam","value":"Black Belt"}]'::jsonb, ARRAY[]::text[], '/images/team/MANIKANDAN.jpeg', false, NULL, 13
);
insert into team_members (slug, name, title, category, rank, bio, credentials, achievements, image, featured, stats, order_index) values (
  'senpai-shanmugapriyan-v', 'Senpai Shanmugapriyan V.', 'Coach & Committee Member', 'coaches', 'Black Belt', NULL,
  '[]'::jsonb, ARRAY[]::text[], '/images/team/ShanmugapriyanV.jpeg', false, NULL, 14
);
insert into team_members (slug, name, title, category, rank, bio, credentials, achievements, image, featured, stats, order_index) values (
  'senpai-kishore-s', 'Senpai Kishore S.', 'Coach & Committee Member', 'coaches', 'Black Belt', NULL,
  '[]'::jsonb, ARRAY[]::text[], '/images/team/KISHORE.jpeg', false, NULL, 15
);

insert into gallery_items (src, alt, category, width, height, order_index) values (
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhKyLxf_xVfqZvOwjT00qOU0GfdckkwUEVEdTE1ayiBzifSOOx0cccsfomzX-OtDpb_SoOxBq7dYvkkqQgd4v44QZ1lnu6EgOQKXtysOC5TERco6y5CRT9cM7NWzPo7ya28vBXWN1IU1YiCD8ksgAqHUvWCGPPsIR7FmR3PRiq4zD4NyVvqo2rHRzLGYWU/s3048/IMG_3407.jpeg', 'GIMA students in training session', 'training', 3048, 2286, 0
);
insert into gallery_items (src, alt, category, width, height, order_index) values (
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjzTm3ITH5mGayqMfCYhzzX44SRxdJdoY02W3eHn57-fwQw66WQ4d7k4-4zbvPDE0zSPfpIYILfXGZxjgAP4oOBmxVOv5R2mabMalB8_DnIP8CxrrPXcE1AEvBDuqQ5CtRP8yS7-b11cBycICPUvliqxM2JRnyOBniymmuynarpcdtmbydYKxHSAGb08t4/w574-h431/IMG_6741.jpeg', 'Karate training at Ipoh international camp', 'training', 574, 431, 1
);
insert into gallery_items (src, alt, category, width, height, order_index) values (
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi9PrwyK3Ku4RgShd1QJfKP_KzUUtAYKt6SD_yYb2GZAJs5zWv0u5yw53O3QVysl2G5d0Y-G8x5CaOmtOi059KuR5dW8Bqai3pQ9fNb7jFVMvGm1xa1YumgSlKc1mFN9MXH_HOZLkLByvCyIjcfSpZlfTGFOntl3VyiI25HoylE2WllZL4EJY3LIyfYEgA/w480-h640/IMG_2444.jpeg', 'Sensei portrait — focused stance', 'training', 480, 640, 2
);
insert into gallery_items (src, alt, category, width, height, order_index) values (
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi9PrwyK3Ku4RgShd1QJfKP_KzUUtAYKt6SD_yYb2GZAJs5zWv0u5yw53O3QVysl2G5d0Y-G8x5CaOmtOi059KuR5dW8Bqai3pQ9fNb7jFVMvGm1xa1YumgSlKc1mFN9MXH_HOZLkLByvCyIjcfSpZlfTGFOntl3VyiI25HoylE2WllZL4EJY3LIyfYEgA/w480-h640/IMG_2444.jpeg', 'Malaysia karate exchange event', 'events', 585, 438, 3
);
insert into gallery_items (src, alt, category, width, height, order_index) values (
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi6gysZdkyuGpnZUgT_UxnptbcuXDnRYTy31rLDFcR-Ne4GepMXNYzPX6RwNZRr47mWto_FOkM0gkLxepfyNdmsSWrBmRCuW4nz4ZIENmSeVla_BkP6s9iGyZ3800cHCQ_Q4ujOF0gCO4o/w553-h416/IMG_20211205_174239.jpg', 'Referee camp group photo', 'events', 553, 416, 4
);
insert into gallery_items (src, alt, category, width, height, order_index) values (
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiSU4VYKu6fFAYjIvjimFvExP1VHCK3M618fHqOO7SdxtWr6qFrR7CriyyElZLzYzEH9rUJhr43Jht6TpuoATy7G9_nceHw-gS4gCxJmBa4Vq3c-OKjdyBWAv8gpNC9KLv6QetN4QL34QKH2ygD_8rgkRh-k8ZBVo6R19IagIewkSpJR2hSRsYIMu8roB8/w584-h328/IMG_2351.jpg', 'Tournament medal ceremony', 'tournaments', 584, 328, 5
);
insert into gallery_items (src, alt, category, width, height, order_index) values (
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhGZWNKq_db2VlTNo1K-Gq3sO6LE3oNgv_ykj5i7FfF_zkzQB-zD7cdw_bAiLwnBJ0aP2MXqtVPQKBCE2nXrk1DqfcI-Fsm86ee9O8okaAhLCwlYXrIILBwtyEF9XBb8BkqWSYi_FqYnnos_y5qJwNaSCDLngIVFP-3XetotT1RCWEvxojGfoFu0QBHwnw/w399-h299/IMG_9252.jpeg', 'Podium ceremony — national championship', 'tournaments', 399, 299, 6
);
insert into gallery_items (src, alt, category, width, height, order_index) values (
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj23ThbwSICCgPkwMslYst5p3CXmtV3NHuzWGsest7N-0gucp-iW9e5S5VSqg4uP89CiAHS58EN4ndDyCbf-x_-ZnM_5chcLkmWEua3Q-yfpcf5Vr8MtrorNdmB8Z9V1LQ94sdhclY3Cz57OOA9diGRTHLSqxptVFs6s5yWM-7z_8o-uc9wsm59kdDXkvo/w292-h389/IMG_9188.jpeg', 'Individual kata competition', 'tournaments', 292, 389, 7
);
insert into gallery_items (src, alt, category, width, height, order_index) values (
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgsjX9gfwx2THzuT-sOlyfOCViG0mxwWfv5_jWyHejwwh6akPl93WpB20wTIX8Az_ulFC6gpLuOtwegTZjV3-At3-JV5LyxTkmEFC5RGV5VGyBUxI-0OhXuTO_T4wQJxDUhwerEYe6s59KAO613Jbt45Me639ShS37wvatCOCf8kmWxA9-uBAHx5LJHfrI/s4032/IMG_1357.jpeg', 'Aasan Saravanan T. — kata demonstration', 'training', 3024, 4032, 8
);
insert into gallery_items (src, alt, category, width, height, order_index) values (
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgKEcNFD1ovwiYsUMt7za9bD_tskpA_7-kRd3JPWqeq4Ara2sPNDR-AvM7yeNciellYicg3V_lP47oUaehwFOC6mX8vSGIhMiDeLWQcGfLb2EW_cPbP_WRCLViqCBUsiAlClFWoI91p0qgfkJCGz99Uoifbxiclu9UpLaiW917merZEcz1WfxM8PG-lENk/s4032/IMG_1230.jpeg', 'Advanced class group training', 'training', 3024, 4032, 9
);
insert into gallery_items (src, alt, category, width, height, order_index) values (
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhc1xc5GhB4dxaORkJvceHCffrOIEXY8VnXD5H-WmY3i_t6-yc9EJjF_im-GbwTQHDjbcJ9VwYHuo8Z_6KmojxcR6rzJwUVyapi08NI9PPrOkvgeV05wtv-r8FsMfgM9mKfU4qkaEjKRCdkJNYuSVQsWduLici1I86s39J1ertp2QHKwRSz0O5Csovf4zE/s4032/IMG_1225.jpeg', 'Dojo sparring session', 'training', 3024, 4032, 10
);
insert into gallery_items (src, alt, category, width, height, order_index) values (
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjsa_Uha0NDvvOcEdyb9HzymD7Mp4EMdJhOpfV9-xcLob1T-cAFr_mhiFqqdZhyphenhyphenB6W-RFX2BF7xMZNwGZ3RSGaYCBSJrn6Ry-WukbuS6gN886tAttXG5Qot-DOpER_TZABxo8xwCVnWj3wi3Ib0onrogGpHFPfer_ro4P7Rz-ig2Xn6PmmlIMggvL4k58c/w591-h333/IMG_9011%20Large%20Medium.jpeg', 'Goju-Ryu demonstration at national event', 'tournaments', 591, 333, 11
);
insert into gallery_items (src, alt, category, width, height, order_index) values (
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrwW0WUYC4i12ymH2hTSid3hXuU2-2v8qR7cGBJu3BASf3f1h-GPlxwetxxRF_Or-vpkvKwJPR9lea1zdeBZZpHOUNbZ_hrHj-Xto1LuWahM1jhrnXhJLm9mFn0cthcYYjNTW0oG7MaQ8/s640/IMG_20181104_191623.jpg', 'National championship 2018 — team photo', 'tournaments', 640, 480, 12
);
insert into gallery_items (src, alt, category, width, height, order_index) values (
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjtPfLG6Vn2qKN4xRLjb9p_zKzSm_7XFp8s4Bu47ju68MLmR4czWW-u6pnUBHwQ5MRonEfWlsjRfe0kxVGsLDslIXMWpIZeytvzzL63WIT-K-3Cs0kDvcrsDhMlu0MAij594k0tmkLdElU/w254-h339/20211205_172329.jpg', 'Referee camp training drills', 'events', 254, 339, 13
);
insert into gallery_items (src, alt, category, width, height, order_index) values (
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhvmr_yolnCL0EO3Z3iUduL4VdcD_az3os00Dnx5HOBpbQcrEZTrBWvEWhScx6YSvU7nQFAeU0Cu_Uu2_ZCiYjc56rM_i8OsvxMzZ8Citz_dW3gdeaF4dY2lRmbmU-32FGu6YnXf9vzsZWnkM5gJslIv98bl_dpOIRBr6uV9eR5gmz3A22zCa7jBQBcRC8/w300-h400/IMG_6727.jpeg', 'Black belt grading ceremony', 'black-belt', 300, 400, 14
);

insert into events (slug, title, type, status, date, end_date, time, venue, description, image, featured, order_index) values (
  'summer-camp-2025', 'Summer Intensive Camp 2025', 'camp', 'upcoming', '2025-05-10'::date, '2025-05-15'::date,
  '7:00 AM – 12:00 PM', 'Sai Dojo, Chromepet, Chennai', 'A six-day intensive training camp covering advanced kata, kumite, physical conditioning, and Silambam. Open to all students from yellow belt and above. Limited seats per batch.', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi6gysZdkyuGpnZUgT_UxnptbcuXDnRYTy31rLDFcR-Ne4GepMXNYzPX6RwNZRr47mWto_FOkM0gkLxepfyNdmsSWrBmRCuW4nz4ZIENmSeVla_BkP6s9iGyZ3800cHCQ_Q4ujOF0gCO4o/w553-h416/IMG_20211205_174239.jpg', true, 0
);
insert into events (slug, title, type, status, date, end_date, time, venue, description, image, featured, order_index) values (
  'belt-grading-june-2025', 'Belt Grading Examination — June 2025', 'grading', 'upcoming', '2025-06-14'::date, '2025-06-14'::date,
  '9:00 AM – 1:00 PM', 'All GIMA Centres, Chennai', 'Bi-annual belt grading examination for all levels. Students must have completed minimum training hours and have instructor clearance to appear. Evaluations include kihon, kata, kumite, discipline, attendance, and overall improvement.', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjsa_Uha0NDvvOcEdyb9HzymD7Mp4EMdJhOpfV9-xcLob1T-cAFr_mhiFqqdZhyphenhyphenB6W-RFX2BF7xMZNwGZ3RSGaYCBSJrn6Ry-WukbuS6gN886tAttXG5Qot-DOpER_TZABxo8xwCVnWj3wi3Ib0onrogGpHFPfer_ro4P7Rz-ig2Xn6PmmlIMggvL4k58c/w591-h333/IMG_9011%20Large%20Medium.jpeg', true, 1
);
insert into events (slug, title, type, status, date, end_date, time, venue, description, image, featured, order_index) values (
  'tamil-nadu-state-championship-2025', 'Tamil Nadu State Karate Championship 2025', 'tournament', 'upcoming', '2025-08-02'::date, '2025-08-03'::date,
  '8:00 AM – 6:00 PM', 'Jawaharlal Nehru Indoor Stadium, Chennai', 'GIMA is proud to send its competition students to the Tamil Nadu State Karate Championship 2025. The tournament features Kata and Kumite events across all age groups. Come support our athletes!', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhGZWNKq_db2VlTNo1K-Gq3sO6LE3oNgv_ykj5i7FfF_zkzQB-zD7cdw_bAiLwnBJ0aP2MXqtVPQKBCE2nXrk1DqfcI-Fsm86ee9O8okaAhLCwlYXrIILBwtyEF9XBb8BkqWSYi_FqYnnos_y5qJwNaSCDLngIVFP-3XetotT1RCWEvxojGfoFu0QBHwnw/w399-h299/IMG_9252.jpeg', true, 2
);
insert into events (slug, title, type, status, date, end_date, time, venue, description, image, featured, order_index) values (
  'district-championship-2024', 'Chennai District Karate Championship 2024', 'tournament', 'past', '2024-11-10'::date, '2024-11-10'::date,
  '8:00 AM – 5:00 PM', 'Chennai, Tamil Nadu', 'GIMA students represented the academy at the Chennai District Karate Championship, delivering strong performances across junior and senior categories.', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrwW0WUYC4i12ymH2hTSid3hXuU2-2v8qR7cGBJu3BASf3f1h-GPlxwetxxRF_Or-vpkvKwJPR9lea1zdeBZZpHOUNbZ_hrHj-Xto1LuWahM1jhrnXhJLm9mFn0cthcYYjNTW0oG7MaQ8/s640/IMG_20181104_191623.jpg', false, 3
);
insert into events (slug, title, type, status, date, end_date, time, venue, description, image, featured, order_index) values (
  'belt-grading-dec-2024', 'Belt Grading Examination — December 2024', 'grading', 'past', '2024-12-07'::date, '2024-12-07'::date,
  '9:00 AM – 1:00 PM', 'All GIMA Centres, Chennai', 'Successful grading ceremony with students advancing across belt levels. Evaluations conducted by qualified examiners under Aasan Saravanan T.', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhvmr_yolnCL0EO3Z3iUduL4VdcD_az3os00Dnx5HOBpbQcrEZTrBWvEWhScx6YSvU7nQFAeU0Cu_Uu2_ZCiYjc56rM_i8OsvxMzZ8Citz_dW3gdeaF4dY2lRmbmU-32FGu6YnXf9vzsZWnkM5gJslIv98bl_dpOIRBr6uV9eR5gmz3A22zCa7jBQBcRC8/w300-h400/IMG_6727.jpeg', false, 4
);

insert into branches (slug, name, type, address, phone, email, hours, map_embed, features, featured, order_index) values (
  'sai-dojo', 'Sai Dojo — Chromepet', 'headquarters', 'Station Road, Radha Nagar, Chromepet, Chennai – 600044', '+91 63821 10788', 'gurushethra1991@gmail.com',
  'Fri – Sun: 6:00 PM – 7:30 PM', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5!2d80.1411!3d12.9516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU3JzA1LjgiTiA4MMKwMDgnMjguMCJF!5e0!3m2!1sen!2sin!4v1700000000001', ARRAY['Main Training Hall', 'All Belt Levels', 'Karate & Silambam']::text[], true, 0
);
insert into branches (slug, name, type, address, phone, email, hours, map_embed, features, featured, order_index) values (
  'annai-violet', 'Annai Violet School — Chitlapakkam', 'branch', 'Annai Violet Matric Higher Secondary School, Chitlapakkam, Chennai', '+91 63821 10788', 'gurushethra1991@gmail.com',
  'Sat & Sun: 4:00 PM – 5:30 PM', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d80.1350!3d12.9350!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU2JzA2LjAiTiA4MMKwMDgnMDYuMCJF!5e0!3m2!1sen!2sin!4v1700000000002', ARRAY['Kids & Junior Classes', 'School Campus', 'Weekends Only']::text[], false, 1
);
insert into branches (slug, name, type, address, phone, email, hours, map_embed, features, featured, order_index) values (
  'loyola-school', 'Loyola School — Chitlapakkam', 'branch', 'Loyola Matric Higher Secondary School, Chitlapakkam, Chennai', '+91 63821 10788', 'gurushethra1991@gmail.com',
  'Tue & Thu: 6:00 PM – 7:30 PM', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d80.1360!3d12.9360!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU2JzA5LjYiTiA4MMKwMDgnMDkuNiJF!5e0!3m2!1sen!2sin!4v1700000000003', ARRAY['Junior & Teen Classes', 'School Campus', 'Weekday Evenings']::text[], false, 2
);
insert into branches (slug, name, type, address, phone, email, hours, map_embed, features, featured, order_index) values (
  'kv-garden', 'KV Garden — Nemilichery', 'branch', 'KV Garden, Nemilichery, Chennai', '+91 63821 10788', 'gurushethra1991@gmail.com',
  'Mon & Wed: 5:30 PM – 6:30 PM', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0!2d80.1500!3d12.9600!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU3JzM2LjAiTiA4MMKwMDknMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000004', ARRAY['Adult Classes', 'Outdoor-style Setting', 'Weekday Evenings']::text[], false, 3
);

insert into testimonials (name, role, rating, quote, order_index) values (
  'Parent', 'Parent of Student', 5, 'Excellent coaching with a strong focus on discipline and confidence. My child has transformed in just a few months — more focused, more respectful, and genuinely excited to attend every class.', 0
);
insert into testimonials (name, role, rating, quote, order_index) values (
  'Student', 'Kids Karate Student', 5, 'A wonderful place for children to learn traditional karate. The atmosphere is welcoming, the instruction is structured, and Aasan Saravanan genuinely cares about every student''s progress.', 1
);
insert into testimonials (name, role, rating, quote, order_index) values (
  'Adult Student', 'Adult Karate Student', 5, 'Professional instructors and a very positive learning environment. I joined as a complete beginner and the progress I have made in fitness, flexibility, and self-confidence has been incredible.', 2
);

insert into faq_items (question, answer, order_index) values (
  'What is the minimum age to join GIMA?', 'We welcome children from as young as 4 years old into our Tiny Tigers program, designed specifically for early learners. Kids Karate starts from age 7, Junior Karate covers ages 13–17, and adults of any age are welcome in our Adult Karate program.', 0
);
insert into faq_items (question, answer, order_index) values (
  'Can a complete beginner join?', 'Absolutely. Every program at GIMA is designed to welcome complete beginners from day one. Our instructors are experienced in teaching students with zero martial arts background. The only requirement is willingness to learn and commitment to showing up.', 1
);
insert into faq_items (question, answer, order_index) values (
  'Do girls and women have separate classes?', 'Yes. We run a dedicated Women''s Self Defence program with practical techniques and confidence-building in a safe, empowering environment. Female students also train at all levels in our regular karate programs. Please enquire when booking for available batches.', 2
);
insert into faq_items (question, answer, order_index) values (
  'How often are belt examinations conducted?', 'Belt grading examinations are conducted as per GIMA''s grading schedule, typically twice a year. Students are evaluated on basic techniques (kihon), kata, kumite, discipline, attendance, physical fitness, and overall improvement. All gradings are conducted by qualified examiners.', 3
);
insert into faq_items (question, answer, order_index) values (
  'Is karate safe for children?', 'Yes. All training at GIMA is age-appropriate and conducted under experienced, qualified instructors. Students only begin supervised sparring once they demonstrate sufficient technical control. Safety is our top priority and full protective equipment is mandatory for all sparring sessions.', 4
);
insert into faq_items (question, answer, order_index) values (
  'Is competition training available?', 'Yes. Students are encouraged and prepared to participate in club, district, state, national, and international karate events. Our curriculum includes dedicated tournament preparation, kata coaching, and kumite strategy for students who wish to compete.', 5
);
insert into faq_items (question, answer, order_index) values (
  'What is the fee structure?', 'Monthly fees are ₹1,000 for students below 14 years, ₹1,500 for students 15 years and above, and ₹2,000 for adults. Admission includes a student record book, student ID, attendance record, and belt progress record. Uniform, belt, grading fees, and tournament fees are charged separately.', 6
);
insert into faq_items (question, answer, order_index) values (
  'What style of karate does GIMA teach?', 'GIMA teaches Okinawan Goju-Ryu Karate-Do — one of the four major karate styles recognised by the World Karate Federation. Originating in Okinawa, Goju-Ryu combines hard linear techniques with soft circular movements, making it effective for self-defence and excellent for physical and mental conditioning.', 7
);

insert into timeline_items (year, title, description, order_index) values (
  '1998', 'The Beginning', 'Aasan Saravanan T. opens the first Gurushethra dojo in Chennai with a small group of dedicated students and a vision to preserve traditional Okinawan Goju-Ryu Karate in Tamil Nadu.', 0
);
insert into timeline_items (year, title, description, order_index) values (
  '2003', 'First State Results', 'GIMA students represent Chennai at the Tamil Nadu State Karate Championship for the first time — a turning point that established Gurushethra as a serious training academy.', 1
);
insert into timeline_items (year, title, description, order_index) values (
  '2008', 'National Recognition', 'GIMA athletes qualify for the National Karate Championship, earning recognition at the highest level of Indian competition and raising the academy''s profile across Tamil Nadu.', 2
);
insert into timeline_items (year, title, description, order_index) values (
  '2012', 'Second Centre Opens', 'Growing demand from the Chitlapakkam community leads to GIMA''s expansion, bringing structured traditional karate training to a new area of Chennai.', 3
);
insert into timeline_items (year, title, description, order_index) values (
  '2018', 'International Milestones', 'Aasan Saravanan T. is awarded the VII Dan Black Belt in Malaysia — a prestigious international recognition of his mastery and decades of dedication to Goju-Ryu Karate.', 4
);
insert into timeline_items (year, title, description, order_index) values (
  '2024', 'Four Centres, Growing Family', 'With four training centres across Chennai — Chromepet, Chitlapakkam, and Nemilichery — GIMA continues to build champions of character and competition throughout the city.', 5
);

insert into core_values (icon, title, description, order_index) values (
  'Sword', 'Discipline', 'Every great achievement begins with consistent, purposeful practice. We instil discipline that extends far beyond the dojo.', 0
);
insert into core_values (icon, title, description, order_index) values (
  'HandHeart', 'Respect', 'From bowing to your sensei to honouring your opponent — respect is the foundation of every interaction at GIMA.', 1
);
insert into core_values (icon, title, description, order_index) values (
  'Dumbbell', 'Strength', 'Physical and mental strength built through rigorous, progressive training that pushes every student to grow safely.', 2
);
insert into core_values (icon, title, description, order_index) values (
  'Target', 'Focus', 'The ability to be fully present — on the mat and in life. Our training sharpens attention and clears the mind.', 3
);
insert into core_values (icon, title, description, order_index) values (
  'Star', 'Confidence', 'We build genuine confidence from earned skill — the quiet self-assurance that comes from knowing what you are capable of.', 4
);

insert into why_choose_us_reasons (icon, title, description, order_index) values (
  'ShieldCheck', 'VII Dan Black Belt Instructor', 'Aasan Saravanan T. holds a VII Dan Black Belt awarded in Malaysia — over two decades of authentic Okinawan Goju-Ryu teaching experience.', 0
);
insert into why_choose_us_reasons (icon, title, description, order_index) values (
  'Trophy', 'Proven Competition Results', 'GIMA students compete at district, state, national, and international levels. Our training methods are tested in real competition, not just theory.', 1
);
insert into why_choose_us_reasons (icon, title, description, order_index) values (
  'Users', 'All Ages, All Levels', 'Programs from age 4 to adult, complete beginner to black belt. Every student gets a structured curriculum with dedicated instructor time.', 2
);
insert into why_choose_us_reasons (icon, title, description, order_index) values (
  'Sword', 'Traditional Okinawan Karate', 'We teach the full art — traditional Goju-Ryu kata, kumite, bunkai, self-defence, and Silambam. Discipline and character are central to every class.', 3
);
insert into why_choose_us_reasons (icon, title, description, order_index) values (
  'Clock', 'Regular Belt Examinations', 'Structured grading schedule conducted by qualified examiners. Every belt at GIMA is genuinely earned through kihon, kata, kumite, and character.', 4
);
insert into why_choose_us_reasons (icon, title, description, order_index) values (
  'MapPin', '4 Centres Across Chennai', 'Training at Chromepet, Chitlapakkam (2 locations), and Nemilichery — always close to home, with batches designed around school and work schedules.', 5
);

