export type Locale = 'it' | 'en' | 'es' | 'de' | 'fr';

export const LOCALES: Locale[] = ['it', 'en', 'es', 'de', 'fr'];

export const LOCALE_NAMES: Record<Locale, string> = {
  it: 'Italiano',
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  fr: 'Français',
};

export const LOCALE_OG: Record<Locale, string> = {
  it: 'it_IT',
  en: 'en_US',
  es: 'es_ES',
  de: 'de_DE',
  fr: 'fr_FR',
};

export interface SplitTitle {
  pre: string;
  italic: string;
  post?: string;
}

export interface Differentiator {
  title: string;
  body: string;
}

export interface Modulo {
  title: string;
  body: string;
}

export interface WidgetItem {
  src: string;
  title: string;
  desc: string;
}

export interface FaqItem {
  q: string;
  a: string[];
}

export interface BlogStrings {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageHeading: string;
  pageSubtitle: string;
  emptyState: string;
  readMore: string;
  publishedOn: string;
  updatedOn: string;
  minRead: string;
  backToBlog: string;
  relatedPosts: string;
  tags: string;
  by: string;
  latestArticles: string;
  appCardTitle: string;
  appCardSubtitle: string;
  appCardCta: string;
  tocLabel: string;
  authorReadMore: string;
  authorLinkedin: string;
}

export interface AboutStrings {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface PlatformStrings {
  availableOn: string;
  iosComingLink: string;
}

export interface WaitlistStrings {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: SplitTitle;
  intro: string;
  formEmailLabel: string;
  formEmailPlaceholder: string;
  formUseCaseLabel: string;
  formUseCasePlaceholder: string;
  formUseCaseOptional: string;
  formSubmit: string;
  formSubmitting: string;
  privacyNote: string;
  successTitle: string;
  successBody: string;
  errorGeneric: string;
  errorInvalidEmail: string;
  errorAlreadyJoined: string;
  errorTurnstile: string;
  backToHome: string;
}

export interface LandingStrings {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    perche: string;
    cosaFa: string;
    widget: string;
    privacy: string;
    faq: string;
    blog: string;
    download: string;
  };
  hero: {
    h1: SplitTitle;
    pitch: string;
    ctaPrimary: string;
    ctaGhost: string;
    cardStage: string;
    cardOverwhelm: string;
    cardStatLevel: string;
  };
  platform: PlatformStrings;
  perche: {
    eyebrow: string;
    title: SplitTitle;
    subtitle: string;
    items: Differentiator[];
  };
  cosaFa: {
    eyebrow: string;
    title: SplitTitle;
    subtitle: string;
    moduli: Modulo[];
  };
  widget: {
    eyebrow: string;
    title: SplitTitle;
    subtitle: string;
    items: WidgetItem[];
  };
  audience: {
    eyebrow: string;
    title: SplitTitle;
    body1: string;
    body2Html: string;
  };
  privacy: {
    eyebrow: string;
    title: SplitTitle;
    subtitle: string;
    bulletsHtml: string[];
    linkText: string;
  };
  faq: {
    eyebrow: string;
    title: SplitTitle;
    items: FaqItem[];
  };
  finalCta: {
    title: SplitTitle;
    body: string;
    cta: string;
  };
  footer: {
    tagline: string;
    appHeader: string;
    privacyHeader: string;
    contactHeader: string;
    appLinks: {
      googlePlay: string;
      iosWaitlist: string;
      cosaFa: string;
      widget: string;
      faq: string;
    };
    privacyPolicy: string;
    email: string;
  };
  langSwitcher: {
    label: string;
  };
  blog: BlogStrings;
  about: AboutStrings;
  waitlist: WaitlistStrings;
}
