import styled from "styled-components";

const C = {
  text: "#3B230A",
  beigeMid: "#E8E0D5",
  accent: "#F05E20",
} as const;

const CONTACT = "support@minimoapps.fr";

export default function PolitiqueConfidentialite() {
  return (
    <StyledPage>
      <StyledInner>
        <StyledH1>Politique de confidentialité</StyledH1>
        <StyledLead>
          Application <strong>Suhab</strong> — Dernière mise à jour : 27 avril
          2026
        </StyledLead>
        <StyledContent>
          <h2>1. Données collectées</h2>
          <p>
            Nous collectons uniquement les données strictement nécessaires au
            fonctionnement de l&apos;application.
          </p>

          <h3>1.1 Données de compte</h3>
          <p>
            Prénom, genre (optionnel), langue préférée. Aucune adresse e-mail,
            numéro de téléphone ou mot de passe n&apos;est collecté directement
            par Suhab. L&apos;authentification est gérée par les mécanismes de
            votre appareil (identifiant Apple ou équivalent anonyme).
          </p>

          <h3>1.2 Données de paiement</h3>
          <p>
            Les achats et abonnements in-app sont entièrement gérés par Apple
            via le système In-App Purchase (IAP). Nous ne recevons, ne stockons
            ni ne traitons aucune donnée bancaire ou de carte de crédit. Apple
            est seul responsable du traitement des données de paiement,
            conformément à sa propre politique de confidentialité.
          </p>

          <h3>1.3 Utilisation des données</h3>
          <p>
            Votre progression dans les programmes de lecture et les challenges
            (pages lues, jours de streak, objectifs complétés) est enregistrée
            localement sur votre appareil et/ou sur nos serveurs afin de vous
            fournir le service et de refléter fidèlement votre parcours dans
            l&apos;application.
          </p>

          <h2>2. Finalités et base légale du traitement</h2>
          <p>
            Les données sont utilisées afin d&apos;améliorer votre expérience
            d&apos;utilisation et la personnalisation du service (affichage,
            contenu adapté, suivi de votre parcours et des fonctionnalités que
            vous utilisez), dans le respect du RGPD. Le traitement repose
            notamment sur l&apos;exécution du contrat lorsque vous utilisez
            Suhab ou souscrivez à des options payantes, et sur notre intérêt
            légitime à proposer une application fiable et pertinente pour les
            utilisateurs lorsque la loi le permet.
          </p>

          <h2>3. Durée de conservation</h2>
          <p>
            Vos données sont conservées pendant toute la durée d&apos;utilisation
            active de votre compte. Si vous supprimez l&apos;application ou
            demandez la suppression de votre compte, vos données personnelles
            sont effacées dans un délai de 30 jours, sous réserve des
            obligations légales de conservation.
          </p>

          <h2>4. Partage des données</h2>
          <p>
            Nous ne vendons, ne louons ni ne partageons vos données personnelles
            avec des tiers à des fins commerciales. Des prestataires peuvent
            toutefois intervenir dans des conditions encadrées : Apple pour la
            distribution de l&apos;application et les paiements in-app, et
            notre hébergeur ou prestataire technique pour l&apos;hébergement des
            données, le tout dans le respect du RGPD et des instructions que nous
            leur donnons.
          </p>

          <h2>5. Sentry (suivi des erreurs techniques)</h2>
          <p>
            Nous prévoyons d&apos;utiliser{" "}
            <a
              href="https://sentry.io/welcome/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sentry
            </a>{" "}
            (ou un outil équivalent) pour le signalement d&apos;erreurs et la
            stabilité de l&apos;application. Dans ce cadre, seules des données
            techniques limitées peuvent être transmises (par exemple type
            d&apos;appareil, version du système, messages d&apos;erreur
            contextualisés de manière à identifier un dysfonctionnement sans vous
            cibler à des fins marketing). La présente politique sera mise à jour
            avant toute mise en service notable de cet outil ; si la loi exige
            un consentement ou une information supplémentaire, nous le
            respecterons.
          </p>

          <h2>6. Vos droits (RGPD)</h2>
          <p>
            Conformément au RGPD et à la loi Informatique et Libertés, vous
            pouvez exercer vos droits d&apos;accès, de rectification, d&apos;effacement,
            de limitation, de portabilité et d&apos;opposition en nous écrivant à{" "}
            <a href={`mailto:${CONTACT}`}>{CONTACT}</a>. Nous répondrons dans les
            délais prévus par la loi. Vous pouvez aussi introduire une réclamation
            auprès de la CNIL (
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
              www.cnil.fr
            </a>
            ).
          </p>

          <h2>7. Sécurité</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles
            appropriées pour protéger vos données contre tout accès non autorisé,
            altération, divulgation ou destruction.
          </p>

          <h2>8. Modifications</h2>
          <p>
            Nous nous réservons le droit de mettre à jour cette politique. En cas
            de modification substantielle, vous en serez informé via
            l&apos;application lorsque cela est possible. La date de dernière
            mise à jour est indiquée en haut de ce document.
          </p>

          <h2>9. Contact</h2>
          <p>
            Pour toute question relative à la protection de vos données :{" "}
            <a href={`mailto:${CONTACT}`}>{CONTACT}</a>
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
