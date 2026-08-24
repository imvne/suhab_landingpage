import fs from "node:fs";
import path from "node:path";

const DOCS = "docs";
const SUPPORT_EMAIL = "support@minimoapps.fr";
const PUBLISHER_LEGAL_NAME = "MINIMO INC.";
const APP_TRADEMARK = "suhab";

/** Routes SPA : copie de index.html → HTTP 200 (React Router côté client). */
const SPA_ROUTES = [
      "terms-of-use",
      "contact",
      "credits",
      "comingsoon",
      "r/w9k2m7p4xq8n6v3",
];

function copySpaShell(route) {
      const dir = path.join(DOCS, route);
      fs.mkdirSync(dir, { recursive: true });
      fs.copyFileSync(
            path.join(DOCS, "index.html"),
            path.join(dir, "index.html"),
      );
}

function writePrivacyPolicyStatic() {
      const dir = path.join(DOCS, "privacy-policy");
      fs.mkdirSync(dir, { recursive: true });

      const html = `<!doctype html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Politique de confidentialité de l'application ${APP_TRADEMARK}." />
  <title>Politique de confidentialité — ${APP_TRADEMARK}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;700;800&display=swap" rel="stylesheet" />
  <style>
    body { margin: 0; background: #E8E0D5; color: #3B230A; font-family: Epilogue, sans-serif; }
    main { max-width: 720px; margin: 0 auto; padding: 48px 24px 80px; line-height: 1.75; font-size: 16px; }
    h1 { font-size: clamp(28px, 4vw, 40px); font-weight: 800; margin: 0 0 12px; }
    .lead { opacity: 0.85; margin: 0 0 28px; font-size: 15px; }
    h2 { font-size: 20px; font-weight: 700; margin: 32px 0 12px; }
    h3 { font-size: 17px; font-weight: 700; margin: 22px 0 8px; }
    p { margin: 0 0 16px; opacity: 0.9; }
    a { color: #F05E20; }
  </style>
</head>
<body>
  <main>
    <h1>Politique de confidentialité</h1>
    <p class="lead">Application <strong>${APP_TRADEMARK}</strong> — Dernière mise à jour : 27 avril 2026</p>

    <h2>1. Éditeur de l'application</h2>
    <p>L'application mobile <strong>${APP_TRADEMARK}</strong> est éditée par <strong>${PUBLISHER_LEGAL_NAME}</strong>, qui agit en qualité de <strong>responsable du traitement</strong> des données personnelles traitées dans le cadre du service, au sens du Règlement général sur la protection des données (RGPD) et de la loi « Informatique et Libertés ». Pour toute question relative à cette politique ou à vos données : <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>.</p>

    <h2>2. Données collectées</h2>
    <p>${PUBLISHER_LEGAL_NAME} collecte uniquement les données strictement nécessaires au fonctionnement de ${APP_TRADEMARK}. Les données applicatives (profil, progression lorsqu'elle est synchronisée) sont stockées sur une infrastructure fournie par <a href="https://supabase.com" rel="noopener noreferrer">Supabase</a> (hébergement / base de données), en tant que sous-traitant, conformément aux instructions de ${PUBLISHER_LEGAL_NAME} et au RGPD.</p>

    <h3>2.1 Données de compte</h3>
    <p><strong>Prénom</strong> et <strong>langue préférée</strong> permettent d'adapter l'interface et les contenus. Le <strong>genre</strong>, lorsqu'il est renseigné, est <strong>strictement facultatif</strong> : il sert uniquement à la <strong>personnalisation de l'expérience</strong> (ton, formulations ou éléments d'interface adaptés). Vous n'êtes pas tenu(e) de le communiquer ; son absence n'empêche pas l'utilisation du service. Aucune adresse e-mail, numéro de téléphone ou mot de passe n'est collecté directement par ${APP_TRADEMARK} pour le compte applicatif. L'authentification est gérée par les mécanismes de votre appareil (identifiant Apple ou équivalent anonyme).</p>

    <h3>2.2 Données de paiement</h3>
    <p>Les achats et abonnements in-app sont entièrement gérés par Apple via le système In-App Purchase (IAP). ${PUBLISHER_LEGAL_NAME} ne reçoit, ne stocke ni ne traite aucune donnée bancaire ou de carte de crédit. Apple est seul responsable du traitement des données de paiement, conformément à sa propre politique de confidentialité.</p>

    <h3>2.3 Utilisation des données (progression)</h3>
    <p>Votre progression dans les programmes de lecture et les challenges (pages lues, jours de streak, objectifs complétés) peut être conservée localement sur votre appareil et/ou synchronisée sur <strong>Supabase</strong> afin de vous fournir le service et de refléter fidèlement votre parcours dans ${APP_TRADEMARK}.</p>

    <h2>3. Finalités et base légale du traitement</h2>
    <p>Les données sont utilisées afin d'améliorer votre expérience d'utilisation et la personnalisation du service (affichage, contenu adapté, suivi de votre parcours et des fonctionnalités que vous utilisez), dans le respect du RGPD. Le traitement repose notamment sur l'exécution du contrat lorsque vous utilisez ${APP_TRADEMARK} ou souscrivez à des options payantes, et sur notre intérêt légitime à proposer une application fiable et pertinente pour les utilisateurs lorsque la loi le permet.</p>

    <h2>4. Durée de conservation</h2>
    <p>Vos données sont conservées pendant toute la durée d'utilisation active de votre compte. Si vous supprimez l'application ou demandez la suppression de votre compte, vos données personnelles sont effacées dans un délai de 30 jours, sous réserve des obligations légales de conservation.</p>

    <h2>5. Partage des données et sous-traitants</h2>
    <p>${PUBLISHER_LEGAL_NAME} ne vend, ne loue ni ne partage vos données personnelles avec des tiers à des fins commerciales. Interviennent toutefois les prestataires suivants, dans le cadre de leur mission et du RGPD : <strong>Apple Inc.</strong> (distribution sur l'App Store et paiements in-app) ; <strong>Supabase</strong> (hébergement et exploitation de la base de données applicative) ; <strong>Functional Software Inc. (Sentry)</strong> pour la surveillance technique décrite à la section suivante. Les sous-traitants ne traitent les données que sur instruction de ${PUBLISHER_LEGAL_NAME}.</p>

    <h2>6. Sentry (stabilité et correction des bugs)</h2>
    <p>${PUBLISHER_LEGAL_NAME} utilise <a href="https://sentry.io/welcome/" rel="noopener noreferrer">Sentry</a> pour la <strong>surveillance des performances</strong> et le <strong>diagnostic des erreurs techniques</strong> afin d'améliorer la stabilité de ${APP_TRADEMARK} et de <strong>corriger les bugs</strong>. Les événements transmis concernent des <strong>données techniques</strong> (par exemple type d'appareil, version du système, trace d'erreur) permettant d'identifier un dysfonctionnement. Sentry n'est <strong>pas utilisé pour constituer un profil marketing</strong> ni pour conserver des <strong>informations personnelles</strong> au-delà de ce qui est nécessaire à cette finalité technique. Pour plus de détails sur le traitement côté Sentry, vous pouvez consulter la documentation de <a href="https://sentry.io/privacy/" rel="noopener noreferrer">Sentry</a>.</p>

    <h2>7. Vos droits (RGPD)</h2>
    <p>Conformément au RGPD et à la loi Informatique et Libertés, vous pouvez exercer vos droits d'accès, de rectification, d'effacement, de limitation, de portabilité et d'opposition en écrivant à <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>. Nous répondrons dans les délais prévus par la loi. Vous pouvez aussi introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" rel="noopener noreferrer">www.cnil.fr</a>).</p>

    <h2>8. Sécurité</h2>
    <p>${PUBLISHER_LEGAL_NAME} met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, altération, divulgation ou destruction.</p>

    <h2>9. Modifications</h2>
    <p>Nous nous réservons le droit de mettre à jour cette politique. En cas de modification substantielle, vous en serez informé via l'application lorsque cela est possible. La date de dernière mise à jour est indiquée en haut de ce document.</p>

    <h2>10. Contact</h2>
    <p>Pour toute question relative à la protection de vos données : <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a></p>
  </main>
</body>
</html>`;

      fs.writeFileSync(path.join(dir, "index.html"), html);
}

// ── GitHub Pages : fallback SPA + routes statiques ──────────────────────
fs.copyFileSync(path.join(DOCS, "index.html"), path.join(DOCS, "404.html"));
fs.writeFileSync(path.join(DOCS, ".nojekyll"), "");

writePrivacyPolicyStatic();

for (const route of SPA_ROUTES) {
      copySpaShell(route);
}

// Même build servi sous /suhab
fs.mkdirSync(path.join(DOCS, "suhab"), { recursive: true });
fs.copyFileSync(
      path.join(DOCS, "index.html"),
      path.join(DOCS, "suhab", "index.html"),
);
fs.mkdirSync(path.join(DOCS, "suhab", "privacy-policy"), { recursive: true });
fs.copyFileSync(
      path.join(DOCS, "privacy-policy", "index.html"),
      path.join(DOCS, "suhab", "privacy-policy", "index.html"),
);
for (const route of SPA_ROUTES) {
      copySpaShell(`suhab/${route}`);
}

console.log("postbuild: routes statiques générées (privacy-policy → HTTP 200)");
