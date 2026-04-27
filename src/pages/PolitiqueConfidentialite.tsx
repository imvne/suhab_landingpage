import styled from "styled-components";
import { SUPPORT_EMAIL } from "../config/contact";
import { APP_TRADEMARK, PUBLISHER_LEGAL_NAME } from "../config/legal";

const C = {
  text: "#3B230A",
  beigeMid: "#E8E0D5",
  accent: "#F05E20",
} as const;

export default function PolitiqueConfidentialite() {
  return (
    <StyledPage>
      <StyledInner>
        <StyledH1>Politique de confidentialité</StyledH1>
        <StyledLead>
          Application <strong>{APP_TRADEMARK}</strong> — Dernière mise à jour : 27
          avril 2026
        </StyledLead>
        <StyledContent>
          <h2>1. Éditeur de l&apos;application</h2>
          <p>
            L&apos;application mobile <strong>{APP_TRADEMARK}</strong> est
            éditée par <strong>{PUBLISHER_LEGAL_NAME}</strong>, qui agit en qualité
            de <strong>responsable du traitement</strong> des données personnelles
            traitées dans le cadre du service, au sens du Règlement général sur la
            protection des données (RGPD) et de la loi « Informatique et Libertés ».
            Pour toute question relative à cette politique ou à vos données :{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
          </p>

          <h2>2. Données collectées</h2>
          <p>
            {PUBLISHER_LEGAL_NAME} collecte uniquement les données strictement
            nécessaires au fonctionnement de {APP_TRADEMARK}. Les données
            applicatives (profil, progression lorsqu&apos;elle est synchronisée)
            sont stockées sur une infrastructure fournie par{" "}
            <a
                  href="https://supabase.com"
                  target="_blank"
                  rel="noopener noreferrer"
            >
                  Supabase
            </a>{" "}
            (hébergement / base de données), en tant que sous-traitant, conformément
            aux instructions de {PUBLISHER_LEGAL_NAME} et au RGPD.
          </p>

          <h3>2.1 Données de compte</h3>
          <p>
            <strong>Prénom</strong> et <strong>langue préférée</strong> permettent
            d&apos;adapter l&apos;interface et les contenus. Le{" "}
            <strong>genre</strong>, lorsqu&apos;il est renseigné, est{" "}
            <strong>strictement facultatif</strong> : il sert uniquement à la{" "}
            <strong>personnalisation de l&apos;expérience</strong> (ton, formulations
            ou éléments d&apos;interface adaptés). Vous n&apos;êtes pas tenu(e) de le
            communiquer ; son absence n&apos;empêche pas l&apos;utilisation du
            service. Aucune adresse e-mail, numéro de téléphone ou mot de passe
            n&apos;est collecté directement par {APP_TRADEMARK} pour le compte
            applicatif. L&apos;authentification est gérée par les mécanismes de
            votre appareil (identifiant Apple ou équivalent anonyme).
          </p>

          <h3>2.2 Données de paiement</h3>
          <p>
            Les achats et abonnements in-app sont entièrement gérés par Apple via
            le système In-App Purchase (IAP). {PUBLISHER_LEGAL_NAME} ne reçoit, ne
            stocke ni ne traite aucune donnée bancaire ou de carte de crédit. Apple
            est seul responsable du traitement des données de paiement, conformément
            à sa propre politique de confidentialité.
          </p>

          <h3>2.3 Utilisation des données (progression)</h3>
          <p>
            Votre progression dans les programmes de lecture et les challenges
            (pages lues, jours de streak, objectifs complétés) peut être conservée
            localement sur votre appareil et/ou synchronisée sur{" "}
            <strong>Supabase</strong> afin de vous fournir le service et de refléter
            fidèlement votre parcours dans {APP_TRADEMARK}.
          </p>

          <h2>3. Finalités et base légale du traitement</h2>
          <p>
            Les données sont utilisées afin d&apos;améliorer votre expérience
            d&apos;utilisation et la personnalisation du service (affichage,
            contenu adapté, suivi de votre parcours et des fonctionnalités que vous
            utilisez), dans le respect du RGPD. Le traitement repose notamment sur
            l&apos;exécution du contrat lorsque vous utilisez {APP_TRADEMARK} ou
            souscrivez à des options payantes, et sur notre intérêt légitime à
            proposer une application fiable et pertinente pour les utilisateurs
            lorsque la loi le permet.
          </p>

          <h2>4. Durée de conservation</h2>
          <p>
            Vos données sont conservées pendant toute la durée d&apos;utilisation
            active de votre compte. Si vous supprimez l&apos;application ou
            demandez la suppression de votre compte, vos données personnelles sont
            effacées dans un délai de 30 jours, sous réserve des obligations légales
            de conservation.
          </p>

          <h2>5. Partage des données et sous-traitants</h2>
          <p>
            {PUBLISHER_LEGAL_NAME} ne vend, ne loue ni ne partage vos données
            personnelles avec des tiers à des fins commerciales. Interviennent
            toutefois les prestataires suivants, dans le cadre de leur mission et du
            RGPD : <strong>Apple Inc.</strong> (distribution sur l&apos;App Store et
            paiements in-app) ; <strong>Supabase</strong> (hébergement et
            exploitation de la base de données applicative) ;{" "}
            <strong>Functional Software Inc. (Sentry)</strong> pour la surveillance
            technique décrite à la section suivante. Les sous-traitants ne
            traitent les données que sur instruction de {PUBLISHER_LEGAL_NAME}.
          </p>

          <h2>6. Sentry (stabilité et correction des bugs)</h2>
          <p>
            {PUBLISHER_LEGAL_NAME} utilise{" "}
            <a
                  href="https://sentry.io/welcome/"
                  target="_blank"
                  rel="noopener noreferrer"
            >
                  Sentry
            </a>{" "}
            pour la <strong>surveillance des performances</strong> et le{" "}
            <strong>diagnostic des erreurs techniques</strong> afin d&apos;améliorer
            la stabilité de {APP_TRADEMARK} et de <strong>corriger les bugs</strong>
            . Les événements transmis concernent des{" "}
            <strong>données techniques</strong> (par exemple type d&apos;appareil,
            version du système, trace d&apos;erreur) permettant d&apos;identifier un
            dysfonctionnement. Sentry n&apos;est{" "}
            <strong>pas utilisé pour constituer un profil marketing</strong> ni
            pour conserver des <strong>informations personnelles</strong> au-delà de
            ce qui est nécessaire à cette finalité technique. Pour plus de détails
            sur le traitement côté Sentry, vous pouvez consulter la documentation de{" "}
            <a
                  href="https://sentry.io/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
            >
                  Sentry
            </a>
            .
          </p>

          <h2>7. Vos droits (RGPD)</h2>
          <p>
            Conformément au RGPD et à la loi Informatique et Libertés, vous pouvez
            exercer vos droits d&apos;accès, de rectification, d&apos;effacement, de
            limitation, de portabilité et d&apos;opposition en écrivant à{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Nous répondrons
            dans les délais prévus par la loi. Vous pouvez aussi introduire une
            réclamation auprès de la CNIL (
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
                  www.cnil.fr
            </a>
            ).
          </p>

          <h2>8. Sécurité</h2>
          <p>
            {PUBLISHER_LEGAL_NAME} met en œuvre des mesures techniques et
            organisationnelles appropriées pour protéger vos données contre tout
            accès non autorisé, altération, divulgation ou destruction.
          </p>

          <h2>9. Modifications</h2>
          <p>
            Nous nous réservons le droit de mettre à jour cette politique. En cas de
            modification substantielle, vous en serez informé via l&apos;application
            lorsque cela est possible. La date de dernière mise à jour est indiquée
            en haut de ce document.
          </p>

          <h2>10. Contact</h2>
          <p>
            Pour toute question relative à la protection de vos données :{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </p>
        </StyledContent>
      </StyledInner>
    </StyledPage>
  );
}

const StyledPage = styled.article`
  background-color: ${C.beigeMid};
  min-height: 60vh;
  padding: 140px 24px 80px;
`;

const StyledInner = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

const StyledH1 = styled.h1`
  font-family: "Epilogue", sans-serif;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 800;
  color: ${C.text};
  margin-bottom: 12px;
`;

const StyledLead = styled.p`
  font-family: "Epilogue", sans-serif;
  font-size: 15px;
  color: ${C.text};
  opacity: 0.85;
  margin-bottom: 28px;
  line-height: 1.5;
`;

const StyledContent = styled.div`
  font-family: "Epilogue", sans-serif;
  font-size: 16px;
  line-height: 1.75;
  color: ${C.text};

  h2 {
    font-size: 20px;
    font-weight: 700;
    margin: 32px 0 12px;
  }

  h3 {
    font-size: 17px;
    font-weight: 700;
    margin: 22px 0 8px;
  }

  p {
    margin-bottom: 16px;
    opacity: 0.9;
  }

  a {
    color: ${C.accent};
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;
