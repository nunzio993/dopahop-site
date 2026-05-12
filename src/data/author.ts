import type { Locale } from '../i18n/types';

export const AUTHOR_NAME = 'Nunzio C.';
export const AUTHOR_FULL_NAME = 'Nunzio Cocciolo';
export const AUTHOR_PHOTO = '/img/authors/nunzio.jpg';
export const AUTHOR_LINKEDIN = 'https://www.linkedin.com/in/nunzio-cocciolo-a51064115/';

export const AUTHOR_ROLE: Record<Locale, string> = {
  it: 'Founder di DopaHop · ADHD diagnosticato da adulto',
  en: 'Founder of DopaHop · ADHD diagnosed as an adult',
  es: 'Fundador de DopaHop · TDAH diagnosticado en la edad adulta',
  de: 'Gründer von DopaHop · ADHS als Erwachsener diagnostiziert',
  fr: 'Fondateur de DopaHop · TDAH diagnostiqué à l\'âge adulte',
};

export const AUTHOR_BIO_SHORT: Record<Locale, string> = {
  it: 'Nunzio è il founder di DopaHop. ADHD diagnosticato da adulto, costruisce strumenti gentili per cervelli neurodivergenti — quelli che vorrebbe avere lui.',
  en: 'Nunzio is the founder of DopaHop. Diagnosed with ADHD as an adult, he builds gentle tools for neurodivergent brains — the ones he wishes he had.',
  es: 'Nunzio es el fundador de DopaHop. Diagnosticado con TDAH en la edad adulta, construye herramientas amables para cerebros neurodivergentes — las que le habría gustado tener.',
  de: 'Nunzio ist Gründer von DopaHop. Als Erwachsener mit ADHS diagnostiziert, baut er sanfte Werkzeuge für neurodivergente Gehirne — die, die er sich gewünscht hätte.',
  fr: 'Nunzio est le fondateur de DopaHop. Diagnostiqué TDAH à l\'âge adulte, il construit des outils doux pour cerveaux neurodivergents — ceux qu\'il aurait voulu avoir.',
};

export const AUTHOR_BIO_LONG: Record<Locale, string[]> = {
  it: [
    'Sono Nunzio, founder di DopaHop. Ho ADHD diagnosticato da adulto.',
    'Costruisco strumenti per cervelli neurodivergenti perché quelli che esistevano mi facevano sentire peggio invece che meglio: contano i giorni consecutivi, ti rimproverano se ne salti uno, ti fanno sentire un fallimento. DopaHop fa l\'opposto: ti aspetta, non ti rimprovera.',
    'Su questo blog scrivo quello che imparo da ricerca, utenti e dalla mia esperienza diretta — senza guru, senza scorciatoie.',
  ],
  en: [
    'I\'m Nunzio, founder of DopaHop. Diagnosed with ADHD as an adult.',
    'I build tools for neurodivergent brains because the ones that existed made me feel worse, not better: they count consecutive days, scold you if you skip one, make you feel like a failure. DopaHop does the opposite — it waits for you, it doesn\'t scold you.',
    'On this blog I write what I learn from research, from users, and from my own direct experience — no gurus, no shortcuts.',
  ],
  es: [
    'Soy Nunzio, fundador de DopaHop. Diagnosticado con TDAH siendo adulto.',
    'Construyo herramientas para cerebros neurodivergentes porque las que existían me hacían sentir peor en lugar de mejor: cuentan los días consecutivos, te regañan si saltas uno, te hacen sentir un fracasado. DopaHop hace lo contrario: te espera, no te regaña.',
    'En este blog escribo lo que aprendo de la investigación, de los usuarios y de mi propia experiencia directa — sin gurús, sin atajos.',
  ],
  de: [
    'Ich bin Nunzio, Gründer von DopaHop. Als Erwachsener mit ADHS diagnostiziert.',
    'Ich baue Werkzeuge für neurodivergente Gehirne, weil die bestehenden mich schlechter statt besser fühlen ließen: Sie zählen aufeinanderfolgende Tage, rügen dich, wenn du einen aussetzt, lassen dich wie ein Versager fühlen. DopaHop macht das Gegenteil — es wartet auf dich, es rügt dich nicht.',
    'In diesem Blog schreibe ich, was ich aus Forschung, aus Nutzer-Feedback und aus eigener direkter Erfahrung lerne — keine Gurus, keine Abkürzungen.',
  ],
  fr: [
    'Je suis Nunzio, fondateur de DopaHop. Diagnostiqué TDAH à l\'âge adulte.',
    'Je construis des outils pour cerveaux neurodivergents parce que ceux qui existaient me faisaient sentir pire au lieu de mieux : ils comptent les jours consécutifs, te grondent si tu en sautes un, te font sentir comme un raté. DopaHop fait le contraire — il t\'attend, il ne te gronde pas.',
    'Sur ce blog j\'écris ce que j\'apprends de la recherche, des utilisateurs et de ma propre expérience directe — sans gourous, sans raccourcis.',
  ],
};

export const AUTHOR_KNOWS_ABOUT = [
  'ADHD',
  'Adult ADHD',
  'Neurodivergence',
  'Executive dysfunction',
  'Productivity for ADHD',
  'Android development',
];

export function authorAboutUrl(locale: Locale): string {
  return locale === 'it' ? '/about/' : `/${locale}/about/`;
}

export function authorPersonSchema(locale: Locale, siteUrl: string) {
  return {
    '@type': 'Person',
    '@id': new URL(authorAboutUrl(locale), siteUrl).toString() + '#person',
    name: AUTHOR_NAME,
    alternateName: AUTHOR_FULL_NAME,
    url: new URL(authorAboutUrl(locale), siteUrl).toString(),
    image: new URL(AUTHOR_PHOTO, siteUrl).toString(),
    jobTitle: AUTHOR_ROLE[locale],
    description: AUTHOR_BIO_SHORT[locale],
    knowsAbout: AUTHOR_KNOWS_ABOUT,
    sameAs: [AUTHOR_LINKEDIN],
    worksFor: {
      '@type': 'Organization',
      name: 'DopaHop',
      url: siteUrl,
    },
  };
}
