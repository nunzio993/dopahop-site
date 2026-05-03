import type { LandingStrings } from './types';

export const fr: LandingStrings = {
  meta: {
    title: "DopaHop — L'app TDAH qui t'attend, sans te courir après",
    description:
      "App TDAH pour adultes : Pomodoro, rappels médicaments, brain dump, focus sounds. Aucune streak, aucune culpabilité. Outils pour TDAH, TDA, neuroatypie.",
  },
  nav: {
    perche: 'Pourquoi',
    cosaFa: 'Ce que ça fait',
    widget: 'Widgets',
    privacy: 'Confidentialité',
    faq: 'FAQ',
    blog: 'Blog',
    download: 'Télécharger',
  },
  hero: {
    h1: {
      pre: "L'app TDAH qui ",
      italic: "t'attend,",
      post: ' sans te courir après.',
    },
    pitch:
      "Aucune streak à entretenir. Aucun message culpabilisant si tu sautes un jour. Juste des outils bienveillants pour les journées difficiles — et Hop, qui t'attend toujours.",
    ctaPrimary: 'Télécharger gratuitement sur Google Play',
    ctaGhost: 'Ce que ça fait →',
    cardStage: 'Sautillant — Niveau 5',
    cardOverwhelm: 'Dépassé ?',
    cardStatLevel: '131 jusqu\'au niveau suivant',
  },
  perche: {
    eyebrow: 'Pourquoi DopaHop',
    title: {
      pre: "Sauter un jour, ",
      italic: "ce n'est pas échouer.",
    },
    subtitle:
      "Les autres apps te punissent quand tu sautes un jour. DopaHop fait trois choses différentes — et c'est pour ça qu'elle reste sur ton téléphone.",
    items: [
      {
        title: "Hop t'attend. Toujours.",
        body: "Même si tu reviens après une semaine compliquée, Hop est là. Aucun reproche, aucun \"tu as perdu ton record\". Un petit compagnon qui grandit avec toi à chaque fois que tu lui consacres un peu de temps.",
      },
      {
        title: 'Aucune streak, aucune culpabilité.',
        body: "Aucun chiffre rouge, aucune notification insistante, aucun message qui te fait sentir nul. Si tu sautes un jour, demain c'est juste un autre jour.",
      },
      {
        title: 'Tes données restent sur ton téléphone.',
        body: "Mood, médicaments, pensées, routines : tout reste sur l'appareil. Aucun compte, aucun serveur, personne pour analyser ce que tu écris quand tu craques à 3 h du matin.",
      },
    ],
  },
  cosaFa: {
    eyebrow: 'Ce que ça fait',
    title: {
      pre: 'Des outils bienveillants, ',
      italic: 'pas des gourous de la productivité.',
    },
    subtitle:
      "Les choses qui servent vraiment quand tu as un TDAH. Tu actives ce dont tu as besoin, tu ignores le reste. C'est toi qui décides.",
    moduli: [
      {
        title: "Pomodoro pour quand tu n'arrives pas à commencer",
        body: "25 minutes, une chose à la fois. Tu lances et c'est tout : le minuteur tourne tout seul, toi tu fais. Quand ça sonne, tu as fini quelque chose de concret — et ça se voit.",
      },
      {
        title: 'Rappels médicaments, sans te harceler',
        body: "Notification à la bonne heure avec trois boutons : Pris, Dans 10 min, Sauté. Tout depuis la notification, sans ouvrir l'app. Si tu sautes une dose, aucun reproche.",
      },
      {
        title: 'Brain dump pour vider la tête',
        body: "En dix secondes tu poses une pensée avant qu'elle disparaisse. Tu la retrouves quand tu veux et tu la transformes en tâche ou en liste de courses d'un geste. Plus de pensées perdues.",
      },
      {
        title: "Découpe-tâches quand ça te paralyse",
        body: "\"Écrire la thèse\" devient \"ouvrir le document\". \"Nettoyer la cuisine\" devient \"déplacer une tasse\". Cinq étapes concrètes, parce que commencer c'est la partie difficile.",
      },
      {
        title: 'Routines à ta mesure',
        body: "Tu glisses les étapes dans l'ordre que tu veux. Tu lances et l'app t'accompagne une étape à la fois, avec minuteur intégré et pause quand tu en as besoin. Uniquement ce que tu décides.",
      },
      {
        title: 'Mood check-in en dix secondes',
        body: "Trois touches : comment ça va, ton niveau d'énergie, un tag si tu veux. Le graphique de la semaine t'aide à reconnaître quand ça va mieux et quand ça va moins bien. Aucun journal, aucun formulaire.",
      },
      {
        title: 'Focus sounds en fond',
        body: "Pluie, lofi, brown noise, café, océan et d'autres. Ils tournent en fond pendant que tu fais autre chose et s'arrêtent d'un toucher depuis l'écran d'accueil. Aucun compte, aucun abonnement.",
      },
      {
        title: '"Quand est-ce que je l\'ai fait pour la dernière fois ?"',
        body: "Pour les choses occasionnelles que tu oublies tout le temps : draps, pharmacie, appel à maman. Tu vois d'un coup d'œil depuis combien de jours, sans devoir te souvenir de rien.",
      },
      {
        title: 'La maison, une pièce à la fois',
        body: "Des petites choses regroupées par pièce, avec des minuteurs pensés pour le TDAH. Quand tu ne sais pas par où commencer, Hop en choisit une pour toi. Si tu ne finis pas, l'app s'arrête toute seule — et demain elle ne te repropose pas ce que tu as déjà fait.",
      },
    ],
  },
  widget: {
    eyebrow: "Sur l'écran d'accueil, sans ouvrir l'app",
    title: {
      pre: 'Une tâche. ',
      italic: 'Un tap.',
    },
    subtitle:
      "Les widgets Android montrent la chose qui compte maintenant. Un toucher et c'est parti. Aucune étape inutile, aucun \"ouvre l'app pour découvrir\".",
    items: [
      {
        src: 'widget-housekeeping',
        title: 'La tâche maison la plus en retard',
        desc: 'Sans choisir, sans réfléchir. Touche "Faire maintenant" et lance-toi.',
      },
      {
        src: 'widget-routine',
        title: 'Routine en un toucher',
        desc: "Lance ta routine du matin ou du soir depuis l'accueil, l'app te guide étape par étape.",
      },
      {
        src: 'widget-meds',
        title: 'Prochaine dose',
        desc: "Tu vois l'heure, tu marques comme prise, tout depuis l'accueil.",
      },
      {
        src: 'widget-mood',
        title: 'Mood en dix secondes',
        desc: 'Trois touches, aucune question longue, aucun journal.',
      },
      {
        src: 'widget-focus',
        title: 'Sons relaxants à la volée',
        desc: "Lofi, pluie ou brown noise en fond. Ça s'arrête depuis l'accueil.",
      },
      {
        src: 'widget-time',
        title: "Depuis combien de temps...",
        desc: '"Quand ai-je changé les draps ?" — toujours sous les yeux.',
      },
      {
        src: 'widget-braindump',
        title: 'Une pensée à la volée',
        desc: "Deux touches et c'est noté, avant de la perdre.",
      },
    ],
  },
  audience: {
    eyebrow: 'Pour qui',
    title: {
      pre: 'Pour qui en a marre de se sentir ',
      italic: 'nul.',
    },
    body1:
      "Pour qui a essayé dix apps pour s'organiser et chacune t'a fait sentir pire. Pour qui a compris que le problème ce n'est pas la discipline. Pour qui cherche des outils bienveillants, pas un autre gourou de la productivité.",
    body2Html:
      '<strong>TDAH, TDA, autisme, anxiété, dysfonction exécutive, neuroatypie.</strong> Même sans diagnostic : DopaHop fonctionne pour quiconque se reconnaît dans ces mots.',
  },
  privacy: {
    eyebrow: 'Confidentialité',
    title: {
      pre: 'Aucun compte. ',
      italic: 'Aucun serveur.',
    },
    subtitle:
      "DopaHop ne te demande ni e-mail, ni mot de passe, ni connexion sociale. Tout reste sur ton téléphone.",
    bulletsHtml: [
      'Tes données restent <strong>uniquement sur ton téléphone</strong>',
      "Personne n'analyse <strong>ce que tu écris</strong> dans les brain dumps, le mood ou les médicaments",
      'Tu exportes ou supprimes tout en un toucher, quand tu veux',
      'Publicité uniquement dans des zones neutres — <strong>jamais pendant la respiration, les médicaments, le mood ou le focus</strong>',
      'Verrouillage par empreinte ou reconnaissance faciale, si tu veux',
    ],
    linkText: 'Politique de confidentialité complète →',
  },
  faq: {
    eyebrow: 'FAQ',
    title: {
      pre: 'Les questions ',
      italic: 'que tu nous poses.',
    },
    items: [
      {
        q: "C'est vraiment gratuit ?",
        a: [
          "Oui, tout. Pomodoro, médicaments, mood, brain dump, focus sounds, Hop — tout gratuit, sans limites. Petites bannières publicitaires dans des zones neutres, jamais pendant les moments qui comptent (respiration, médicaments, focus, check-in mood).",
          "Plus tard arrivera un plan <strong>optionnel</strong> pour qui veut les outils IA (tâches automatiques, notes vocales transcrites) et zéro pub — mais le cœur restera toujours gratuit.",
        ],
      },
      {
        q: 'Dois-je créer un compte ?',
        a: [
          "Non. Tu ouvres l'app et tu démarres. Aucun e-mail, aucun mot de passe, aucune connexion sociale. Tes données restent sur ton téléphone.",
        ],
      },
      {
        q: "Ça marche si je n'ai pas de diagnostic TDAH ?",
        a: [
          "Oui. DopaHop est pensée pour les cerveaux TDAH, mais elle marche pour quiconque se reconnaît : difficulté à commencer une tâche, sensation que le temps disparaît, pensées qui se perdent, paralysie devant les grandes choses. Pas besoin de diagnostic pour l'utiliser.",
        ],
      },
      {
        q: 'Mes données peuvent-elles atterrir quelque part ?',
        a: [
          "Non. DopaHop enregistre tout en local sur le téléphone. Aucun serveur n'intervient pour tes contenus. La seule donnée qui sort du téléphone, c'est l'<em>Advertising ID</em> Android pour les bannières — et tu peux le désactiver depuis les paramètres système.",
        ],
      },
      {
        q: "C'est une app médicale ?",
        a: [
          "Non. DopaHop est un outil de bien-être, elle ne remplace ni consultation médicale, ni thérapie, ni traitement. Pour les dosages de médicaments, la thérapie ou les urgences, parle à un professionnel qualifié. En cas d'urgence sanitaire : le 112.",
        ],
      },
    ],
  },
  finalCta: {
    title: {
      pre: 'Prêt pour ',
      italic: 'des petits sauts ?',
    },
    body: "Tu ouvres l'app, tu actives ce dont tu as besoin aujourd'hui, et Hop s'occupe du reste.",
    cta: 'Télécharger gratuitement sur Google Play',
  },
  footer: {
    tagline: 'Des outils bienveillants pour des cerveaux qui fonctionnent autrement.',
    appHeader: 'App',
    privacyHeader: 'Confidentialité',
    contactHeader: 'Écris-nous',
    appLinks: {
      googlePlay: 'Google Play',
      cosaFa: 'Ce que ça fait',
      widget: 'Widgets',
      faq: 'FAQ',
    },
    privacyPolicy: 'Politique de confidentialité',
    email: 'E-mail',
  },
  langSwitcher: {
    label: 'Langue',
  },
  blog: {
    metaTitle: 'Blog DopaHop — TDAH, focus, stratégies bienveillantes',
    metaDescription:
      "Articles pratiques sur le TDAH, le focus et des stratégies bienveillantes pour les cerveaux qui fonctionnent autrement. Sans gourous, sans culpabilité.",
    pageTitle: 'Articles',
    pageSubtitle:
      "Stratégies pratiques sur le TDAH, le focus et des routines bienveillantes. Sans gourous, sans culpabilité.",
    emptyState: "Pas encore d'articles. Reviens bientôt.",
    readMore: 'Lire',
    publishedOn: 'Publié le',
    updatedOn: 'Mis à jour le',
    minRead: 'min de lecture',
    backToBlog: '← Tous les articles',
    relatedPosts: 'Articles liés',
    tags: 'Tags',
    by: 'par',
  },
};
