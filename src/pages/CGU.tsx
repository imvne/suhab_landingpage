import styled from "styled-components";

const C = {
  text: "#3B230A",
  beigeMid: "#E8E0D5",
  accent: "#F05E20",
} as const;

const CONTACT = "support@minimoapps.fr";

export default function CGU() {
  return (
    <StyledPage>
      <StyledInner>
        <StyledH1>Conditions générales d&apos;utilisation</StyledH1>
        <StyledLead>
          Application <strong>Suhab</strong> — Dernière mise à jour : 27 avril
          2026
        </StyledLead>
        <StyledContent>
          <h2>1. Objet</h2>
          <p>
            En téléchargeant ou en utilisant l&apos;application mobile{" "}
            <strong>Suhab</strong>, vous acceptez sans réserve les présentes CGU.
            Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser
            l&apos;application.
          </p>

          <h2>2. Accès à l&apos;application</h2>
          <h3>2.1 Version gratuite</h3>
          <p>
            Suhab propose en accès libre et gratuit : la lecture intégrale du
            Coran, l&apos;écoute audio du Coran, ainsi que les fonctionnalités de
            navigation et de recherche dans le texte.
          </p>
          <h3>2.2 Fonctionnalités premium</h3>
          <p>
            L&apos;accès aux challenges de lecture et aux programmes
            d&apos;habitudes (plans de lecture structurés) peut nécessiter un
            abonnement payant souscrit via l&apos;Apple App Store (In-App
            Purchase). Les tarifs et modalités des abonnements sont affichés
            dans l&apos;application au moment de la souscription. Ces prix sont
            susceptibles d&apos;évoluer, sans effet sur les abonnements en cours.
          </p>

          <h2>3. Abonnements et paiements</h2>
          <h3>3.1 Souscription</h3>
          <p>
            Les abonnements sont souscrits exclusivement via le système In-App
            Purchase d&apos;Apple. En souscrivant, vous acceptez également les
            conditions d&apos;utilisation de l&apos;App Store d&apos;Apple.
          </p>
          <h3>3.2 Renouvellement et résiliation</h3>
          <p>
            Les abonnements se renouvellent automatiquement à l&apos;issue de
            chaque période, sauf résiliation de votre part au moins 24 heures
            avant la date de renouvellement, depuis les paramètres de votre
            compte Apple ID (Réglages &gt; [votre nom] &gt; Abonnements). La
            résiliation prend effet à la fin de la période d&apos;abonnement en
            cours ; vous continuez à bénéficier des fonctionnalités premium
            jusqu&apos;à cette date.
          </p>
          <h3>3.3 Remboursements</h3>
          <p>
            Conformément aux règles de l&apos;App Store, toute demande de
            remboursement est traitée directement par Apple. L&apos;éditeur de
            Suhab n&apos;est pas en mesure de procéder à des remboursements en
            dehors de ce cadre.
          </p>

          <h2>4. Propriété intellectuelle</h2>
          <p>
            L&apos;application, son interface, son code source, ses graphismes
            et ses fonctionnalités sont la propriété exclusive de l&apos;éditeur
            ou de ses concédants de licence. Le texte coranique est un contenu du
            domaine public ; les traductions éventuelles, récitations audio et
            autres contenus produits par l&apos;éditeur restent sa propriété. Il
            est interdit de reproduire, modifier, distribuer ou exploiter tout ou
            partie de Suhab sans autorisation préalable écrite de l&apos;éditeur.
          </p>

          <h2>5. Comportement de l&apos;utilisateur</h2>
          <p>
            L&apos;utilisateur s&apos;engage à utiliser Suhab de manière licite
            et respectueuse. Il est notamment interdit de tenter de contourner les
            mécanismes de protection des fonctionnalités premium, d&apos;utiliser
            l&apos;application à des fins commerciales sans autorisation, ou de
            porter atteinte à son bon fonctionnement.
          </p>

          <h2>6. Disponibilité du service</h2>
          <p>
            L&apos;éditeur s&apos;efforce de maintenir Suhab accessible en
            permanence, mais ne peut garantir une disponibilité ininterrompue. Des
            interruptions peuvent survenir pour maintenance, mise à jour ou pour
            des raisons indépendantes de sa volonté.
          </p>

          <h2>7. Limitation de responsabilité</h2>
          <p>
            Suhab est fournie « en l&apos;état ». L&apos;éditeur ne saurait être
            tenu responsable de tout dommage indirect résultant de
            l&apos;utilisation ou de l&apos;impossibilité d&apos;utiliser
            l&apos;application. La responsabilité de l&apos;éditeur est limitée
            aux seuls dommages directs prouvés, dans la limite du montant payé
            par l&apos;utilisateur pour l&apos;abonnement au cours des 12 derniers
            mois.
          </p>

          <h2>8. Modifications des CGU</h2>
          <p>
            L&apos;éditeur se réserve le droit de modifier les présentes CGU à
            tout moment. Les utilisateurs seront informés via l&apos;application
            de toute modification substantielle. La poursuite de l&apos;utilisation
            de Suhab après modification vaut acceptation des nouvelles CGU.
          </p>

          <h2>9. Droit applicable et juridiction</h2>
          <p>
            Les présentes CGU sont soumises au droit français. En cas de litige,
            une solution amiable sera recherchée en priorité. À défaut, les
            tribunaux français seront compétents.
          </p>

          <h2>10. Contact</h2>
          <p>
            Pour toute question relative aux présentes CGU :{" "}
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
